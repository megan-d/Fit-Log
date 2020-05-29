import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import Cards from '../dashboard/cards/Cards';
import Charts from '../dashboard/charts/Charts';
import Activities from '../dashboard/activities/Activities';
import Spinner from '../layout/Spinner';
import Modal from '../layout/Modal';
import { createDemoProfile, getCurrentUserProfile, deleteUser } from '../../actions/profile';
import { register } from '../../actions/auth';

const Demo = ({ register, profile, createDemoProfile, deleteUser, auth, history }) => {
  //When this component loads (when user clicks view demo link), register a new demo user, set up the demo user's profile, and update the profile so there is information for the charts.

  //Register demo user using register action
  let id = uuidv4();
  const demoUser = {
    name: 'Steven',
    email: `${id}@demo.com`,
    password: '123456789',
  };

  const populateDemo = async () => {
    await register(demoUser);
    await createDemoProfile(history);
  };

  const [modalView, setModal] = useState(false);

  //Modal open handler
  const modalOpenHandler = () => setModal(true);
    
  //Modal close handler
  const modalCloseHandler = () => setModal(false);

  //On component load, run an async function that awaits the above functions.
  useEffect(() => {
    populateDemo();
  }, []);

  useEffect(() => {
    getCurrentUserProfile();
  }, []);

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
                  <Charts profile={profile.profile}/>
                  <Activities activities={profile.profile.activities} />
                  <button
                    className='delete-user-button'
                    onClick={modalOpenHandler}
                  >
                    Delete Profile and Account
                  </button> 
                  {modalView && <Modal show={modalView} modalClosed={modalCloseHandler}>
                    <div className='delete-modal'>
                      <p className='modal-delete-desc'>
                        This action cannot be undone. Are you sure you want to
                        delete your profile and account?
                      </p>
                      <div className='modal-delete-buttons'>
                        <button className='cancel-user-button' onClick={modalCloseHandler}>Cancel</button>
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
    

Demo.propTypes = {
  register: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  createDemoProfile: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { register, createDemoProfile, deleteUser })(Demo);
