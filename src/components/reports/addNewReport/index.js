import React, { Component } from 'react';
import InputElement from '../../common/InputElement';
import CustomMultiSelect from '../CustomMultiSelect';
import Metrics from './metrics';
import SelectedColumn from './selectedColumn';
/* eslint-disable */

const checkboxOption = [
  { id: 1, name: 'region-1' },
  { id: 2, name: 'region-2' },
  { id: 3, name: 'region-3' },
];

export default class AddNewReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        reportName: '',
        desc: '',
        reportType: [],
      },
      toggleSelectClass: false,
      collapseClass: false,
    };
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

  handleCheckReportType = e => {
    const {
      target: { name, checked },
    } = e;

    this.setState(
      state => {
        if (checked) {
          return {
            data: {
              ...state.data,

              reportType: [...state.data.reportType, name],
            },
          };
        }
        if (!checked) {
          return {
            data: {
              ...state.data,
              reportType: state.data.reportType.filter(
                type => type !== name,
              ),
            },
          };
        }
        return null;
      },
      () => {
        console.log('in checkbox', this.state.data);
      },
    );
  };

  render() {
    const {
      state: {
        data: { reportName, desc, reportType },
        toggleSelectClass,
        collapseClass,
      },
    } = this;
    console.log('state', collapseClass);

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
                          <CustomMultiSelect
                            toggleSelectClass={toggleSelectClass}
                            handleToggleClass={this.handleToggleClass}
                            checkboxOption={checkboxOption}
                            handleCheck={this.handleCheckReportType}
                            selectedArr={reportType}
                          />
                          {/* <div className="common-select">
                            <div
                              className={`select-wrapper ${
                                toggleSelectClass
                                  ? 'select-toggle'
                                  : ''
                              }`}
                              onClick={() => {
                                this.handleToggleClass();
                              }}
                            >
                              <span className="select-item">
                                User
                              </span>
                              <ul>
                                {checkboxOption.map(option => (
                                  <li key={`option_${option.id}`}>
                                    <CustomCheckBox
                                      className="custom-control custom-checkbox"
                                      customInputClass="custom-control-input"
                                      customLabelClass="custom-control-label"
                                      label={option.name}
                                      name={option.name}
                                      checked={reportType.includes(
                                        option.name,
                                      )}
                                      changeHandler={
                                        this.handleCheckReportType
                                      }
                                    />
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div> */}
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
                    toggleSelectClass={toggleSelectClass}
                    handleToggleClass={this.handleToggleClass}
                    checkboxOption={checkboxOption}
                    handleCheck={this.handleCheckReportType}
                    selectedArr={reportType}
                  />
                  <SelectedColumn />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
