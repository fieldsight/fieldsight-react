import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import axios from 'axios';
import FormDataFilter from './FormDataFilter';

export default class Templates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      general: false,
      scheduled: false,
      survey: false,
      staged: false,
      generalData: [],
      scheduledData: [],
      surveyData: [],
      stagedData: [],
      id: '',
      customReports: [],
      standardReports: [],
      formButton: false,
    };
  }

  componentDidMount() {
    const { id } = this.props;
    this.setState({
      id,
    });
    axios
      .get(`/v4/api/reporting/reports-list/${id}/?type=custom`)
      .then(res => {
        this.setState({
          customReports: res.data.custom_reports,
          standardReports: res.data.standard_reports,
        });
      });
  }

  reportHandeler = data => {
    axios
      .get(
        `/v4/api/reporting/project-form-data/${this.state.id}/?form_type=${data}`,
      )
      .then(res => {
        if (data === 'general') {
          this.setState({
            generalData: res.data,
          });
        }
        if (data === 'scheduled') {
          this.setState({
            scheduledData: res.data,
          });
        }
        if (data === 'survey') {
          this.setState({
            surveyData: res.data,
          });
        }
        if (data === 'stage') {
          this.setState({
            stagedData: res.data,
          });
        }
      })
      .catch();
  };

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
          if (this.state.general) {
            this.reportHandeler('general');
          }
        },
      );
    }
    if (result === 'scheduled') {
      this.setState(
        preveState => ({
          general: preveState.general,
          scheduled: !preveState.scheduled,
          survey: preveState.survey,
          staged: preveState.staged,
        }),
        () => {
          if (this.state.scheduled) {
            this.reportHandeler('scheduled');
          }
        },
      );
    }
    if (result === 'survey') {
      this.setState(
        preveState => ({
          general: preveState.general,
          scheduled: preveState.scheduled,
          survey: !preveState.survey,
          staged: preveState.staged,
        }),
        () => {
          if (this.state.survey) {
            this.reportHandeler('survey');
          }
        },
      );
    }
    if (result === 'stage') {
      this.setState(
        preveState => ({
          general: preveState.general,
          scheduled: preveState.scheduled,
          survey: preveState.survey,
          staged: !preveState.staged,
        }),
        () => {
          if (this.state.staged) {
            this.reportHandeler('stage');
          }
        },
      );
    }
  };

  handleForm = () => {
    this.setState(preState => ({
      formButton: !preState.formButton,
    }));
  };

  render() {
    const {
      general,
      scheduled,
      survey,
      staged,
      generalData,
      scheduledData,
      surveyData,
      stagedData,
      customReports,
      standardReports,
      formButton,
    } = this.state;
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
        link: `/fieldsight/project/report/summary/${this.state.id}/`,
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
        {!formButton && (
          <div className="card-body">
            <div className="standard-tempalte">
              <h2 className="my-3">Standard</h2>
              {standardReports.length > 0 &&
                standardReports.map(standardReport => (
                  <div
                    className="report-list"
                    key={standardReport.title}
                  >
                    <div className="row">
                      <div className="col-md-12">
                        <div className="report-content">
                          <h4>{standardReport.title}</h4>
                          <p>{standardReport.description}</p>
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
                            <i className="material-icons">
                              more_vert
                            </i>
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
                            <i className="material-icons">
                              more_vert
                            </i>
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
                ))}

              <div className="report-list">
                <div className="row">
                  <div className="col-md-8">
                    <div className="report-content">
                      <a
                        tabIndex="0"
                        role="button"
                        onKeyDown={this.handleForm}
                        onClick={this.handleForm}
                      >
                        Form Data
                      </a>

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
                            {generalData.length > 0 ? (
                              generalData.map(genInfo => (
                                <p key={genInfo.id}>
                                  {genInfo.title}
                                </p>
                              ))
                            ) : (
                              <p>No Data</p>
                            )}
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
                            {scheduledData.length > 0 ? (
                              scheduledData.map(scheinfo => (
                                <p key={scheinfo.id}>
                                  {scheinfo.title}
                                </p>
                              ))
                            ) : (
                              <p>No Data</p>
                            )}
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
                            {surveyData.length > 0 ? (
                              surveyData.map(surData => (
                                <p key={surData.id}>
                                  {surData.title}
                                </p>
                              ))
                            ) : (
                              <p>No Data</p>
                            )}
                          </div>
                        </li>
                        <li>
                          <a
                            tabIndex="0"
                            role="button"
                            onKeyDown={() => {
                              this.toggleTab('stage');
                            }}
                            onClick={() => {
                              this.toggleTab('stage');
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
                            {stagedData.length > 0 ? (
                              stagedData.map(satData => (
                                <ul key={satData.id}>
                                  <li>{satData.name}</li>
                                  <li>
                                    {satData.sub_stages.map(sub => (
                                      <ul>
                                        <li>{sub.form_name}</li>
                                      </ul>
                                    ))}
                                  </li>
                                </ul>
                              ))
                            ) : (
                              <p>No Data</p>
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
              {customReports.length > 0 &&
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
                ))}
            </div>
          </div>
        )}
        {formButton && (
          <FormDataFilter
            handleForm={this.handleForm}
            id={this.state.id}
          />
        )}
      </>
    );
  }
}
