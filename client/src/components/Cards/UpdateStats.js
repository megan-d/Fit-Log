import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile } from '../../actions/profile';

const UpdateStats = ({ updateProfile, history }) => {
  const [formData, updateFormData] = useState({
    weight: '',
    height: '',
  });

  const { weight, height } = formData;

  //Update state on input change using updateFormData
  const onChangeHandler = (e) => {
    updateFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Creat variable for user data based on formData
  const updates = {
    weight: weight,
    height: height,
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //execute updateProfile action, which takes in the updates and history
    updateProfile(updates, history);
  };

  return (
    <div className='main-content'>
      <div className='form-page-container'>
        <h1 className='title-white-bold'>Update Your Stats</h1>
        <form className='form contact-form' action='' onSubmit={onSubmit}>
          <div className='form-container'>
            <div className='form-group'>
              <label>
                What is your current weight in pounds?
                <input
                  type='number'
                  name='weight'
                  value={weight}
                  onChange={(e) => onChangeHandler(e)}
                />
              </label>
            </div>
            <div className='form-group'>
              <label>
                What is your height in inches?
                <input
                  type='number'
                  name='height'
                  value={height}
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

UpdateStats.propTypes = {
  updateProfile: PropTypes.func.isRequired,
}

export default connect(null, { updateProfile })(UpdateStats);
