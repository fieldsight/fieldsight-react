import React, { PureComponent } from 'react';

class MyReports extends PureComponent {
  render() {
    return (
      <div className="reports mrb-30">
        <div className="card">
          <div className="reports-header mt-4">
            <ul className="common-tab is-bg">
              <li className="current">My reports</li>
              <li>shared with me</li>
              <li>templates</li>
            </ul>
            <button
              type="button"
              className="common-button no-border is-icon"
            >
              <i className="material-icons">add_circle</i>
              <span>New report</span>
            </button>
          </div>
          <div className="card-body">
            <div className="report-list">
              <div className="row">
                <div className="col-md-8">
                  <div className="report-content">
                    <h4>Retrofitting Go/No-Go with Measurement</h4>
                    <p>
                      Export of key progress indicators like
                      submission count, status and site visits
                      generated from Staged Forms.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="report-share-time">
                    <div className="report-item created-time">
                      <h6>Date Created</h6>
                      <p>October 17th 2019</p>
                      <time>10:17:03 am</time>
                    </div>
                    <div className="report-item share-report">
                      <h6>Shared with</h6>
                      <ul className="shared-list">
                        <li>Santosh khanal</li>
                        <li>Jasica standford</li>
                        <li>Khusbu basnet</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dropdown report-option">
                <button
                  type="button"
                  className="dropdown-toggle common-button no-border is-icon"
                  data-toggle="dropdown"
                >
                  <i className="material-icons">more_vert</i>
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  <a className="dropdown-item" href="#">
                    Edit
                  </a>
                  <a className="dropdown-item" href="#">
                    Add a template
                  </a>
                  <a className="dropdown-item" href="#">
                    Share
                  </a>
                  <a className="dropdown-item" href="#">
                    Delete
                  </a>
                </div>
              </div>
            </div>
            <div className="report-list">
              <div className="row">
                <div className="col-md-8">
                  <div className="report-content">
                    <h4>Retrofitting Go/No-Go with Measurement</h4>
                    <p>
                      Export of key progress indicators like
                      submission count, status and site visits
                      generated from Staged Forms.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="report-share-time">
                    <div className="report-item created-time">
                      <h6>Date Created</h6>
                      <p>October 17th 2019</p>
                      <time>10:17:03 am</time>
                    </div>
                    <div className="report-item share-report">
                      <h6>Shared with</h6>
                      <ul className="shared-list">
                        <li>Santosh khanal</li>
                        <li>Jasica standford</li>
                        <li>Khusbu basnet</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dropdown report-option">
                <button
                  type="button"
                  className="dropdown-toggle common-button no-border is-icon"
                  data-toggle="dropdown"
                >
                  <i className="material-icons">more_vert</i>
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  <a className="dropdown-item" href="#">
                    Edit
                  </a>
                  <a className="dropdown-item" href="#">
                    Add a template
                  </a>
                  <a className="dropdown-item" href="#">
                    Share
                  </a>
                  <a className="dropdown-item" href="#">
                    Delete
                  </a>
                </div>
              </div>
            </div>
            <div className="report-list">
              <div className="row">
                <div className="col-md-8">
                  <div className="report-content">
                    <h4>Retrofitting Go/No-Go with Measurement</h4>
                    <p>
                      Export of key progress indicators like
                      submission count, status and site visits
                      generated from Staged Forms.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="report-share-time">
                    <div className="report-item created-time">
                      <h6>Date Created</h6>
                      <p>October 17th 2019</p>
                      <time>10:17:03 am</time>
                    </div>
                    <div className="report-item share-report">
                      <h6>Shared with</h6>
                      <ul className="shared-list">
                        <li>Santosh khanal</li>
                        <li>Jasica standford</li>
                        <li>Khusbu basnet</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dropdown report-option">
                <button
                  type="button"
                  className="dropdown-toggle common-button no-border is-icon"
                  data-toggle="dropdown"
                >
                  <i className="material-icons">more_vert</i>
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  <a className="dropdown-item" href="#">
                    Edit
                  </a>
                  <a className="dropdown-item" href="#">
                    Add a template
                  </a>
                  <a className="dropdown-item" href="#">
                    Share
                  </a>
                  <a className="dropdown-item" href="#">
                    Delete
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyReports;
