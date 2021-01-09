const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const verify = require('../middleware/verifyToken');
const { pool } = require('../../db');
const User = require('../models/User');

//ROUTE: GET api/auth
//DESCRIPTION: Get user from database
//ACCESS LEVEL: Private
router.get('/', verify, async (req, res) => {
  try {
    // const user = await User.findById(req.user.id).select('-password');
    // const user = await pool
    //   .select('*')
    //   .from('users')
    //   .where({
    //     id: req.user.id,
    //   });
    const client = await pool.connect();
    let user = await client.query('SELECT * FROM users WHERE id = $1', [
      req.user.id,
    ]);
    res.json(user);
    client.end(() => console.log('client ended'));
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

//ROUTE: POST api/auth
//DESCRIPTION: Authenticate user and get token (login existing user)
//ACCESS LEVEL: Public (make request so can get access to private routes)
router.post(
  '/',
  [
    //Use express-validator to validate the inputs
    check('email', 'Please provide a valid email')
      .isEmail()
      .normalizeEmail(),
    check('password', 'Password is required')
      .not()
      .isEmpty(),
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
      // let user = await User.findOne({ email: req.body.email });
      const client = await pool.connect();
      let user = await client.query('SELECT * FROM users WHERE email = $1', [
        req.body.email,
      ]);
      if (user.rows.length === 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      //If user exists in pool but email and password don't match, return error
      let login = await client.query('SELECT * FROM login WHERE user_id = $1', [
        user.rows[0].id,
      ]);
      const matches = await bcrypt.compare(
        req.body.password,
        login.rows[0].hash,
      );
      if (!matches) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // let user = await pool.query("SELECT * FROM users WHERE email = $1", [req.body.email]);

      //If user exists in database and password matches email, create and assign a jsonwebtoken
      //Add user ID to payload so it comes in with token
      const payload = {
        user: {
          id: user.rows[0].id,
        },
      };
      jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        },
      );
      client.end(() => console.log('client ended'));
    } catch (err) {
      res.status(500).send(err);
    }
  },
);

module.exports = router;
