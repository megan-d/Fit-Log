import React, { useState } from 'react';
import axios from 'axios';

const DailyCaloriesCard = (props) => {
  const [calorieData, updateCalorieData] = useState({
      //Get the current value of caloriesConsumedToday and caloriesRemainingToday from database call done in DashboardContainer
    addedCalories: 0,
  });

  const { addedCalories } = calorieData;

  //When user enters input, capture that amount in the state in onChange
  const onInputChange = (e) => {
    updateCalorieData({...calorieData, [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value }  )
  };


  //Clear the addCalories input (will be run when Add Calories button is clicked)
const clearInput = () => {
  updateCalorieData({...calorieData, addedCalories: 0});
}

//Function to submit PUT request to database to update calories data (will be run when Add calories button is clicked)
const submitCaloriesData = async () => {
  const calories = {
    caloriesConsumedToday: props.caloriesConsumedToday + addedCalories,
    caloriesRemainingToday: props.caloriesRemainingToday - addedCalories
}

  try {
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
  }
}

//When Add Calories button is clicked, run functions to post to database and clear input. The props.addCalories will also update the state in DashboardContainer and trigger a re-render so new calories information is displayed on dashboard.
const submitData = () => {
  submitCaloriesData();
  clearInput();
}

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
          value={addedCalories}
          onChange={(e) => onInputChange(e)}
        ></input>
        <button className='card-button' onClick={() => { props.addCalories(addedCalories); submitData() }}>
          Add Calories
        </button>
      </div>
    </div>
  );
};

export default DailyCaloriesCard;
