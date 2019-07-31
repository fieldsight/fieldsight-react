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
          labelString: "Number Of Submissions"
        }
      }
    ]
  }
};

class SubmissionChart extends Component {
  render() {
    const { submissionData } = this.props;

    const chartData = {
      labels: [],
      datasets: []
    };

    const submissionDataKeys = Object.keys(submissionData);

    if (submissionDataKeys.length > 0) {
      if (submissionData.approved_submissions.hasOwnProperty("labels")) {
        chartData.labels = submissionData.approved_submissions.labels;
      }

      if (submissionData.approved_submissions.hasOwnProperty("data")) {
        chartData.datasets = [
          ...chartData.datasets,
          {
            label: "Approved Submissions",
            data: submissionData.approved_submissions.data,
            backgroundColor: "rgba(40,167,69, 1)",
            borderColor: "rgba(40,167,69, 1)",
            fill: false,
            borderWidth: 1
          }
        ];
      }

      if (submissionData.flagged_submissions.hasOwnProperty("data")) {
        chartData.datasets = [
          ...chartData.datasets,
          {
            label: "Flagged Submissions",
            data: submissionData.flagged_submissions.data,
            backgroundColor: "rgba(255,193,7, 1)",
            borderColor: "rgba(255,193,7, 1)",
            fill: false,
            borderWidth: 1
          }
        ];
      }

      if (submissionData.pending_submissions.hasOwnProperty("data")) {
        chartData.datasets = [
          ...chartData.datasets,
          {
            label: "Pending Submissions",
            data: submissionData.pending_submissions.data,
            backgroundColor: "rgba(0,98,142, 1)",
            borderColor: "rgba(0,98,142, 1)",
            fill: false,
            borderWidth: 1
          }
        ];
      }

      if (submissionData.rejected_submissions.hasOwnProperty("data")) {
        chartData.datasets = [
          ...chartData.datasets,
          {
            label: "Rejected Submissions",
            data: submissionData.rejected_submissions.data,
            backgroundColor: "rgba(252,86,97, 1)",
            borderColor: "rgba(252,86,97, 1)",
            fill: false,
            borderWidth: 1
          }
        ];
      }

      if (submissionData.total_submissions.hasOwnProperty("data")) {
        chartData.datasets = [
          ...chartData.datasets,
          {
            label: "Total Submissions",
            data: submissionData.total_submissions.data,
            backgroundColor: "#800080",
            borderColor: "#800080",
            fill: false,
            borderWidth: 1
          }
        ];
      }
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

export default SubmissionChart;
