const express = require('express');
const app  =express();
const Product = require('../models/Product')

//ROUTE 1 : Add a new Product: POST "/api/product/addproduct". Login required
app.post('/addproduct', async (req,res)=>{

        try {
            // let products = await Product.find({});
            // let id;
            // if(products.length>0){
            //     let lastProductArray = products.slice(-1);
            //     let lastProduct = lastProductArray[0];
            //     id = lastProduct.id + 1;
            // } else{
            //     id =1;
            // }
            //destructuring 
            const { name, description, category, gender, price, sizes, image } = req.body;
            
            //structuring
            const product = new Product({
                name, description, category, gender, price, sizes, image
            })
            console.log(product);
            const savedproduct = await product.save(); //note.save() returns product
            res.json({
                success: true,
                name: req.body.name,
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Some internal error occured");
        }
})

//ROUTE 4 : delete an existing Note using: DELETE "/api/product/deleteproduct". Login required
app.delete('/deleteproduct/:id', async (req,res)=>{
    try{
    let {id} = req.params;
    console.log(id)
    //find the note to be updated
    let product = await Product.findById(id);
    if(!product){return res.status(404).send("Not Found");}
    
    //allow deletion only if user owns this note
    // if(product.user.toString()!== req.user.id){
    //     return res.status(401).send("Not Allowed");
    // }
        //note = await Note.findByIdAndDelete(req.param.id);
    product = await Product.findByIdAndDelete(id);
    res.json({"Success" : "Product has been deleted", product});
}catch (err) {
        console.error(err.message);
        res.status(500).send("Some internal error occured");
    }
})    

//ROUTE 1 : Get all the notes using: GET "/api/product/fetchallproducts". login required
app.get('/fetchallproducts', async (req,res)=>{
    try{
        //find all notes in dB with that userIDNOte
        const products = await Product.find({});
        res.json(products);
    }catch (err) {
        console.error(err.message);
        res.status(500).send("Some internal error occured");
    }
})



//ROUTE 1 : Get all the notes using: GET "/api/product/newcollection". login required
app.get('/newcollection', async(req, res)=>{
    try{
        let products = await Product.find({});
        let newCollection = products.slice(1).slice(-8);
        console.log("New Collections Fetched");
        res.send(newCollection);
    }catch(err){
        res.status(500).send("some internal error occured")
    }
})

//ROUTE 1 : Get all the notes using: GET "/api/product/popularinwomen". login required
app.get('/popularinwomen', async(req, res)=>{
    try{
        let products = await Product.find({gender:"Women"});
        let popularInWoman = products.slice(-4);
        console.log("Popular in women Fetched");
        res.send(popularInWoman);
    }catch(err){
        res.status(500).send("some internal error occured")
    }
})

//ROUTE 1 : Get single product using: GET "/api/product/product". login required
app.get('/product', async(req, res)=>{
    try{
        let products = await Product.find({gender:"Women"});
        let popularInWoman = products.slice(-4);
        console.log("Popular in women Fetched");
        res.send(popularInWoman);
    }catch(err){
        res.status(500).send("some internal error occured")
    }
})


module.exports = app;