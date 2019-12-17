import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
/* eslint-disable  */

export default class Templates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      general: false,
      scheduled: false,
      survey: false,
      staged: false,
    };
  }

  toggleTab = result => {
    if (result === 'general') {
      this.setState(
        preveState => ({
          general: !preveState.general,
          scheduled: preveState.scheduled,
          survey: preveState.survey,
          staged: preveState.staged,
        }),
        () => {
          console.log(this.state.general, '------');
        },
      );
    }
    if (result === 'scheduled') {
      this.setState(preveState => ({
        general: preveState.general,
        scheduled: !preveState.scheduled,
        survey: preveState.survey,
        staged: preveState.staged,
      }));
    }
    if (result === 'survey') {
      this.setState(preveState => ({
        general: preveState.general,
        scheduled: preveState.scheduled,
        survey: !preveState.survey,
        staged: preveState.staged,
      }));
    }
    if (result === 'staged') {
      this.setState(preveState => ({
        general: preveState.general,
        scheduled: preveState.scheduled,
        survey: preveState.survey,
        staged: !preveState.staged,
      }));
    }
  };

  render() {
    const { general, scheduled, survey, staged } = this.state;
    const DataCrude = [
      {
        id: '1',
        title: 'Edit',
        link: '#',
      },
      {
        id: '2',
        title: 'Add a template',
        link: '#',
      },
      {
        id: '3',
        title: 'Share',
        link: '#',
      },
      {
        id: '4',
        title: 'Delete',
        link: '#',
      },
    ];
    return (
      <div className="card-body">
        <div className="standard-tempalte">
          <h2 className="my-3">Standard</h2>
          <div className="report-list">
            <div className="row">
              <div className="col-md-12">
                <div className="report-content">
                  <h4>Project Summary</h4>
                  <p>
                    Contains high level overview of the project in
                    form of numbers, graphs and map..
                  </p>
                </div>
              </div>
            </div>
            <div className="dropdown report-option">
              <Dropdown drop="left">
                <Dropdown.Toggle
                  variant=""
                  id="dropdown-Data"
                  className="dropdown-toggle common-button no-border is-icon"
                >
                  <i className="material-icons">more_vert</i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                  {DataCrude.map(item => (
                    <Dropdown.Item
                      href={item.link}
                      key={item.id}
                      target="_blank"
                    >
                      {item.title}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="report-list">
            <div className="row">
              <div className="col-md-12">
                <div className="report-content">
                  <h4>Site Information</h4>
                  <p>
                    Export of key progress indicators like submission
                    count, status and site visits generated from
                    Staged Forms.
                  </p>
                </div>
              </div>
            </div>
            <div className="dropdown report-option">
              <Dropdown drop="left">
                <Dropdown.Toggle
                  variant=""
                  id="dropdown-Data"
                  className="dropdown-toggle common-button no-border is-icon"
                >
                  <i className="material-icons">more_vert</i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                  {DataCrude.map(item => (
                    <Dropdown.Item
                      href={item.link}
                      key={item.id}
                      target="_blank"
                    >
                      {item.title}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="report-list">
            <div className="row">
              <div className="col-md-12">
                <div className="report-content">
                  <h4>Progress Report</h4>
                  <p>
                    Export of key progress indicators like submission
                    count, status and site visits generated from
                    Staged Forms.
                  </p>
                </div>
              </div>
            </div>
            <div className="dropdown report-option">
              <Dropdown drop="left">
                <Dropdown.Toggle
                  variant=""
                  id="dropdown-Data"
                  className="dropdown-toggle common-button no-border is-icon"
                >
                  <i className="material-icons">more_vert</i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                  {DataCrude.map(item => (
                    <Dropdown.Item
                      href={item.link}
                      key={item.id}
                      target="_blank"
                    >
                      {item.title}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="report-list">
            <div className="row">
              <div className="col-md-8">
                <div className="report-content">
                  <h4>Form Data</h4>
                  <p>
                    Export of forms data and site information an Excel
                    File, generated with filters in region, types and
                    time range.
                  </p>
                  <ul className="form-data">
                    <li>
                      <a
                        tabIndex="0"
                        role="button"
                        onKeyDown={() => {
                          this.toggleTab('general');
                        }}
                        onClick={() => {
                          this.toggleTab('general');
                        }}
                      >
                        general forms
                      </a>

                      <div
                        className="form-data-list"
                        style={
                          general === true
                            ? { display: 'block' }
                            : { display: 'none' }
                        }
                      >
                        <p>Testing yet again</p>
                        <p>Retrofiting Go/No-Go with Measurement</p>
                        <p>TSC Visitors - STFC</p>
                        <p>Corrective Action App</p>
                        <p>Baseline Survey</p>
                      </div>
                    </li>
                    <li>
                      <a
                        tabIndex="0"
                        role="button"
                        onKeyDown={() => {
                          this.toggleTab('scheduled');
                        }}
                        onClick={() => {
                          this.toggleTab('scheduled');
                        }}
                      >
                        scheduled forms
                      </a>
                      <div
                        className="form-data-list"
                        style={
                          scheduled === true
                            ? { display: 'block' }
                            : { display: 'none' }
                        }
                      >
                        <p>Testing yet again</p>
                        <p>Retrofiting Go/No-Go with Measurement</p>
                        <p>TSC Visitors - STFC</p>
                        <p>Corrective Action App</p>
                        <p>Baseline Survey</p>
                      </div>
                    </li>
                    <li>
                      <a
                        tabIndex="0"
                        role="button"
                        onKeyDown={() => {
                          this.toggleTab('survey');
                        }}
                        onClick={() => {
                          this.toggleTab('survey');
                        }}
                      >
                        survey forms
                      </a>
                      <div
                        className="form-data-list"
                        style={
                          survey === true
                            ? { display: 'block' }
                            : { display: 'none' }
                        }
                      >
                        <p>Testing yet again</p>
                        <p>Retrofiting Go/No-Go with Measurement</p>
                        <p>TSC Visitors - STFC</p>
                        <p>Corrective Action App</p>
                        <p>Baseline Survey</p>
                      </div>
                    </li>
                    <li>
                      <a
                        tabIndex="0"
                        role="button"
                        onKeyDown={() => {
                          this.toggleTab('staged');
                        }}
                        onClick={() => {
                          this.toggleTab('staged');
                        }}
                      >
                        staged forms
                      </a>
                      <div
                        className="form-data-list"
                        style={
                          staged === true
                            ? { display: 'block' }
                            : { display: 'none' }
                        }
                      >
                        <p>Testing yet again</p>
                        <p>Retrofiting Go/No-Go with Measurement</p>
                        <p>TSC Visitors - STFC</p>
                        <p>Corrective Action App</p>
                        <p>Baseline Survey</p>
                      </div>
                    </li>
                  </ul>
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
        <div>
          {console.log(this.state.general, 'general')}
          <button
            type="button"
            onClick={() => this.setState({ general: true })}
          >
            example
          </button>
        </div>
        <div className="custom-template">
          <h2 className="my-3">custom</h2>
          <div className="report-list">
            <div className="row">
              <div className="col-md-8">
                <div className="report-content">
                  <h4>RF Strongbacks Ground Floor</h4>
                  <p>
                    Export of key progress indicators like submission
                    count, status and site visits generated from
                    Staged Forms.
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
                    <h6>Added by</h6>
                    <ul className="shared-list">
                      <li>Santosh khanal</li>
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
                    Export of key progress indicators like submission
                    count, status and site visits generated from
                    Staged Forms.
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
                    <h6>Added by</h6>
                    <ul className="shared-list">
                      <li>Santosh khanal</li>
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
                    Export of key progress indicators like submission
                    count, status and site visits generated from
                    Staged Forms.
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
                    <h6>Added by</h6>
                    <ul className="shared-list">
                      <li>Santosh khanal</li>
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
    );
  }
}
