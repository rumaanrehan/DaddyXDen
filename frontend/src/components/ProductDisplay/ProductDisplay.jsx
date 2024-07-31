import React, { useContext, useEffect } from 'react'
// import './ProductDisplay.css'
import starIcon from '../assets/star_icon.png';
import starDullIcon from '../assets/star_dull_icon.png';
import { ShopContext } from '../../context/ShopContext';
import { useNavigate } from 'react-router-dom';
const ProductDisplay = (props) => {
    const navigate = useNavigate();
    const {product} = props;
    const {addToCart, getUser, user} = useContext(ShopContext);
    useEffect(() => {
      getUser();
    },[])
    
        // Ensure product and product.image are defined before accessing
        if (!product || !product.image) {
        return <div>Product information is not available.</div>;
    }
    else
  return (
    <div className='productdisplay flex flex-col lg:flex-row my-10'>
        <div className="productdisplay-left flex flex-col lg:max-w-full lg:flex-row gap-4 lg:mx-10">
            <div className="productdisplay-img-list order-2 lg:order-1 flex flex-row lg:flex-col lg:mr-10 justify-between lg:space-x-0">
                <img className='h-28 lg:max-w-sm' src={product.image} alt="" />
                <img className='h-28 lg:max-w-sm' src={product.image} alt="" />
                <img className='h-28 lg:max-w-sm' src={product.image} alt="" />
                <img className='h-28 lg:max-w-sm' src={product.image} alt="" />
            </div>
            <div className="productdisplay-img flex justify-center order-1 lg:order-2">
                <img className='productdisplay-main-img  max-w-lg' src={product.image} alt="" />
            </div>
        </div>
        <div className="productdisplay-right flex-col mt-8 lg:mt-0 lg:ml-20">
            <h1 className='text-[#3d3d3d] text-4xl font-thin lg:text-4xl lg:font-bold'>{product.name}</h1>
            <div className="productdisplay-right-price mt-2 text-2xl lg:text-base lg:font-bold">${product.price}</div>
            <div className="productdisplay-right-star flex items-center mt-3 gap-1 text-[#1c1c1c] text-[16px]">
                <img src={starIcon} alt="" />
                <img src={starIcon} alt="" />
                <img src={starIcon} alt="" />
                <img src={starIcon} alt="" />
                <img src={starDullIcon} alt="" />
                <p>(122)</p>
            </div>
            <div className="productdisplay-right-description">
                {product.description}
            </div>
            <div className="productdisplay-right-size mt-8 gap-5 ">
                <h1 className='mt-14 text-[#656565] text-sm font-semibold'>Select Size</h1>
                <div className='flex  rounded-sm cursor-pointer'>
                    <div className='px-5 py-4 bg-[#fbfbfb] border-r-2 border-l-2 border-[#ebebeb] rounded-sm cursor-pointer'>S</div>
                    <div className='px-5 py-4 bg-[#fbfbfb] border-r-2 border-[#ebebeb] rounded-sm cursor-pointer'>M</div>
                    <div className='px-5 py-4 bg-[#fbfbfb] border-r-2 border-[#ebebeb] rounded-sm cursor-pointer'>L</div>
                    <div className='px-5 py-4 bg-[#fbfbfb] border-r-2 border-[#ebebeb] rounded-sm cursor-pointer'>XL</div>
                    <div className='px-5 py-4 bg-[#fbfbfb] border-r-2 border-[#ebebeb] rounded-sm cursor-pointer'>XXL</div>
                </div>
            </div>
            <button className='mt-10 py-4 w-full md:w-48 mb-10 font-semibold text-lg text-slate-200 bg-[#322a2a]' 
            onClick={()=>{
                if(localStorage.getItem('token'))
                    addToCart(user._id, product._id)
                else navigate('/login')}}>ADD TO CART</button>
            <p className='productdisplay-right-category'><span className='font-semibold'>Category : </span> {product.category}</p>
        </div>
    </div>
  )
}

export default ProductDisplay