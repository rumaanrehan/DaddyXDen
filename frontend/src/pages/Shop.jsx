import React from 'react'
import Hero from '../components/Hero/Hero.jsx'
import Popular from '../components/Popular/Popular.jsx'
// import Offers from '../components/Offers/Offers.jsx'
import GymCollection from '../components/GymCollection/GymCollection.jsx'
// import NewsLetter from '../components/NewsLetter/NewsLetter.jsx'
import Footer from '../components/Footer/Footer.jsx'
const Shop = () => {
  return (
    <div className='flex-col'>
        <Hero/>
        <Popular/>
        {/* <Offers/>
        <GymCollection/>
        <NewsLetter/> */}
        <Footer/>
    </div>
  )
}

export default Shop