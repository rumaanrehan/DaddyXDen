import React, { useState, createContext } from "react";
// import allProducts from '../components/assets/all_product'


export const ShopContext =  createContext(null);

// const getDefaultCart = ()=>{
//     let cart = {};
//     for (let index = 0; index < 300 +1; index++) {
//         cart[index] = 0;
//     }
//     return cart;
// }


const ShopContextProvider = (props)=>{
    const [cartItems, setCartItems] = useState({})
    const [allProducts, setallProducts] = useState([]) 
    const [newCollection, setNewCollection] = useState([])
    const [user, setuser] = useState(null)
    const [totalNumberOfCartItems, setTotalNumberOfCartItems] = useState(0);
    const getUser = async ()=>{
        const res = await fetch("http://localhost:4000/api/userauth/getuser",{
            method: "POST",
            headers: {
                'auth-token' : localStorage.getItem('token')
            },
        });
        if(res.status === 200){
            var data= await res.json();
            setuser(data)
            console.log(user);
        }
    }

    const getAllProducts = async()=>{
        const res = await fetch('http://localhost:4000/api/product/fetchallproducts');
        const data = await res.json();
        // console.log(data);
        setallProducts(data);
    }
    
    // useEffect(async() => {
    //     const res = await fetch('http://localhost:4000/api/product/fetchallproducts');
    //     const data = await res.json();
    //     console.log(data);
    //     setallProducts(data);
      
    // }, [])
    
    const addToCart = async( userId, productId)=>{
        try{
        setCartItems((prevCart)=>{
            const newCart = { ...prevCart };
            if(newCart[productId]){
                newCart[productId]+=1;
            }
            else{
                newCart[productId] = 1;
            }
            return newCart
        })
        console.log(cartItems, userId)
        const response = await fetch("http://localhost:4000/api/cart/add", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
             },
             body: JSON.stringify({userId, productId}),
          });
          if(!response.ok){
            throw new Error(`HTTP error! status : ${response.status}`)
          } 
        const json = await response.json();
        console.log(json);            
        }catch(err){ console.log("Error adding to cart", err) }
    }
    const getCart = async()=>{
        try{
        const response = await fetch("http://localhost:4000/api/cart/getcart", {
            method: "GET",
            headers: {
                'auth-token' : localStorage.getItem('token')
             },
          });
          if(!response.ok){
            throw new Error(`HTTP error! status : ${response.status}`)
          } 
        const json = await response.json();
        const transformedJson = json.reduce((acc,item)=>{
            acc[item.productId] = item.quantity;
            return acc;
        },{});
        setCartItems(transformedJson);
        console.log(transformedJson)
        const sum = Object.values(transformedJson).reduce((acc, value) => acc + value, 0);
        setTotalNumberOfCartItems(transformedJson.length)
        console.log(sum)
        }catch(err){ console.log("Error adding to cart", err) }   
    }
    const getTotalCartItems = ()=>{
        Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
        
    }


    const getTotalCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [productId, quantity]) => {
            const product = allProducts.find(p => p._id === productId);
              return total + (product ? product.price * quantity : 0);
            }, 0);
    }
    const getNewCollection = async()=>{
        const res = await fetch('http://localhost:4000/api/product/newcollection');
        const data = await res.json();
        setNewCollection(data);
    }
    const productDisplay= async(productId)=>{
        getAllProducts();
        console.log(productId, allProducts);
    }

    const removeFromCart =async (userId, productId)=>{
        try{
        setCartItems((prevCart) => {
            const newCart = { ...prevCart };
            if (newCart[productId]) {
              newCart[productId] -= 1;
              if (newCart[productId] === 0) {
                delete newCart[productId];
              }
            }
            return newCart;
        });
        const response = await fetch("http://localhost:4000/api/cart/remove", {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
             },
             body: JSON.stringify({userId, productId}),
          });
          if(!response.ok){
            throw new Error(`HTTP error! status : ${response.status}`)
          } 
        const json = await response.json();
        console.log(json);            
        }catch(err){ console.log("Error removing from cart", err) }
        
    }
    const handleCheckout=async(user)=>{
        try{
        const res= await fetch("http://localhost:4000/api/order/addorder",{
            method: "POST",
            headers: {
                Accept: "application/json",
              "Content-Type": "application/json"
            },
            body:  JSON.stringify({userId: user._id, items: user.cart, totalAmount :getTotalCartAmount()})
        })
        if(res.ok){
            let json = await res.json();
            console.log(json);
            setCartItems({});
            return <>{json.msg}</>
        }

    }catch(err){
        console.log(err)
    }
    }
    const contextValue = {user, allProducts, cartItems, totalNumberOfCartItems, productDisplay, newCollection, getAllProducts,
        getNewCollection, getUser, getCart, handleCheckout,
        addToCart, getTotalCartAmount, removeFromCart};
    return (
        <ShopContext.Provider value = {contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;

// cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems, 