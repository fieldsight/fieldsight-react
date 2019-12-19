import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMetricsData } from '../../../actions/reportActions';
import InputElement from '../../common/InputElement';
import CustomSelect from '../CustomSelect';
// import CustomMultiSelect from '../CustomMultiSelect';
import Metrics from './metrics';
import DataFilter from './dataFilter';
import SelectedColumn from './selectedColumn';
/* eslint-disable */

const checkboxOption = [
  { id: 1, name: 'region-1' },
  { id: 2, name: 'region-2' },
  { id: 3, name: 'region-3' },
];

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
      toggleSelectClass: false,
      collapseClass: false,
      loader: false,
    };
  }

  componentWillMount() {
    this.props.getMetricsData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reportReducer !== this.props.reportReducer) {
      this.setState({
        reportType: this.props.reportReducer.reportTypes,
        metrics: this.props.reportReducer.metrics,
      });
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

  handleCheckReportType = e => {
    const {
      target: { name, checked },
    } = e;

    this.setState(state => {
      if (checked) {
        return {
          data: {
            ...state.data,

            selectedReportType: [
              ...state.data.selectedReportType,
              name,
            ],
          },
        };
      }
      if (!checked) {
        return {
          data: {
            ...state.data,
            selectedReportType: state.data.selectedReportType.filter(
              type => type !== name,
            ),
          },
        };
      }
      return null;
    });
  };

  handleReportTypeChange = e => {
    const { value } = e.target;
    this.setState(state => ({
      data: {
        ...state.data,
        selectedReportType: JSON.parse(value),
      },
    }));
  };

  render() {
    const {
      state: {
        data: { reportName, desc, selectedReportType },
        reportType,
        metrics,
        toggleSelectClass,
        // collapseClass,
      },
      props: {
        reportReducer: { reportLoader },
      },
    } = this;
    // console.log('state', this.state.data);

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
                  {/* <Metrics
                    toggleSelectClass={toggleSelectClass}
                    handleToggleClass={this.handleToggleClass}
                    checkboxOption={checkboxOption}
                    handleCheck={this.handleCheckReportType}
                    selectedArr={selectedReportType}
                  />
                  <SelectedColumn /> */}
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
