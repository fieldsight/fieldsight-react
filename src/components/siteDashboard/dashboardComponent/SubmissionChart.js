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

    if (submissionData.approved_submissions.hasOwnProperty("labels")) {
      chartData.labels = submissionData.approved_submissions.labels;
    }

    if (submissionData.approved_submissions.hasOwnProperty("data")) {
      chartData.datasets = [
        ...chartData.datasets,
        {
          label: "Approved Submissions",
          data: submissionData.approved_submissions.data,
          backgroundColor: "#28a745",
          borderColor: "#28a745",
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
          backgroundColor: "#ffc107",
          borderColor: "#ffc107",
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
          backgroundColor: "#00628E",
          borderColor: "#00628E",
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
          backgroundColor: "#fc5661",
          borderColor: "#fc5661",
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
          backgroundColor: "",
          borderColor: "",
          fill: false,
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

export default SubmissionChart;
