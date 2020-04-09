import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
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
                    <input type='text' name='name' placeholder='' required />
                  </label>
                </div>
                <div className='form-group'>
                  <label>
                    Email:
                    <input type='email' name='email' placeholder='' required />
                  </label>
                </div>
                <div className='form-group'>
                  <label>
                    Password:
                    <input
                      type='password'
                      name='password'
                      placeholder=''
                      required
                    />
                  </label>
                </div>
                <div className='form-group'>
                  <label>
                    Confirm Password:
                    <input
                      type='password'
                      name='confirm'
                      placeholder=''
                      required
                    />
                  </label>
                </div>
              </div>
              <input
                type='submit'
                value='Sign Up'
                className='button form-button'
              />
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
