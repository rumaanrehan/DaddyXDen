import React, { useContext,useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import removeIcon from '../assets/cart_cross_icon.png'
const CartItem = () => {
    const { allProducts, cartItems, removeFromCart, handleCheckout, getTotalCartAmount, totalNumberOfCartItems, getUser, user, getCart } = useContext(ShopContext);
    const [msg, setMsg] = useState("")
    useEffect(() => {
      getUser();
      getCart();     
      console.log(cartItems); 
    },[])

    if(msg){
        return(
            <div className='text-xl lg:text-3xl font-light mt-8 mx-5 lg:mx-28 lg:my-20'>
                {msg} <br/>
                :{')'} <br/>
                Shop More!
            </div>
        )
    }
    // console.log(getTotalCartAmount)
    if(totalNumberOfCartItems===0 && !msg){
        return(
            <div className='text-3xl font-light mt-8 mx-5 lg:mx-28 lg:my-20'>
                Your Cart looks Empty! <br/>
                :{'('}
            </div>
        )
    }else
    return (
    <div className='cartitems mt-8 mx-5 lg:mx-28 lg:my-20'>
        <h1 className='text-xl lg:text-7xl font-normal'>Cart</h1>
        <div className="hidden cartitems-format-main text-[#454545] text-sm font-semibold md:grid gap-10 items-center px-5"style={{ gridTemplateColumns: '0.5fr 2fr 1fr 1fr 1fr 1fr' }}>
            <p>Product</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr className='bg-[#e2e2e2] h-1'/>
        {allProducts.map((e)=>{
            if(cartItems[e._id]>0){
                return (
                    <div className='mt-5'>
                        <div className='md:hidden flex'>
                            <div>
                                <img className='carticon-product-icon h-24' src={e.image} alt="" />
                            </div>
                            <div className='flex-col mx-10'>
                                <p className='flex '>
                                    <span className='font-semibold'>{e.name}</span>
                                    <span> <img className='cartitems-remove-icon w-3 ml-3 cursor-pointer my-2' src={removeIcon} onClick={()=>{removeFromCart(e._id)}} alt="" /></span>
                                </p>
                            <p className='flex font-normal mt-3 justify-between'>
                                <span>Price: ${e.price}</span>
                                <span>Quantity : {cartItems[e._id]}</span>
                            </p>
                            </div>
                            <hr/>
                        </div>
                        <div className=" hidden  text-[#454545] text-[18px] font-normal md:grid gap-10 items-center px-5" style={{ gridTemplateColumns: '0.5fr 2fr 1fr 1fr 1fr 1fr' }}>
                            <img className='carticon-product-icon h-24 w-16' src={e.image} alt="" />
                            <p>{e.name}</p>
                            <p>${e.price}</p>
                            <button className='cartitems-quantity w-16 h-12 border-2 border-[#ebebeb] bg-[#fff]'>{cartItems[e._id]}</button>
                            <p>${e.price*cartItems[e._id]}</p>
                            <img className='cartitems-remove-icon w-4 cursor-pointer my-9' src={removeIcon} onClick={async()=>{await removeFromCart(user._id, e._id)}} alt="" />
                            <hr/>
                        </div>
                    </div>
                )
            }
            return null;
        })}
        <div className="cartitems-down flex flex-col md:flex-row lg:mx-24">
            <div className="cartitems-total w-full mt-5 order-2 md:order-1 flex-col md:mr-48 gap-10">
                <h1 className='text-3xl font-light'>Cart Total</h1>
                <div className='mt-5 mb-2 font-medium space-y-2'>
                    <div className="cartitems-total-items flex justify-between px-4">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr/>
                    <div className="cartitems-total-items flex justify-between px-4">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr/>
                    <div className="cartitems-total-items flex justify-between px-4">
                        <h3>Total</h3>
                        <h3>${getTotalCartAmount()}</h3>
                    </div>
                </div>
                <button className='w-full mt-2 h-14 bg-[#322a2a] text-[#fff] font-semibold' onClick={async()=>{let m = await handleCheckout(user); setMsg(m)}}>PROCEED TO CHECKOUT</button>
            </div>

            
            <div className="cartitems-promocode order-1 md:order-2 flex-col mt-10 font-medium text-sm">
                <p className='text-[#555]'>If you have promo code, Enter it here</p>
                <div className='cartitems-promobox flex w-full md:w-[450px] h-14 mt-5 pl-5 bg-[#ebebeb]'>
                    <input className='bg-transparent w-full h-12 pt-1 text-sm border-none outline-none' type='text' placeholder='promo code'/>
                    <button className='bg-[#322a2a] text-white w-44 h-14'>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItem