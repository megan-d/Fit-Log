import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile } from '../../../actions/profile';

const DailyCaloriesCard = ({ updateProfile, history, profile }) => {
  //Input change for input element in DailyCaloriesCard.
  //Need to figure out how to only allow positive numbers
  const [calorieData, updateCalorieData] = useState({
    addedCalories: 0,
  });

  const { addedCalories } = calorieData;

  const onInputChange = (e) => {
    updateCalorieData({...calorieData, [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value }  )
  };

  //Clear the addCalories input (will be run when Add Calories button is clicked)
  const clearInputHandler = () => {
    updateCalorieData({ ...calorieData, addedCalories: 0 });
  };

  //If reset button is clicked, send 0 for calories consumed today and reset calories remaining today
  const resetCalories = {
    caloriesConsumedToday: 0,
  };

  //If add calories button is clicked, add those calories to the daily calories
  const addCalories = {
    caloriesConsumedToday: profile.calories_consumed_today + addedCalories,
  };

  

  return (
    <div className='card'>
      <h2 className='card-title'>Daily Calories Tracker</h2>
      <div className='card-stats'>
        <div className='card-item'>
          <p className='card-label'>Calories Consumed:</p>
          <p className='card-value'>{profile.calories_consumed_today}</p>
        </div>
        <div className='card-item'>
          <p className='card-label'>Calories Remaining:</p>
          <p className='card-value'>{profile.calories_remaining_today}</p>
        </div>
      </div>
      <div className='card-item calories-input'>
        <input
          className='card-input'
          type='number'
          min='0'
          name='addedCalories'
          value={addedCalories}
          onChange={onInputChange}
        ></input>
        <button
          className='card-button'
          onClick={() => {
            updateProfile(addCalories, history);
            clearInputHandler();
          }}
        >
          Add Calories
        </button>
        <button
          className='card-button reset-button'
          onClick={() => updateProfile(resetCalories, history)}
        >
          Reset Calories
        </button>
      </div>
    </div>
  );
};

DailyCaloriesCard.propTypes = {
  profile: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

export default connect(null, { updateProfile })(DailyCaloriesCard);
