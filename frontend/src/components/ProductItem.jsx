import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom'

const ProductItem = ({id,image,name,price,sizes}) => {
    
    const {currency} = useContext(ShopContext);

    // Get the minimum price from size-wise pricing if available
    let displayPrice = price;
    let hasSizePricing = false;
    if (sizes && sizes.length > 0 && typeof sizes[0] === 'object' && sizes[0].size) {
      const prices = sizes.map(s => s.price);
      displayPrice = Math.min(...prices);
      hasSizePricing = true;
    }

  return (
    <Link onClick={()=>scrollTo(0,0)} className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className=' overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className=' text-sm font-medium'>
        {currency}{displayPrice}
        {hasSizePricing && <span className='text-xs text-gray-400 ml-1'>onwards</span>}
      </p>
    </Link>
  )
}

export default ProductItem
