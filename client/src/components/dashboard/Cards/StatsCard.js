import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../layout/Spinner';
import PropTypes from 'prop-types';

const StatsCard = ({ profile }) => {
  return profile.isLoading && profile.profile === null ? (
    <div className='card'>
      <Spinner />
    </div>
  ) : (
    <div className='card'>
      <h2 className='card-title'>Stats</h2>
      <div className='card-stats'>
        <div className='card-item'>
          <p className='card-label'>Weight:</p>
          <p className='card-value'>{profile.weight} lbs</p>
        </div>
        <div className='card-item'>
          <p className='card-label'>Height:</p>
          <p className='card-value'>{profile.height} in</p>
        </div>
        <div className='card-item'>
          <p className='card-label'>BMI:</p>
          <p className='card-value'>{profile.bmi}</p>
        </div>
      </div>
      <Link className='card-button' to='/stats'>
        Update Stats
      </Link>
    </div>
  );
};

StatsCard.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default StatsCard;
