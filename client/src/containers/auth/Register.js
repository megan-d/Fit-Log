import React, { useState } from 'react';
import axios from 'axios';
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

  //Function to send data that's in formData to database endpoint when submit is clicked
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
    } else {
      const user = {
        name: name,
        email: email,
        password: password,
      };

      try {
        //Create config with headers
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        //Create body and stringify user object
        const body = JSON.stringify(user);

        //Axios will return promise with response in route to add new user (should return a token)
        const res = await axios.post('/api/users', body, config);
        
        //Set the token
        const token = 
      } catch (err) {
        console.error(err.response.data);
      }
    }
  };

  return (
    <div className='main-content'>
      <div className='main-section-signup'>
        <h1 className='title-white-bold'>
          Get <span className='title-orange'>FIT</span> with us.
        </h1>

        <form className='form-right' action='' onSubmit={(e) => onSubmit(e)}>
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
