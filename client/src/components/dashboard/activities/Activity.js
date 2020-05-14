import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteActivity } from '../../../actions/profile';

const Activity = ({ activity, deleteActivity, history }) => {
  
  return (
      <tr key={activity._id}>
        <td><Moment format='MM/DD/YYYY'>{moment.utc(activity.date)}</Moment></td>
        <td>{activity.duration}</td>
        <td>{activity.category}</td>
        <td>{activity.calories}</td>
        <td>
          <button onClick={() => deleteActivity(activity._id, history)}>Delete</button>
        </td>
      </tr>
  );
};

Activity.propTypes = {
  activity: PropTypes.object.isRequired,
  deleteActivity: PropTypes.func.isRequired,
};

export default connect(null, { deleteActivity })(Activity);
