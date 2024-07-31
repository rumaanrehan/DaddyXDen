import React, { useContext, useState } from 'react'

import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
const Navbar = () => {
  const { totalNumberOfCartItems } = useContext(ShopContext);
  const [menu,setMenu] = useState("Home")
  const [search, setSearch] = useState(false);
  const logout=()=>{
    localStorage.removeItem('token');
  }
  return (
    <div >
      <div className='flex-col md:flex-none'>
        <nav className="flex items-center justify-between p-4">
          <div className="flex text-base md:text-lg space-x-2 md:space-x-4">
            <div className='md:hidden flex cursor-pointer' onFocus={()=>{setSearch(true)}} onBlur={()=>{setSearch(false)}}>
              <input placeholder="Search" className={`w-44 outline-none transition-all duration-300 ease-in-out border-gray-200 ${search?'':'hidden'}`} type="text" />
              <svg onClick={()=>{setSearch(true)}}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`mt-1 h-5 w-5 text-black ${search?'hidden':''}`}
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
              </svg>
              <svg className={`mb-1 h-8 w-8 ${search?'':'hidden'}`} onClick={()=>{setSearch(false)}} width="33px" height="33px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8L8 16M12 12L16 16M8 8L10 10" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={`hidden md:block ${search?'hidden':''} ${menu==='women'?'font-semibold ':'font-normal'}`}>
              <Link onClick={()=>{setMenu("women")}} style={{textDecoration:'none'}} to="/womens">Women</Link>
            </div>
            <div className={`hidden md:block ${search?'hidden':''} ${menu==='men'?'font-semibold':'font-normal'}`}>
              <Link onClick={()=>{setMenu("men")}} style={{textDecoration:'none'}} to="/mens">Men</Link>
            </div>
          </div>
          <div className="text-2xl font-bold"><Link onClick={()=>{setMenu("home")}} to='/'>DaddyXDen</Link></div>
          <div className="flex items-center space-x-8">
              <div className="hidden md:flex items-center border rounded-full px-4 py-2">
              <input placeholder="Search" className="outline-none" type="text" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 h-5 w-5 text-black"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              </div>
              <svg onClick={()=>{logout()}} className={`relative  ${search || !localStorage.getItem('token')?'hidden':''}`} width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M13.2402 2C13.7102 2 14.1002 2.38 14.1002 2.86V21.15C14.1002 21.62 13.7202 22.01 13.2402 22.01C7.35023 22.01 3.24023 17.9 3.24023 12.01C3.24023 6.12 7.36023 2 13.2402 2Z" fill="#292D32"/>
                <path d="M20.5409 11.5399L17.7009 8.68991C17.4109 8.39991 16.9309 8.39991 16.6409 8.68991C16.3509 8.97991 16.3509 9.45991 16.6409 9.74991L18.2009 11.3099H8.63086C8.22086 11.3099 7.88086 11.6499 7.88086 12.0599C7.88086 12.4699 8.22086 12.8099 8.63086 12.8099H18.2009L16.6409 14.3699C16.3509 14.6599 16.3509 15.1399 16.6409 15.4299C16.7909 15.5799 16.9809 15.6499 17.1709 15.6499C17.3609 15.6499 17.5509 15.5799 17.7009 15.4299L20.5409 12.5799C20.8309 12.2999 20.8309 11.8299 20.5409 11.5399Z" fill="#292D32"/>
              </svg>
              <Link to='/login' >
              <svg className={`relative  ${search || localStorage.getItem('token')?'hidden':''}`} width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M12.1207 12.78C12.0507 12.77 11.9607 12.77 11.8807 12.78C10.1207 12.72 8.7207 11.28 8.7207 9.50998C8.7207 7.69998 10.1807 6.22998 12.0007 6.22998C13.8107 6.22998 15.2807 7.69998 15.2807 9.50998C15.2707 11.28 13.8807 12.72 12.1207 12.78Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path opacity="0.34" d="M18.7398 19.3801C16.9598 21.0101 14.5998 22.0001 11.9998 22.0001C9.39977 22.0001 7.03977 21.0101 5.25977 19.3801C5.35977 18.4401 5.95977 17.5201 7.02977 16.8001C9.76977 14.9801 14.2498 14.9801 16.9698 16.8001C18.0398 17.5201 18.6398 18.4401 18.7398 19.3801Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg></Link>
             <div className={`relative  ${search?'hidden':''}`}>
              <Link to='/cart'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className=" text-black mr-2"
              >
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
              <div className ="absolute top-0 mr-2 right-0 w-4 h-4 bg-black text-white text-xs rounded-full flex items-center justify-center">
                {totalNumberOfCartItems}
              </div>
              </Link>
            </div>
          </div>
        </nav>
        <div className='flex md:hidden text-lg justify-evenly'>
          <div className={` ${menu==='women'?'font-semibold ':'font-light'}`}>
              <Link onClick={()=>{setMenu("women")}} style={{textDecoration:'none'}} to="/womens">Women</Link>
            </div>
            <div className={` ${menu==='men'?'font-semibold':'font-light'}`}>
              <Link onClick={()=>{setMenu("men")}} style={{textDecoration:'none'}} to="/mens">Men</Link>
            </div>
        </div>
      </div>
      <hr className=' h-0.5 bg-slate-200'/>
    </div>
  )
}

export default Navbar