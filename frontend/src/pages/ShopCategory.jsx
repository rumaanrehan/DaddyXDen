import React, { useContext, useEffect } from 'react'
// import './CSS/ShopCategory.css'
import { ShopContext } from '../context/ShopContext'
import dropdownIcon from '../components/assets/dropdown_icon.png'
import Items from '../components/Items/Items'
const ShopCategory = (props) => {
  const {allProducts, getAllProducts} = useContext(ShopContext);
  useEffect(() => {
    getAllProducts();
  },[])
  
  return (
    <div className='shop-category px-3 md:px-10 py-7'>
      <img className="shopcategory-banner block w-[82%]" src={props.banner} alt="" />
      {/* <div className="shopcategory-indexSort px-10 flex justify-end items-end ">
        <div className="shopcategory-sort w-28 justify-center flex  py-2 rounded-full border-[1px] border-black cursor-pointer">
          Sort by <img className='h-2 m-2' src={dropdownIcon} alt="" />
        </div>
      </div> */}
      <div className="shopcategory-products mx-3 my-44 grid grid-cols-2 gap-y-20 md:justify-center  lg:grid-cols-4  space-x-3 mt-8 items-center">
        {allProducts.map((item,i)=>{
          if(props.gender.toLowerCase() === item.gender.toLowerCase()){
            return( <Items key={i} id={item._id} name={item.name} image={item.image} price={item.price} sizes={item.sizes}/>

             )}
          else return null;  
        })}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  )
}

export default ShopCategory