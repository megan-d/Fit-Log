import React from 'react';
import { Link } from 'react-router-dom';

const StatsCard = (props) => {
  console.log(props);
  return (
    <div className='card'>
      <h2 className='card-title'>Stats</h2>
      <div className='card-stats'>
        <div className='card-item'>
          <p className='card-label'>Weight:</p>
          <p className='card-value'>{props.weight} lbs</p>
        </div>
        <div className='card-item'>
          <p className='card-label'>Height:</p>
          <p className='card-value'>{props.height} in</p>
        </div>
        <div className='card-item'>
          <p className='card-label'>BMI:</p>
          <p className='card-value'>{props.bmi}</p>
        </div>
      </div>
      <Link className='card-button' to='/stats'>
        Update
      </Link>
    </div>
  );
};

export default StatsCard;
