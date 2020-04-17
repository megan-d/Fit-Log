import React from 'react';

const UpdateStats = () => {
  return (
    <div className='main-content'>
      <div className='form-page-container'>
        <h1 className='title-white'>Update Stats</h1>
        <form className='form contact-form' action=''>
          <div className='form-container'>
            <div className='form-group'>
              <label>
                What is your current weight in pounds?
                <input
                  type='number'
                  name='weight'
                  placeholder='150'
                  value='100'
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
                  placeholder='65'
                  value='60'
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

export default UpdateStats;
