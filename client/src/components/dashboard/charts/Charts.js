import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import LineChart from './LineChart';
import PieChart from './PieChart';
import PieChartActivityCalories from './PieChartActivityCalories';
import LineChartActivities from './LineChartActivities';
import ActivityChart from './ActivityChart';

const Charts = (props) => {
  return (
    <Fragment>
      <div className='weight-calorie-charts'>
        <LineChart profile={props.profile} />
        <PieChart profile={props.profile} />
      </div>
      <div className='weight-calorie-charts'>
        <PieChartActivityCalories profile={props.profile} />
        <LineChartActivities profile={props.profile} />
      </div>
      <div className='activity-chart'>
        <ActivityChart profile={props.profile} />
      </div>
    </Fragment>
  );
};

Charts.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default Charts;
