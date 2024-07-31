const express = require("express");
const router = express.Router();
// const app = express();
const User = require("../models/User");
const { validationResult, body } = require("express-validator");
const bcrypt= require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = "Kinwiliangliu";

// ROUTE 1 :Create a user using : POST "/api/userauth/signup". doesnt require Authentication. no login required
router.post(
  "/signup",
  [
    body("email", "enter a valid email").isEmail(),
    // body("name", "name must be > 3 characters ").isLength({ min: 3 }),
    body("password", "passwords >5 chars").isLength({ min: 5 }),
  ],
  async (req, res) => {


    //if therer are errors return bad request and the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    try {
        success = false;

      //check whether the user with the same email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "User with the email already exists" });
      }

      
      //secure password
      const salt = await bcrypt.genSalt(10);
      secPass= await bcrypt.hash(req.body.password, salt);
    
      
      //create a new user  
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        // cart: cart 
      });

      //generating token
      const data = {
        user:{
            id : user.id
        }
      };
    const authtoken= jwt.sign(data,JWT_SECRET);
    success  =true;
    res.json({success, authtoken});

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Some error occured");
    }
});


//ROUTE 2 : Authenticate using password & email using: POST "/api/userauth/login". no login required
router.post("/login",
    [
      body("email", "enter a valid email").isEmail(),
      // body("name", "name must be > 3 characters ").isLength({ min: 3 }),
      body("password", "passwords cannot be blank").exists()
    ], async (req, res) => {
        
        const result = validationResult(req);
        if (!result.isEmpty()) {
          return res.status(400).json({ errors: result.array() });
        }

        const {email, password} = req.body;
        try {
            success= false;
            let user  = await User.findOne({email});
            if(!user){
                return res.status(400).json({success, error:"please try to login wih correct credentials"});
            }
            
            const passwordCompare =  await bcrypt.compare(password, user.password);
            if(!passwordCompare){
                
                return res.status(400).json({success, error:"please try to login wih correct credentials"});
            }
            const payload = {
                user:{
                    id : user.id
                }
              };

            const authtoken= jwt.sign(payload,JWT_SECRET);
            success  =true;
            res.json({success, authtoken});
          
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Some internal error occured");
        }
        
    });


    //ROUTE 3 : Get logged in user details: POST "/api/auth/getuser". Login required
    router.post("/getuser", fetchuser, async (req, res) =>{
      try {
          userId =req.user.id;
          const user = await User.findById(userId).select("-password");
          console.log(user)
          res.send(user);
        //  console.log(user)

      } catch (err) {
          console.error(err.message);
          res.status(500).send("Some internal error occured");
      }
});


module.exports = router;
