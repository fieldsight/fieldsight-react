import React, { Component } from "react";
import { Line } from "react-chartjs-2";
const options = {
  responsive: true,
  title: {
    display: false,
    text: "Chart.js Line Chart"
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
          display: true,
          labelString: "Date"
        }
      }
    ],
    yAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Site Progress"
        }
      }
    ]
  }
};

class ProgressChart extends Component {
  render() {
    const { progressData } = this.props;
    const chartData = {
      labels: [],
      datasets: []
    };

    if (progressData.hasOwnProperty("labels")) {
      chartData.labels = progressData.labels;
    }

    if (progressData.hasOwnProperty("data")) {
      chartData.datasets = [
        {
          label: "Site Progress",
          data: progressData.data,

          backgroundColor: "",
          borderColor: "#00628E",
          fill: true,

          borderWidth: 1
        }
      ];
    }
    return (
      <Line
        data={chartData}
        width={100}
        height={400}
        options={{ ...options, maintainAspectRatio: false }}
      />
    );
  }
}

export default ProgressChart;
