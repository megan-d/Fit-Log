import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addActivity } from '../../../actions/profile';

const AddActivity = ({ addActivity, history }) => {
  const [activityData, updateActivityData] = useState({
    duration: '',
    category: '',
  });

  const { duration, category } = activityData;

  //Populate state with input
  const onChange = (e) => {
    updateActivityData({ ...activityData, [e.target.name]: e.target.value });
  };

  //Submit post request to database for new activity
  const onSubmit = async (e) => {
    e.preventDefault();
    const activity = {
      duration: duration,
      category: category,
    };
    addActivity(activity, history);
  };

  return (
    <div className='main-content'>
      <div className='form-page-container'>
        <h1 className='title-white-bold'>Add Activity</h1>
        <form
          className='form contact-form'
          action=''
          onSubmit={(e) => onSubmit(e)}
        >
          <div className='form-container'>
            <div className='form-group'>
              <label>
                Type of activity:
                <select
                  name='category'
                  value={category}
                  required
                  onChange={(e) => onChange(e)}
                >
                  <option value='Bicycling - Leisure'>Bicycling - Leisure</option>
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
                  onChange={(e) => onChange(e)}
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
      </div>
    </div>
  );
};

AddActivity.propTypes = {
  addActivity: PropTypes.func.isRequired,
};

export default connect(null, { addActivity })(AddActivity);
