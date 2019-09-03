import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
const options = {
  responsive: true,
  title: {
    display: false,
    text: "Chart.js Bar Chart"
  },
  legend: {
    display: false
  },
  tooltips: {
    mode: "index",
    intersect: false
  },
  hover: {
    mode: "nearest",
    intersect: true
  },
  scales: {
    xAxes: [
      {
        display: true,
        scaleLabel: {
          display: true
          // labelString: "Date"
        }
      }
    ],
    yAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Progress"
        }
      }
    ]
  }
};

class ProgressChart extends Component {
  render() {
    const { progressData } = this.props;
    const barData = {
      labels: [],
      datasets: []
    };

    if (progressData.hasOwnProperty("labels")) {
      barData.labels = progressData.labels;
    }

    if (progressData.hasOwnProperty("data")) {
      barData.datasets = [
        {
          label: "Site Progress",
          data: progressData.data,

          backgroundColor: "#00628E",
          borderColor: "#00628E",
          fill: true,

          borderWidth: 1
        }
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
