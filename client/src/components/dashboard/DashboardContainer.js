import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Cards from './Cards/Cards';
import Charts from './charts/Charts';
import Activities from './activities/Activities';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getCurrentUserProfile } from '../../actions/profile';

const DashboardContainer = ({ getCurrentUserProfile, profile }) => {
  //Load the user profile - display spinner while loading. Fetch the data from the database through action/reducer. Once profile is loaded, display profile in dashboard.
  
  useEffect(() => {
    getCurrentUserProfile();
  }, [getCurrentUserProfile]);

  return profile.isLoading && profile.profile === null ? (
    <div className='main-content'>
      <div className='dashboard-container'>
        <h1 className='title-white-bold'>Dashboard</h1>
        <Spinner />
      </div>
    </div>
  ) : (
    <Fragment>
      <div className='main-content'>
        <div className='dashboard-container'>
          <h1 className='title-white-bold'>Dashboard</h1>
          {profile.profile !== null && !profile.isLoading ? (
            <Fragment>
              <Cards profile={profile.profile} />
              <Charts />
              <Activities activities={profile.profile.activities}/>
              <button className='delete-button'>Delete Profile and Account</button>
            </Fragment>
          ) : (
            <Fragment>
              <p>
                You do not have a profile set up yet. Please add this information to
                view your dashboard.
              </p>
              <Link to='/createprofile'>Create Profile</Link>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

DashboardContainer.propTypes = {
  getCurrentUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentUserProfile })(
  DashboardContainer,
);
