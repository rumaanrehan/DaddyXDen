import React from 'react'
// import './Footer.css'
import instagramIcon from '../assets/instagram_icon.png'
import pinterestIcon from '../assets/pintester_icon.png'
import whatsappIcon from '../assets/whatsapp_icon.png'
const Footer = () => {
  return (
    <div className='footer mt-10 flex-col w-full bg-[#2a2828] text-[#e7e7e7] justify-center items-center gap-12'>
        <div className="footer-logo font-bold text-3xl flex items-end justify-center mb-12 pt-5">
            {/* <img src={footerLogo} alt="" /> */}
            <p>DaddyXDen</p>
        </div>
        <ul className="footer-links flex justify-around text-lg mt-4 mb-10">
            <li className='cursor-pointer hover:text-blue-400'>Company</li>
            <li className='cursor-pointer hover:text-blue-400'>Products</li>
            <li className='cursor-pointer hover:text-blue-400'>Offices</li>
            <li className='cursor-pointer hover:text-blue-400'>About</li>
            <li className='cursor-pointer hover:text-blue-400'>Contact</li>
        </ul>
        <div className="footer-social-icon flex justify-center gap-10 mt-5">
            <div className="footer-icons-container pb-3">
                <img src={instagramIcon} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={pinterestIcon} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={whatsappIcon} alt="" />
            </div>
        </div>
        <div className="footer-copyright w-full flex justify-center mt-5">
            <hr className='bg-[#100f0f] h-11'/>
            <p>Copyright @ 2024 - All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer