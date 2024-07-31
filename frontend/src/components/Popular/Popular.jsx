import React, { useEffect, useState } from 'react'
// import './Popular.css'
// import data_product from '../assets/data'
import Items from '../Items/Items.jsx'
import { Link } from 'react-router-dom'
const Popular = () => {
  const [popular, setPopular] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/api/product/popularinwomen')
    .then((res)=>res.json())
    .then((data)=>setPopular(data));
  }, [])
// const [category, setCategory] = useState('womens')
  return (
    <div className='popular  flex space-x-2 mt-8 flex-col items-center'>
        <h1 className='text-[50px] font-semibold'>NEW DROPS</h1>
        <hr className='w-56 h-2 border-r-2 bg-[#252525]'/>
        <div className="popular-item grid grid-cols-2 lg:grid-cols-4 gap-y-20 md:justify-center m-12 space-x-4 mb-7">
            {popular.map((item,i)=>{
                return <Items key={i} id={item._id} sizes={item.sizes} name={item.name} image={item.image} price={item.price} />
            })}
        </div>
        <Link to='/womens'><button className='w-40 h-10 border-2 border-slate-600 text-slate-600'>View More</button></Link>
    </div>
  )
}

export default Popular