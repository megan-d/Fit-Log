import React, { useState } from 'react';
import axios from 'axios';

const CreateProfile = () => {
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
    try {
      //Create config with headers. Shouldn't have to send token in header because set as global header when token was granted for registration (not yet working for login).
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.token
        },
      }

      //Create body variable and stringify
      const body = JSON.stringify(profile);

      //Make post request to api/profile. Don't need to provide authorization header (x-access-token) because set as global header with axios
      await axios.post('api/profile', body, config);

    } catch (err) {
      console.error(err.response.data);
  }
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
                  onChange={(e) => onChange(e)}
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
                  onChange={(e) => onChange(e)}
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
                  onChange={(e) => onChange(e)}
                  required
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
                  onChange={(e) => onChange(e)}
                  required
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
                  onChange={(e) => onChange(e)}
                  required
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

export default CreateProfile;
