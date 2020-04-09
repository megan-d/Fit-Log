const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const verify = require('../middleware/verifyToken');

const User = require('../models/User');
const Profile = require('../models/Profile');

//ROUTE: GET api/profile/me
//DESCRIPTION: Get current user's profile
//ACCESS LEVEL: Private



//ROUTE: POST api/profile
//DESCRIPTION: Create or update a user profile
//ACCESS LEVEL: Private



//ROUTE: DELETE api/profile
//DESCRIPTION: Delete profile and user
//ACCESS LEVEL: Private



//ROUTE: POST api/profile/activity
//DESCRIPTION: Create or update activity
//ACCESS LEVEL: Private



//ROUTE: POST api/profile/goals
//DESCRIPTION: Create or update goals
//ACCESS LEVEL: Private





module.exports = router;