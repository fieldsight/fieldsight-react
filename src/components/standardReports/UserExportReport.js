import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import format from 'date-fns/format';
import axios from 'axios';
import SelectElement from '../common/SelectElement';
import { errorToast, successToast } from '../../utils/toastHandler';
import FilterByDate from '../customReports/common/FilterByDate';
import CollapseFilterTable from '../customReports/common/CollapseFilterTable';
import { excelExport } from '../../actions/templateAction';

/* eslint-disable camelcase */

let statusLoaded = '';

class UserExportReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: [{ id: '', label: '----' }],
      startedDate: '',
      endedDate: new Date(),
      Userselected: '',
      preview_endedDate: new Date(),
      preview_startedDate: '',
      showPreview: false,
      taskId: '',
      fileToDownload: '',
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

  onSelectChangeHandler = e => {
    const { value } = e.target;
    this.setState({
      Userselected: value,
    });
  };

  onChangeHandlerPreview = date => {
    const { preview_endedDate } = this.state;
    this.setState(() => {
      if (preview_endedDate && date > preview_endedDate) {
        return {
          preview_endedDate: date,
        };
      }
      return {
        preview_startedDate: date,
      };
    });
  };

  onEndChangeHandlerPreview = date => {
    const { preview_startedDate } = this.state;
    this.setState(() => {
      if (date < preview_startedDate) {
        return {
          preview_startedDate: date,
        };
      }
      return {
        preview_endedDate: date,
      };
    });
  };

  // handleExcelExport = () => {
  //   const { fileToDownload } = this.state;
  //   // this.props.excelExport(taskId);
  // };

  render() {
    const {
      state: {
        Userselected,
        startedDate,
        endedDate,
        fileToDownload,
        preview_endedDate,
        preview_startedDate,
        showPreview,
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
                        <FilterByDate
                          className="form-group icon-between"
                          startDate={startedDate && startedDate}
                          endDate={endedDate}
                          startDateHandler={onChangeHandler}
                          endDateHandler={onEndChangeHandler}
                          // createdDate={new Date()}
                          tillDate={new Date()}
                        />
                      </div>

                      <div className="col-md-12">
                        <button
                          disabled={statusLoaded === false}
                          type="button"
                          className="common-button mt-3 is-bg"
                          onClick={e => {
                            this.handleApply(e);
                          }}
                        >
                          {statusLoaded === false
                            ? 'Downloading'
                            : 'Generate'}
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
                        <FilterByDate
                          className="form-group icon-between"
                          startDate={
                            preview_startedDate && preview_startedDate
                          }
                          endDate={preview_endedDate}
                          startDateHandler={onChangeHandlerPreview}
                          endDateHandler={onEndChangeHandlerPreview}
                          // createdDate={new Date()}
                          tillDate={new Date()}
                        />
                      </div>

                      <div className="col-lg-3 col-md-6">
                        <div className="form-group">
                          {/* <label className="mb-2"></label> */}
                          <SelectElement
                            className="form-control"
                            label="Select User"
                            formType="editForm"
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
                          className={`common-button mt-3 is-bg ${
                            !Userselected ? 'is-disable' : ''
                          }`}
                        >
                          Preview
                        </a>
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
})(UserExportReport);
