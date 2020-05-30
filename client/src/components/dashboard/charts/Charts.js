import React, { Fragment } from 'react';
import LineChart from './LineChart';
import PieChart from './PieChart';
import ActivityChart from './ActivityChart';

const Charts = (props) => {
  return (
    <Fragment>
      <div className='weight-calorie-charts'>
        <LineChart profile={props.profile} />
        <PieChart profile={props.profile} />
      </div>
      <div className='activity-chart'>
        <ActivityChart profile={props.profile}/>
      </div>
    </Fragment>
  );
};

export default Charts;
