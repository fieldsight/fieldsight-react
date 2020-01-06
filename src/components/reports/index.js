import React, { Component } from 'react';

import ReportList from './reportList';
import AddNewReport from './addNewReport';
/* eslint-disable */

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: 'reportList',
      formData: {},
    };
  }

  toggleSection = (section, data) => {
    this.setState(() => {
      if (data && section === 'addReport') {
        return { activeSection: section, formData: data };
      }
      return { activeSection: section, formData: {} };
    });
  };

  render() {
    const { activeSection, formData } = this.state;
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
            data={formData}
          />
        )}
      </>
    );
  }
}

export default Reports;
