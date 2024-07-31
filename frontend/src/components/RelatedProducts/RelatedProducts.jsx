import React from 'react'
import './RelatedProducts.css'
import dataProduct from '../assets/data'
import Items from '../Items/Items.jsx'

const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr/>
        <div className="relatedproducts-item">
            {dataProduct.map((item,i)=>{
                return ( <Items key={i} id={item._id} name={item.name} image={item.image} price={item.price} /> )
            })}
        </div>
    </div>
  )
}

export default RelatedProducts