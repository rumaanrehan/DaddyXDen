const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }, 
    cart: [{
        productId: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          default: 1
        }
    }],
    date:{
        type: Date,
        default: Date.now
    }
});
const User = mongoose.model('user', userSchema);

module.exports = User;