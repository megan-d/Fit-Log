import React, { useState } from 'react';
import axios from 'axios';

const AddActivity = () => {
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
    try {
      //Set the body of request
      const body = JSON.stringify(activity);

      //Set the config
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.token,
        },
      };

      //Make PUT request to back end to save activity to user's profile
      await axios.put('/api/profile/activity', body, config);

    } catch (err) {
      console.error(err.response.data);
    }
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
                  <option value='bicyclingLeisure'>Bicycling - Leisure</option>
                  <option value='bicyclingVigorous'>Bicycling - Vigorous</option>
                  <option value='runningSlow'>Running - Slow</option>
                  <option value='runningFast'>Running - Fast</option>
                  <option value='swimming'>Swimming</option>
                  <option value='walkingLeisure'>Walking - Leisure</option>
                  <option value='walkingBrisk'>Walking - Brisk</option>
                  <option value='hiking'>Hiking</option>
                  <option value='nordicSkiing'>Nordic Skiing</option>
                  <option value='tennis'>Tennis</option>
                  <option value='weightTraining'>Weight Training</option>
                  <option value='yoga'>Yoga</option>
                  <option value='basketball'>Basketball</option>
                  <option value='aerobics'>Aerobics</option>
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

export default AddActivity;
