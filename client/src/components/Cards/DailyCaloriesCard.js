import React from 'react';

const DailyCaloriesCard = (props) => {

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

export default DailyCaloriesCard;
