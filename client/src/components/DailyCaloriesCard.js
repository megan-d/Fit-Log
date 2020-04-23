import React, { useState } from 'react';
import axios from 'axios';

const DailyCaloriesCard = (props) => {
  const [calorieData, updateCalorieData] = useState({
      //Get the current value of caloriesConsumedToday and caloriesRemainingToday from database call done in DashboardContainer
    addedCalories: 0,
    caloriesConsumedToday: props.consumedToday,
    caloriesRemainingToday: props.remainingToday
  });

  const { addedCalories, caloriesConsumedToday, caloriesRemainingToday } = calorieData;

  //When user enters input, capture that amount in the state in onChange
  const onInputChange = (e) => {
    updateCalorieData({ ...calorieData, [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value });
  };

  //When user clicks submit button, update state and send caloriesConsumedToday + addedCalories to the database
  const addCalories = async (e) => {
    //When button is clicked, update state for caloriesConsumedToday and caloriesRemaining today.
    e.preventDefault();

    try {
      const calories = {
        caloriesConsumedToday: caloriesConsumedToday + addedCalories,
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.token,
        },
      };

      const body = JSON.stringify(calories);

      await axios.put('/api/profile', body, config);


    } catch (err) {
      console.error(err);
    }};

  return (
    <div className='card'>
      <h2 className='card-title'>Daily Calories Tracker</h2>
      <div className='card-stats'>
        <div className='card-item'>
          <p className='card-label'>Calories Consumed:</p>
          <p className='card-value'>{caloriesConsumedToday}</p>
        </div>
        <div className='card-item'>
          <p className='card-label'>Calories Remaining:</p>
          <p className='card-value'>{caloriesRemainingToday}</p>
        </div>
      </div>
      <div className='card-item calories-input'>
        <input
          className='card-input'
          type='number'
          name='addedCalories'
          value={addedCalories}
          onChange={(e) => onInputChange(e)}
        ></input>
        <button className='card-button' onClick={(e) => addCalories(e)}>
          Add Calories
        </button>
      </div>
    </div>
  );
};

export default DailyCaloriesCard;
