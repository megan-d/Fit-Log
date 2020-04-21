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
            <div className='card'>Stats</div>
            <div className='card'>Goals</div>
            <div className='card'>Daily Calorie Tracker</div>
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