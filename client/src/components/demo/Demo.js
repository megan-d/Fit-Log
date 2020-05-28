import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import DashboardContainer from '../dashboard/DashboardContainer';
import Spinner from '../layout/Spinner';
import { createDemoProfile } from '../../actions/profile';
import { register } from '../../actions/auth';

const Demo = ({ register, profile, createDemoProfile }) => {
  //When this component loads (when user clicks view demo link), register a new demo user, set up the demo user's profile, and update the profile so there is information for the charts.

  //Register demo user using register action
  let id = uuidv4();
  const demoUser = {
    name: 'Steven',
    email: `${id}@demo.com`,
    password: '123456789',
  };

  // const registerDemoUser = async () => {
  //   await register(demoUser);
  // };

  // const makeDemoProfile = async () => {
  //   await createDemoProfile();
  // };

  const populateDemo = async () => {
    await register(demoUser);
    await createDemoProfile();
  };

  //On component load, run an async function that awaits the above functions.
  useEffect(() => {
    populateDemo();
  }, []);

  return profile.profile === null ? (
    <div className='main-content'>
      <div className='dashboard-container'>
        <Spinner />
      </div>
    </div>
  ) : (
    <DashboardContainer />
  );
};

Demo.propTypes = {
  register: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  createDemoProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { register, createDemoProfile })(Demo);
