import React, { useState } from 'react';
import axios from 'axios';

const UpdateStats = (props) => {
  const [formData, updateFormData] = useState({
    weight: '',
    height: '',
  });

  const { weight, height } = formData;

  //Update state on input change using updateFormData
  const onChangeHandler = (e) => {
    updateFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    //Creat variable for user data based on formData
    const stats = {
      weight: weight,
      height: height,
    };

    try {
      //Stringify this for the body
      const body = JSON.stringify(stats);

      //Create config with headers. Get token from localStorage and put in req header.
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.token
        }
      }

      //Make PUT request to api/profile
      await axios.put('api/profile', body, config);

    } catch (err) {
      console.error(err);
    }
  };

  console.log(props);
  return (
    <div className='main-content'>
      <div className='form-page-container'>
        <h1 className='title-white-bold'>Update Your Stats</h1>
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

export default UpdateStats;
