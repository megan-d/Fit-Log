import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default DailyCaloriesCard = () => {
  const [calorieData, updateCalorieData] = useState({
    caloriesConsumedToday: 0,
    caloriesRemainingToday: null,
    addedCalories: 0
  });

  const { caloriesConsumedToday, caloriesRemainingToday, addedCalories } = calorieData;

  


  //When user enters input, capture that amount in the state in onChange


  //When user clicks submit button, send caloriesConsumedToday + addedCalories to the database

  const displayCalories = async () => {
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.token,
        },
      };

      const profile = await axios.get('/api/profile/me', config);
      console.log('profile', profile);
}

  useEffect(() => {
    //When component loads, fetch current information from database for caloriesConsumedToday and caloriesRemainingToday
    displayCalories();
})

    

    updateCalorieData({ 
        ...calorieData, 
        caloriesConsumedToday: profile.caloriesConsumedToday,
        caloriesRemainingToday: profile.caloriesRemainingToday
    });

  const onInputChange = (e) => {
    updateCalorieData({ ...calorieData, addedCalories: e.target.value });
    // e.target.type === 'number' ? parseInt(e.target.value) : e.target.value,
  };

  const addCalories = async (e) => {
    //When button is clicked, update state for caloriesConsumedToday and caloriesRemaining today.
    
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

      const res = await axios.put('/api/profile', body, config);
      console.log('res', res);

      updateCalorieData({
        caloriesConsumedToday: res.data.caloriesConsumedToday,
        caloriesRemainingToday: res.data.caloriesRemainingToday,
      });
    } catch (err) {
      console.error(err);
    }};

  return (
    <div className='card'>
      <h2 className='card-title'>Daily Calories Tracker</h2>
      <div className='card-stats'>
        <div className='card-item'>
          <p className='card-label'>Calories Consumed:</p>
          <p className='card-value'>{caloriesRemainingToday}</p>
        </div>
        <div className='card-item'>
          <p className='card-label'>Calories Remaining:</p>
          <p className='card-value'>{}</p>
        </div>
      </div>
      <div className='card-item calories-input'>
        <input
          className='card-input'
          type='number'
          name='weightInput'
          value={caloriesConsumedToday}
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
