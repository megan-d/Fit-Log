import React from 'react';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const PieChart = ({ profile }) => {
  const chartData = {
    labels: ['Calories Consumed', 'Calories Remaining'],
    datasets: [
      {
        label: 'Calories',
        data: [profile.caloriesConsumedToday, profile.caloriesRemainingToday],
        backgroundColor: ['rgba(255, 201, 60, 1)', 'rgba(43, 93, 108, 1)'],
      },
    ],
  };

  return (
    <div className='chart chart-2'>
      <Pie
        data={chartData}
        options={{
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'Daily Calories',
          },
          legend: {
            display: true,
            position: 'bottom',
          },
        }}
      />
    </div>
  );
};

PieChart.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default PieChart;
