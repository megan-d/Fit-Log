import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Cards from '../dashboard/cards/Cards';
import Charts from '../dashboard/charts/Charts';
import Activities from '../dashboard/activities/Activities';
import Spinner from '../layout/Spinner';
import Modal from '../layout/Modal';
import { connect } from 'react-redux';
import { getCurrentUserProfile, deleteUser } from '../../actions/profile';

const Demo = ({ getCurrentUserProfile, profile, deleteUser, auth }) => {
  //   //Keep track of the modal view state
  //   const [modalView, setModal] = useState(false);

  //   //Load the user profile - display spinner while loading. Fetch the data from the database through action/reducer. Once profile is loaded, display profile in dashboard.

  //   useEffect(() => {
  //     getCurrentUserProfile();
  //   }, [getCurrentUserProfile]);

  //   //Modal open handler
  //   const modalOpenHandler = () => setModal(true);

  //   //Modal close handler
  //   const modalCloseHandler = () => setModal(false);

  return (
    <div className='main-content'>
      <div className='dashboard-container'>
          <h1>This is the demo page</h1>
      </div>
    </div>
  );
};

Demo.propTypes = {
  getCurrentUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentUserProfile, deleteUser })(
  Demo,
);
