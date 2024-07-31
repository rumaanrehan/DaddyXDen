const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    items: [
        {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        },
    ],
    totalAmount: {
        type: Number,
        required: true 
    },
    status: { 
        type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], 
        default: 'Pending' },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;