const port  = 4000;
const express = require("express");
const app =express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const connectToMongo = require('./db');
// const upload = require('./routes/upload')

connectToMongo();
app.use(express.json()); // middleware
app.use(cors());

app.get('/', (req, res) => {
    res.send('express app is running');
});


// const storage = multer.diskStorage({
//     destination: './upload/images',
//     filename: (req, file, cb) => {
//         cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
//     }
// });

// const upload = multer({ storage });

// // Creating upload endpoint for images
// app.use('/images', express.static(path.join(__dirname, 'upload/images')));

// app.post("/upload", upload.array('product', 5), (req, res) => {  // Allow up to 5 files
//     if (!req.files || req.files.length === 0) {
//         return res.status(400).json({ success: 0, message: 'No files uploaded' });
//     }
//     try{
//     const imageUrls = req.files.map(file => `http://localhost:${port}/images/${file.filename}`);
//     console.log(imageUrls)
//     res.json({
//         success: 1,
//         image_urls: imageUrls
//     });
//     }catch(err){
//         console.error("error :", err);
//     }
// }); 

//Image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename : (req, file, cb)=>{
        return cb(null, `${file.filename}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload  = multer({storage});

//creating upload endpoint for images

app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'), (req,res)=>{
    res.json({
        success:1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})


app.use('/api/product', require('./routes/product'));
app.use('/api/userauth', require('./routes/userauth'));
app.use('/api/cart', require('./routes/cart'))
app.use('/api/order', require('./routes/order'))
// app.use('/api/support/contact', require('./routes/helpcenter'))
app.listen(port, ()=>{
    console.log(`daddyxden backend listenening on port http://localhost:${port}`);
});