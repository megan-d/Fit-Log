import React, { Component } from 'react';

export default class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isAuthenticated: null,
      user: null,
      profile: null,
      // weight: '',
      // height: '',
      // bmi: '',
      // goalWeight: '',
      // goalDailyCalories: '',
      // goalDays: '',
      // caloriesConsumedToday: '',
      // caloriesRemainingToday: '',
      // activities: [],
    };
  }

  componentDidMount() {
    //Fetch the user data here and set the state with the user data (api request to /api/profile/me). The api response will be the profile object, which can then be added to state.
    this.setState({
      //profile: res.data.profile?
    });
  }

  render() {
    return (
      <div className='main-content'>
        <div className='dashboard-container'>
          <h1 className='title-white-bold'>Your Dashboard</h1>
          <div className='cards'>
            <div className='card'>
              <h2 className='card-title'>Stats</h2>
              <div className='card-stats'>
                <div className='card-item'>
                  <p className='card-label'>Weight:</p>
                  <p className='card-value'>110 lbs</p>
                </div>
                <div className='card-item'>
                  <p className='card-label'>Height:</p>
                  <p className='card-value'>64 in</p>
                </div>
                <div className='card-item'>
                  <p className='card-label'>BMI:</p>
                  <p className='card-value'>18.9</p>
                </div>
              </div>
              <button className='card-button'>Update</button>
            </div>
            <div className='card'>
              <h2 className='card-title'>Goals</h2>
              <div className='card-stats'>
                <div className='card-item'>
                  <p className='card-label'>Weight:</p>
                  <p className='card-value'>100 lbs</p>
                </div>
                <div className='card-item'>
                  <p className='card-label'>Daily Calories:</p>
                  <p className='card-value'>2000</p>
                </div>
                <div className='card-item'>
                  <p className='card-label'>Days/Week Exercise:</p>
                  <p className='card-value'>4</p>
                </div>
              </div>
              <button className='card-button'>Update</button>
            </div>
            <div className='card'>
              <h2 className='card-title'>Daily Calories Tracker</h2>
              <div className='card-stats'>
                <div className='card-item'>
                  <p className='card-label'>Calories Consumed:</p>
                  <p className='card-value'>600</p>
                </div>
                <div className='card-item'>
                  <p className='card-label'>Calories Remaining:</p>
                  <p className='card-value'>1400</p>
                </div>
              </div>
              <div className='card-item calories-input'>
                <input
                  className='card-input'
                  type='number'
                  name='add-calories'
                ></input>
                <button className='card-button'>Add Calories</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// {/* <div className='charts'>
//             <div className='chart'>Chart 1</div>
//             <div className='chart'>Chart 2</div>
//             <div className='chart'>Chart 3</div>
//           </div>
//           <div className='activity-log-container'>
//             <button>Add Activity</button>
//             <h2>Activity Log</h2>
//             <div className='activity-headings'>
//               <p className='activity-heading'>Date</p>
//               <p className='activity-heading'>Duration</p>
//               <p className='activity-heading'>Category</p>
//               <p className='activity-heading'>Calories Burned</p>
//             </div>
//             <div className='activities'>
//               <div className='activity'>Activity 1</div>
//               <div className='activity'>Activity 2</div>
//             </div> */}
