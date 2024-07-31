import React from 'react'
import './Navbar.css'
import navProfile from '../../assets/nav-profile.svg'
const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='nav-logo'> 
        <h1 className='text-3xl'>Admin Panel</h1>
        <h4 className='text-xl' >DaddyXDen</h4>
      </div>
        <img src={navProfile} className='navProfile' alt="" />
    </div>
  )
}

export default Navbar