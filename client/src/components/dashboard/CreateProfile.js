import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, updateFormData] = useState({
    weight: '',
    height: '',
    goalWeight: '',
    goalDailyCalories: '',
    goalDays: '',
  });

  //Pull out variables from formData
  const { weight, height, goalWeight, goalDailyCalories, goalDays } = formData;

  //Function to update state on change using updateFormData
  const onChange = (e) => {
    updateFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Function to send data that's in formData to the database as new profile
  const onSubmit = async (e) => {
    e.preventDefault();
    //Set the object to send
    const profile = {
      weight: weight,
      height: height,
      goalWeight: goalWeight,
      goalDailyCalories: goalDailyCalories,
      goalDays: goalDays,
    };
    createProfile(profile, history);
};

  return (
    <div className='main-content'>
      <div className='form-page-container'>
        <h1 className='title-white-bold'>Create Your Fitness Profile</h1>
        <form
          className='form contact-form'
          action=''
          onSubmit={(e) => onSubmit(e)}
        >
          <div className='form-container'>
            <div className='form-group'>
              <label>
                What is your current weight in pounds?
                <input
                  type='number'
                  name='weight'
                  placeholder=''
                  value={weight}
                  onChange={onChange}
                  required
                />
              </label>
            </div>
            <div className='form-group'>
              <label>
                What is your height in inches?
                <input
                  type='number'
                  name='height'
                  placeholder=''
                  value={height}
                  onChange={onChange}
                  required
                />
              </label>
            </div>
            <div className='form-group'>
              <label>
                What is your goal weight in pounds?
                <input
                  type='number'
                  name='goalWeight'
                  placeholder=''
                  value={goalWeight}
                  onChange={onChange}
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
                  placeholder=''
                  value={goalDailyCalories}
                  onChange={onChange}
                />
              </label>
            </div>
            <div className='form-group'>
              <label>
                How many days per week is your exercise goal (0-7)?
                <input
                  type='number'
                  name='goalDays'
                  placeholder=''
                  value={goalDays}
                  onChange={onChange}
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

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
}

export default connect(null, { createProfile })(CreateProfile);
