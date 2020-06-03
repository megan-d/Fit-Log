import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const PieChart = ({ profile }) => {
  const chartData = {
    labels: ['Calories Consumed', 'Calories Remaining'],
    datasets: [
      {
        label: 'Calories',
        data: [profile.caloriesConsumedToday, profile.caloriesRemainingToday],
        backgroundColor: ['#eb6e80', '#008f95'],
      },
    ],
  };

  return (
    <div className='chart chart-2'>
      <Doughnut
        data={chartData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: true,
            text: 'Daily Calories',
          },
          legend: {
            display: true,
            position: 'bottom',
          },
          layout: {
            padding: {
              left: 20,
              right: 20,
            }
          }
        }}
      />
    </div>
  );
};

PieChart.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default PieChart;
