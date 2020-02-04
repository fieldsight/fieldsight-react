import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyReports from './MyReports';
import ShareWithMe from './SharedWithMe';
import Templates from './templates/index';

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
                // tabIndex="0"
                role="presentation"
                onClick={() => {
                  this.toggleTab('myReports');
                }}
                onKeyDown={() => {
                  this.toggleTab('myReports');
                }}
              >
                My Reports
              </li>
              <li
                className={
                  activeTab === 'sharedWithMe' ? 'current' : ''
                }
                // tabIndex="0"
                role="presentation"
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
                // tabIndex="0"
                role="presentation"
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
            {activeTab === 'myReports' && (
              <Link
                to={`/project/${id}/add-report`}
                className="common-button no-border is-icon"
              >
                <i className="material-icons">add_circle</i>
                <span>New report</span>
              </Link>
            )}
          </div>
          {activeTab === 'myReports' && <MyReports id={id} />}
          {activeTab === 'sharedWithMe' && <ShareWithMe id={id} />}
          {activeTab === 'templates' && (
            <Templates id={id} history={this.props.history} />
          )}
        </div>
      </div>
    );
  }
}

export default ReportList;
