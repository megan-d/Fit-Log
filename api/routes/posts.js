const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const verify = require('../middleware/verifyToken');

router.get('/', verify, (req, res) => {
    console.log(req.user);ç
    res.send(req.user);
});

module.exports = router;