import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
// import Activity from '../activities/Activity';

const Activities = ({ activities }) => {

   const activitiesList =  activities.map(activity => (
       <tr key={activity._id}>
           <td>{activity.date.toLocaleDateString}</td>
           <td>{activity.duration}</td>
           <td>{activity.category}</td>
           <td>{activity.calories}</td>
           <td>
                <button>Delete</button>
            </td>
       </tr>
   ))
  return (
    <div className='activities'>
        <h3>Activity Log</h3>
      <table>
        <thead>
          <tr className='table-row'>
            <th>Date</th>
            <th>Duration (minutes)</th>
            <th>Category</th>
            <th>Calories Burned</th>
          </tr>
        </thead>

        <tbody>
          {activitiesList}
        </tbody>
      </table>
    </div>
  );
};

Activities.propTypes = {
  activities: PropTypes.array.isRequired,
};

export default Activities;
