import React, { Component } from 'react';

export default class ReportDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'hello',
    };
  }

  render() {
    return <h1>{this.state.data}</h1>;
  }
}
