import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import moment from 'moment';

//Minutes of activity over the last 7 days
const LineChartActivities = ({ profile }) => {

  const reversedActivities = [...profile.activities].reverse();
  const activityDateDurations = {};

  reversedActivities.forEach((activity) => {
    let date = moment(activity.date).format('MM-DD-YYYY');
    if (activityDateDurations[date]) {
      activityDateDurations[date] =
        activity.duration + activityDateDurations[date];
    } else {
      activityDateDurations[date] = activity.duration;
    }
  });

  const chartData = {
    labels: [...Object.keys(activityDateDurations)],
    datasets: [
      {
        label: ['Duration'],
        data: Object.values(activityDateDurations),
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
            text: 'Activity Durations by Date',
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
