import React, { useContext, useState, useEffect } from 'react'
// import './ListProduct.css'
import cross from '../../assets/cross_icon.png';
import ProductContext from '../../Context/products/ProductContext';
const ListProduct = () => {
  
  const context = useContext(ProductContext);
  const { getProducts, products, deleteProduct } = context;

  
  useEffect(() => {
    if(true)
    {getProducts();}
  }, []);
  
  return (
    <div>
      <h1 className="text-center font-bold text-2xl items-center">Product List</h1>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 mt-4 mx-3 rounded-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-2 px-4 text-left text-gray-700 font-semibold">Product</th>
            <th className="py-2 px-4 text-left text-gray-700 font-semibold">Name</th>
            <th className="py-2 px-4 text-left text-gray-700 font-semibold">Category</th>
            <th className="py-2 px-4 text-left text-gray-700 font-semibold">Gender</th>
            <th className="py-2 px-4 text-left text-gray-700 font-semibold">Price</th>
            <th className="py-2 px-4 text-left text-gray-700 font-semibold">Sizes</th>
            <th className="py-2 px-4 text-left text-gray-700 font-semibold">Remove</th>
          </tr>
        </thead>
        <tbody> 
          {products.map((product, index)=>(
            <tr key={index} className="border-b border-gray-200 listproduct-format-main listproduct-format">
              <td className="py-2 px-4"><img className='listproduct-product-icon h-24' src={product.image} alt="" /></td>
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">{product.category}</td>
              <td className="py-2 px-4">{product.gender}</td>
              <td className="py-2 px-4">${product.price}</td>
              <td className="py-2 px-4">{product.sizes}</td>
              <td className="py-2 px-4 "><img className="cursor-pointer" onClick={()=>{deleteProduct(product)}} src={cross} alt=""  /></td>
              
            </tr>
          )
        )}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default ListProduct
// <div className="listproduct-format-main">
//   <p>Products</p>
//   <p>Name</p>
//   <p>Category</p>
//   <p>Gender</p>
//   <p>Prices</p>
//   <p>Sizes</p>

// </div>
// <div className="listproduct-allproducts">
//   <hr/>
//   {products.map((product, index)=>{
//     return(
//       <div key={index} className="listproduct-format-main listproduct-format">
//         <img className='listproduct-product-icon' src={product.image} alt="" />
//         <p>{product.name}</p>
//         <p>{product.category}</p>
//         <p>{product.gender}</p>
//         <p>${product.price}</p>
//         <p>{product.sizes}</p>
//         <img onClick={()=>{deleteProduct(product)}} src={cross} alt="" className="listproduct-remove-icon" />
        
//       </div>
//     )
//   })}
// </div>