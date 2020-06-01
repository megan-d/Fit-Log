import React from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

//Minutes of activity over the last 7 days
const ActivityChart = ({ profile }) => {

  //Get the categories from the activities. If it's the same category name, add those minutes together under that category.
  const activities = [...profile.activities];
  const activityTypeDurations = {};

  activities.forEach(activity => {
    if (activityTypeDurations[activity.category]) {
      activityTypeDurations[activity.category] = activity.duration + activityTypeDurations[activity.category]
    } else {
      activityTypeDurations[activity.category] = activity.duration;
    }
  });

  //To display the duration for each category, get the values of each key with Object.values
  const chartData = {
    labels: [...Object.keys(activityTypeDurations)],
    datasets: [
      {
        label: ['Minutes'],
        data: Object.values(activityTypeDurations),
        borderColor: ['rgba(255, 99, 97, 1)', 'rgba(255, 166, 0, 1)', 'rgba(88, 80, 141, 1)', 'rgba(0, 63, 92, 1)', 'rgba(188, 80, 144, 1)'],
        borderWidth: '2',
        backgroundColor: ['rgba(255, 99, 97, 0.75)', 'rgba(255, 166, 0, 0.75)', 'rgba(88, 80, 141, 0.75)', 'rgba(0, 63, 92, 0.75)', 'rgba(188, 80, 144, 0.75)'],
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
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Minutes',
              },
              ticks: {
                beginAtZero:true,
                min: 0,
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: false,
                labelString: 'Category'
              }
            }]
          }     
        }}
      />
    </div>
  );
};

ActivityChart.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ActivityChart;