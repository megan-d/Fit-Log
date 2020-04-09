const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  goalWeight: {
    //Will need to address scenario where it's not provided (NA?)
    type: Number,
  },
  goalDays: {
    //Will need to address scenario where it's not provided (NA?)
    type: Number,
  },
  goalDailyCalories: {
    //Will need to address scenario where it's not provided (NA?)
    type: Number,
  },
  caloriesConsumedToday: {
    //This will need to reset every day
    type: Number,
  },
  activities: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      duration: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      calories: {
        type: Number,
      },
      comments: {
        type: String,
      },
    },
  ],
  goals: [
    {
      goalWeight: {
        type: Number,
      },
      days: {
        type: Number,
        default: 4,
      },
      calories: {
        type: Number,
        default: 2000,
      },
    },
  ],
});

module.exports = Profile = mongoose.model('Profile', profileSchema);
