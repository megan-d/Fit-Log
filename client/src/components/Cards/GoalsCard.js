import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//Props come in from Cards, which comes in from Dashboard Container (pulls from Redux store)
const GoalsCard = ({ profile }) => {
  return (
    <div className='card'>
      <h2 className='card-title'>Goals</h2>
      <div className='card-stats'>
        <div className='card-item'>
          <p className='card-label'>Weight:</p>
          <p className='card-value'>
            {profile.goalWeight
              ? profile.goalWeight
              : '-'}{' '}
            lbs
          </p>
        </div>
        <div className='card-item'>
          <p className='card-label'>Daily Calories:</p>
          <p className='card-value'>{profile.goalDailyCalories}</p>
        </div>
        <div className='card-item'>
          <p className='card-label'>Days/Week Exercise:</p>
          <p className='card-value'>{profile.goalDays}</p>
        </div>
      </div>
      <Link className='card-button' to='/goals'>
        Update Goals
      </Link>
    </div>
  );
};

GoalsCard.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default GoalsCard;
