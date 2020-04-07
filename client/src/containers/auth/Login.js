import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const Login = () => {
  return (
        <div className='main-content'>
          <div className='form-page-container'>
            <h1 className='title-white-bold'>
              Achieve Your <span className='title-orange'>GOALS.</span>
            </h1>
            <form className='form' action=''>
              <div className='form-container'>
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
              </div>
              <input
                type='submit'
                value='Login'
                className='button form-button'
              />
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
