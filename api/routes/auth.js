const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const verify = require('../middleware/verifyToken');

const User = require('../models/User');

//ROUTE: GET api/user
//DESCRIPTION: Get user from database (test)
//ACCESS LEVEL: Public
router.get('/', (req, res) => {
  res.send('This is the auth route');
});

//ROUTE: POST api/auth
//DESCRIPTION: Authenticate user and get token (login existing user)
//ACCESS LEVEL: Public (make request so can get access to private routes)
router.post(
  '/',
  [
    //Use express-validator to validate the inputs
    check('email', 'Please provide a valid email').isEmail().normalizeEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    //If doesn't pass the above validation, respond witih error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //If passes validation
    try {
      //If user doesn't exist in database, give error
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      //If user exists in db but email and password don't match, return error
      const matches = await bcrypt.compare(req.body.password, user.password);
      if (!matches) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      //If user exists in database and password matches email, create and assign a jsonwebtoken

      //Add user ID to payload so it comes in with token
      const payload = {
        user: {
          id: user.id
        }
      }
      
      jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn:  '1h'}, (err, token) => {
        if(err) throw err;
        res.json({token});
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
);



module.exports = router;
