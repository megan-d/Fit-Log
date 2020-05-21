import React, { useState } from 'react';
import Spinner from '../../layout/Spinner';
import Modal from '../../layout/Modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateProfile } from '../../../actions/profile';

//Props come in from Cards, which comes in from Dashboard Container (pulls from Redux store)
const GoalsCard = ({ updateProfile, history, profile }) => {
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
    goalWeight: '',
    goalDailyCalories: '',
    goalDays: '',
  });

  //Create variables for formData
  const { goalWeight, goalDailyCalories, goalDays } = formData;

  //Pull out the formData into variable to send as payload
  const updates = {
    goalWeight: goalWeight,
    goalDailyCalories: goalDailyCalories,
    goalDays: goalDays,
  };

  //Create onChange handler to update the state upon input change
  const onChangeHandler = (e) => {
    updateFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Clear the formData (will be run when submit button is clicked or when modal is closed by clicking on background)
  const clearInputHandler = () => {
    updateFormData({ ...formData, goalWeight: '', goalDailyCalories: '', goalDays: '' });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(updates, history);
    modalCloseHandler();
    clearInputHandler();
    updateProfile(updates, history);
  };
  return profile.isLoading && profile.profile === null ? (
    <div className='card'>
      <Spinner />
    </div>
  ) : (
    <div className='card'>
      <h2 className='card-title'>Goals</h2>
      <div className='card-stats'>
        <div className='card-item'>
          <p className='card-label'>Weight:</p>
          <p className='card-value'>
            {profile.goalWeight ? profile.goalWeight : '-'} lbs
          </p>
        </div>
        <div className='card-item'>
          <p className='card-label'>Daily Calories:</p>
          <p className='card-value'>{profile.goalDailyCalories}</p>
        </div>
        <div className='card-item'>
          <p className='card-label'>Days/Week Exercise:</p>
          <p className='card-value'>{profile.goalDays}</p>
        </div>
      </div>
      <button className='card-button' onClick={modalOpenHandler}>
        Update Goals
      </button>
      {modalView && (
        <Modal show={modalView} modalClosed={modalCloseHandler}>
          <div className='main-content'>
              <h1 className='card-update-heading'>Update Your Goals</h1>
              <form
                className='form contact-form'
                action=''
                onSubmit={onSubmit}
              >
                <div className='form-container'>
                  <div className='form-group'>
                    <label>
                      What is your goal weight in pounds?
                      <input
                        type='number'
                        name='goalWeight'
                        value={goalWeight}
                        placeholder={profile.goalWeight}
                        onChange={onChangeHandler}
                      />
                    </label>
                  </div>
                  <div className='form-group'>
                    <label>
                      What is your daily calorie goal? If unsure, 2000 is a
                      starting point.
                      <input
                        type='number'
                        name='goalDailyCalories'
                        value={goalDailyCalories}
                        placeholder={profile.goalDailyCalories}
                        onChange={onChangeHandler}
                      />
                    </label>
                  </div>
                  <div className='form-group'>
                    <label>
                      How many days per week is your exercise goal (0-7)?
                      <input
                        type='number'
                        name='goalDays'
                        value={goalDays}
                        placeholder={profile.goalDays}
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
            </div>
        </Modal>
      )}
    </div>
  );
};

GoalsCard.propTypes = {
  profile: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

export default connect(null, { updateProfile })(GoalsCard);
