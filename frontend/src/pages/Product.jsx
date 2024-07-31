import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../components/DescriptionBox/DescriptionBox';
// import RelatedProducts from '../components/RelatedProducts/RelatedProducts';

const Product = () => {
  const {productId} = useParams();
  const {getAllProducts, allProducts} = useContext(ShopContext);

  useEffect(() => {
    getAllProducts();
  }, []);
  let product  = allProducts.find((ele)=>ele._id=== productId.slice(1))
  
  return (
    <div className='px-3 md:px-10 py-7'>
      <Breadcrumb product = {product}/>
      <ProductDisplay product = {product}/>
      <DescriptionBox/>
      {/* <RelatedProducts/> */}
    </div>
  )
}

export default Product