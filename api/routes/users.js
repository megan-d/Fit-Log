
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const verify = require('../middleware/verifyToken');

const User = require('../models/User');

//ROUTE: POST api/users
//DESCRIPTION: Register new user
//ACCESS LEVEL: Public
router.post(
    '/',
    [
      //Use express-validator to validate the inputs
      check('name', 'Please provide name').notEmpty(),
      check('email', 'Please provide a valid email').isEmail(),
      check(
        'password',
        'Please provide a password with 8 or more characters',
      ).isLength({ min: 8 }),
    ],
    async (req, res) => {
      //If doesn't pass the above validation, respond witih error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      // //If passes validation, destructure req.body
      // const { name, email, password } = req.body;
  
      try {
        //Check if user already exists. If user already exists, give an error
        let user = await User.findOne({ email: req.body.email });
        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'This user already exists' }] });
        }
  
        //If user doesn't already exist, encrypt password with bcrypt and create new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
        user = new User({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        });
  
        //Save user to database
        const savedUser = await user.save();
  
        //Return Jsonwebtoken so have access upon registration
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        //Set in header
        res.header('X-auth-token', token).send(token);
      } catch (err) {
        res.status(400).send(err);
      }
    },
  );

  module.exports = router;