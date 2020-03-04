import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import format from 'date-fns/format';
import axios from 'axios';
import RadioElement from '../common/RadioElement';
import { errorToast, successToast } from '../../utils/toastHandler';
import FilterByDate from '../customReports/common/FilterByDate';
import CollapseFilterTable from '../customReports/common/CollapseFilterTable';
import { excelExport } from '../../actions/templateAction';
/* eslint-disable  react/destructuring-assignment */

let statusLoaded = '';

class ActivityExportFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduleType: 'Daily',
      startedDate: '',
      endedDate: '',
      project: 'Project',
      showPreview: false,
      taskId: '',
      fileToDownload: '',
    };
  }

  componentDidUpdate(prevProps) {
    const { taskId } = this.state;
    const { templateReducer } = this.props;
    if (
      prevProps.templateReducer.exportExcel !==
      templateReducer.exportExcel
    ) {
      const resp = templateReducer.exportExcel;
      if (resp.task_status !== 'Completed') {
        setInterval(this.props.excelExport(taskId), 5000);
      } else {
        this.setDownloadFile(resp.file_url);
      }
    }
  }

  setDownloadFile = file => {
    this.setState({ fileToDownload: file, showPreview: true });
    statusLoaded = true;
  };

  handleYearlyChange = e => {
    const { value } = e.target;

    this.setState(() => {
      if (value === 'Daily') {
        return {
          scheduleType: value,
        };
      }
      if (value === 'Weekly') {
        return {
          scheduleType: value,
        };
      }
      if (value === 'Monthly') {
        return {
          scheduleType: value,
        };
      }
      return null;
    });
  };

  onEndChangeHandler = date => {
    const { startedDate } = this.state;
    this.setState(() => {
      if (date < startedDate) {
        return {
          startedDate: date,
        };
      }
      return {
        endedDate: date,
      };
    });
  };

  onChangeHandler = date => {
    const { endedDate } = this.state;
    this.setState(() => {
      if (endedDate && date > endedDate) {
        return {
          endedDate: date,
        };
      }
      return {
        startedDate: date,
      };
    });
  };

  toUpper = str => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => {
        return word[0].toLowerCase() + word.substr(1);
      })
      .join('_');
  };

  handleApply = e => {
    e.preventDefault();

    const {
      props: {
        match: {
          params: { id, reportType },
        },
        // location: {
        //   state: { fromDashboard },
        // },
      },
      state: { startedDate, endedDate, scheduleType, project },
    } = this;
    const user = 'u';
    const reportTitle = decodeURI(reportType);
    const data = {
      start_date: format(startedDate, ['YYYY-MM-DD']),
      end_date: format(endedDate, ['YYYY-MM-DD']),
      ...(reportTitle === 'Activity Report' && {
        type: scheduleType,
      }),
      ...(reportTitle === 'Project Logs' && {
        type: project,
      }),
      ...(reportTitle === 'User Activity Report' && {
        type: `${user}${project}`,
      }),
    };

    const route = this.toUpper(reportTitle);

    axios
      .post(
        `/v4/api/reporting/generate-standard-reports/${id}/?report_type=${route}`,
        data,
      )
      .then(req => {
        if (req.status === 200) {
          successToast(req.data.message);
          this.props.excelExport(req.data.task_id);
          statusLoaded = false;
          this.setState({
            taskId: req.data.task_id,
          });
        }
      })
      .catch(err => {
        const error = err.response.data;
        Object.entries(error).map(([key, value]) => {
          return errorToast(`${value}`);
        });
      });
  };

  handleExcelExport = () => {
    const { taskId } = this.state;
    this.props.excelExport(taskId);
  };

  render() {
    const {
      state: {
        scheduleType,
        startedDate,
        endedDate,
        showPreview,
        fileToDownload,
      },
      props: {
        match: {
          params: { id, reportType },
        },
      },
      onChangeHandler,
      onEndChangeHandler,
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

    const reportTitle = decodeURI(reportType);

    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={`/project/${id}/report`}>Report</Link>
            </li>
            <li className="breadcrumb-item">Export Data</li>
          </ol>
        </nav>
        <div className="reports mrb-30">
          <div className="card">
            <div className="card-body">
              <div className="standard-tempalte">
                <h3 className="mb-3">Project report</h3>

                <div className="report-list">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="report-content">
                        <h4>Export Data</h4>
                        {reportTitle === 'Activity Report' && (
                          <p>
                            Export of site visits, submissions and
                            active users in a selected time interval.
                          </p>
                        )}

                        {reportTitle === 'Project Logs' && (
                          <p>
                            Export of all the logs in the project in a
                            selected time interval.
                          </p>
                        )}
                        {reportTitle === 'User Activity Report' && (
                          <p>
                            Export of User Activities in a selected
                            time interval.
                          </p>
                        )}
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
                  <h3 className="mb-3">Filters</h3>
                  <form>
                    {reportTitle === 'Activity Report' && (
                      <div className="form-group checkbox-group">
                        <label>Select Report Type:</label>
                        <div className="custom-checkbox display-inline">
                          <RadioElement
                            label="Daily"
                            name="scheduleType"
                            value="Daily"
                            changeHandler={this.handleYearlyChange}
                            checked={scheduleType === 'Daily'}
                          />
                          <RadioElement
                            label="Weekly"
                            name="scheduleType"
                            value="Weekly"
                            changeHandler={this.handleYearlyChange}
                            checked={scheduleType === 'Weekly'}
                          />
                          <RadioElement
                            label="Monthly"
                            name="scheduleType"
                            value="Monthly"
                            changeHandler={this.handleYearlyChange}
                            checked={scheduleType === 'Monthly'}
                          />
                        </div>
                      </div>
                    )}

                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <FilterByDate
                          className="form-group icon-between"
                          startDate={startedDate && startedDate}
                          endDate={endedDate}
                          startDateHandler={onChangeHandler}
                          endDateHandler={onEndChangeHandler}
                          // createdDate={new Date(projectCreatedOn)}
                          tillDate={new Date()}
                        />
                      </div>

                      <div className="col-md-12">
                        <button
                          disabled={statusLoaded === false}
                          type="button"
                          className="common-button mt-3 is-bg"
                          onClick={this.handleApply}
                        >
                          {statusLoaded === false
                            ? 'Downloading'
                            : 'Apply'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {showPreview && (
                <CollapseFilterTable
                  id={id}
                  type="standard"
                  excelFileToDownload={fileToDownload}
                />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ templateReducer }) => ({
  templateReducer,
});

export default connect(mapStateToProps, {
  excelExport,
})(ActivityExportFile);
