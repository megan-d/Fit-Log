const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const verify = require('../middleware/verifyToken');
const pool = require('../../db');

const User = require('../models/User');

//ROUTE: POST api/users
//DESCRIPTION: Register new user
//ACCESS LEVEL: Public
router.post(
  '/',
  [
    //Use express-validator to validate the inputs
    check('name', 'Please provide name')
      .not()
      .isEmpty()
      .trim(),
    check('email', 'Please provide a valid email')
      .isEmail()
      .normalizeEmail(),
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
    const client = await pool.connect();
    try {
      //Check if user already exists. If user already exists, give an error
      // let user = await User.findOne({ email: req.body.email });

      let user = await client.query('SELECT * FROM users WHERE email = $1', [
        req.body.email,
      ]);
      if (user.rows.length > 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'This user already exists' }] });
      }

      //If user doesn't already exist, encrypt password with bcrypt and create new user and new login
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // await client.query('BEGIN');

      const newUser = await client.query(
        'INSERT INTO users (name, email, date) VALUES($1,$2,$3) RETURNING *',
        [req.body.name, req.body.email, new Date()],
      );
      const newLogin = await client.query(
        'INSERT INTO login (hash, user_id) VALUES($1,$2)',
        [hashedPassword, newUser.rows[0].id],
      );
      // await client.query('COMMIT');

      //Add user ID to payload so it comes in with token
      const payload = {
        user: {
          id: newUser.rows[0].id,
        },
      };
      //Return Jsonwebtoken so have access upon registration
      jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        },
      );
      // // Set in header
      // res.header('x-access-token', token).send(token);
    } catch (err) {
      // await client.query('ROLLBACK');
      res.status(500).send(err);
    } finally {
      client.release();
    }
  },
);

module.exports = router;
