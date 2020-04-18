import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, updateFormData] = useState({
    email: '',
    password: '',
  });

  //Pull out variables from formData
  const { email, password } = formData;

  //Function to update state on change and put into updateFormData variable
  const onChange = (e) =>
    updateFormData({ ...formData, [e.target.name]: e.target.value });

  //Function to send data that's in formData to database endpoint when submit is clicked
  const onSubmit = async (e) => {
    e.preventDefault();
      console.log('Success');
    } 

  return (
    <div className='main-content'>
      <div className='form-page-container'>
        <h1 className='title-white-bold'>
          Achieve Your <span className='title-orange'>GOALS.</span>
        </h1>
        <form className='form' action='' onSubmit={(e) => onSubmit(e)}>
          <div className='form-container'>
            <div className='form-group'>
              <label>
                Email:
                <input
                  type='email'
                  name='email'
                  placeholder=''
                  onChange={(e) => onChange(e)}
                  required
                />
              </label>
            </div>
            <div className='form-group'>
              <label>
                Password:
                <input
                  type='password'
                  name='password'
                  placeholder=''
                  onChange={(e) => onChange(e)}
                  required
                />
              </label>
            </div>
          </div>
          <input type='submit' value='Login' className='button form-button' />
        </form>
      </div>
      <div className='no-account'>
        <p>Don't have an account?</p>
        <Link to='/register'>Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
