const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String,  
    },
    category: { 
        type: String,  
    },
    gender:{
        type: String,
        required: true
    },
    price: { 
        type: Number, 
        required: true 
    },
    sizes: [String], // Example: ["S", "M", "L", "XL"]
    image: {
        type: String
    }, // URLs to product images
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
  });
  const Product = mongoose.model('product', productSchema); 
module.exports = Product;