import React from 'react';

const AddActivity = () => {
  return (
    <div className='main-content'>
      <div className='form-page-container'>
        <h1 className='title-white-bold'>Add Activity</h1>
        <form className='form contact-form' action=''>
          <div className='form-container'>
            <div className='form-group'>
              <label>
                Type of activity:
                <select value='' required>
                  <option value="bicyclingLeisure">Bicycling - Leisure</option>
                  <option value="bicyclingVigorous">Bicycling - Vigorous</option>
                  <option value="runningSlow">Running - Slow</option>
                  <option value="runningFast">Running - Fast</option>
                  <option value="swimming">Swimming</option>
                  <option value="walkingLeisure">Walking - Leisure</option>
                  <option value="walkingBrisk">Walking - Brisk</option>
                  <option value="hiking">Hiking</option>
                  <option value="nordicSkiing">Nordic Skiing</option>
                  <option value="tennis">Tennis</option>
                  <option value="weightTraining">Weight Training</option>
                  <option value="yoga">Yoga</option>
                  <option value="basketball">Basketball</option>
                  <option value="aerobics">Aerobics</option>
                </select>
              </label>
            </div>
            <div className='form-group'>
              <label>
                Duration (in minutes):
                <input
                  type='number'
                  name='activity-duration'
                  placeholder='30'
                  value=''
                  required
                />
              </label>
            </div>
            <div className='form-group'>
              <label>
                Comments:
                <input
                  type='text'
                  name='activity-comments'
                  placeholder='Insert your comments...'
                  value=''
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