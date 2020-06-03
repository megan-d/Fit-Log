import React from 'react';
import { Polar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const PieChartWeight = ({ profile }) => {
  //Get the categories from the activities. If it's the same category name, add those calories together under that category.
  const activities = [...profile.activities];
  const activityTypeCalories = {};

  activities.forEach((activity) => {
    if (activityTypeCalories[activity.category]) {
      activityTypeCalories[activity.category] =
        activity.calories + activityTypeCalories[activity.category];
    } else {
      activityTypeCalories[activity.category] = activity.calories;
    }
  });

  //create variable to store category names for background styling
  const categories = Object.keys(activityTypeCalories);

  //Create background colors to cycle through
  const colors = [
    'rgba(129, 73, 131, 0.9)',
    'rgba(233, 176, 0, 0.9)',
    'rgba(235, 110, 128, 0.9)',
    'rgba(0, 143, 149, 0.9)',
    'rgba(138,199,58, 0.9)',
    'rgba(42, 27, 61, 0.9)',
  ];

  //To display the duration for each category, get the values of each key with Object.values
  const chartData = {
    labels: [...Object.keys(activityTypeCalories)],
    datasets: [
      {
        label: ['Calories'],
        data: Object.values(activityTypeCalories),
        //Create function to cycle through colors so if more activities than colors it will loop around and reuse the same colors instead of gray
        backgroundColor: () => {
          let backgroundColors = [];
          for (let i = 0; i < categories.length; i++) {
            backgroundColors.push(colors[i % colors.length]);
          }
          return backgroundColors;
        },
      },
    ],
  };

  return (
    <div className='chart chart-2'>
      <Polar
        data={chartData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: true,
            text: 'Total Calories by Activity',
          },
          legend: {
            display: true,
            position: 'bottom',
          },
          layout: {
            padding: {
              left: 20,
              right: 20,
            },
          },
        }}
      />
    </div>
  );
};

PieChartWeight.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default PieChartWeight;
