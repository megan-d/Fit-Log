import React from 'react';
import LineChart  from './LineChart';
import PieChart from './PieChart'

const Charts = (props) => {
  return (
    <div className='charts'>
      <LineChart />
      <PieChart />
    </div>
  );
};

export default Charts;
