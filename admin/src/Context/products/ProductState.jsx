import React, { useState } from "react";
import ProductContext from "./ProductContext";

const ProductState = (props) => {
    const host = "http://localhost:4000";
    const productsInitial = []
    const [products, setproducts] = useState(productsInitial);
  
    
    //Get all Products
    const getProducts = async () => {
      //TODO : API call
      const response = await fetch(`${host}/api/product/fetchallproducts`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            //   "auth-token" : localStorage.getItem('token')
        }
      }); 
      const json = await response.json();
      setproducts(json);
    }
    


    const addProduct = async (product) => {
        // const { name, image, old_price, new_price, category } = product;
        //TODO : API call
        const response = await fetch(`${host}/api/product/addproduct`, 
        {
            method: "POST",
            headers: {
                Accept : "application/json",
                'Content-type' : "application/json"
                // "auth-token" : localStorage.getItem('token')  
                },
            body: JSON.stringify(product),
        }); 
        const product1 = await response.json();
        console.log(product1)
        console.log("Adding a new Product");
    }
    const deleteProduct = async (product) => {
        console.log(product._id);
        const response = await fetch(`${host}/api/product/deleteproduct/${product._id}`, {
          method: "DELETE",
          headers: {
            Accept : "application/json",
            "Content-Type": "application/json",
            // "auth-token" : localStorage.getItem('token')
          },
        });
        const json = await response.json();
        console.log(json);
        console.log("Deleting the note of id" + product._id);
        getProducts();
      };
            
    return(
        <ProductContext.Provider value={{ deleteProduct, getProducts, addProduct, products }}>
            {props.children}
        </ProductContext.Provider>
    );
};

export default ProductState;