import React from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import moment from 'moment';

//Minutes of activity over the last 7 days
const ActivityChart = ({ profile }) => {

    // const categories = [...profile.activities.map(el => el.category)];

    // const categoryMinutes = {

    // }

  const chartData = {
    labels: [...profile.activities.map(el => el.category)],
    datasets: [
      {
        label: ['Minutes'],
        data: profile.activities.map(el => el.duration),
        borderColor: 'rgba(251,155,61, 1)',
        backgroundColor: 'rgba(255, 201, 60, 1)',
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