import React, { useState } from 'react';
import Spinner from '../../layout/Spinner';
import Modal from '../../layout/Modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile } from '../../../actions/profile';

const StatsCard = ({ profile, updateProfile, history }) => {
  //Keep track of the modal view state
  const [modalView, setModal] = useState(false);
  //Modal open handler
  const modalOpenHandler = () => setModal(true);
  //Modal close handler
  const modalCloseHandler = () => {
    setModal(false);
    clearInputHandler();
  };

  const [formData, updateFormData] = useState({
    weight: '',
    height: '',
  });

  const { weight, height } = formData;

  //Update state on input change using updateFormData
  const onChangeHandler = (e) => {
    updateFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Clear the formData (will be run when submit button is clicked or when modal is closed by clicking on background)
  const clearInputHandler = () => {
    updateFormData({ ...formData, weight: '', height: '' });
  };

  //Creat variable for user data based on formData
  const updates = {
    weight: weight,
    height: height,
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //execute updateProfile action, which takes in the updates and history
    await updateProfile(updates, history);
    modalCloseHandler();
    clearInputHandler();
  };

  return profile.isLoading && profile.profile === null ? (
    <div className='card'>
      <Spinner />
    </div>
  ) : (
    <div className='card'>
      <h2 className='card-title'>Stats</h2>
      <div className='card-stats'>
        <div className='card-item'>
          <p className='card-label'>Weight:</p>
          <p className='card-value'>{profile.weight} lbs</p>
        </div>
        <div className='card-item'>
          <p className='card-label'>Height:</p>
          <p className='card-value'>{profile.height} in</p>
        </div>
        <div className='card-item'>
          <p className='card-label'>BMI:</p>
          <p className='card-value'>{profile.bmi}</p>
        </div>
      </div>
      <button className='card-button' onClick={modalOpenHandler}>
        Update Stats
      </button>
      {modalView && (
        <Modal show={modalView} modalClosed={modalCloseHandler}>
          <h1 className='card-update-heading'>Update Your Stats</h1>
          <form className='form contact-form' action='' onSubmit={onSubmit}>
            <div className='form-container'>
              <div className='form-group'>
                <label>
                  What is your current weight in pounds?
                  <input
                    type='number'
                    name='weight'
                    value={weight}
                    placeholder={profile.weight}
                    onChange={onChangeHandler}
                  />
                </label>
              </div>
              <div className='form-group'>
                <label>
                  What is your height in inches?
                  <input
                    type='number'
                    name='height'
                    value={height}
                    placeholder={profile.height}
                    onChange={onChangeHandler}
                  />
                </label>
              </div>
            </div>
            <div className='modal-delete-buttons'>
              <button
                className='cancel-user-button'
                onClick={modalCloseHandler}
              >
                Cancel
              </button>
              <input
                type='submit'
                value='Submit'
                className='card-submit-button'
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

StatsCard.propTypes = {
  profile: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

export default connect(null, { updateProfile })(StatsCard);
