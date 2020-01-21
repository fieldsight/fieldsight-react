import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyReports from './MyReports';
import ShareWithMe from './SharedWithMe';
import Templates from './templates';
/* eslint-disable */

class ReportList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'myReports',
    };
  }

  toggleTab = result => {
    this.setState({ activeTab: result });
  };

  render() {
    const { activeTab } = this.state;
    const { id } = this.props;
    return (
      <div className="reports mrb-30">
        <div className="card">
          <div className="reports-header mt-4">
            <ul className="common-tab is-bg">
              <li
                className={activeTab === 'myReports' ? 'current' : ''}
                onClick={() => {
                  this.toggleTab('myReports');
                }}
                onKeyDown={() => {
                  this.toggleTab('myReports');
                }}
                tabIndex="0"
                role="button"
              >
                My Reports
              </li>
              <li
                className={
                  activeTab === 'sharedWithMe' ? 'current' : ''
                }
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
              </li>
              <li
                className={activeTab === 'templates' ? 'current' : ''}
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
              </li>
            </ul>
            <Link
              to={`/project/${id}/add-report`}
              className="common-button no-border is-icon"
            >
              <i className="material-icons">add_circle</i>
              <span>New report</span>
            </Link>
          </div>
          {activeTab === 'myReports' && <MyReports id={id} />}
          {activeTab === 'sharedWithMe' && <ShareWithMe id={id} />}
          {activeTab === 'templates' && <Templates id={id} />}
        </div>
      </div>
    );
  }
}

export default ReportList;
