import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import moment from 'moment';

//Minutes of activity over the last 7 days
const LineChart = ({ profile }) => {

  const chartData = {
    labels: [...profile.weights.map(el => moment(el.date).format('MM-DD-YYYY'))],
    datasets: [
      {
        label: ['Weight'],
        data: profile.weights.map(el => el.weight),
        borderColor: '#e9b000',
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
            text: 'Weight Tracker',
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
                labelString: 'Weight (lbs)'
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: false,
                labelString: 'Date',
              }
            }]
          }     
        }}
      />
    </div>
  );
};

LineChart.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default LineChart;