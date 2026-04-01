import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'

const Edit = ({ token }) => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [existingImages, setExistingImages] = useState([])

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [sizePrices, setSizePrices] = useState({})
  const [loading, setLoading] = useState(true)

  const allSizes = ["S", "M", "L", "XL", "XXL"];

  const toggleSize = (size) => {
    if (sizes.includes(size)) {
      setSizes(prev => prev.filter(item => item !== size));
      setSizePrices(prev => {
        const updated = {...prev};
        delete updated[size];
        return updated;
      });
    } else {
      setSizes(prev => [...prev, size]);
    }
  }

  const updateSizePrice = (size, price) => {
    setSizePrices(prev => ({...prev, [size]: price}));
  }

  // Fetch product data
  const fetchProduct = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/product/single', { productId: id })
      if (response.data.success) {
        const product = response.data.product
        setName(product.name)
        setDescription(product.description)
        setCategory(product.category)
        setSubCategory(product.subCategory)
        setBestseller(product.bestseller)
        setExistingImages(product.image || [])

        // Handle both new format [{size, price}] and old format ["S", "M"]
        if (product.sizes && product.sizes.length > 0) {
          if (typeof product.sizes[0] === 'object' && product.sizes[0].size) {
            // New format: [{size: "S", price: 500}, ...]
            const sizeNames = product.sizes.map(s => s.size);
            const prices = {};
            product.sizes.forEach(s => { prices[s.size] = s.price; });
            setSizes(sizeNames);
            setSizePrices(prices);
          } else {
            // Old format: ["S", "M", "L"] — use product.price as default for all
            setSizes(product.sizes);
            const prices = {};
            product.sizes.forEach(s => { prices[s] = product.price; });
            setSizePrices(prices);
          }
        }

        setLoading(false)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [id])

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    // Validate that all selected sizes have prices
    for (const size of sizes) {
      if (!sizePrices[size] || sizePrices[size] <= 0) {
        toast.error(`Please enter a price for size ${size}`);
        return;
      }
    }

    if (sizes.length === 0) {
      toast.error('Please select at least one size');
      return;
    }

    try {
      const formData = new FormData()

      // Build sizes array with prices
      const sizesWithPrices = sizes.map(size => ({
        size: size,
        price: Number(sizePrices[size])
      }));

      const defaultPrice = Math.min(...sizesWithPrices.map(s => s.price));

      formData.append("id", id)
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", defaultPrice)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizesWithPrices))

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + "/api/product/edit", formData, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        navigate('/list')
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  if (loading) {
    return <p>Loading product data...</p>
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div className='flex items-center gap-2 mb-2'>
        <button type="button" onClick={() => navigate('/list')} className='px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors'>
          ← Back to List
        </button>
        <p className='text-lg font-medium'>Edit Product</p>
      </div>

      <div>
        <p className='mb-2'>Upload Image <span className='text-sm text-gray-400'>(Upload new images to replace existing ones, or leave empty to keep current images)</span></p>

        {/* Show existing images */}
        {existingImages.length > 0 && (
          <div className='mb-3'>
            <p className='text-sm text-gray-500 mb-1'>Current Images:</p>
            <div className='flex gap-2'>
              {existingImages.map((img, idx) => (
                <img key={idx} className='w-20 border border-gray-300 rounded' src={img} alt={`current-${idx}`} />
              ))}
            </div>
          </div>
        )}

        <p className='text-sm text-gray-500 mb-1'>New Images (optional):</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

        <div>
          <p className='mb-2'>Product category</p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

      </div>

      <div>
        <p className='mb-2'>Product Sizes & Prices</p>
        <p className='text-sm text-gray-400 mb-2'>Click a size to select it, then enter the price for that size</p>
        <div className='flex gap-3'>
          {allSizes.map((size) => (
            <div key={size} onClick={() => toggleSize(size)}>
              <p className={`${sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>{size}</p>
            </div>
          ))}
        </div>

        {/* Price inputs for selected sizes */}
        {sizes.length > 0 && (
          <div className='mt-4 flex flex-col gap-2'>
            <p className='text-sm font-medium text-gray-600'>Set price for each size:</p>
            <div className='flex flex-wrap gap-4'>
              {sizes.map((size) => (
                <div key={size} className='flex items-center gap-2 bg-gray-50 border rounded px-3 py-2'>
                  <span className='font-medium text-sm min-w-[30px]'>{size}:</span>
                  <span className='text-gray-500'>₹</span>
                  <input
                    type="number"
                    min="1"
                    placeholder="Price"
                    value={sizePrices[size] || ''}
                    onChange={(e) => updateSizePrice(size, e.target.value)}
                    className='w-[80px] px-2 py-1 border rounded text-sm'
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>

      <div className='flex gap-3 mt-4'>
        <button type="submit" className='w-28 py-3 bg-black text-white'>UPDATE</button>
        <button type="button" onClick={() => navigate('/list')} className='w-28 py-3 bg-gray-300 text-gray-700'>CANCEL</button>
      </div>

    </form>
  )
}

export default Edit
