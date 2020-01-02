import React, { Component } from 'react';

import ReportList from './reportList';
import AddNewReport from './addNewReport';
/* eslint-disable */

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: 'reportList',
    };
  }

  toggleSection = section => {
    this.setState({ activeSection: section });
  };

  render() {
    const { activeSection } = this.state;
    const { projectId } = this.props;
    return (
      <>
        {activeSection === 'reportList' && (
          <ReportList
            toggleSection={this.toggleSection}
            id={projectId}
          />
        )}
        {activeSection === 'addReport' && (
          <AddNewReport
            toggleSection={this.toggleSection}
            id={projectId}
          />
        )}
      </>
    );
  }
}

export default Reports;
