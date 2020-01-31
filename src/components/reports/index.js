import React, { PureComponent } from 'react';

import ReportList from './reportList';
/* eslint-disable */

class Reports extends PureComponent {
  render() {
    const { projectId } = this.props;

    return <ReportList id={projectId} history={this.props.history} />;
  }
}

export default Reports;
