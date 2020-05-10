import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const DailyCaloriesCard = (props) => {



  //Input change for input element in DailyCaloriesCard. Want to change this so it calls an action called addCalories (through redux)
  const inputChangeHandler = (e) => {
    this.setState({
      addedCalories:
        e.target.type === 'number' ? parseInt(e.target.value) : e.target.value,
    });
  };

  return (
    <div className='card'>
      <h2 className='card-title'>Daily Calories Tracker</h2>
      <div className='card-stats'>
        <div className='card-item'>
          <p className='card-label'>Calories Consumed:</p>
          <p className='card-value'>{props.caloriesConsumedToday}</p>
        </div>
        <div className='card-item'>
          <p className='card-label'>Calories Remaining:</p>
          <p className='card-value'>{props.caloriesRemainingToday}</p>
        </div>
      </div>
      <div className='card-item calories-input'>
        <input
          className='card-input'
          type='number'
          name='addedCalories'
          value={props.addedCalories}
          onChange={props.inputChangeHandler}
        ></input>
        <button className='card-button' onClick={() => props.addCaloriesHandler(props.addedCalories)}>
          Add Calories
        </button>
        <button className='card-button reset-button' onClick={() => props.resetCaloriesHandler()}>
          Reset Calories
        </button>
      </div>
    </div>
  );
};

DailyCaloriesCard.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default (DailyCaloriesCard);
