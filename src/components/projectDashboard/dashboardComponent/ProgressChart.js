import React, { PureComponent } from 'react';
import { Bar } from 'react-chartjs-2';
/* eslint-disable react/prop-types  */

const options = {
  responsive: true,
  title: {
    display: false,
    text: 'Chart.js Bar Chart',
  },
  legend: {
    display: false,
  },
  tooltips: {
    mode: 'index',
    intersect: false,
  },
  hover: {
    mode: 'nearest',
    intersect: true,
  },
  scales: {
    xAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          // labelString: "Date"
        },
      },
    ],
    yAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Progress',
        },
      },
    ],
  },
};

class ProgressChart extends PureComponent {
  render() {
    const { progressData } = this.props;
    const barData = {
      labels: [],
      datasets: [],
    };

    if (
      Object.prototype.hasOwnProperty.call(progressData, 'labels')
    ) {
      // progressData.hasOwnProperty('labels')) {
      barData.labels = progressData.labels;
    }

    if (
      Object.prototype.hasOwnProperty.call(progressData, 'data')
      // progressData.hasOwnProperty('data')
    ) {
      barData.datasets = [
        {
          label: 'Site Progress',
          data: progressData.data,

          backgroundColor: '#00628E',
          borderColor: '#00628E',
          fill: true,

          borderWidth: 1,
        },
      ];
    }
    return (
      <Bar
        data={barData}
        width={100}
        height={400}
        options={{ ...options, maintainAspectRatio: false }}
      />
    );
  }
}

export default ProgressChart;
