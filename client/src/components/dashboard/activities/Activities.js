import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Activity from '../activities/Activity';

const Activities = ({ activities }) => {

  const activitiesTable = activities.map((activity) => {
    return <Activity key={activity._id} activity={activity} />;
  });

  return (
    <div className='activities'>
      <h3>Activity Log</h3>
      <Link className='activity-button' to='/addactivity'>
        Add Activity
      </Link>
      <table>
        <thead>
          <tr className='table-row'>
            <th>Date</th>
            <th>Duration (minutes)</th>
            <th>Category</th>
            <th>Calories Burned</th>
          </tr>
        </thead>
        <tbody>{activitiesTable}</tbody>
      </table>
    </div>
  );
};

Activities.propTypes = {
    activities: PropTypes.array.isRequired,
}

export default Activities;
