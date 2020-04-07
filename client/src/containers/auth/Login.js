import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const Login = () => {
  return (
    <Fragment>
      <div className='body-grow'>
        <Navbar />
        <div className='main-content'>
      <div class="form-page-container">
        <h1 class="title-white-bold">
          Achieve Your <span class="title-orange">GOALS.</span>
        </h1>
        <form class="form" action="">
          <div class="form-container">
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" name="email" placeholder="" required />
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" name="password" placeholder="" required />
            </div>
          </div>
          <input type="submit" value="Login" class="button form-button" />
        </form>
      </div>
      <div class="no-account">
        <p>Don't have an account?</p>
        <Link to='/register'>
              Sign Up
            </Link>
      </div>
        </div>
        <Footer />
      </div>
    </Fragment>
  );
};

export default Login;
