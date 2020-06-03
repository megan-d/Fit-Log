import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import moment from 'moment';

//Minutes of activity over the last 7 days
const LineChartActivities = ({ profile }) => {

    const activityDates = [...profile.activities.map(el => moment(el.date).format('MM-DD-YYYY'))];

  const chartData = {
    labels: [...activityDates],
    datasets: [
      {
        label: ['Duration'],
        data: profile.activities.map(el => el.duration),
        borderColor: 'rgba(129, 73, 131, 1)',
      },
    ],
  };

  return (
    <div className='chart chart-1'>
      <Line
        data={chartData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: true,
            text: 'Activity Durations',
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
                labelString: 'Duration (mins)'
              },
              ticks: {
                beginAtZero:true,
                min: 0,
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: false,
                labelString: 'Date'
              }
            }]
          }     
        }}
      />
    </div>
  );
};

LineChartActivities.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default LineChartActivities;
