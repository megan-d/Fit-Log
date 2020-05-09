import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Cards from '../../components/Cards/Cards';
import Charts from '../../components/charts/Charts';
import Spinner from '../../components/Spinner';
import { connect } from 'react-redux';
import { getCurrentUserProfile } from '../../actions/profile';

const DashboardContainer = ({ getCurrentUserProfile, auth, profile }) => {
  //Load the user profile - display spinner while loading. Fetch the data from the database through action/reducer. Once profile is loaded, display profile in dashboard.
  useEffect(() => {
    getCurrentUserProfile();
  }, [getCurrentUserProfile]);

  return profile.loading && profile.profile === null ? (
    <div className='main-content'>
      <div className='dashboard-container'>
        <h1 className='title-white-bold'>Your Dashboard</h1>
        <Spinner />
      </div>
    </div>
  ) : (
    <Fragment>
      <div className='main-content'>
        <div className='dashboard-container'>
          <h1 className='title-white-bold'>Your Dashboard</h1>
          {profile.profile !== null ? (
            <Fragment>
              <Cards profile={profile.profile} />
              <Charts />
            </Fragment>
          ) : (
            <Fragment>
              <p>
                You do not have a profile set up. Please add this information to
                view your dashboard.
                <Link to='/createprofile'>Create Profile</Link>
              </p>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

DashboardContainer.propTypes = {
  getCurrentUserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentUserProfile })(
  DashboardContainer,
);
