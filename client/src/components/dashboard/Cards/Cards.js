import React from 'react';
import DailyCaloriesCard from './DailyCaloriesCard';
import GoalsCard from './GoalsCard';
import StatsCard from './StatsCard';

const Cards = (props) => {
  return (
    <div className='cards'>
      <StatsCard profile={props.profile}/>
      <GoalsCard profile={props.profile}/>
      <DailyCaloriesCard profile={props.profile}/>
    </div>
  );
};

export default Cards;