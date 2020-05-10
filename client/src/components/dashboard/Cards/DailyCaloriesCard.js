import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile } from '../../../actions/profile';

const DailyCaloriesCard = ({ updateProfile, history, profile }) => {
  //Input change for input element in DailyCaloriesCard.
  //Need to figure out how to only allow positive numbers
  let addedCalories;

  const inputChangeHandler = (e) => {
    addedCalories = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
  };

  //If reset button is clicked, send 0 for calories consumed today and reset calories remaining today
  const resetCalories = {
    caloriesConsumedToday: 0,
  };

  //If add calories button is clicked, add those calories to the daily calories
  const updateCalories = {
    caloriesConsumedToday: profile.caloriesConsumedToday + addedCalories
  };

  return (
    <div className='card'>
      <h2 className='card-title'>Daily Calories Tracker</h2>
      <div className='card-stats'>
        <div className='card-item'>
          <p className='card-label'>Calories Consumed:</p>
          <p className='card-value'>{profile.caloriesConsumedToday}</p>
        </div>
        <div className='card-item'>
          <p className='card-label'>Calories Remaining:</p>
          <p className='card-value'>{profile.caloriesRemainingToday}</p>
        </div>
      </div>
      <div className='card-item calories-input'>
        <input
          className='card-input'
          type='number'
          name='addedCalories'
          value={addedCalories}
          onChange={(e) => inputChangeHandler(e)}
        ></input>
        <button
          className='card-button'
          onClick={() => updateProfile(updateCalories, history)}
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
