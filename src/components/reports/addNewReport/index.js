import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getMetricsData,
  getForms,
  getFormValues,
  getFormQuestions,
  getFormSubmissionCount,
} from '../../../actions/reportActions';
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
        selectedFormType: '',
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
      metaAttributes: [],
      selectedMetas: [],
      siteValues: [],
      selectedValue: [],
      formTypes: [],
      forms: [],
      formValues: [],
      formQuestions: [],
      formSubmissionCounts: [],
    };
  }

  componentWillMount() {
    this.props.getMetricsData('137');
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reportReducer !== this.props.reportReducer) {
      this.setState({
        reportType: this.props.reportReducer.reportTypes,
        metrics: this.props.reportReducer.metrics,
        metaAttributes: this.props.reportReducer.metaAttributes,
        formTypes: this.props.reportReducer.formTypes,
      });
    }
  }

  handleAddValue = () => {
    const {
      selectedMetas,
      selectedValue,
      data: { selectedMetrics },
    } = this.state;
    const newArr = [];
    let filteredMetrics = [];

    this.setState(state => {
      if (
        selectedMetas.length > 0 &&
        selectedValue &&
        selectedValue.length > 0
      ) {
        selectedMetas.map(meta => {
          selectedValue.map(value => {
            newArr.push({ ...meta, value });
          });
        });
        filteredMetrics = selectedMetrics.filter(i => !i.value);

        const arr = [...filteredMetrics, ...newArr];
        return {
          data: {
            ...state.data,
            selectedMetrics: arr,
          },
        };
      }

      if (selectedValue && selectedValue.length === 0) {
        filteredMetrics = selectedMetrics.filter(s => !s.value);
        return {
          data: {
            ...state.data,
            selectedMetrics: filteredMetrics,
          },
        };
      }
      if (selectedMetas && selectedMetas.length === 0) {
        filteredMetrics = selectedMetrics.filter(s => !s.value);
        return {
          data: {
            ...state.data,
            selectedMetrics: filteredMetrics,
          },
          selectedValue: [],
        };
      }
    });
  };

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
            selectedMetrics: newList,
          },
        };
      }
      return null;
    });
  };

  handleFormTypeChange = e => {
    const { value } = e.target;

    this.setState(state => ({
      data: {
        ...state.data,
        selectedFormType: value,
      },
    }));
  };

  handleReportTypeChange = e => {
    const { value } = e.target;
    this.setState(
      state => ({
        data: {
          ...state.data,
          selectedReportType: JSON.parse(value),
          selectedMetrics: [],
        },
        submissions: [],
        userList: [],
        selectedMetas: [],
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
            selectedMetrics: newList,
          },
        };
      }
      return null;
    });
  };

  handleChangeArray = item => {
    this.setState(state => {
      const list = state.data.selectedMetrics;
      const filteredArr = list.filter(metric => {
        if (metric.code && metric.value) {
          if (metric.code === item.code) {
            if (metric.value.code !== item.value.code) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        }
        if (metric.code && !metric.value) {
          if (metric.code !== item.code) {
            return true;
          } else {
            return false;
          }
        }
      });

      const metaList = [];
      filteredArr.map(f => {
        if (f.value) {
          metaList.push(f.code);
        }
      });
      const filteredSelectedMetas = state.selectedMetas.filter(m =>
        metaList.includes(m.code),
      );

      const filteredMetaArr = state.selectedValue.filter(v => {
        return filteredArr.map(f => {
          if (f.value) {
            if (f.value.code === v.code) {
              return true;
            } else {
              return false;
            }
          }
        });
      });
      // debugger;
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
        selectedMetas: filteredSelectedMetas,
        selectedValue: filteredMetaArr,
        siteValues:
          filteredSelectedMetas.length > 0
            ? this.state.siteValues
            : [],
      };
    });
  };

  handleChangeMeta = (e, meta, value) => {
    if (meta && Object.keys(meta).length > 0) {
      this.handleMetaCheck(e, meta);
    }
    if (value && Object.keys(value).length > 0) {
      this.handleValueCheck(e, value);
    }
  };

  handleMetaCheck = (e, meta) => {
    const { selectedMetas } = this.state;
    const { name, checked } = e.target;
    this.setState(
      state => {
        if (checked) {
          return {
            selectedMetas: [...state.selectedMetas, meta],
          };
        }
        if (!checked) {
          const filterMetas = selectedMetas.filter(
            type => type.code !== name,
          );
          return {
            selectedMetas: filterMetas,
          };
        }
      },
      () => {
        this.handleAddValue();
        const { selectedMetas } = this.state;
        const arr = [];
        selectedMetas.map(each => {
          if (
            each.type === 'Text' ||
            each.type === 'FormSubStat' ||
            each.type === 'MCQ' ||
            each.type === 'Date' ||
            each.type === 'FormQuestionAnswerStatus '
          ) {
            arr.push('text');
          }
          if (each.type === 'Form ' && each.input_type === 'Text') {
            arr.push('text');
          }
          if (
            each.type === 'Number' ||
            each.type === 'FormSubCountQuestion'
          ) {
            arr.push('number');
          }
        });
        if (arr.length > 0) {
          if (arr.includes('text')) {
            this.handleTextValueTypes();
          } else {
            this.handleAllValueTypes();
          }
        } else {
          this.setState({ siteValues: [] });
        }
      },
    );
  };

  handleAllValueTypes = () => {
    const { siteInfoArr } = this.state;
    let filteredSiteValues = [];
    if (siteInfoArr.length > 0) {
      siteInfoArr.map(site => {
        filteredSiteValues.push(site);
      });
    }
    this.setState({ siteValues: filteredSiteValues });
  };

  handleTextValueTypes = () => {
    const { siteValues, siteInfoArr } = this.state;
    let filteredSiteValues = [];
    const someArr = siteValues;
    if (siteInfoArr.length > 0) {
      siteInfoArr.map(info => {
        if (someArr.length > 0) {
          filteredSiteValues = someArr.filter(some => {
            if (
              some.code === 'actual' ||
              some.code === 'most_common' ||
              some.code === 'all_values'
            ) {
              return true;
            } else {
              return false;
            }
          });
        } else {
          if (
            info.code === 'actual' ||
            info.code === 'most_common' ||
            info.code === 'all_values'
          ) {
            filteredSiteValues.push(info);
          }
        }
      });
    }

    this.setState({ siteValues: filteredSiteValues });
  };

  handleValueCheck = (e, item) => {
    const { checked } = e.target;
    const { selectedValue } = this.state;
    this.setState(
      state => {
        if (checked) {
          return {
            selectedValue: [...state.selectedValue, item],
          };
        }
        if (!checked) {
          const newMetasArr = selectedValue.filter(
            s => s.code !== item.code,
          );
          return {
            selectedValue: newMetasArr,
          };
        }
      },
      () => {
        this.handleAddValue();
      },
    );
  };

  handleSelectChange = data => {
    console.log('object', data);
  };

  render() {
    const {
      state: {
        data: {
          reportName,
          desc,
          selectedReportType,
          selectedMetrics,
          selectedFormType,
        },
        reportType,
        metricArr,
        toggleSelectClass,
        submissionType,
        submissions,
        usersArr,
        userList,
        metaAttributes,
        selectedMetas,
        siteValues,
        formTypes,
      },
      props: {
        reportReducer: { reportLoader },
      },
    } = this;

    // console.log(
    //   this.state.selectedMetrics,
    //   'state value',
    //   siteInfoArr,
    // );
    // console.log('index', selectedMetrics, '-----');

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
                    siteValues={siteValues}
                    metaAttributes={metaAttributes}
                    selectedMetas={selectedMetas}
                    handleSelectMeta={this.handleChangeMeta}
                    submissionType={submissionType}
                    submissions={submissions}
                    handleSubmissionType={this.handleSubmissionType}
                    handleCheckSubmissionType={
                      this.handleCheckSubmissionType
                    }
                    handleCheckUser={this.handleChecKUser}
                    selectedMetrics={selectedMetrics}
                    formTypes={formTypes}
                    selectedFormType={selectedFormType}
                    handleFormTypeCheck={this.handleFormTypeChange}
                  />
                  <SelectedColumn
                    selected={selectedMetrics}
                    handleSelectChange={this.handleSelectChange}
                    handleCheckSubmissionType={this.handleChangeArray}
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
  getForms,
  getFormValues,
  getFormQuestions,
  getFormSubmissionCount,
})(AddNewReport);
