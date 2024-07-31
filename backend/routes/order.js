// routes/order.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product')
const fetchuser = require('../middleware/fetchuser');
// Middleware to check if user is admin
const isAdmin = async(req, res, next) => {
    const userId = req.userId; // Assuming you get userId from a decoded token or session
    try {
      const user = await User.findById(userId);
      if (user) { // && user.role === 'admin'
        next();
      } else {
        res.status(403).json({ error: 'Access denied' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

// Create a new order
// ROUTE 1 : POST "/api/order/addorder". login required
router.post('/addorder', async (req, res) => {
  const { userId, items, totalAmount } = req.body;
  let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ success: false, error: 'Invalid UserId or Create an account' });
    }
  try {
    const newOrder = new Order({ userId, items, totalAmount });
    const savedOrder = await newOrder.save();

    user.cart= [];
    await user.save();
    res.status(201).json({orderId: savedOrder._id, msg: `Order Placed with orderId ${savedOrder._id}`});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders (Admin only)
router.get('/getallorders', fetchuser, async (req, res) => {
  try {
    const orders = await Order.find().populate({
      path: 'items.productId',
      model: 'product',
      select: 'name price'
    }).populate({
      path: 'userId',
      model: 'user',
      select: 'name'
    });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order status (Admin only)
router.put('/update/:orderId', fetchuser, async (req, res) => {
  const { status } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    ).populate({
      path: 'items.productId',
      model: 'product',
      select: 'name price'
    }).populate({
      path: 'userId',
      model: 'user',
      select: 'name'
    });
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an order (Admin only)
router.delete('/delete/:orderId', fetchuser, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.orderId);
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
