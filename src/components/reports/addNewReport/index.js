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
import Metrics from './metrics';
// import DataFilter from './dataFilter';
import SelectedColumn from './selectedColumn';
/* eslint-disable */

const InitialState = {
  data: {
    reportId: '',
    reportName: '',
    desc: '',
    selectedReportType: '',
    selectedMetrics: [],
    formInfo: {
      selectedFormType: '',
      selectedForm: '',
      selectedIndividualForm: [],
      selectedQuestions: [],
      formValue: [],
      selectedFormValue: [],
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
  formQuestions: [],
};

class AddNewReport extends Component {
  constructor(props) {
    super(props);
    this.state = InitialState;
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentWillMount() {
    this.props.getMetricsData(this.props.id);
    // document.addEventListener('click', this.handleClickOutside);
  }

  componentDidMount() {
    if (this.props.data && Object.keys(this.props.data).length > 0) {
      const { data: report } = this.props;
      const reportId = report.id;
      const userList = report.attributes.filter(
        r => r.category === 'users',
      );
      const submissions = report.attributes.filter(
        r => r.category === 'default',
      );
      let selectedFormType = {};
      let selectedForm = {};
      let selectedIndividualForm = [];
      const selectedQuestions = [];
      const selectedFormValue = [];
      const selectedMetas = [];
      const selectedValue = [];

      report.attributes.map(r => {
        if (r.value && !r.value.selectedForm) {
          const { code, type, id, value, label } = r;
          if (selectedMetas.length > 0) {
            selectedMetas.map(meta => {
              if (meta.code !== code) {
                selectedMetas.push({ code, type, id, label });
              }
            });
          }
          if (selectedMetas.length === 0) {
            selectedMetas.push({ code, type, id, label });
          }
          if (selectedValue.length === 0) {
            selectedValue.push({ ...value });
          }
          if (selectedValue.length > 0) {
            selectedValue.map(s => {
              if (s.code !== value.code) {
                selectedValue.push({ ...value });
              }
            });
          }
        }
        if (r.value && r.value.selectedForm) {
          const { code, id, value, label } = r;
          selectedFormType = { code, id, label };
          selectedForm = value.selectedForm;
          if (value.selectedIndividualForm) {
            const {
              category,
              code,
              types,
              label,
            } = value.selectedIndividualForm;
            if (selectedIndividualForm.length === 0) {
              selectedIndividualForm.push({
                category,
                code,
                types,
                label,
              });
            }
            if (selectedIndividualForm.length === 0) {
              selectedIndividualForm.map(i => {
                if (i.code !== code) {
                  selectedIndividualForm.push({
                    category,
                    code,
                    types,
                    label,
                  });
                }
              });
            }
          }
          if (value.selectedQuestion) {
            const { type, name, form } = value.selectedQuestion;
            if (selectedQuestions.length === 0) {
              selectedQuestions.push({ type, name });
            }
            if (selectedQuestions.length > 0) {
              selectedQuestions.map(q => {
                if (q.name !== value.selectedQuestion.name) {
                  selectedQuestions.push({ type, name });
                }
              });
            }
            if (selectedFormValue.length === 0) {
              selectedFormValue.push({ ...form });
            }
            if (selectedFormValue.length > 0) {
              selectedFormValue.map(v => {
                if (v.code !== value.selectedQuestion.form.code) {
                  selectedFormValue.push({ ...form });
                }
              });
            }
          }
        }
      });
      this.setState(
        state => ({
          data: {
            ...state.data,
            reportId,
            reportName: report.title,
            desc: report.description,
            selectedReportType: report.type,
            selectedMetrics: report.attributes,
            formInfo: {
              ...state.data.formInfo,
              selectedFormType,
              selectedForm,
              selectedIndividualForm,
              selectedQuestions,
              selectedFormValue,
            },
          },
          userList,
          submissions,
          selectedMetas,
          selectedValue,
          collapseClass: true,
        }),
        () => {
          this.props.getForms(this.props.id, selectedFormType.code);
          this.props.getFormQuestions(this.props.id, selectedForm.id);
        },
      );
    }
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
      this.setState(
        { metrics: this.props.reportReducer.metrics },
        () => {
          this.setArrays();
        },
      );
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

  componentWillUnmount() {
    // document.removeEventListener('click', this.handleClickOutside);
  }

  clearState() {
    this.setState({ ...InitialState }, () => {
      this.props.toggleSection('reportList');
    });
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside = () => {
    this.setState({
      toggleSelectClass: {
        reportType: false,
        siteType: false,
        siteValue: false,
        formType: false,
        formValue: false,
        formQuestSelect: false,
        submissionCount: false,
      },
    });
  };

  handleToggleClass = toggleFor => {
    this.setState(state => ({
      toggleSelectClass: {
        ...state.toggleSelectClass,
        [toggleFor]: !state.toggleSelectClass[toggleFor],
      },
    }));
  };

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
          return selectedValue.map(value => {
            return newArr.push({ ...meta, value });
          });
        });
        filteredMetrics = selectedMetrics.filter(i => {
          if (!i.value) {
            return true;
          }
          if (i.value && i.value.selectedForm) {
            return true;
          }
          return false;
        });

        const arr = [...filteredMetrics, ...newArr];
        return {
          data: {
            ...state.data,
            selectedMetrics: arr,
          },
        };
      }

      if (selectedValue && selectedValue.length === 0) {
        filteredMetrics = selectedMetrics.filter(i => {
          if (!i.value) {
            return true;
          }
          if (i.value && i.value.selectedForm) {
            return true;
          }
          return false;
        });
        return {
          data: {
            ...state.data,
            selectedMetrics: filteredMetrics,
          },
        };
      }
      if (selectedMetas && selectedMetas.length === 0) {
        filteredMetrics = selectedMetrics.filter(i => {
          if (!i.value) {
            return true;
          }
          if (i.value && i.value.selectedForm) {
            return true;
          }
          return false;
        });
        return {
          data: {
            ...state.data,
            selectedMetrics: filteredMetrics,
          },
          selectedValue: [],
        };
      }
      return null;
    });
  };

  handleAddFormValue = valueFor => {
    const {
      data: {
        formInfo: {
          selectedFormType,
          selectedForm,
          selectedQuestions,
          selectedFormValue,
          selectedIndividualForm,
        },
        selectedMetrics,
      },
    } = this.state;

    const newArr = [];
    const newIndividualFormArr = [];
    let filteredMetrics = [];
    this.setState(state => {
      if (
        valueFor === 'selectedIndividualForm' &&
        selectedIndividualForm.length > 0
      ) {
        selectedIndividualForm.map(i => {
          const val = {
            selectedForm,
            selectedIndividualForm: i,
          };
          return newIndividualFormArr.push({
            ...selectedFormType,
            value: val,
          });
        });
        filteredMetrics = selectedMetrics.filter(i => {
          if (i.value && i.value.selectedIndividualForm) {
            return false;
          }
          return true;
        });
        const arr = [...filteredMetrics, ...newIndividualFormArr];
        return {
          data: {
            ...state.data,
            selectedMetrics: arr,
          },
        };
      }
      if (
        valueFor === 'selectedIndividualForm' &&
        selectedIndividualForm.length === 0
      ) {
        filteredMetrics = selectedMetrics.filter(i => {
          if (i.value && i.value.selectedIndividualForm) {
            return false;
          }
          return true;
        });
        return {
          data: {
            ...state.data,
            selectedMetrics: filteredMetrics,
          },
        };
      }
      if (
        valueFor === 'selectedValue' &&
        selectedQuestions.length > 0 &&
        selectedFormValue &&
        selectedFormValue.length > 0
      ) {
        selectedQuestions.map(meta => {
          return selectedFormValue.map(form => {
            const newValue = {
              selectedForm,
              selectedQuestion: { ...meta, form },
            };
            newArr.push({ ...selectedFormType, value: newValue });
          });
        });
        filteredMetrics = selectedMetrics.filter(i => {
          if (i.value && i.value.selectedQuestion) {
            return false;
          }
          return true;
        });

        const arr = [...filteredMetrics, ...newArr];
        return {
          data: {
            ...state.data,
            selectedMetrics: arr,
          },
        };
      }
      if (
        valueFor === 'selectedValue' &&
        selectedFormValue &&
        selectedFormValue.length === 0
      ) {
        filteredMetrics = selectedMetrics.filter(i => {
          if (i.value && i.value.selectedQuestion) {
            return false;
          }
          return true;
        });
        return {
          data: {
            ...state.data,
            selectedMetrics: filteredMetrics,
          },
        };
      }
      if (
        valueFor === 'selectedValue' &&
        selectedQuestions &&
        selectedQuestions.length === 0
      ) {
        filteredMetrics = selectedMetrics.filter(i => {
          if (i.value && i.value.selectedQuestion) {
            return false;
          }
          return true;
        });
        return {
          data: {
            ...state.data,
            selectedMetrics: filteredMetrics,
            formInfo: {
              ...state.data.formInfo,
              formValue: [],
            },
          },
        };
      }
      return null;
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
        const newList = state.data.selectedMetrics.filter(
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
        const newList = state.data.selectedMetrics.filter(
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
        this.setArrays();
        this.handleToggleCollapse();
      },
    );
  };

  setArrays = () => {
    const {
      metrics,
      data: { selectedReportType },
    } = this.state;
    const metricsArr = metrics.filter(metric =>
      metric.types.includes(selectedReportType),
    );

    this.setState(
      {
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
      },
      () => {
        this.setFormValue();
        this.setSiteValue();
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
    const {
      data: {
        formInfo: {
          selectedFormType,
          selectedForm,
          selectedIndividualForm,
          selectedQuestions,
          selectedFormValue,
        },
      },
    } = this.state;
    this.setState(state => {
      const list = state.data.selectedMetrics;
      const filteredArr = list.filter(metric => {
        if (
          metric.code &&
          metric.value &&
          metric.value.selectedForm
        ) {
          if (metric.code === item.code) {
            if (
              metric.value.selectedIndividualForm &&
              item.value.selectedIndividualForm
            ) {
              if (
                metric.value.selectedIndividualForm.code !==
                item.value.selectedIndividualForm.code
              ) {
                return true;
              }
              return false;
            }
            if (
              metric.value.selectedQuestion &&
              item.value.selectedQuestion
            ) {
              if (
                metric.value.selectedQuestion.name ===
                item.value.selectedQuestion.name
              ) {
                if (
                  metric.value.selectedQuestion.form.code !==
                  item.value.selectedQuestion.form.code
                ) {
                  return true;
                }
                return false;
              }
            }
          }
          return true;
        }
        if (
          metric.code &&
          metric.value &&
          !metric.value.selectedForm
        ) {
          if (metric.code === item.code) {
            if (metric.value.code !== item.value.code) {
              return true;
            }
            return false;
          }
          return true;
        }
        if (metric.code && !metric.value) {
          if (metric.code !== item.code) {
            return true;
          }
          return false;
        }
        return null;
      });

      const metaList = [];
      filteredArr.map(f => {
        if (f.value && !f.value.selectedForm) {
          metaList.push(f.code);
        }
      });
      const filteredSelectedMetas = state.selectedMetas.filter(m =>
        metaList.includes(m.code),
      );

      const filteredMetaArr = state.selectedValue.filter(v => {
        return filteredArr.map(f => {
          if (f.value && !f.value.selectedForm) {
            if (f.value.code === v.code) {
              return true;
            }
            return false;
          }
        });
      });

      const filteredUserArr = state.userList.filter(
        u => u.code !== item.code,
      );

      const filteredSubmissionArr = state.submissions.filter(
        s => s.code !== item.code,
      );
      const filteredFormType = filteredArr.map(each => {
        if (each.code === selectedFormType.code) {
          return true;
        }
        return false;
      });
      const filteredForm = filteredArr.map(each => {
        if (each.value && each.value.selectedForm) {
          if (each.value.selectedForm.id === selectedForm.id) {
            return true;
          }
          return false;
        }
        return false;
      });

      const filteredIndividualForm = selectedIndividualForm.filter(
        ind => {
          return filteredArr.map(f => {
            if (f.value && f.value.selectedIndividualForm) {
              if (f.value.selectedIndividualForm.code === ind.code) {
                return true;
              }
              return false;
            }
          });
        },
      );
      const formValues = [];
      filteredArr.map(f => {
        if (f.value && f.value.selectedForm) {
          formValues.push(f.code);
        }
      });
      const filteredFormQuestions = selectedQuestions.filter(m =>
        formValues.includes(m.code),
      );

      const filteredFormValue = selectedFormValue.filter(v => {
        return filteredArr.map(f => {
          if (f.value && f.value.selectedQuestions) {
            if (f.value.selectedQuestions.code === v.code) {
              return true;
            }
            return false;
          }
        });
      });

      return {
        data: {
          ...state.data,
          selectedMetrics: filteredArr,
          formInfo: {
            selectedFormType: filteredFormType.includes(true)
              ? selectedFormType
              : {},
            selectedForm: filteredForm.includes(true)
              ? selectedForm
              : {},
            selectedIndividualForm: filteredIndividualForm,
            selectedQuestions: filteredFormQuestions,
            selectedFormValue: filteredFormValue,
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
        this.setSiteValue();
      },
    );
  };

  setSiteValue = () => {
    this.handleAddValue();
    const { selectedMetas } = this.state;
    const arr = [];
    selectedMetas.map(each => {
      if (
        each.type === 'Number' ||
        each.type === 'FormSubCountQuestion'
      ) {
        arr.push('number');
      } else {
        arr.push('text');
      }
    });
    if (arr.length > 0) {
      if (arr.includes('text')) {
        this.handleTextValueTypes('site');
      } else {
        this.handleAllValueTypes('site');
      }
    } else {
      this.setState({ siteValues: [] });
    }
  };

  handleAllValueTypes = type => {
    const { siteInfoArr, formInfoArr } = this.state;
    let filteredValues = [];
    this.setState(() => {
      if (type === 'site') {
        if (siteInfoArr.length > 0) {
          siteInfoArr.map(site => {
            filteredValues.push(site);
          });
        }
        return { siteValues: filteredValues };
      }
      if (type === 'form') {
        if (formInfoArr.length > 0) {
          formInfoArr.map(site => {
            filteredValues.push(site);
          });
        }
        return {
          data: {
            ...state.data,
            formInfo: {
              ...state.data.formInfo,
              formValue: filteredValues,
            },
          },
        };
      }
    });
  };

  handleTextValueTypes = type => {
    const {
      siteValues,
      siteInfoArr,
      formInfoArr,
      data: {
        formInfo: { formValue },
      },
    } = this.state;

    this.setState(state => {
      if (type === 'site') {
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
        return { siteValues: filteredSiteValues };
      }
      if (type === 'form') {
        let filteredFormValues = [];
        const someArr = formValue;
        if (formInfoArr.length > 0) {
          formInfoArr.map(info => {
            if (someArr && someArr.length > 0) {
              filteredFormValues = someArr.filter(some => {
                if (
                  some.code === 'form_info_actual' ||
                  some.code === 'form_info_most_common' ||
                  some.code === 'form_info_all_values'
                ) {
                  return true;
                } else {
                  return false;
                }
              });
            } else {
              if (
                info.code === 'form_info_actual' ||
                info.code === 'form_info_most_common' ||
                info.code === 'form_info_all_values'
              ) {
                filteredFormValues.push(info);
              }
            }
          });
        }
        return {
          data: {
            ...state.data,
            formInfo: {
              ...state.data.formInfo,
              formValue: filteredFormValues,
            },
          },
        };
      }
    });
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
    const { id } = this.props;
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

        this.props.getForms(id, code);
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
        this.props.getFormQuestions(this.props.id, id);
      },
    );
  };

  handleIndividualFormSelected = (e, item) => {
    let isItemPresent = false;
    let selectedIndividualForm = [];
    this.setState(
      state => {
        const {
          data: { formInfo },
        } = state;
        const arr = [];

        if (formInfo.selectedIndividualForm.length > 0) {
          formInfo.selectedIndividualForm.map(i => {
            if (i.code === item.code) {
              return arr.push(true);
            } else {
              selectedIndividualForm.push(i);
              return arr.push(false);
            }
          });
        }
        isItemPresent = arr.includes(true);
        if (isItemPresent) {
          selectedIndividualForm = formInfo.selectedIndividualForm.filter(
            s => s.code !== item.code,
          );
          return {
            data: {
              ...state.data,
              formInfo: {
                ...state.data.formInfo,
                selectedIndividualForm,
              },
            },
          };
        } else {
          selectedIndividualForm.push({ ...item });
          return {
            data: {
              ...state.data,
              formInfo: {
                ...state.data.formInfo,
                selectedIndividualForm: [
                  ...state.data.formInfo.selectedIndividualForm,
                  item,
                ],
              },
            },
          };
        }
      },
      () => {
        this.handleAddFormValue('selectedIndividualForm');
      },
    );
  };

  handleFormValueSelected = e => {
    const { value } = e.target;
    this.setState({
      selectedFormValue: JSON.parse(value),
    });
  };

  handleChangeFormQuest = (e, meta, value) => {
    if (meta && Object.keys(meta).length > 0) {
      this.handleFormQuestionCheck(e, meta);
    }
    if (value && Object.keys(value).length > 0) {
      this.handleFormValueCheck(e, value);
    }
  };

  handleFormQuestionCheck = (e, item) => {
    const {
      data: {
        formInfo: { selectedQuestions },
      },
    } = this.state;
    const { name, checked } = e.target;
    this.setState(
      state => {
        if (checked) {
          return {
            data: {
              ...state.data,
              formInfo: {
                ...state.data.formInfo,
                selectedQuestions: [
                  ...state.data.formInfo.selectedQuestions,
                  item,
                ],
              },
            },
          };
        }
        if (!checked) {
          const filterQuest = selectedQuestions.filter(
            quest => quest.name !== name,
          );
          return {
            data: {
              ...state.data,
              formInfo: {
                ...state.data.formInfo,
                selectedQuestions: filterQuest,
              },
            },
          };
        }
      },
      () => {
        this.setFormValue();
      },
    );
  };

  setFormValue = () => {
    const {
      data: {
        formInfo: { selectedQuestions },
      },
    } = this.state;
    this.handleAddFormValue('selectedValue');
    const arr = [];
    selectedQuestions.map(each => {
      if (each.type === 'integer') {
        arr.push('number');
      } else {
        arr.push('text');
      }
    });
    if (arr.length > 0) {
      if (arr.includes('text')) {
        this.handleTextValueTypes('form');
      } else {
        this.handleAllValueTypes('form');
      }
    } else {
      this.setState(state => ({
        data: {
          ...state.data,
          formInfo: {
            ...state.data.formInfo,
            selectedFormValue: [],
          },
        },
      }));
    }
  };

  handleFormValueCheck = (e, item) => {
    const { checked } = e.target;
    const {
      data: {
        formInfo: { selectedFormValue },
      },
    } = this.state;
    this.setState(
      state => {
        if (checked) {
          return {
            data: {
              ...state.data,
              formInfo: {
                ...state.data.formInfo,
                selectedFormValue: [
                  ...state.data.formInfo.selectedFormValue,
                  item,
                ],
              },
            },
          };
        }
        if (!checked) {
          const newArr = selectedFormValue.filter(
            s => s.code !== item.code,
          );
          return {
            data: {
              ...state.data,
              formInfo: {
                ...state.data.formInfo,
                selectedFormValue: newArr,
              },
            },
          };
        }
      },
      () => {
        this.handleAddFormValue('selectedValue');
      },
    );
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
      attributes: JSON.stringify(data.selectedMetrics),
    };
    if (data.reportId) {
      Axios.put(`/v4/api/reporting/report/${data.reportId}/`, body)
        .then(res => {
          if (res.data) {
            successToast('Report', 'updated');
            this.clearState();
            // this.props.toggleSection('reportList');
          }
        })
        .catch(err => {
          const errors = err.response;
          errorToast(errors.data.error);
        });
    } else {
      Axios.post(
        `/v4/api/reporting/add-report/${this.props.id}/`,
        body,
      )
        .then(res => {
          if (res.data) {
            successToast('Report', 'created');
            this.clearState();
          }
        })
        .catch(err => {
          const errors = err.response;
          errorToast(errors.data.error);
        });
    }
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
            selectedQuestions,
            formValue,
            selectedFormValue,
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
        formQuestions,
        individualFormArr,
        collapseClass,
      },
      props: {
        reportReducer: { reportLoader },
        data,
      },
    } = this;
    // console.log('index', selectedIndividualForm, selectedMetrics);
    const isEdit =
      data && Object.keys(data).length > 0 ? true : false;
    return (
      <div className="reports mrb-30" ref={this.setWrapperRef}>
        <div className="card">
          <div className="card-body">
            <div className="report-generator">
              <div className="reports-header mt-4">
                {isEdit && <h3 className="mb-3">Edit report</h3>}
                {!isEdit && <h3 className="mb-3">New report</h3>}
                <button
                  type="button"
                  className="common-button is-bg is-icon"
                  onClick={() => {
                    this.clearState();
                  }}
                >
                  {/* <i className="material-icons">add_circle</i> */}
                  <span>Cancel</span>
                </button>
              </div>
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
              {collapseClass && (
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
                      handleChangeFormQuest={
                        this.handleChangeFormQuest
                      }
                      selectedQuestions={selectedQuestions}
                      formValue={formValue}
                      selectedFormValue={selectedFormValue}
                    />
                    <SelectedColumn
                      selected={selectedMetrics}
                      handleSelectChange={this.handleSelectChange}
                      handleCheckSubmissionType={
                        this.handleChangeArray
                      }
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
              )}
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
