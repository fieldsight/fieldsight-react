import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import {
  getMetricsData,
  getForms,
  getFormQuestions,
} from '../../../actions/reportActions';
import InputElement from '../../common/InputElement';
import {
  errorToast,
  successToast,
} from '../../../utils/toastHandler';
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
        formInfo: {
          selectedFormType: '',
          selectedForm: '',
          selectedIndividualForm: '',
          selectedQuestions: [],
          selectedValue: [],
        },
      },
      reportType: [],
      metrics: [],
      metricArr: [],
      siteInfoArr: [],
      formInfoArr: [],
      formTypeArr: [],
      usersArr: [],
      individualFormArr: [],
      toggleSelectClass: {
        reportType: false,
        siteType: false,
        siteValue: false,
        formType: false,
        formValue: false,
        formQuestSelect: false,
        submissionCount: false,
      },
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
      formValues: [],
      selectedFormValue: '',
      formQuestions: [],
      formSubmissionCounts: [],
    };
  }

  componentWillMount() {
    this.props.getMetricsData('137');
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.reportReducer.reportTypes !==
      this.props.reportReducer.reportTypes
    ) {
      this.setState({
        reportType: this.props.reportReducer.reportTypes,
      });
    }
    if (
      prevProps.reportReducer.metrics !==
      this.props.reportReducer.metrics
    ) {
      this.setState({ metrics: this.props.reportReducer.metrics });
    }
    if (
      prevProps.reportReducer.metaAttributes !==
      this.props.reportReducer.metaAttributes
    ) {
      this.setState({
        metaAttributes: this.props.reportReducer.metaAttributes,
      });
    }
    if (
      prevProps.reportReducer.formTypes !==
      this.props.reportReducer.formTypes
    ) {
      this.setState({
        formTypes: this.props.reportReducer.formTypes,
      });
    }
    if (
      prevProps.reportReducer.forms !== this.props.reportReducer.forms
    ) {
      this.setState({ formTypeArr: this.props.reportReducer.forms });
    }
    if (
      prevProps.reportReducer.formQuestions !==
      this.props.reportReducer.formQuestions
    ) {
      this.setState({
        formQuestions: this.props.reportReducer.formQuestions,
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

  handleToggleClass = toggleFor => {
    this.setState({
      toggleSelectClass: {
        ...this.state.toggleSelectClass,
        [toggleFor]: !this.state.toggleSelectClass[toggleFor],
      },
    });
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
          individualFormArr: metricsArr.filter(
            item => item.category === 'individual_form',
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
        if (metric.code && metric.value && !metric.value.code) {
          if (metric.code === item.code) {
            if (
              metric.value.selectedIndividualForm &&
              item.value.selectedIndividualForm
            ) {
              if (
                metric.value.selectedIndividualForm.id ===
                item.value.selectedIndividualForm
              ) {
                return true;
              } else {
                return false;
              }
            }
          }
        }
        if (metric.code && metric.value && metric.value.code) {
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
          formInfo: {
            selectedFormType: '',
            selectedForm: '',
            selectedIndividualForm: '',
          },
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

  handleFormTypeChange = (e, item) => {
    // const { value } = e.target;
    this.setState(
      state => ({
        data: {
          ...state.data,
          formInfo: {
            ...state.data.formInfo,
            selectedFormType: item,
          },
        },
      }),
      () => {
        const {
          selectedFormType: { code },
        } = this.state.data.formInfo;

        this.props.getForms('137', code);
      },
    );
  };

  handleFormSelected = (e, item) => {
    // const { value } = e.target;
    this.setState(
      state => ({
        data: {
          ...state.data,
          formInfo: {
            ...state.data.formInfo,
            selectedFormType: {
              ...state.data.formInfo.selectedFormType,
              value: { selectedForm: item },
            },
            selectedForm: item,
          },
        },
      }),
      () => {
        const {
          selectedForm: { id },
        } = this.state.data.formInfo;
        this.props.getFormQuestions('137', id);
      },
    );
  };

  handleIndividualFormSelected = (e, item) => {
    // const { value } = e.target;
    this.setState(
      state => {
        const {
          data: { formInfo },
        } = state;
        const newValue = {
          ...formInfo.selectedFormType.value,
          selectedIndividualForm: item,
        };
        const newSelectedType = {
          ...formInfo.selectedFormType,
          value: {
            ...newValue,
          },
        };
        return {
          data: {
            ...state.data,
            selectedMetrics: [
              ...state.data.selectedMetrics,
              newSelectedType,
            ],
            formInfo: {
              ...state.data.formInfo,
              selectedFormType: newSelectedType,
              selectedIndividualForm: item,
            },
          },
        };
      },
      () => {
        // console.log('object', this.state.data);
        // this.props.getFormQuestions('137', this.state.data.formInfo.selectedForm);
      },
    );
  };

  handleFormValueSelected = e => {
    const { value } = e.target;
    this.setState({
      selectedFormValue: JSON.parse(value),
    });
  };

  handleSelectChange = data => {
    this.setState(state => ({
      data: {
        ...state.data,
        selectedMetrics: data,
      },
    }));
  };

  handleSubmitReport = () => {
    const { data } = this.state;
    const body = {
      type: data.selectedReportType,
      description: data.desc,
      title: data.reportName,
      attributes: { ...data.selectedMetrics },
    };
    Axios.post(`/v4/api/reporting/add-report/499/`, body)
      .then(res => {
        if (res.data) {
          successToast('Report', 'created');
        }
      })
      .catch(err => {
        const errors = err.response;
        errorToast(errors.data.error);
      });
  };

  render() {
    const {
      state: {
        data: {
          reportName,
          desc,
          selectedReportType,
          selectedMetrics,
          formInfo: {
            selectedFormType,
            selectedForm,
            selectedIndividualForm,
          },
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
        formTypeArr,
        formValues,
        formQuestions,
        individualFormArr,
      },
      props: {
        reportReducer: { reportLoader },
      },
    } = this;

    // console.log('index', this.state.individualFormArr, '-----');

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
                              handleToggleClass={() =>
                                this.handleToggleClass('reportType')
                              }
                              toggleType="reportType"
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
                    handleToggleClass={this.handleToggleClass}
                    toggleSelectClass={toggleSelectClass}
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
                    formTypeArr={formTypeArr}
                    selectedForm={selectedForm}
                    handleFormSelected={this.handleFormSelected}
                    formQuestions={formQuestions}
                    individualFormArr={individualFormArr}
                    selectedIndividualForm={selectedIndividualForm}
                    handleIndividualFormSelected={
                      this.handleIndividualFormSelected
                    }
                  />
                  <SelectedColumn
                    selected={selectedMetrics}
                    handleSelectChange={this.handleSelectChange}
                    handleCheckSubmissionType={this.handleChangeArray}
                    handleSubmitReport={this.handleSubmitReport}
                  />
                  <div className="col-lg-6">
                    <button
                      type="button"
                      className="common-button is-bg"
                      onClick={() => {
                        this.handleSubmitReport();
                      }}
                    >
                      Add Report
                    </button>
                  </div>
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
  getFormQuestions,
})(AddNewReport);
