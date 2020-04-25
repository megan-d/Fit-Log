import React from 'react';
import DailyCaloriesCard from './DailyCaloriesCard';
import GoalsCard from './GoalsCard';
import StatsCard from './StatsCard';

const Cards = (props) => {
  return (
    <div className='cards'>
      <StatsCard
        weight={props.profile.weight}
        height={props.profile.height}
        bmi={props.profile.bmi}
      />

      <GoalsCard
        goalDays={props.profile.goalDays}
        goalDailyCalories={props.profile.goalDailyCalories}
        goalWeight={props.profile.goalWeight}
      />
      <DailyCaloriesCard
        caloriesConsumedToday={props.profile.caloriesConsumedToday}
        caloriesRemainingToday={props.profile.caloriesRemainingToday}
        addCalories={props.addCalories}
        resetCalories={props.resetCalories}
      />
    </div>
  );
};

export default Cards;
