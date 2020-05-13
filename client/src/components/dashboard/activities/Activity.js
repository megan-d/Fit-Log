import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const Activity = ({ activity }) => {
  return (
      <tr key={activity._id}>
        <td><Moment format='MM/DD/YYYY'>{moment.utc(activity.date)}</Moment></td>
        <td>{activity.duration}</td>
        <td>{activity.category}</td>
        <td>{activity.calories}</td>
        <td>
          <button>Delete</button>
        </td>
      </tr>
  );
};

Activity.propTypes = {
  activity: PropTypes.object.isRequired,
};

export default Activity;
