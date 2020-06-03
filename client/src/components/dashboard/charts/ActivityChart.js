import React from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

//Minutes of activity over the last 7 days
const ActivityChart = ({ profile }) => {
  //Get the categories from the activities. If it's the same category name, add those minutes together under that category.
  const activities = [...profile.activities].reverse();
  const activityTypeDurations = {};

  activities.forEach((activity) => {
    if (activityTypeDurations[activity.category]) {
      activityTypeDurations[activity.category] =
        activity.duration + activityTypeDurations[activity.category];
    } else {
      activityTypeDurations[activity.category] = activity.duration;
    }
  });

  //create variable to store category names for background styling
  const activityTypes = Object.keys(activityTypeDurations);

  //Create background colors to cycle through
  const colors = [
    'rgba(129, 73, 131, 1)',
    'rgba(233, 176, 0, 1)',
    'rgba(235, 110, 128, 1)',
    'rgba(0, 143, 149, 1)',
    'rgba(138,199,58, 1)',
  ];

  //To display the duration for each category, get the values of each key with Object.values
  const chartData = {
    labels: [...Object.keys(activityTypeDurations)],
    datasets: [
      {
        label: ['Minutes'],
        data: Object.values(activityTypeDurations),
        borderWidth: '3',
        //Create function to cycle through colors so if more activities than colors it will loop around and reuse the same colors instead of gray
        backgroundColor: () => {
          let backgroundColors = [];
          for (let i = 0; i < activityTypes.length; i++) {
            backgroundColors.push(colors[i % colors.length]);
          }
          return backgroundColors;
        },
      },
    ],
  };

  return (
    <div className='chart chart-3'>
      <Bar
        data={chartData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: true,
            text: 'Total Minutes by Activity Type',
          },
          legend: {
            display: false,
            position: 'bottom',
            align: 'center',
          },
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Minutes',
                },
                ticks: {
                  beginAtZero: true,
                  min: 0,
                },
              },
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: false,
                  labelString: 'Category',
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

ActivityChart.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ActivityChart;
