import React from 'react'
// import './Items.css'
import { Link } from 'react-router-dom'
const Items = (props) => {
  return (
    <div className='item w-40 md:w-80 lg:w-56 xl:w-80 hover:scale-105 transition-transform duration-500 ease-in-out' style={{transitionProperty: 'transform', fontFamily: "Red Hat Display"}}>
        <Link to={`/product/:${props.id}`}><img className='rounded-lg' onClick={window.scrollTo(0,0)} src={props.image} alt="" /></Link>
        <p className='m-2 text-sm' >{props.name}</p>
        {/* <p className='text-xs flex'>{props.sizes.map((size)=>{<span>{size}</span>})}</p> */}
        <div className="m-1 item-prices  text-lg font-semibold">
              ${props.price}
        </div> 
    </div>
  )
}

export default Items
// name, description, category, gender, price, sizes, image
