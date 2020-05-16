import React, { Fragment, useState, useEffect } from 'react';
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
  //Keep track of the modal view state
  const [modalView, setModal] = useState(false);

  //Load the user profile - display spinner while loading. Fetch the data from the database through action/reducer. Once profile is loaded, display profile in dashboard.

  useEffect(() => {
    getCurrentUserProfile();
  }, [getCurrentUserProfile]);

  //Modal open handler
  const modalOpenHandler = () => setModal(true);

  //Modal close handler
  const modalCloseHandler = () => setModal(false);

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
                onClick={() => modalOpenHandler()}
              >
                Delete Profile and Account
              </button> 
              {modalView && <Modal show={modalView}>
                <div className='delete-modal'>
                  <p className='modal-delete-desc'>
                    This action cannot be undone. Are you sure you want to
                    delete your profile and account?
                  </p>
                  <div className='modal-delete-buttons'>
                    <button className='cancel-user-button' onClick={() => modalCloseHandler()}>Cancel</button>
                    <button
                      className='confirm-delete-user-button'
                      onClick={() => deleteUser()}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </Modal>}
              
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
