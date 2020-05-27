import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import DemoDashboardContainer from './DemoDashboardContainer';
import Spinner from '../layout/Spinner';
import { createDemoProfile, updateDemoProfile } from '../../actions/profile';
import { registerDemoUser, loadDemoUser } from '../../actions/auth';

const Demo = ({
  registerDemoUser,
  loadDemoUser,
  profile,
  createDemoProfile,
  updateDemoProfile,
}) => {
  //When this component loads (when user clicks view demo link), register a new demo user, set up the demo user's profile, and update the profile so there is information for the charts.

  //Register demo user using register action
  let id = uuidv4();
  const demoUser = {
    name: 'Steven',
    email: `${id}@demo.com`,
    password: '123456789',
  };

  const register = async () => {
    await registerDemoUser(demoUser);
  };

  //Create demo profile using createDemoProfile action
  const demoProfile = {
    weight: 220,
    height: 70,
    goalWeight: 200,
    goalDailyCalories: 2000,
    goalDays: 4,
  };

  const makeDemoProfile = async () => {
    await createDemoProfile(demoProfile);
  };

  //On component load, run an async function that awaits all of the above functions.
  useEffect(() => {
    const populateDemo = async () => {
      await register();
      await makeDemoProfile();
    };
    populateDemo();
  }, []);

  return profile.isLoading && profile.profile === null ? (
    <div className='main-content'>
      <div className='dashboard-container'>
        <Spinner />
      </div>
    </div>
  ) : (
    <DemoDashboardContainer />
  );
};

Demo.propTypes = {
  registerDemoUser: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  createDemoProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  registerDemoUser,
  createDemoProfile,
  updateDemoProfile,
})(Demo);
