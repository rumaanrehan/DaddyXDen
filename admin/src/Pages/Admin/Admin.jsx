import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import Orders from '../../Components/Orders'
const Admin = () => {
  return (

    <div className='admin flex-col items-center justify-center'>
        <Sidebar/>
        <Routes>
            <Route exact path='/listproduct' element={<ListProduct/>}/>
            <Route exact path='/addproduct' element={<AddProduct/>}/>
            <Route exact path='/orders' element={<Orders/>}/>
        </Routes>
    </div>
  )
}

export default Admin