import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { Dropdown } from 'react-bootstrap';
import format from 'date-fns/format';
import axios from 'axios';
import SelectElement from '../common/SelectElement';
import { errorToast, successToast } from '../../utils/toastHandler';

/* eslint-disable camelcase */

export default class UserExportReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: [{ id: '', label: '----' }],
      startedDate: '',
      endedDate: '',
      Userselected: '',
      preview_endedDate: '',
      preview_startedDate: '',

      //   project: 'Project',
    };
  }

  componentDidMount() {
    const {
      props: {
        match: {
          params: { id },
        },
      },
      state: { userType },
    } = this;
    axios
      .get(`/fieldsight/api/project_managers/${id}/`)
      .then(req => {
        const newArr = userType;

        this.setState(() => {
          if (req.data !== undefined) {
            req.data.map(each => newArr.push(each));
          }
          return {
            userType: newArr,
          };
        });
      })
      .catch();
  }

  onEndChangeHandler = date => {
    this.setState({
      endedDate: date,
    });
  };

  onChangeHandler = date => {
    this.setState({
      startedDate: date,
    });
  };

  toUpper = str => {
    return str
      .toLowerCase()
      .split(' ')
      .map(function(word) {
        return word[0].toLowerCase() + word.substr(1);
      })
      .join('_');
  };

  handleApply = e => {
    e.preventDefault();

    const {
      props: {
        match: {
          params: { id },
        },
        location: {
          state: { fromDashboard },
        },
      },

      state: { startedDate, endedDate },
    } = this;

    const data = {
      start_date: format(startedDate, ['YYYY-MM-DD']),
      end_date: format(endedDate, ['YYYY-MM-DD']),
    };

    const route = this.toUpper(fromDashboard);

    axios
      .post(
        `/v4/api/reporting/generate-standard-reports/${id}/?report_type=${route}`,
        data,
      )
      .then(req => {
        if (req.status === 200) {
          successToast(req.data.message);
        }
      })
      .catch(err => {
        const error = err.response.data;
        Object.entries(error).map(([key, value]) => {
          return errorToast(`${value}`);
        });
      });
  };

  onSelectChangeHandler = e => {
    const { value } = e.target;
    this.setState({
      Userselected: value,
    });
  };

  onChangeHandlerPreview = date => {
    this.setState({
      preview_startedDate: date,
    });
  };

  onEndChangeHandlerPreview = date => {
    this.setState({
      preview_endedDate: date,
    });
  };

  render() {
    const {
      state: {
        Userselected,
        startedDate,
        endedDate,

        preview_endedDate,
        preview_startedDate,
        userType,
      },
      onChangeHandler,
      onEndChangeHandler,
      onChangeHandlerPreview,
      onSelectChangeHandler,
      onEndChangeHandlerPreview,
      props: {
        match: {
          params: { id },
        },
      },
    } = this;

    // const {
    //     params: { id },
    //   } = this.props.match;

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

    // const {
    //   match: {
    //     params: { id },
    //   },
    // } = this.props;

    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={`/project-dashboard/${id}/report`}>
                Report
              </Link>
            </li>
            <li className="breadcrumb-item">Export Data</li>
          </ol>
        </nav>
        <div className="reports mrb-30">
          <div className="card">
            <div className="card-body">
              <div className="standard-tempalte">
                <h3 className="mb-3">Template report</h3>

                <div className="report-list">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="report-content">
                        <h4>Export Data</h4>

                        <p>
                          Export of User Activities in a selected time
                          interval.
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
                <div className="data-filter mt-3">
                  <h3 className="mb-3">Activity Report</h3>

                  <form>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group icon-between">
                          <label className="mb-2">Time period</label>
                          <div className="inline-flex ">
                            <div className="custom-group">
                              <DatePicker
                                placeholderText="Start Date"
                                name="startedDate"
                                selected={startedDate}
                                onChange={onChangeHandler}
                                dateFormat="yyyy-MM-dd"
                                className="form-control"
                              />
                            </div>
                            <span className="icon-between">
                              <i className="material-icons">
                                arrow_right_alt
                              </i>
                            </span>
                            <div className="custom-group">
                              <DatePicker
                                placeholderText="End Date"
                                name="endedDate"
                                selected={endedDate}
                                onChange={onEndChangeHandler}
                                className="form-control"
                                dateFormat="yyyy-MM-dd"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <button
                          // disabled
                          type="button"
                          className="common-button mt-3 is-bg"
                          onClick={this.handleApply}
                        >
                          Generate
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="data-filter mt-3">
                  <h3 className="mb-3">Individual Activity Report</h3>

                  <form>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group icon-between">
                          <label className="mb-2">Time period</label>
                          <div className="inline-flex ">
                            <div className="custom-group">
                              <DatePicker
                                placeholderText="Start Date"
                                name="startedDate"
                                selected={preview_startedDate}
                                onChange={onChangeHandlerPreview}
                                dateFormat="yyyy-MM-dd"
                                className="form-control"
                              />
                            </div>
                            <span className="icon-between">
                              <i className="material-icons">
                                arrow_right_alt
                              </i>
                            </span>
                            <div className="custom-group">
                              <DatePicker
                                placeholderText="End Date"
                                name="endedDate"
                                selected={preview_endedDate}
                                onChange={onEndChangeHandlerPreview}
                                className="form-control"
                                dateFormat="yyyy-MM-dd"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-6">
                        <div className="form-group">
                          {/* <label className="mb-2"></label> */}
                          <SelectElement
                            className="form-control"
                            label="Select User"
                            translation
                            options={userType}
                            changeHandler={onSelectChangeHandler}
                            value={Userselected}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <a
                          href={`/fieldsight/user/report/activity/${id}/${Userselected}/${format(
                            preview_startedDate,
                            ['YYYY-MM-DD'],
                          )}/${format(preview_endedDate, [
                            'YYYY-MM-DD',
                          ])}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button
                            // disabled
                            type="button"
                            className="common-button mt-3 is-bg"
                          >
                            Preview
                          </button>
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
