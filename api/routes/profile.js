const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const verify = require('../middleware/verifyToken');
const User = require('../models/User');
const Profile = require('../models/Profile');
const pool = require('../../db');

//ROUTE: GET api/profile/me
//DESCRIPTION: Get current user's profile and activities
//ACCESS LEVEL: Private
router.get('/me', verify, async (req, res) => {
  const client = await pool.connect();
  try {
    // Find the current user based on the id that comes in with the request's token. Populate with the name from the user model.
    // const profile = await Profile.findOne({ user: req.user.id }).populate(
    //   'User',
    //   'name',
    // );
    let profile = await client.query(
      'SELECT * FROM profiles INNER JOIN users ON profiles.user_id = users.id WHERE profiles.user_id = $1',
      [req.user.id],
    );
    let activities = await client.query(
      'SELECT * FROM activities WHERE activities.user_id = $1',
      [req.user.id],
    );
    let weights = await client.query(
      'SELECT * FROM weights WHERE weights.user_id = $1',
      [req.user.id],
    );
    //If there is no profile, return an error
    if (profile.rows.length === 0) {
      return res
        .status(400)
        .json({ msg: 'There is no profile available for this user.' });
    }
    if (activities.rows.length > 0) {
      profile.rows[0].activities = [...activities.rows];
    } else {
      profile.rows[0].activities = [];
    }
    if (weights.rows.length > 0) {
      profile.rows[0].weights = [...weights.rows];
    }
    //If there is a profile, send that profile with the activities attached
    res.json(profile.rows[0]);
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
    const profileItems = {};
    profileItems.user = req.user.id;
    if (weight) {
      profileItems.weight = weight;
      // profileItems.weightHistory.weight = weight;
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
    } else {
      profileItems.goalWeight = null;
    }
    if (goalDailyCalories) {
      profileItems.goalDailyCalories = goalDailyCalories;
    } else {
      profileItems.goalDailyCalories = 2000;
    }
    if (goalDays || goalDays === 0) {
      profileItems.goalDays = goalDays;
    } else {
      profileItems.goalDays = 4;
    }
    profileItems.caloriesConsumedToday = 0;
    profileItems.caloriesRemainingToday = profileItems.goalDailyCalories;

    const client = await pool.connect();
    //Once all fields are prepared, update and populate the data
    try {
      //Check if a user exists before creating a profile. If there's no user in database, don't allow profile to be created.
      // let user = await User.findOne({ _id: req.user.id });
      let user = await client.query('SELECT * FROM users WHERE id = $1', [
        req.user.id,
      ]);
      if (!user) {
        return res.json({
          msg: 'You must be a currently registered user to create a profile.',
        });
      }

      //Use findOne to find profile
      // let profile = await Profile.findOne({ user: req.user.id });
      //Make sure profile doesn't already exist for this user
      let profile = await client.query(
        'SELECT * FROM profiles WHERE user_id = $1',
        [req.user.id],
      );
      //If profile is found, give error and suggest user updates profile
      if (profile.rows.length > 0) {
        return res.json({
          msg:
            'A profile already exists for this user. Please select update stats from your dashboard to update your profile.',
        });
      }
      //If profile isn't found, create a new one
      if (profile.rows.length === 0) {
        await client.query('BEGIN');

        profile = await client.query(
          'INSERT INTO profiles (current_weight, height, bmi, goal_weight, goal_calories, goal_days, calories_consumed_today, calories_remaining_today, user_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *',
          [
            weight,
            height,
            profileItems.bmi,
            profileItems.goalWeight,
            profileItems.goalDailyCalories,
            profileItems.goalDays,
            profileItems.caloriesConsumedToday,
            profileItems.caloriesRemainingToday,
            req.user.id,
          ],
        );
        //add empty activities and weights array to profile
        profile.rows[0].activities = [];
        let firstWeight = await client.query(
          'INSERT INTO weights (weight, date, user_id) VALUES($1,$2,$3) RETURNING *',
          [weight, new Date(), req.user.id],
        );
        profile.rows[0].weights = firstWeight.rows;

        await client.query('COMMIT');
        // profile = await new Profile(profileItems);
        // await profile.save();
        res.json(profile.rows[0]);
      }
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
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

    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      //Use findOne to find profile
      // let profile = await Profile.findOne({ user: req.user.id });
      let profile = await client.query(
        'SELECT * FROM profiles WHERE user_id = $1',
        [req.user.id],
      );
      //If profile isn't found, give error (this shouldn't happen though because they should be required to create one when they sign up.)
      if (profile.rows.length === 0) {
        return res.json({
          msg: 'There is no profile available for this user.',
        });
      }

      //If there is a profile, update it based on data provided.
      await client.query('BEGIN');
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

      let newWeight;
      if (weight) {
        profileItems.weight = weight;
        newWeight = await client.query(
          'INSERT INTO weights (weight, date, user_id) VALUES($1,$2,$3) RETURNING *',
          [weight, new Date(), req.user.id],
        );
      } else {
        profileItems.weight = profile.rows[0].current_weight;
      }

      if (height) {
        profileItems.height = height;
      } else {
        profileItems.height = profile.rows[0].height;
      }
      if (goalWeight) {
        profileItems.goalWeight = goalWeight;
      } else {
        profileItems.goalWeight = profile.rows[0].goal_weight;
      }
      if (goalDays || goalDays === 0) {
        profileItems.goalDays = goalDays;
      } else {
        profileItems.goalDays = profile.rows[0].goal_days;
      }
      if (goalDailyCalories) {
        profileItems.goalDailyCalories = goalDailyCalories;
      } else {
        profileItems.goalDailyCalories = profile.rows[0].goal_calories;
      }
      if (caloriesConsumedToday || caloriesConsumedToday === 0) {
        profileItems.caloriesConsumedToday = caloriesConsumedToday;
      } else {
        profileItems.caloriesConsumedToday =
          profile.rows[0].calories_consumed_today;
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
        // profile = await Profile.findOneAndUpdate(
        //   { user: req.user.id },
        //   { $set: profileItems },
        //   { new: true },
        // );
        profile = await client.query(
          `UPDATE profiles SET current_weight = ${profileItems.weight}, height = ${profileItems.height}, bmi = ${profileItems.bmi}, goal_weight = ${profileItems.goalWeight}, goal_calories = ${profileItems.goalDailyCalories}, goal_days = ${profileItems.goalDays}, calories_consumed_today = ${profileItems.caloriesConsumedToday}, calories_remaining_today = ${profileItems.caloriesRemainingToday} WHERE user_id = ${req.user.id} RETURNING *`,
        );

        let weights = await client.query(
          'SELECT * FROM weights WHERE user_id = $1',
          [req.user.id],
        );

        let activities = await client.query(
          'SELECT * FROM activities WHERE user_id = $1',
          [req.user.id],
        );
        // if (weight) {
        //   profile.rows[0].weights = [...profile.rows[0].weights, newWeight.rows[0]];
        // }

        if (activities) {
          profile.rows[0].activities = [...activities.rows];
        } else {
          profile.rows[0].activities = [];
        }
        profile.rows[0].weights = [...weights.rows];
        //send back profile
        await client.query('COMMIT');
        return res.json(profile.rows[0]);
      }
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  },
);

//ROUTE: DELETE api/profile
//DESCRIPTION: Delete profile and user
//ACCESS LEVEL: Private
router.delete('/', verify, async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    //Find profile that corresponds to user id found in token and delete
    // await Profile.findOneAndRemove({ user: req.user.id });
    await client.query('DELETE FROM profiles WHERE user_id = $1', [
      req.user.id,
    ]);

    await client.query('DELETE FROM login WHERE user_id = $1', [req.user.id]);
    await client.query('DELETE FROM weights WHERE user_id = $1', [req.user.id]);
    await client.query('DELETE FROM activities WHERE user_id = $1', [
      req.user.id,
    ]);
    //Find user that corresponds to user id found in token and delete
    // await User.findOneAndRemove({ _id: req.user.id });
    await client.query('DELETE FROM users WHERE id = $1', [req.user.id]);

    await client.query('COMMIT');
    return res.json({
      msg: 'This user and corresponding profile has been deleted.',
    });
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
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
      // const profile = await Profile.findOne({ user: req.user.id });
      let profile = await pool.query(
        'SELECT * FROM profiles WHERE user_id = $1',
        [req.user.id],
      );

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
        ((mets[category] * 3.5 * (profile.rows[0].current_weight / 2.2046)) /
          200) *
          newActivity.duration,
      );

      //Add into activities array for profile.
      // profile.activities.unshift(newActivity);
      let activity = await pool.query(
        'INSERT INTO activities (date, duration, category, calories, user_id) VALUES($1,$2,$3,$4,$5) RETURNING *',
        [
          new Date(),
          newActivity.duration,
          newActivity.category,
          newActivity.calories,
          req.user.id,
        ],
      );

      let weights = await pool.query(
        'SELECT * FROM weights WHERE user_id = $1',
        [req.user.id],
      );
      let activities = await pool.query(
        'SELECT * FROM activities WHERE user_id = $1',
        [req.user.id],
      );
      profile.rows[0].activities = [...activities.rows];
      profile.rows[0].weights = weights.rows;

      //send profile to front end

      res.json(profile.rows[0]);
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
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // //delete activity based on activity id
    await client.query('DELETE FROM activities WHERE id = $1', [req.params.activity_id]);

    //return profile, activities, and weights for user
    let profile = await client.query(
      'SELECT * FROM profiles INNER JOIN users ON profiles.user_id = users.id WHERE profiles.user_id = $1',
      [req.user.id],
    );
    
    let activities = await client.query(
      'SELECT * FROM activities WHERE activities.user_id = $1',
      [req.user.id],
    );
    let weights = await client.query(
      'SELECT * FROM weights WHERE weights.user_id = $1',
      [req.user.id],
    );
    //If there is no profile, return an error
    if (profile.rows.length === 0) {
      return res
        .status(400)
        .json({ msg: 'There is no profile available for this user.' });
    }
    if (activities.rows.length > 0) {
      profile.rows[0].activities = [...activities.rows];
    } else {
      profile.rows[0].activities = [];
    }
    if (weights.rows.length > 0) {
      profile.rows[0].weights = [...weights.rows];
    }
    await client.query('COMMIT');
    //If there is a profile, send that profile with the activities attached
    res.json(profile.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
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
  };

  profileItems.bmi = (
      (profileItems.weight / (profileItems.height * profileItems.height)) *
      703
    ).toFixed(1);

  const client = await pool.connect();
  //Once all fields are prepared, update and populate the data
  try {
    //Check if a user exists before creating a profile. If there's no user in database, don't allow profile to be created.
    let user = await client.query('SELECT * FROM users WHERE id = $1', [
      req.user.id,
    ]);
    if (!user) {
      return res.json({
        msg: 'You must be a currently registered user to create a profile.',
      });
    }

    //Use findOne to find profile
    let profile = await client.query(
      'SELECT * FROM profiles WHERE user_id = $1',
      [req.user.id],
    );
    //If profile is found, give error and suggest user updates profile
    if (profile.rows.length > 0) {
      return res.json({
        msg:
          'A profile already exists for this user. Please select update stats from your dashboard to update your profile.',
      });
    }
    //If profile isn't found, create a new one
    if (profile.rows.length === 0) {
      await client.query('BEGIN');

      profile = await client.query(
        'INSERT INTO profiles (current_weight, height, bmi, goal_weight, goal_calories, goal_days, calories_consumed_today, calories_remaining_today, user_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *',
        [
          profileItems.weight,
          profileItems.height,
          profileItems.bmi,
          profileItems.goalWeight,
          profileItems.goalDailyCalories,
          profileItems.goalDays,
          profileItems.caloriesConsumedToday,
          profileItems.caloriesRemainingToday,
          req.user.id,
        ],
      );
      //add activities array to profile (seed demo activities)
      const newActivities = [
        {
          duration: 60,
          category: 'Yoga',
          calories: Math.round(
            ((2.5 * 3.5 * (profileItems.weight / 2.2046)) / 200) * 60,
          ),
          date: '03 June 2020',
          user_id: req.user.id,
        },
        {
          duration: 80,
          category: 'Swimming',
          calories: Math.round(
            ((8 * 3.5 * (profileItems.weight / 2.2046)) / 200) * 80,
          ),
          date: '27 May 2020',
          user_id: req.user.id,
        },
        {
          duration: 35,
          category: 'Running - Slow',
          calories: Math.round(
            ((8 * 3.5 * (profileItems.weight / 2.2046)) / 200) * 35,
          ),
          date: '20 May 2020',
          user_id: req.user.id,
        },
        {
          duration: 76,
          category: 'Hiking',
          calories: Math.round(
            ((7 * 3.5 * (profileItems.weight / 2.2046)) / 200) * 76,
          ),
          date: '12 May 2020',
          user_id: req.user.id,
        },
        {
          duration: 42,
          category: 'Hiking',
          calories: Math.round(
            ((7 * 3.5 * (profileItems.weight / 2.2046)) / 200) * 42,
          ),
          date: '09 May 2020',
          user_id: req.user.id,
        },
        {
          duration: 60,
          category: 'Basketball',
          calories: Math.round(
            ((6.5 * 3.5 * (profileItems.weight / 2.2046)) / 200) * 60,
          ),
          date: '01 May 2020',
          user_id: req.user.id,
        },
      ]

      //Insert above activities into activities table
      await client.query('INSERT INTO activities (date, duration, category, calories, user_id) VALUES ($1,$2,$3,$4,$5)',
        [
          newActivities[0].date,
          newActivities[0].duration,
          newActivities[0].category,
          newActivities[0].calories,
          req.user.id,
        ],);
        await client.query('INSERT INTO activities (date, duration, category, calories, user_id) VALUES ($1,$2,$3,$4,$5)',
        [
          newActivities[1].date,
          newActivities[1].duration,
          newActivities[1].category,
          newActivities[1].calories,
          req.user.id,
        ],);
        await client.query('INSERT INTO activities (date, duration, category, calories, user_id) VALUES ($1,$2,$3,$4,$5)',
        [
          newActivities[2].date,
          newActivities[2].duration,
          newActivities[2].category,
          newActivities[2].calories,
          req.user.id,
        ],);
        await client.query('INSERT INTO activities (date, duration, category, calories, user_id) VALUES ($1,$2,$3,$4,$5)',
        [
          newActivities[3].date,
          newActivities[3].duration,
          newActivities[3].category,
          newActivities[3].calories,
          req.user.id,
        ],);
        await client.query('INSERT INTO activities (date, duration, category, calories, user_id) VALUES ($1,$2,$3,$4,$5)',
        [
          newActivities[4].date,
          newActivities[4].duration,
          newActivities[4].category,
          newActivities[4].calories,
          req.user.id,
        ],);
        await client.query('INSERT INTO activities (date, duration, category, calories, user_id) VALUES ($1,$2,$3,$4,$5)',
        [
          newActivities[5].date,
          newActivities[5].duration,
          newActivities[5].category,
          newActivities[5].calories,
          req.user.id,
        ],);

      // await client.query(`INSERT INTO activities (date, duration, category, calories, user_id) VALUES (to_timestamp(${newActivities[0].date}, 'DD Mon YYYY'), ${newActivities[0].duration}, ${newActivities[0].category}, ${newActivities[0].calories}, ${req.user.id}) RETURNING *`);

      const weightOne = {
        weight: 235,
        date: '12 March 2020',
        user_id: req.user.id,
      };
      const weightTwo = {
        weight: 227,
        date: '12 April 2020',
        user_id: req.user.id,
      };
      const weightThree = {
        weight: 230,
        date: '1 May 2020',
        user_id: req.user.id,
      };
      const weightFour = {
        weight: 221,
        date: '25 May 2020',
        user_id: req.user.id,
      };
      const weightFive = {
        weight: 220,
        date: '27 May 2020',
        user_id: req.user.id,
      };
      const weightSix = {
        weight: 225,
        date: '3 June 2020',
        user_id: req.user.id,
      };

      //insert weights into demo user profile
      await client.query(`INSERT INTO weights (weight, date, user_id) VALUES ($1,$2,$3)`,[
        weightOne.weight,
        weightOne.date,
        req.user.id,
      ],);
      await client.query(`INSERT INTO weights (weight, date, user_id) VALUES ($1,$2,$3)`,[
        weightTwo.weight,
        weightTwo.date,
        req.user.id,
      ],);
      await client.query(`INSERT INTO weights (weight, date, user_id) VALUES ($1,$2,$3)`,[
        weightThree.weight,
        weightThree.date,
        req.user.id,
      ],);
      await client.query(`INSERT INTO weights (weight, date, user_id) VALUES ($1,$2,$3)`,[
        weightFour.weight,
        weightFour.date,
        req.user.id,
      ],);
      await client.query(`INSERT INTO weights (weight, date, user_id) VALUES ($1,$2,$3)`,[
        weightFive.weight,
        weightFive.date,
        req.user.id,
      ],);
      await client.query(`INSERT INTO weights (weight, date, user_id) VALUES ($1,$2,$3)`,[
        weightSix.weight,
        weightSix.date,
        req.user.id,
      ],);

      //query to get all weights (just needed for current load)
      let weights = await pool.query(
        'SELECT * FROM weights WHERE user_id = $1',
        [req.user.id],
      );
      //query to get all activities (just needed for current load)
      let activities = await pool.query(
        'SELECT * FROM activities WHERE user_id = $1',
        [req.user.id],
      );

      //add to profile object so available within state for load
      profile.rows[0].activities = [...activities.rows];
      profile.rows[0].weights = weights.rows;

      await client.query('COMMIT');
      //send back profile with activities and weights included
      res.json(profile.rows[0]);
    }
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
});
