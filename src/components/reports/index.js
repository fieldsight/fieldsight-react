import React, { Component } from 'react';
import MyReports from './MyReports';
import ShareWithMe from './SharedWithMe';
import Templates from './templates';
/* eslint-disable */

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'myReports',
    };
  }

  toggleTab = result => {
    if (result === 'myReports') {
      this.setState(
        {
          activeTab: 'myReports',
        },
        () => console.log(this.state),
      );
    }
    if (result === 'sharedWithMe') {
      this.setState(
        {
          activeTab: 'sharedWithMe',
        },
        () => console.log(this.state),
      );
    }
    if (result === 'templates') {
      this.setState(
        {
          activeTab: 'templates',
        },
        () => console.log(this.state),
      );
    }
  };

  render() {
    const { activeTab } = this.state;
    return (
      <div className="reports mrb-30">
        <div className="card">
          <div className="reports-header mt-4">
            <ul className="common-tab is-bg">
              <li
                className={activeTab === 'myReports' ? 'current' : ''}
              >
                <a
                  tabIndex="0"
                  role="button"
                  onKeyDown={() => {
                    this.toggleTab('myReports');
                  }}
                  onClick={() => {
                    this.toggleTab('myReports');
                  }}
                >
                  My reports
                </a>
              </li>
              <li
                className={
                  activeTab === 'sharedWithMe' ? 'current' : ''
                }
              >
                <a
                  tabIndex="0"
                  role="button"
                  onKeyDown={() => {
                    this.toggleTab('sharedWithMe');
                  }}
                  onClick={() => {
                    this.toggleTab('sharedWithMe');
                  }}
                >
                  shared with me
                </a>
              </li>
              <li
                className={activeTab === 'templates' ? 'current' : ''}
              >
                <a
                  tabIndex="0"
                  role="button"
                  onKeyDown={() => {
                    this.toggleTab('templates');
                  }}
                  onClick={() => {
                    this.toggleTab('templates');
                  }}
                >
                  templates
                </a>
              </li>
            </ul>
            <button
              type="button"
              className="common-button no-border is-icon"
            >
              <i className="material-icons">add_circle</i>
              <span>New report</span>
            </button>
          </div>
          {activeTab === 'myReports' && <MyReports />}
          {activeTab === 'sharedWithMe' && <ShareWithMe />}
          {activeTab === 'templates' && <Templates />}
        </div>
      </div>
    );
  }
}

export default Reports;
