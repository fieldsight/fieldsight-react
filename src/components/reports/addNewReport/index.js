import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMetricsData } from '../../../actions/reportActions';
import InputElement from '../../common/InputElement';
import CustomSelect from '../CustomSelect';
// import CustomMultiSelect from '../CustomMultiSelect';
import Metrics from './metrics';
// import DataFilter from './dataFilter';
import SelectedColumn from './selectedColumn';
/* eslint-disable */

class AddNewReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        reportName: '',
        desc: '',
        selectedReportType: '',
        selectedMetrics: [],
      },
      reportType: [],
      metrics: [],
      metricArr: [],
      siteInfoArr: [],
      formInfoArr: [],
      usersArr: [],
      toggleSelectClass: false,
      collapseClass: false,
      // loader: false,
      submissionType: {},
      submissions: [],
      userList: [],
    };
  }

  componentWillMount() {
    this.props.getMetricsData('137');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.reportReducer !== this.props.reportReducer) {
      this.setState({
        reportType: this.props.reportReducer.reportTypes,
        metrics: this.props.reportReducer.metrics,
      });
    }
    if (prevState.submissions !== this.state.submissions) {
      this.setState({});
    }
  }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState(state => ({
      data: {
        ...state.data,
        [name]: value,
      },
    }));
  };

  handleToggleClass = () => {
    this.setState(({ toggleSelectClass }) => ({
      toggleSelectClass: !toggleSelectClass,
    }));
  };

  handleToggleCollapse = () => {
    this.setState(({ collapseClass }) => ({
      collapseClass: !collapseClass,
    }));
  };

  handleChecKUser = (e, user) => {
    const {
      target: { name, checked },
    } = e;

    this.setState(state => {
      if (checked) {
        const newList = this.state.data.selectedMetrics.filter(
          i => i.code !== name,
        );
        return {
          userList: [...state.userList, user],
          data: {
            ...state.data,
            selectedMetrics: [...newList, user],
          },
        };
      }
      if (!checked) {
        const newList = this.state.data.selectedMetrics.filter(
          i => i.code !== name,
        );

        const filteredUser = state.userList.filter(
          u => u.code !== name,
        );
        return {
          userList: filteredUser,
          data: {
            ...state.data,
            selectedMetrics: [...newList, filteredUser],
          },
        };
      }
      return null;
    });
  };

  handleReportTypeChange = e => {
    const { value } = e.target;
    this.setState(
      state => ({
        data: {
          ...state.data,
          selectedReportType: JSON.parse(value),
        },
      }),
      () => {
        const {
          metrics,
          data: { selectedReportType },
        } = this.state;
        const metricsArr = metrics.filter(metric =>
          metric.types.includes(selectedReportType),
        );

        this.setState({
          metricArr: metricsArr.filter(
            item => item.category === 'default',
          ),
          siteInfoArr: metricsArr.filter(
            item => item.category === 'site_information',
          ),
          formInfoArr: metricsArr.filter(
            item => item.category === 'form_information',
          ),
          usersArr: metricsArr.filter(
            item => item.category === 'users',
          ),
        });
      },
    );
  };

  handleSubmissionType = type => {
    this.setState({ submissionType: type });
  };

  handleCheckSubmissionType = e => {
    const {
      target: { name, checked },
    } = e;

    const { submissionType, data, submissions } = this.state;
    this.setState(state => {
      if (checked) {
        const newList = data.selectedMetrics.filter(
          i => i.code !== name,
        );
        return {
          submissions: [...state.submissions, submissionType],
          data: {
            ...state.data,
            selectedMetrics: [...newList, submissionType],
          },
        };
      }
      if (!checked) {
        const newList = data.selectedMetrics.filter(
          i => i.code !== name,
        );
        const filterSubmission = submissions.filter(
          type => type.code !== name,
        );
        return {
          submissions: filterSubmission,
          data: {
            ...state.data,
            selectedMetrics: [...newList, filterSubmission],
          },
        };
      }
      return null;
    });
  };

  handleCheckChildren = (e, data, child) => {
    const { checked } = e.target;
    const { submissions } = this.state;

    this.setState(() => {
      if (checked) {
        const newSubmissions = submissions.map(sub => {
          if (sub.code === data.code) {
            const children = [...sub.children, child];
            return { ...sub, children };
          }
          return { sub };
        });
        return {
          submissions: newSubmissions,
        };
      }
      if (!checked) {
        const filteredData = submissions.map(sub => {
          if (sub.code === data.code) {
            const ch = sub.children.filter(
              i => i.code !== child.code,
            );
            return { ...sub, children: ch };
          }
          return sub;
        });
        return {
          submissions: filteredData,
        };
      }
      return null;
    });
  };

  handleChangeArray = item => {
    this.setState(state => {
      const list = state.data.selectedMetrics;
      const filteredArr = list.filter(li => li.code !== item.code);
      const filteredUserArr = state.userList.filter(
        u => u.code !== item.code,
      );
      const filteredSubmissionArr = state.submissions.filter(
        s => s.code !== item.code,
      );
      return {
        data: {
          ...state.data,
          selectedMetrics: filteredArr,
        },
        userList: filteredUserArr,
        submissions: filteredSubmissionArr,
      };
    });
  };

  handleSelectChange = payload => {
    console.log('payload', payload);
  };

  render() {
    const {
      state: {
        data: {
          reportName,
          desc,
          selectedReportType,
          selectedMetrics,
        },
        reportType,
        metricArr,
        toggleSelectClass,
        submissionType,
        submissions,
        usersArr,
        userList,
      },
      props: {
        reportReducer: { reportLoader },
      },
    } = this;

    // console.log(selectedMetrics, 'state', submissions, userList);

    return (
      <div className="reports mrb-30">
        <div className="card">
          <div className="card-body">
            <div className="report-generator">
              <h3 className="mb-3">New report</h3>
              <div className="filter-all-header">
                <form
                  className="floating-form "
                  onSubmit={e => {
                    e.preventDefault();
                  }}
                >
                  <InputElement
                    formType="editForm"
                    tag="input"
                    type="text"
                    required
                    label="Report Name"
                    name="reportName"
                    value={reportName}
                    changeHandler={this.handleChange}
                  />
                  <InputElement
                    formType="editForm"
                    tag="input"
                    type="text"
                    required
                    label="Description"
                    name="desc"
                    value={desc}
                    changeHandler={this.handleChange}
                  />
                  <div className="report-type">
                    <div className="row">
                      <div className="col-lg-3 col-md-4">
                        <div className="form-group inline-form-group">
                          <label className="">Report type</label>
                          {!reportLoader && (
                            <CustomSelect
                              toggleSelectClass={toggleSelectClass}
                              handleToggleClass={
                                this.handleToggleClass
                              }
                              name={reportType.filter(
                                each =>
                                  each.id === selectedReportType,
                              )}
                              options={reportType}
                              value={selectedReportType}
                              handleSelect={
                                this.handleReportTypeChange
                              }
                            />
                          )}
                        </div>
                      </div>
                      <div className="col-lg-9 col-md-8">
                        <button
                          className="common-button is-disable is-icon pull-right is-bg"
                          type="button"
                          onClick={() => {
                            this.handleToggleCollapse();
                          }}
                        >
                          <i className="material-icons">
                            filter_list
                          </i>
                          <span>collapse all</span>
                          <i className="material-icons arrow-icon">
                            expand_more
                          </i>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="report-accordion">
                <div className="row ">
                  <Metrics
                    data={metricArr}
                    users={usersArr}
                    userList={userList}
                    submissionType={submissionType}
                    submissions={submissions}
                    handleSubmissionType={this.handleSubmissionType}
                    handleCheckSubmissionType={
                      this.handleCheckSubmissionType
                    }
                    handleCheckChildren={this.handleCheckChildren}
                    handleCheckUser={this.handleChecKUser}
                  />
                  <SelectedColumn
                    selected={selectedMetrics}
                    handleSelectChange={this.handleSelectChange}
                    // handleParentChange={this.handleCheckReportType}
                    handleCheckSubmissionType={this.handleChangeArray}
                    handleCheckChildren={this.handleCheckChildren}
                  />
                </div>
              </div>
              {/* <DataFilter
                toggleSelectClass={toggleSelectClass}
                handleToggleClass={this.handleToggleClass}
                checkboxOption={checkboxOption}
                handleCheck={this.handleCheckReportType}
                selectedArr={selectedReportType}
              /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ reportReducer }) => ({
  reportReducer,
});

export default connect(mapStateToProps, {
  getMetricsData,
})(AddNewReport);
