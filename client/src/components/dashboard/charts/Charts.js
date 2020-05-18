import React from 'react';
import LineChart  from './LineChart';
import PieChart from './PieChart'

const Charts = (props) => {
  return (
    <div className='charts'>
      <LineChart profile={props.profile}/>
      <PieChart profile={props.profile}/>
    </div>
  );
};

export default Charts;
