import React from 'react';

const UpdateGoals = () => {
  return (
    <div className='main-content'>
      <div className='form-page-container'>
        <h1 className='title-white-bold'>Update Your Goals</h1>
        <form className='form contact-form' action=''>
          <div className='form-container'>
            <div className='form-group'>
              <label>
                What is your goal weight in pounds?
                <input
                  type='number'
                  name='goal-weight'
                  placeholder='150'
                  value=''
                />
              </label>
            </div>
            <div className='form-group'>
              <label>
                What is your daily calorie goal? If unsure, 2000 is a starting point.
                <input
                  type='number'
                  name='goal-calories'
                  placeholder='2000'
                  value=''
                />
              </label>
            </div>
            <div className='form-group'>
              <label>
                How many days per week is your exercise goal (0-7)?
                <input
                  type='number'
                  name='goal-days'
                  placeholder='4'
                  value=''
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

export default UpdateGoals;
