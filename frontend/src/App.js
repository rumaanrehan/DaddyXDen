import Navbar from './components/Navbar/Navbar';
import React from 'react'
import Shop from './pages/Shop';
import ShopCategory from './pages/ShopCategory'
import Cart from './pages/Cart'
import LoginSignUp from './pages/LoginSignUp'
import Product from './pages/Product'
import  { BrowserRouter, Routes, Route } from 'react-router-dom'
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/mens' element={<ShopCategory gender='men'/>}/>
        <Route path='/womens' element={<ShopCategory gender='women'/>}/>
        <Route path='/product' element={<Product/>}>
            <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignUp/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App