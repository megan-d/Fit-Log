import React from 'react';
import { Link } from 'react-router-dom';

const GoalsCard = (props) => {
  return (
    <div className='card'>
      <h2 className='card-title'>Goals</h2>
      <div className='card-stats'>
        <div className='card-item'>
          <p className='card-label'>Weight:</p>
          <p className='card-value'>
            {props.goalWeight
              ? props.goalWeight
              : '-'}{' '}
            lbs
          </p>
        </div>
        <div className='card-item'>
          <p className='card-label'>Daily Calories:</p>
          <p className='card-value'>{props.goalDailyCalories}</p>
        </div>
        <div className='card-item'>
          <p className='card-label'>Days/Week Exercise:</p>
          <p className='card-value'>{props.goalDays}</p>
        </div>
      </div>
      <Link className='card-button' to='/stats'>
        Update
      </Link>
    </div>
  );
};

export default GoalsCard;
