import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, updateFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  //Pull out variables from formData
  const { name, email, password, confirmPassword } = formData;

  //Function to update state on change and put into updateFormData variable
  const onChange = (e) =>
    updateFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className='main-content'>
      <div className='main-section-signup'>
        <h1 className='title-white-bold'>
          Get <span className='title-orange'>FIT</span> with us.
        </h1>

        <form className='form-right' action=''>
          <div className='form-container-signup'>
            <div className='form-group'>
              <label>
                Name:
                <input
                  type='text'
                  name='name'
                  placeholder=''
                  value={name}
                  onChange={(e) => onChange(e)}
                  required
                />
              </label>
            </div>
            <div className='form-group'>
              <label>
                Email:
                <input
                  type='email'
                  name='email'
                  placeholder=''
                  value={email}
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
                  value={password}
                  onChange={(e) => onChange(e)}
                  required
                />
              </label>
            </div>
            <div className='form-group'>
              <label>
                Confirm Password:
                <input
                  type='password'
                  name='confirmPassword'
                  placeholder=''
                  value={confirmPassword}
                  onChange={(e) => onChange(e)}
                  required
                />
              </label>
            </div>
          </div>
          <input type='submit' value='Sign Up' className='button form-button' />
        </form>
      </div>

      <div className='have-account'>
        <p>Already have an account?</p>
        <Link to='/login'>Log In</Link>
      </div>
    </div>
  );
};

export default Register;
