import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = (props) => {
  const [formData, updateFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  //Pull out variables from formData
  const { name, email, password, confirmPassword } = formData;

  //Function to update state on change using updateFormData
  const onChange = (e) =>
    updateFormData({ ...formData, [e.target.name]: e.target.value });

  //Function to send data that's in formData to database endpoint when submit is clicked
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      //Use Redux alert
      setAlert('Passwords do not match', 'warning');
    } else {
      const user = {
        name: name,
        email: email,
        password: password,
      };
      props.register(user);
    }
  };

  if (props.isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

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
          <input type='submit' value='Sign Up' className='button login-form-button' />
        </form>
      </div>

      <div className='have-account'>
        <p>Already have an account?</p>
        <Link to='/login'>Log In</Link>
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

//Connect takes in two things: state the component needs from the store (what you want to map), and an object with any actions you want to use. Allows us to access props.setAlert.
export default connect(mapStateToProps, { setAlert, register })(Register);
