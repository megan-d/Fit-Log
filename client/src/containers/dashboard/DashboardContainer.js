import React, { Component } from 'react';

export default class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
                  <p className='card-label'>Weight</p>
                  <p className='card-value'>110 lbs</p>
                </div>
                <div className='card-item'>
                  <p className='card-label'>Height</p>
                  <p className='card-value'>64 in</p>
                </div>
                <div className='card-item'>
                  <p className='card-label'>BMI</p>
                  <p className='card-value'>18.9</p>
                </div>
              </div>
              <button className='card-button'>Update</button>
            </div>
            <div className='card'>
              <h2 className='card-title'>Goals</h2>
            </div>
            <div className='card'>
              <h2 className='card-title'>Daily Calorie Tracker</h2>
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
