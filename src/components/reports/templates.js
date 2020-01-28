import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from '../common/Loader';
import { DotLoader } from '../myForm/Loader';

import {
  getReportList,
  getFormType,
} from '../../actions/templateAction';

/* eslint-disable react/jsx-indent */

class Templates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      general: false,
      scheduled: false,
      survey: false,
      staged: false,
      id: '',
    };
  }

  componentDidMount() {
    const { id } = this.props;

    this.setState({
      id,
    });

    this.props.getReportList(id);
  }

  generalhandle = result => {
    const {
      translationReducer: { generalData },
    } = this.props;

    const { general, id } = this.state;
    if (
      result === 'general' &&
      !general &&
      generalData.length === 0
    ) {
      this.props.getFormType(id, result);
    }
    this.setState(prevState => ({
      general: !prevState.general,
      scheduled: false,
      survey: false,
      staged: false,
    }));
  };

  scheduledhandle = result => {
    const {
      translationReducer: { scheduledData },
    } = this.props;

    const { scheduled, id } = this.state;
    if (
      result === 'scheduled' &&
      !scheduled &&
      scheduledData.length === 0
    ) {
      this.props.getFormType(id, result);
    }
    this.setState(prevState => ({
      general: false,
      scheduled: !prevState.scheduled,
      survey: false,
      staged: false,
    }));
  };

  surveyhandle = result => {
    const {
      translationReducer: { surveyData },
    } = this.props;

    const { survey, id } = this.state;
    if (result === 'survey' && !survey && surveyData.length === 0) {
      this.props.getFormType(id, result);
    }
    this.setState(prevState => ({
      general: false,
      scheduled: false,
      survey: !prevState.survey,
      staged: false,
    }));
  };

  stagedhandle = result => {
    const {
      translationReducer: { stagedData },
    } = this.props;

    const { staged, id } = this.state;
    if (result === 'stage' && !staged && stagedData.length === 0) {
      this.props.getFormType(id, result);
    }
    this.setState(prevState => ({
      general: false,
      scheduled: false,
      survey: false,
      staged: !prevState.staged,
    }));
  };

  render() {
    const {
      state: {
        general,
        scheduled,
        survey,
        staged,

        id,
      },
      props: {
        translationReducer: {
          generalData,
          scheduledData,
          surveyData,
          stagedData,
          customReports,
          standardReports,
          loader,
          formLoader,
        },
      },
    } = this;

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

    const projectSummery = [
      {
        id: '1',
        title: 'Preview Pdf',
        link: `/fieldsight/project/report/summary/${id}/`,
      },
    ];

    const siteInformation = [
      {
        id: '1',
        title: 'Generate  Excel',
        link: '#',
      },
    ];

    const formatDate = e => {
      const date = new Date(e);
      const dateIdx = date.getDate();
      const monthIndex = date.getMonth() + 1;
      const year = date.getFullYear();
      const time = date.toLocaleTimeString();

      return (
        <>
          <p>{` ${year}- ${monthIndex}-${dateIdx}`}</p>
          <p>{time}</p>
        </>
      );
    };

    return (
      <>
        <div className="card-body">
          <div className="standard-tempalte">
            <h2 className="my-3">Standard</h2>
            {loader &&
            standardReports !== undefined &&
            standardReports.length > 0 ? (
              standardReports.map(standardReport => (
                <div
                  className="report-list"
                  key={standardReport.title}
                >
                  <div className="row">
                    <div className="col-md-12">
                      <div className="report-content">
                        {standardReport.title ===
                          'Project Summary' && (
                          <a
                            href={`/fieldsight/project/report/summary/${id}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <h4>{standardReport.title}</h4>
                            <p>{standardReport.description}</p>
                          </a>
                        )}

                        {(standardReport.title ===
                          'Site Information' ||
                          standardReport.title ===
                            'Progress Report') && (
                          <>
                            <Link
                              to={{
                                pathname: `/export-data/${id}`,

                                state: {
                                  fromDashboard: standardReport.title,
                                },
                              }}
                            >
                              <h4>{standardReport.title}</h4>
                              <p>{standardReport.description}</p>
                            </Link>
                          </>
                        )}

                        {(standardReport.title ===
                          'Activity Report' ||
                          standardReport.title ===
                            'Project Logs') && (
                          <Link
                            to={{
                              pathname: `/user-export/${id}`,

                              state: {
                                fromDashboard: standardReport.title,
                              },
                            }}
                          >
                            <h4>{standardReport.title}</h4>
                            <p>{standardReport.description}</p>
                          </Link>
                        )}

                        {standardReport.title ===
                          'User Activity Report' && (
                          <Link
                            to={{
                              pathname: `/activity-export/${id}`,

                              state: {
                                fromDashboard: standardReport.title,
                              },
                            }}
                          >
                            <h4>{standardReport.title}</h4>
                            <p>{standardReport.description}</p>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                  {standardReport.title === 'Project Summary' ? (
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
                          {projectSummery.map(item => (
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
                  ) : (
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
                          {siteInformation.map(item => (
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
                  )}
                </div>
              ))
            ) : (
              <Loader />
            )}

            <div className="report-list">
              <div className="row">
                <div className="col-md-8">
                  <div className="report-content">
                    Form Data
                    <p>
                      Export of forms data and site information an
                      Excel File, generated with filters in region,
                      types and time range.
                    </p>
                    <ul className="form-data">
                      <li>
                        <a
                          tabIndex="0"
                          role="button"
                          onKeyDown={() => {
                            this.generalhandle('general');
                          }}
                          onClick={() => {
                            this.generalhandle('general');
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
                          {formLoader &&
                          generalData !== undefined &&
                          generalData.length > 0 ? (
                            generalData.map(genInfo => (
                              <p key={genInfo.id}>
                                <Link
                                  to={{
                                    pathname: `/form-data/${id}/${genInfo.id}`,

                                    state: {
                                      fromDashboard: genInfo.id,
                                    },
                                  }}
                                >
                                  {genInfo.title}
                                </Link>
                              </p>
                            ))
                          ) : (
                            <DotLoader />
                          )}
                        </div>
                      </li>
                      <li>
                        <a
                          tabIndex="0"
                          role="button"
                          onKeyDown={() => {
                            this.scheduledhandle('scheduled');
                          }}
                          onClick={() => {
                            this.scheduledhandle('scheduled');
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
                          {formLoader &&
                          scheduledData !== undefined &&
                          scheduledData.length > 0 ? (
                            scheduledData.map(scheinfo => (
                              <p key={scheinfo.id}>
                                <Link
                                  to={{
                                    pathname: `/form-data/${id}/${scheinfo.id}`,

                                    state: {
                                      fromDashboard: scheinfo.id,
                                    },
                                  }}
                                >
                                  {scheinfo.title}
                                </Link>
                              </p>
                            ))
                          ) : (
                            <DotLoader />
                          )}
                        </div>
                      </li>
                      <li>
                        <a
                          tabIndex="0"
                          role="button"
                          onKeyDown={() => {
                            this.surveyhandle('survey');
                          }}
                          onClick={() => {
                            this.surveyhandle('survey');
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
                          {formLoader &&
                          surveyData !== undefined &&
                          surveyData.length > 0 ? (
                            surveyData.map(surData => (
                              <p key={surData.id}>
                                <Link
                                  to={{
                                    pathname: `/form-data/${id}/${surData.id}`,

                                    state: {
                                      fromDashboard: surData.id,
                                    },
                                  }}
                                >
                                  {surData.title}
                                </Link>
                              </p>
                            ))
                          ) : (
                            <DotLoader />
                          )}
                        </div>
                      </li>
                      <li>
                        <a
                          tabIndex="0"
                          role="button"
                          onKeyDown={() => {
                            this.stagedhandle('stage');
                          }}
                          onClick={() => {
                            this.stagedhandle('stage');
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
                          {formLoader &&
                          stagedData !== undefined &&
                          stagedData.length > 0 ? (
                            stagedData.map(satData => (
                              <ul key={satData.id}>
                                <li>{satData.name}</li>
                                <li>
                                  {satData.sub_stages.map(sub => (
                                    <ul>
                                      <li key={sub.id}>
                                        <Link
                                          to={{
                                            pathname: `/form-data/${id}/${sub.id}`,

                                            state: {
                                              fromDashboard: sub.id,
                                            },
                                          }}
                                        >
                                          {sub.form_name}
                                        </Link>
                                      </li>
                                    </ul>
                                  ))}
                                </li>
                              </ul>
                            ))
                          ) : (
                            <DotLoader />
                          )}
                        </div>
                      </li>
                    </ul>
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
          </div>

          <div className="custom-template">
            <h2 className="my-3">custom</h2>
            {loader &&
              customReports !== undefined &&
              customReports.length > 0 &&
              customReports.map(custom => (
                <div className="report-list" key={custom.id}>
                  <div className="row">
                    <div className="col-md-8">
                      <div className="report-content">
                        <h4>{custom.title}</h4>
                        <p>{custom.description}</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="report-share-time">
                        <div className="report-item created-time">
                          <h6>Date Created</h6>
                          <>{formatDate(custom.created_at)}</>
                        </div>
                        <div className="report-item share-report">
                          <h6>Added by</h6>
                          <ul className="shared-list">
                            <li>{custom.owner_full_name}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ translationReducer }) => ({
  translationReducer,
});

export default connect(mapStateToProps, {
  getReportList,
  getFormType,
})(Templates);
