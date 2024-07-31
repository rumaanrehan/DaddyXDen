// routes/cart.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = require("../models/User");
const fetchuser = require('../middleware/fetchuser');


// ROUTE 1 :Add to cart: POST "/api/cart/add". login required
router.post('/add', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let user = await User.findById(userId);
    console.log(userId)
    if (!user) {
      return res.status(400).json({success:false, error: "INvalid UserId or Create an account"});
    } else {
      const item = user.cart.find(item => item.productId === productId);
      if (item) {
        item.quantity += 1;
      } else {
        user.cart.push({ productId, quantity: 1 });
      }
    }
    await user.save();
    return res.status(200).json(user.cart);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});


// ROUTE 2 : POST "/api/cart/remove". login required
router.put('/remove', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({success:false, error: "Invalid UserId or Create an account"});
    }
    else{
      const itemIndex = user.cart.findIndex(item => item.productId === productId);
      if (itemIndex !== -1) {
        user.cart[itemIndex].quantity -= 1;
        if (user.cart[itemIndex].quantity === 0) {
          user.cart.splice(itemIndex, 1);
        }
        await user.save();
      }
    }

    return res.status(200).json({success:true, msg: "removed to Cart"});
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// ROUTE 3 : GET "/api/cart/getcart". login required
router.get('/getcart',fetchuser, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    res.status(200).json(user ? user.cart : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
