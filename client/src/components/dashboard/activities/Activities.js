import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Activity from '../activities/Activity';
import Modal from '../../layout/Modal';
import { connect } from 'react-redux';
import { addActivity } from '../../../actions/profile';

const Activities = ({ activities, addActivity }) => {
  //Keep track of the modal view state
  const [modalView, setModal] = useState(false);
  //Modal open handler
  const modalOpenHandler = () => setModal(true);
  //Modal close handler
  const modalCloseHandler = () => {
    setModal(false);
    clearInputHandler();
  };

  //Local state for activity inputs (category and duration)
  const [activityData, updateActivityData] = useState({
    duration: '',
    category: '',
  });

  const { duration, category } = activityData;

  //Populate state with input
  const onChange = (e) => {
    updateActivityData({ ...activityData, [e.target.name]: e.target.value });
  };

  //Clear the formData (will be run when submit button is clicked or when modal is closed by clicking on background)
  const clearInputHandler = () => {
    updateActivityData({ ...activityData, duration: '', category: '' });
  };

  //Submit post request to database for new activity
  const onSubmit = async (e) => {
    e.preventDefault();
    const activity = {
      duration: duration,
      category: category,
    };
    await addActivity(activity);
    modalCloseHandler();
    clearInputHandler();
  };

  
  const activitiesTable = activities.map((activity) => {
    return <Activity key={activity._id} activity={activity} />;
  });

  return (
    <div className='activities'>
      <h3>Activity Log</h3>
      <button className='add-activity-button' onClick={modalOpenHandler}>
        Add Activity
      </button>
      <table className='table'>
        <thead>
          <tr className='table-row'>
            <th>Date</th>
            <th>Duration (minutes)</th>
            <th>Type</th>
            <th>Calories Burned</th>
          </tr>
        </thead>
        <tbody>{activitiesTable}</tbody>
      </table>
      {modalView && (
        <Modal show={modalView} modalClosed={modalCloseHandler}>
          <form className='form contact-form' action='' onSubmit={onSubmit}>
            <div className='form-container'>
              <div className='form-group'>
                <label>
                  Type of activity:
                  <select name='category' required onChange={onChange}>
                    <option value=''>
                      Please select a type of activity...
                    </option>
                    <option value='Bicycling - Leisure'>
                      Bicycling - Leisure
                    </option>
                    <option value='Bicycling - Vigorous'>
                      Bicycling - Vigorous
                    </option>
                    <option value='Running - Slow'>Running - Slow</option>
                    <option value='Running - Fast'>Running - Fast</option>
                    <option value='Swimming'>Swimming</option>
                    <option value='Walking - Leisure'>Walking - Leisure</option>
                    <option value='Walking - Brisk'>Walking - Brisk</option>
                    <option value='Hiking'>Hiking</option>
                    <option value='Nordic Skiing'>Nordic Skiing</option>
                    <option value='Tennis'>Tennis</option>
                    <option value='Weight Training'>Weight Training</option>
                    <option value='Yoga'>Yoga</option>
                    <option value='Basketball'>Basketball</option>
                    <option value='Aerobics'>Aerobics</option>
                  </select>
                </label>
              </div>
              <div className='form-group'>
                <label>
                  Duration (in minutes):
                  <input
                    type='number'
                    name='duration'
                    value={duration}
                    onChange={onChange}
                    required
                  />
                </label>
              </div>
            </div>
            <input
              type='submit'
              value='Submit'
              className='button form-button button-column'
            />
          </form>
        </Modal>
      )}
    </div>
  );
};

Activities.propTypes = {
  activities: PropTypes.array.isRequired,
  addActivity: PropTypes.func.isRequired,
};

export default connect(null, { addActivity })(Activities);
