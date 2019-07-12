import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

  const data = {
    labels: ['2019-04-01', '2019-04-02', '2019-04-03', '2019-04-04', '2019-04-05', '2019-04-06', '2019-04-07', '2019-04-08', '2019-04-09', '2019-04-10', '2019-04-11', '2019-04-12'],
    datasets: [{
        // label: '# of Votes',
        data: [2, 3, 5, 8, 10, 12,14, 16, 18, 20, 22, 24],
        backgroundColor: '',
        borderColor: '#00628E',
        fill: false,
        steppedLine: true,
        borderWidth: 1
    }],
    options: {
        responsive: true,
        title: {
            display: false,
            text: 'Chart.js Line Chart'
        },
        legend: {
            display: false
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Date'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Number Of Submissions'
                }
            }]
        }
    }
  };
class SubmissionChart extends Component {
  render() {
    return (
        <Line
        data={data}
        width={100}
        height={400}
        options={{ ...data.options, maintainAspectRatio: false }}
        />
    );
  }
}


export default SubmissionChart;