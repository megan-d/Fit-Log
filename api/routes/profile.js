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
router.get('/me', verify, async (req, res) => {
  try {
    //Find the current user based on the id that comes in with the request's token. Populate with the name from the user model.
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'User',
      'name',
    );

    //If there is no profile, return an error
    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'There is no profile available for this user.' });
    }
    //If there is a profile, send that profile
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//ROUTE: POST api/profile
//DESCRIPTION: Create a user profile
//ACCESS LEVEL: Private

router.post(
  '/',
  [
    verify,
    [
      //User express validator to validate required inputs
      check('weight', 'Please provide a numeric weight in pounds.')
        .isNumeric()
        .trim(),
      check('height', 'Please provide a numeric height in inches.')
        .isNumeric()
        .trim(),
      check('goalDays', 'Please provide a number between 0 and 7')
        .optional({ checkFalsy: true })
        .isInt({ min: 0, max: 7 })
        .trim(),
      check('goalWeight', 'Please provide a number')
        .optional({ checkFalsy: true })
        .isInt()
        .trim(),
      check('goalDailyCalories', 'Please provide a number')
        .optional({ checkFalsy: true })
        .isInt()
        .trim(),
    ],
  ],
  async (req, res) => {
    //Add in logic for express validator error check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    //Pull all of the fields out into variables from req.body. Don't include activities or calories consumed today (user can update later).
    const {
      weight,
      height,
      goalWeight,
      goalDailyCalories,
      goalDays,
    } = req.body;

    //Build the profileItems object. If the value is there, add it to the profileItems object.
    const profileItems = {
      weightHistory: {
        weight: weight,
      },
    };
    profileItems.user = req.user.id;
    if (weight) {
      profileItems.weight = weight;
      profileItems.weightHistory.weight = weight;
    }
    if (height) {
      profileItems.height = height;
    }
    if (weight && height) {
      //need to see how to make this work when updating
      profileItems.bmi = ((weight / (height * height)) * 703).toFixed(1);
    }
    if (goalWeight) {
      profileItems.goalWeight = goalWeight;
    }
    if (goalDailyCalories) {
      profileItems.goalDailyCalories = goalDailyCalories;
    } else {
      profileItems.goalDailyCalories = 2000;
    }
    if (goalDays || goalDays === 0) {
      profileItems.goalDays = goalDays;
    }
    profileItems.caloriesConsumedToday = 0;
    profileItems.caloriesRemainingToday = profileItems.goalDailyCalories;

    //Once all fields are prepared, update and populate the data
    try {
      //Check if a user exists before creating a profile. If there's no user in database, don't allow profile to be created.
      let user = await User.findOne({ _id: req.user.id });
      if (!user) {
        return res.json({
          msg: 'You must be a currently registered user to create a profile.',
        });
      }

      //Use findOne to find profile
      let profile = await Profile.findOne({ user: req.user.id });

      //If profile is found, give error and suggest user updates profile
      if (profile) {
        return res.json({
          msg:
            'A profile already exists for this user. Please select update stats from your dashboard to update your profile.',
        });
      }
      //If profile isn't found, create a new one
      if (!profile) {
        profile = await new Profile(profileItems);
        await profile.save();
        res.json(profile);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },
);

//ROUTE: PUT api/profile
//DESCRIPTION: Update a user profile
//ACCESS LEVEL: Private

router.put(
  '/',
  [
    verify,
    [
      //User express validator to validate required inputs
      check('weight', 'Please provide a numeric weight in pounds.')
        .optional({ checkFalsy: true })
        .isNumeric()
        .trim(),
      check('height', 'Please provide a numeric height in inches.')
        .optional({ checkFalsy: true })
        .isNumeric()
        .trim(),
      check('goalDays', 'Please provide a number between 0 and 7')
        .optional({ checkFalsy: true })
        .isInt({ min: 0, max: 7 })
        .trim(),
      check('goalWeight', 'Please provide a number')
        .optional({ checkFalsy: true })
        .isInt()
        .trim(),
      check('goalDailyCalories', 'Please provide a number')
        .optional({ checkFalsy: true })
        .isInt()
        .trim(),
      check('caloriesConsumedToday', 'Please provide a number')
        .optional({ checkFalsy: true })
        .isInt()
        .trim(),
    ],
  ],
  async (req, res) => {
    //Add in logic for express validator error check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      //Use findOne to find profile
      let profile = await Profile.findOne({ user: req.user.id });

      //If profile isn't found, give error (this shouldn't happen though because they should be required to create one when they sign up.)
      if (!profile) {
        res.json({ msg: 'There is no profile available for this user.' });
      }

      //If there is a profile, update it based on data provided.
      //Pull all of the fields out into variables from req.body. Don't include activities.
      const {
        weight,
        height,
        goalWeight,
        goalDailyCalories,
        goalDays,
        caloriesConsumedToday,
      } = req.body;

      //Build the profileItems object. If the value is there, add it to the profileItems object.
      const profileItems = {};
      profileItems.user = req.user.id;

      if (weight) {
        profileItems.weight = weight;
        weightHistoryInput = {
          weight: weight,
        };
        profileItems.weightHistory = [...profile.weightHistory];
        profileItems.weightHistory.push(weightHistoryInput);
      } else {
        profileItems.weight = profile.weight;
      }
      if (height) {
        profileItems.height = height;
      } else {
        profileItems.height = profile.height;
      }
      if (goalWeight) {
        profileItems.goalWeight = goalWeight;
      }
      if (goalDays || goalDays === 0) {
        profileItems.goalDays = goalDays;
      }
      if (goalDailyCalories) {
        profileItems.goalDailyCalories = goalDailyCalories;
      } else {
        profileItems.goalDailyCalories = profile.goalDailyCalories;
      }
      if (caloriesConsumedToday || caloriesConsumedToday === 0) {
        profileItems.caloriesConsumedToday = caloriesConsumedToday;
      } else {
        profileItems.caloriesConsumedToday = profile.caloriesConsumedToday;
      }

      //Calculate calories remaining once have data from either profileItems or profile (or both)
      profileItems.caloriesRemainingToday =
        profileItems.goalDailyCalories - profileItems.caloriesConsumedToday;
      if (profileItems.caloriesRemainingToday <= 0) {
        profileItems.caloriesRemainingToday = 0;
      }

      //Set bmi remaining once look up what's in profile (since have default value or user inputed value)
      profileItems.bmi = (
        (profileItems.weight / (profileItems.height * profileItems.height)) *
        703
      ).toFixed(1);

      //Update the new fields with data from profileItems
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileItems },
          { new: true },
        );
        //send back profile
        return res.json(profile);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },
);

//ROUTE: DELETE api/profile
//DESCRIPTION: Delete profile and user
//ACCESS LEVEL: Private
router.delete('/', verify, async (req, res) => {
  try {
    //Find profile that corresponds to user id found in token and delete
    await Profile.findOneAndRemove({ user: req.user.id });

    //Find user that corresponds to user id found in token and delete
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'This user and corresponding profile has been deleted.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//ROUTE: PUT api/profile/activity
//DESCRIPTION: Add activity
//ACCESS LEVEL: Private
router.put(
  '/activity',
  [
    verify,
    [
      //User express validator to validate required inputs
      check('duration', 'Please provide a numeric duration in minutes.')
        .isNumeric()
        .trim(),
      check('category', 'Please select a category.')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    //Add in logic for express validator error check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    //Pull all of the fields out into variables from req.body.
    const { date, duration, category, calories } = req.body;

    //Create object for new activity
    const newActivity = {
      date,
      duration,
      category,
      calories,
    };

    try {
      //Find profile of user that comes in with token
      const profile = await Profile.findOne({ user: req.user.id });

      //Need to perform calculation to calculate calories based on weight, category, and duration. Mets derived from acsm.org and ace.
      //To calculate calories burned: METS * 3.5 * weight in kg / 200 * duration;
      const mets = {
        'Bicycling - Leisure': 6,
        'Bicycling - Vigorous': 10,
        'Running - Slow': 8,
        'Running - Fast': 11.5,
        Swimming: 8,
        'Walking - Leisure': 3,
        'Walking - Brisk': 5,
        Hiking: 7,
        'Nordic Skiing': 8,
        Tennis: 8,
        'Weight Training': 4,
        Yoga: 2.5,
        Basketball: 6.5,
        Aerobics: 5,
      };
      const category = newActivity.category;
      newActivity.calories = Math.round(
        ((mets[category] * 3.5 * (profile.weight / 2.2046)) / 200) *
          newActivity.duration,
      );

      //Add into activities array for profile.
      profile.activities.unshift(newActivity);

      //Save to database and send profile to front end
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

//ROUTE: DELETE api/profile/activity/:activity_id
//DESCRIPTION: Delete activity from profile by activity's id
//ACCESS LEVEL: Private
router.delete('/activity/:activity_id', verify, async (req, res) => {
  try {
    //Find profile based on the user id that comes in through the token
    const profile = await Profile.findOne({ user: req.user.id });

    //If profile is found, find the activity that matches the activity id from req.params and delete it
    if (profile) {
      //Remove the activity from the activities array where the index is equal to req.params.activity_id
      const activities = profile.activities;
      const activity = req.params.activity_id;
      const activityIds = activities.map((el) => el._id);
      const index = activityIds.indexOf(activity);
      if (index > -1) {
        activities.splice(index, 1);

        //Update the profile record and save to database
        profile.activities = activities;
        await profile.save();
        res.json(profile);
      } else {
        return res
          .status(500)
          .send('There was an error processing this request.');
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('There was an error processing your request.');
  }
});

module.exports = router;

//*******DEMO PROFILE */
//******************* */

//ROUTE: POST api/profile/demo
//DESCRIPTION: Create the profile that will be the initial load for each demo user generated
//ACCESS LEVEL: Private

router.post('/demo', verify, async (req, res) => {
  //Populate all profile values that we want the demo user to have and put them in a profileItems object. Then, send this object to the database. Don't need all of the if statement verificaiton since I'm populating it myself.
  const mets = {
    'Bicycling - Leisure': 6,
    'Bicycling - Vigorous': 10,
    'Running - Slow': 8,
    'Running - Fast': 11.5,
    Swimming: 8,
    'Walking - Leisure': 3,
    'Walking - Brisk': 5,
    Hiking: 7,
    'Nordic Skiing': 8,
    Tennis: 8,
    'Weight Training': 4,
    Yoga: 2.5,
    Basketball: 6.5,
    Aerobics: 5,
  };

  const user = req.user.id;

  const profileItems = {
    weight: 225,
    height: 70,
    goalWeight: 200,
    goalDailyCalories: 2000,
    goalDays: 4,
    user: user,
    caloriesConsumedToday: 600,
    caloriesRemainingToday: 1400,
    weightHistory: [
      {
        weight: 235,
        date: 'March 12, 2020',
      },
      {
        weight: 227,
        date: 'April 16, 2020',
      },
      {
        weight: 230,
        date: 'May 1, 2020',
      },
      {
        weight: 221,
        date: 'May 25, 2020',
      },
      {
        weight: 220,
        date: 'May 27, 2020',
      },
      {
        weight: 225,
        date: 'June 3, 2020',
      },
    ],
  };

  (profileItems.activities = [
    {
      duration: 60,
      category: 'Yoga',
      calories: Math.round(
        ((2.5 * 3.5 * (profileItems.weight / 2.2046)) / 200) * 60,
      ),
      date: 'June 3, 2020',
    },
    {
      duration: 80,
      category: 'Swimming',
      calories: Math.round(
        ((8 * 3.5 * (profileItems.weight / 2.2046)) / 200) * 80,
      ),
      date: 'May 27, 2020',
    },
    {
      duration: 35,
      category: 'Running - Slow',
      calories: Math.round(
        ((8 * 3.5 * (profileItems.weight / 2.2046)) / 200) * 35,
      ),
      date: 'May 20, 2020',
    },
    {
      duration: 76,
      category: 'Hiking',
      calories: Math.round(
        ((7 * 3.5 * (profileItems.weight / 2.2046)) / 200) * 76,
      ),
      date: 'May 12, 2020',
    },
    {
      duration: 42,
      category: 'Hiking',
      calories: Math.round(
        ((7 * 3.5 * (profileItems.weight / 2.2046)) / 200) * 42,
      ),
      date: 'May 9, 2020',
    },
    {
      duration: 60,
      category: 'Basketball',
      calories: Math.round(
        ((6.5 * 3.5 * (profileItems.weight / 2.2046)) / 200) * 60,
      ),
      date: 'May 1, 2020',
    },
  ]),
    (profileItems.bmi = (
      (profileItems.weight / (profileItems.height * profileItems.height)) *
      703
    ).toFixed(1));

  //Once all fields are prepared, update and populate the data
  try {
    //Check if a user exists before creating a profile. If there's no user in database, don't allow profile to be created.
    let user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.json({
        msg: 'You must be a currently registered user to create a profile.',
      });
    }

    //Use findOne to find profile
    let profile = await Profile.findOne({ user: req.user.id });

    //If profile is found, give error and suggest user updates profile
    if (profile) {
      return res.json({
        msg:
          'A profile already exists for this user. Please select update stats from your dashboard to update your profile.',
      });
    }
    //If profile isn't found, create a new one
    if (!profile) {
      profile = await new Profile(profileItems);
      await profile.save();
      res.json(profile);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
