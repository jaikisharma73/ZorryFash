import React, { useContext, useEffect, useState, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestseller));
        setBestSeller(bestProduct.slice(0, 5))
    }, [products])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={sectionRef} className='py-16'>
            {/* Section Header */}
            <div className={`section-title-wrapper animate-on-scroll ${isVisible ? 'visible' : ''}`}>
                <p className="section-label">Customer Favorites</p>
                <div className='text-center text-3xl'>
                    <Title text1={'BEST'} text2={'SELLERS'} />
                </div>
                <div className="section-line" />
                <p className='section-desc'>
                    Discover what everyone's loving right now. Our best sellers are the pieces our customers 
                    can't stop raving about — timeless designs, perfect fits, and unbeatable quality that 
                    keeps them coming back for more.
                </p>
            </div>

            {/* Products Grid */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-8'>
                {
                    bestSeller.map((item, index) => (
                        <div
                            key={index}
                            className={`product-card-wrapper animate-on-scroll stagger-${index + 1} ${isVisible ? 'visible' : ''}`}
                        >
                            <ProductItem id={item._id} name={item.name} image={item.image} price={item.price} sizes={item.sizes} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default BestSeller
