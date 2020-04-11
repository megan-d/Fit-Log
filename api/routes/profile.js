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
router.get('/me', verify, async(req, res) => {
    
    try {
        //Find the current user based on the id that comes in with the request's token. Populate with the name from the user model.
        const profile = await (await Profile.findOne({ user: req.user.id })).populate('User', 'name');
        console.log(req.user.id);
        //If there is no profile, return an error
        if(!profile) {
            return res.status(400).json({ msg: "There is no profile available for this user." })
        }
        //If there is a profile, send that profile
        res.json(profile);

    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});



//ROUTE: POST api/profile
//DESCRIPTION: Create or update a user profile
//ACCESS LEVEL: Private
router.post('/', [ verify, [ 
    //User express validator to validate required inputs
    check('weight', 'Please provide a numeric weight in pounds.').isNumeric().not().isEmpty(),
    check('height', 'Please provide a numeric height in inches.').isNumeric().not().isEmpty(),
    check('goalWeight', 'Goal weight must be a number.').isNumeric(),
    check('goalDailyCalories', 'Goal calories must be a number.').isNumeric(),
    check('goalDays', 'Goal days must be a number.').isNumeric(),
    ]
], async (req, res) => {
    //Add in logic for express validator error check

    //Pull all of the fields out into variables from req.body
    
    //Once all fields are prepared, update and populate the data
    try {

    } catch(err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}
)


//ROUTE: DELETE api/profile
//DESCRIPTION: Delete profile and user
//ACCESS LEVEL: Private



//ROUTE: PUT api/profile/activity
//DESCRIPTION: Add activity
//ACCESS LEVEL: Private



//ROUTE: DELETE api/profile/activity/:activity_id
//DESCRIPTION: Delete activity
//ACCESS LEVEL: Private






module.exports = router;