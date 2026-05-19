import productModel from "../models/productModel.js";

// Helper to stem simple keywords (e.g. hoodies -> hoodie, shirts -> shirt)
const stemKeyword = (word) => {
    if (word.endsWith("ies") && word.length > 3) {
        return word.slice(0, -3) + "y";
    }
    if (word.endsWith("s") && !word.endsWith("ss") && word.length > 3) {
        return word.slice(0, -1);
    }
    return word;
};

// Helper to compile keyword to RegExp object with normalization (e.g. t-shirt -> t-?shirt)
const compileKeywordRegex = (kw) => {
    let pattern = stemKeyword(kw);
    if (pattern === "t-shirt") {
        pattern = "t-?shirt";
    }
    return new RegExp(pattern, "i");
};

// Main controller function for handling chat query
const handleChatQuery = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message || typeof message !== "string") {
            return res.json({ success: false, message: "Invalid message input" });
        }

        let cleanMessage = message.toLowerCase().trim();

        // Normalize all variations of t-shirt ("t shirt", "t-shirt", "tshirt", "tshirts") to "t-shirt"
        cleanMessage = cleanMessage.replace(/\bt[- ]*shirts?/g, "t-shirt");

        // 1. Check for Greetings
        const greetings = ["hi", "hello", "hey", "hola", "greetings", "wassup", "sup", "howdy", "good morning", "good afternoon", "good evening", "yo"];
        if (greetings.some(greet => cleanMessage === greet || cleanMessage.startsWith(greet + " "))) {
            return res.json({
                success: true,
                text: "Hello! I am ZorryFash AI Assistant. 🌟\nI can search our products for you based on color, category, or price!\n\nTry asking me something like:\n• *\"Show me black jackets under 1000\"*\n• *\"Men topwear under 500\"*\n• *\"Show bestseller items\"*",
                products: []
            });
        }

        // 2. Check for Order Tracking queries
        const orderKeywords = ["order", "track", "delivery", "where is my", "status", "shipment", "shipped"];
        if (orderKeywords.some(kw => cleanMessage.includes(kw))) {
            return res.json({
                success: true,
                text: "You can view your order history and track shipping status directly on your **Orders** page! 📦\n\nClick [here](/orders) or go to **My Profile** > **Orders** to view your recent purchases.",
                products: []
            });
        }

        // 3. Check for Cart queries
        const cartKeywords = ["cart", "bag", "checkout", "buy now", "purchase"];
        if (cartKeywords.some(kw => cleanMessage.includes(kw))) {
            return res.json({
                success: true,
                text: "You can view and modify items in your shopping cart, and proceed to secure checkout on your **Cart** page. 🛒\n\nClick [here](/cart) to view your shopping bag!",
                products: []
            });
        }

        // 4. Tokenize and parse filters for database query
        const words = cleanMessage.split(/[\s,?.!#;:]+/).filter(w => w.length > 0);

        let category = null;
        let subCategory = null;
        let priceCondition = null;
        let color = null;
        let size = null;
        let bestseller = false;

        // Categories mapping
        const menTerms = ["men", "man", "gents", "male"];
        const womenTerms = ["women", "woman", "ladies", "female"];
        const kidsTerms = ["kids", "kid", "child", "children", "baby", "toddler", "boy", "boys", "girl", "girls"];

        // Exact subcategory mapping matching database fields
        const jeansTerms = ["jeans", "jean"];
        const tshirtTerms = ["t-shirt", "t-shirts", "tshirt", "tshirts", "tee", "tees"];
        const shirtTerms = ["shirt", "shirts"];
        const kurtiTerms = ["kurti", "kurtis", "kurta", "kurtas"];
        const sareeTerms = ["saree", "sarees", "sari", "saris"];
        const topwearTerms = ["topwear", "top", "tops"];
        const bottomwearTerms = ["bottomwear", "bottom", "bottoms", "trouser", "trousers", "pants", "pant", "palazzo", "shorts"];
        const winterwearTerms = ["winterwear", "winter", "jacket", "jackets", "sweater", "sweaters", "coat", "coats", "hoodie", "hoodies", "pullover", "cardigan"];

        // Colors list
        const colorsList = ["black", "white", "blue", "red", "green", "pink", "yellow", "grey", "gray", "brown", "purple", "orange", "navy", "gold", "silver", "beige", "printed", "denim"];

        // Stop words list
        const stopWords = new Set([
            "show", "me", "find", "search", "get", "list", "buy", "under", "above", "less", "than", "below", "between", 
            "and", "rupees", "rs", "inr", "for", "with", "a", "an", "the", "in", "of", "to", "size", "please", "can", 
            "you", "i", "want", "some", "any", "looking", "items", "products", "item", "product", "stuff", "clothing",
            "are", "there", "is", "have", "need", "give", "display", "retrieve"
        ]);

        // Parse Categories
        for (const word of words) {
            if (menTerms.includes(word)) category = "Men";
            else if (womenTerms.includes(word)) category = "Women";
            else if (kidsTerms.includes(word)) category = "Kids";
        }

        // Parse Subcategories
        for (const word of words) {
            if (jeansTerms.includes(word)) subCategory = "Jeans";
            else if (tshirtTerms.includes(word)) subCategory = "Tshirt";
            else if (shirtTerms.includes(word)) subCategory = "Shirt";
            else if (kurtiTerms.includes(word)) subCategory = "Kurti";
            else if (sareeTerms.includes(word)) subCategory = "Saree";
            else if (topwearTerms.includes(word)) subCategory = "Topwear";
            else if (bottomwearTerms.includes(word)) subCategory = "Bottomwear";
            else if (winterwearTerms.includes(word)) subCategory = "Winterwear";
        }

        // Parse Colors
        for (const word of words) {
            if (colorsList.includes(word)) {
                color = word;
                break;
            }
        }

        // Parse Sizes
        const sizeMatch = cleanMessage.match(/size\s*(s|m|l|xl|xxl)/i);
        if (sizeMatch) {
            size = sizeMatch[1].toUpperCase();
        }

        // Parse Bestseller
        if (cleanMessage.includes("bestseller") || cleanMessage.includes("best seller") || cleanMessage.includes("popular") || cleanMessage.includes("trending")) {
            bestseller = true;
        }

        // Parse Price Limits
        // under/below/less than X
        const underMatch = cleanMessage.match(/(?:under|below|less\s+than|<)\s*(\d+)/i);
        // above/more than/greater than X
        const aboveMatch = cleanMessage.match(/(?:above|more\s+than|greater\s+than|>)\s*(\d+)/i);
        // between X and Y
        const betweenMatch = cleanMessage.match(/between\s+(\d+)\s+and\s+(\d+)/i);

        if (betweenMatch) {
            priceCondition = { $gte: Number(betweenMatch[1]), $lte: Number(betweenMatch[2]) };
        } else if (underMatch) {
            priceCondition = { $lte: Number(underMatch[1]) };
        } else if (aboveMatch) {
            priceCondition = { $gte: Number(aboveMatch[1]) };
        }

        // Extract keywords for text search (filter out category and subcategory terms to prevent redundant filters)
        const remainingKeywords = words.filter(word => {
            if (word.length <= 1) return false; // Ignore single letter words (like 't')
            // exclude gender terms
            if (menTerms.includes(word) || womenTerms.includes(word) || kidsTerms.includes(word)) return false;
            // exclude subcategory terms since we filter by subCategory directly
            if (jeansTerms.includes(word) || tshirtTerms.includes(word) || shirtTerms.includes(word) ||
                kurtiTerms.includes(word) || sareeTerms.includes(word) || topwearTerms.includes(word) ||
                bottomwearTerms.includes(word) || winterwearTerms.includes(word)) return false;
            if (stopWords.has(word)) return false;
            if (word.match(/^\d+$/)) return false; // Ignore numeric values parsed in price
            if (word === "size" || (size && word === size.toLowerCase())) return false;
            return true;
        });

        // Separate color keywords and general text keywords
        const colorKeywords = remainingKeywords.filter(word => colorsList.includes(word));
        const textKeywords = remainingKeywords.filter(word => !colorsList.includes(word));

        // 5. Query Builder Helpers
        // Strict builder: Color AND keyword1 AND keyword2 AND ...
        const buildStrictMongoQuery = (cat, subCat, col, priceCond, sz, best, textKws) => {
            const query = {};
            if (cat) query.category = cat;
            if (subCat) query.subCategory = subCat;
            if (best) query.bestseller = true;
            if (priceCond) query.price = priceCond;
            if (sz) query.sizes = sz;

            const andConditions = [];
            if (col) {
                andConditions.push({
                    $or: [
                        { name: { $regex: col, $options: 'i' } },
                        { description: { $regex: col, $options: 'i' } }
                    ]
                });
            }

            if (textKws && textKws.length > 0) {
                textKws.forEach(kw => {
                    const pattern = compileKeywordRegex(kw);
                    andConditions.push({
                        $or: [
                            { name: pattern },
                            { description: pattern }
                        ]
                    });
                });
            }

            if (andConditions.length > 0) {
                query.$and = andConditions;
            }

            return query;
        };

        // Relaxed builder: Color AND (keyword1 OR keyword2 OR ...)
        const buildRelaxedMongoQuery = (cat, subCat, col, priceCond, sz, best, textKws) => {
            const query = {};
            if (cat) query.category = cat;
            if (subCat) query.subCategory = subCat;
            if (best) query.bestseller = true;
            if (priceCond) query.price = priceCond;
            if (sz) query.sizes = sz;

            const hasColor = !!col;
            const hasTextKws = textKws && textKws.length > 0;

            if (hasColor && hasTextKws) {
                // Color matches AND (at least one text keyword matches)
                const colorFilter = {
                    $or: [
                        { name: { $regex: col, $options: 'i' } },
                        { description: { $regex: col, $options: 'i' } }
                    ]
                };
                const keywordsFilter = {
                    $or: textKws.flatMap(kw => {
                        const pattern = compileKeywordRegex(kw);
                        return [
                            { name: pattern },
                            { description: pattern }
                        ];
                    })
                };
                query.$and = [colorFilter, keywordsFilter];
            } else if (hasColor) {
                // Only color matches
                query.$or = [
                    { name: { $regex: col, $options: 'i' } },
                    { description: { $regex: col, $options: 'i' } }
                ];
            } else if (hasTextKws) {
                // At least one text keyword matches
                query.$or = textKws.flatMap(kw => {
                    const pattern = compileKeywordRegex(kw);
                    return [
                        { name: pattern },
                        { description: pattern }
                    ];
                });
            }

            return query;
        };

        // 6. Multi-Stage Database Query Pipeline
        let queryTypeUsed = "strict";
        
        // Stage A: Strict search
        let query = buildStrictMongoQuery(category, subCategory, color, priceCondition, size, bestseller, textKeywords);
        let products = await productModel.find(query).limit(10);

        // Stage B: Relaxed keyword match (e.g. black AND (deniem OR jeans))
        if (products.length === 0 && (color || textKeywords.length > 0)) {
            queryTypeUsed = "relaxed_keywords";
            query = buildRelaxedMongoQuery(category, subCategory, color, priceCondition, size, bestseller, textKeywords);
            products = await productModel.find(query).limit(10);
        }

        // Stage C: Drop keywords completely (use category/subcategory/color filters only)
        if (products.length === 0 && (category || subCategory || color)) {
            queryTypeUsed = "filters_only";
            query = {};
            if (category) query.category = category;
            if (subCategory) query.subCategory = subCategory;
            if (color) {
                query.$or = [
                    { name: { $regex: color, $options: 'i' } },
                    { description: { $regex: color, $options: 'i' } }
                ];
            }
            if (priceCondition) query.price = priceCondition;
            if (size) query.sizes = size;
            if (bestseller) query.bestseller = true;
            
            products = await productModel.find(query).limit(10);
        }

        // Stage D: Relax category/subcategory constraints but match keywords
        if (products.length === 0 && (category || subCategory) && (color || textKeywords.length > 0)) {
            queryTypeUsed = "relaxed_categories";
            query = buildRelaxedMongoQuery(null, null, color, priceCondition, size, bestseller, textKeywords);
            products = await productModel.find(query).limit(10);
        }

        // 7. Output Result Formatting & Fallbacks
        if (products.length > 0) {
            let filterDesc = [];
            if (color) filterDesc.push(color);
            if (category) filterDesc.push(category);
            if (subCategory) {
                // Formatting display for Tshirt
                if (subCategory === "Tshirt") filterDesc.push("t-shirts");
                else filterDesc.push(subCategory.toLowerCase());
            }
            if (bestseller) filterDesc.push("bestselling");
            
            if (textKeywords.length > 0 && queryTypeUsed !== "filters_only") {
                if (queryTypeUsed === "strict") {
                    filterDesc.push(textKeywords.map(stemKeyword).join(" "));
                } else {
                    filterDesc.push(textKeywords.map(stemKeyword).join(" or "));
                }
            }

            if (priceCondition) {
                if (priceCondition.$lte !== undefined) filterDesc.push(`under ₹${priceCondition.$lte}`);
                else if (priceCondition.$gte !== undefined && priceCondition.$lte !== undefined) filterDesc.push(`between ₹${priceCondition.$gte} and ₹${priceCondition.$lte}`);
                else if (priceCondition.$gte !== undefined) filterDesc.push(`above ₹${priceCondition.$gte}`);
            }

            const searchSummary = filterDesc.join(" ");
            let botText = `Here are the products I found for **"${searchSummary}"**: ✨`;
            
            if (queryTypeUsed === "relaxed_keywords") {
                botText = `I couldn't find an exact match for all search keywords. However, here are products matching **"${searchSummary}"**:`;
            } else if (queryTypeUsed === "filters_only") {
                botText = `I found these products matching your filters: **"${searchSummary}"**:`;
            } else if (queryTypeUsed === "relaxed_categories") {
                botText = `I found these products matching **"${searchSummary}"** across all our collections:`;
            }

            return res.json({
                success: true,
                text: botText,
                products
            });
        }

        // Stage E: Budget Fallbacks
        if (priceCondition) {
            // Relax price but keep relaxed keyword matching
            const queryNoPrice = buildRelaxedMongoQuery(category, subCategory, color, null, size, bestseller, textKeywords);
            const altProducts = await productModel.find(queryNoPrice).limit(5);
            if (altProducts.length > 0) {
                let priceText = "";
                if (priceCondition.$lte !== undefined) priceText = `under ₹${priceCondition.$lte}`;
                else if (priceCondition.$gte !== undefined) priceText = `above ₹${priceCondition.$gte}`;

                return res.json({
                    success: true,
                    text: `I couldn't find any matching products within that budget (${priceText}). However, here are some matching items at other prices:`,
                    products: altProducts
                });
            }
        }

        // Stage F: Color Fallbacks
        if (color) {
            // Relax color but keep keyword matching
            const queryNoColor = buildRelaxedMongoQuery(category, subCategory, null, priceCondition, size, bestseller, textKeywords);
            const altProducts = await productModel.find(queryNoColor).limit(5);
            if (altProducts.length > 0) {
                return res.json({
                    success: true,
                    text: `I couldn't find any products matching those terms in **${color}**. Here are similar items in other colors:`,
                    products: altProducts
                });
            }
        }

        // Stage G: Return bestsellers only if nothing else matches at all
        const defaultProducts = await productModel.find({ bestseller: true }).limit(5);
        return res.json({
            success: true,
            text: `I couldn't find any products matching your search terms. Here are some of our popular bestsellers instead:`,
            products: defaultProducts
        });

    } catch (error) {
        console.error("Chatbot Controller Error:", error);
        res.json({ success: false, message: "An error occurred while processing your request." });
    }
};

export { handleChatQuery };
