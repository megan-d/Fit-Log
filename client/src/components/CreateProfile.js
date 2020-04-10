import React from 'react';

const CreateProfile = () => {
  return (
    <div className='main-content'>
      <div className='form-page-container'>
        <h1 className='title-white'>Create Your Fitness Profile</h1>
        <form className='form contact-form' action=''>
          <div className='form-container'>
            <div className='form-group'>
              <label>
                What is your current weight in pounds?
                <input type='number' name='weight' placeholder='' required />
              </label>
            </div>
            <div className='form-group'>
              <label>
                What is your height in inches?
                <input type='number' name='height' placeholder='' required />
              </label>
            </div>
            <div className='form-group'>
              <label>
                What is your goal weight in pounds?
                <input
                  type='number'
                  name='goal-weight'
                  placeholder=''
                  required
                />
              </label>
            </div>
            <div className='form-group'>
              <label>
                What is your daily calorie goal? If unsure, 2000 is a starting
                point.
                <input type='number' name='calories' placeholder='' required />
              </label>
            </div>
            <div className='form-group'>
              <label>
                How many days per week is your exercise goal?
                <input type='number' name='days' placeholder='' required />
              </label>
            </div>
          </div>
          <input type='submit' value='Submit' className='button form-button' />
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
