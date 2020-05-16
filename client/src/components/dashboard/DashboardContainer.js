import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Cards from './Cards/Cards';
import Charts from './charts/Charts';
import Activities from './activities/Activities';
import Spinner from '../layout/Spinner';
import Modal from '../../components/layout/Modal';
import { connect } from 'react-redux';
import { getCurrentUserProfile, deleteUser } from '../../actions/profile';

const DashboardContainer = ({
  getCurrentUserProfile,
  profile,
  deleteUser,
  auth,
}) => {
  //Load the user profile - display spinner while loading. Fetch the data from the database through action/reducer. Once profile is loaded, display profile in dashboard.

  useEffect(() => {
    getCurrentUserProfile();
  }, [getCurrentUserProfile]);

  return profile.isLoading && profile.profile === null ? (
    <div className='main-content'>
      <div className='dashboard-container'>
        <Spinner />
      </div>
    </div>
  ) : (
    <Fragment>
      <div className='main-content'>
        <div className='dashboard-container'>
          {profile.profile !== null && !profile.isLoading ? (
            <Fragment>
              <h1 className='title-white-bold'>
                Welcome to your dashboard, {auth.user.name}
              </h1>

              <Cards profile={profile.profile} />
              <Charts />
              <Activities activities={profile.profile.activities} />
              <button
                className='delete-user-button'
                onClick={() => deleteUser()}
              >
                Delete Profile and Account
              </button>
              <Modal>
                <p>
                  This action cannot be undone. Are you sure you want to delete
                  your profile and account?
                </p>
                <div className='modal-buttons'>
                  <button className='cancel-user-button'>Cancel</button>
                  <button
                    className='confirm-delete-user-button'
                    onClick={() => deleteUser()}
                  >
                    Yes
                  </button>
                </div>
              </Modal>
            </Fragment>
          ) : (
            <Fragment>
              <p>
                You do not have a profile set up yet. Please add this
                information to view your dashboard.
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
  deleteUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentUserProfile, deleteUser })(
  DashboardContainer,
);
