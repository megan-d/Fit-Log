import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile } from '../../../actions/profile';

const UpdateGoals = ({ updateProfile, history }) => {
  const [formData, updateFormData] = useState({
    goalWeight: '',
    goalDailyCalories: '',
    goalDays: '',
  });

  //Create variables for formData
  const { goalWeight, goalDailyCalories, goalDays } = formData;

  //Create onChange handler to update the state upon input change
  const onChangeHandler = (e) => {
    updateFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    //Pull out the formData into variable to send as payload
    const updates = {
      goalWeight: goalWeight,
      goalDailyCalories: goalDailyCalories,
      goalDays: goalDays,
    };
    updateProfile(updates, history);
  }

  //Could change placeholder to display what's currently in database for this user
  return (
    <div className='main-content'>
      <div className='form-page-container'>
        <h1 className='title-white-bold'>Update Your Goals</h1>
        <form
          className='form contact-form'
          action=''
          onSubmit={(e) => onSubmit(e)}
        >
          <div className='form-container'>
            <div className='form-group'>
              <label>
                What is your goal weight in pounds?
                <input
                  type='number'
                  name='goalWeight'
                  value={goalWeight}
                  onChange={(e) => onChangeHandler(e)}
                />
              </label>
            </div>
            <div className='form-group'>
              <label>
                What is your daily calorie goal? If unsure, 2000 is a starting
                point.
                <input
                  type='number'
                  name='goalDailyCalories'
                  value={goalDailyCalories}
                  onChange={(e) => onChangeHandler(e)}
                />
              </label>
            </div>
            <div className='form-group'>
              <label>
                How many days per week is your exercise goal (0-7)?
                <input
                  type='number'
                  name='goalDays'
                  value={goalDays}
                  onChange={(e) => onChangeHandler(e)}
                />
              </label>
            </div>
          </div>
          <input
            type='submit'
            value='Submit'
            className='button form-button button-column'
          />
        </form>
      </div>
    </div>
  );
};

UpdateGoals.propTypes = {
  updateProfile: PropTypes.func.isRequired,
}

export default connect(null, { updateProfile })(UpdateGoals);
