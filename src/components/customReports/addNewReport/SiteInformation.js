import React, { Component } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import CustomCheckBox from '../common/CustomCheckbox';

// import CustomMultiSelect from '../common/CustomMultiSelect';
/* eslint-disable */

export default class SiteInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteInfo: {
        selectedMetas: [],
        siteValues: [],
        selectedValue: [],
      },
    };
  }

  componentDidMount() {
    const { selectedMetas, selectedValue, siteValues } = this.props;
    if (selectedMetas) {
      this.setState(state => ({
        siteInfo: { ...state.siteInfo, selectedMetas },
      }));
    }
    if (selectedValue) {
      this.setState(state => ({
        siteInfo: { ...state.siteInfo, selectedValue },
      }));
    }
    if (siteValues) {
      this.setState(state => ({
        siteInfo: { ...state.siteInfo, siteValues },
      }));
    }
  }

  componentDidUpdate(prevProps) {
    const { selectedMetas } = this.props;
    if (prevProps.selectedMetas !== selectedMetas) {
      this.setState(state => ({
        siteInfo: { ...state.siteInfo, selectedMetas },
      }));
    }
  }

  handleSelectMeta = (e, meta, value) => {
    if (meta && Object.keys(meta).length > 0) {
      this.handleMetaCheck(e, meta);
    }
    if (value && Object.keys(value).length > 0) {
      this.handleValueCheck(e, value);
    }
  };

  handleMetaCheck = (e, meta) => {
    const {
      siteInfo: { selectedMetas },
    } = this.state;
    const { name, checked } = e.target;
    this.setState(
      state => {
        if (checked) {
          return {
            siteInfo: {
              ...state.siteInfo,
              selectedMetas: [...state.siteInfo.selectedMetas, meta],
            },
          };
        }
        if (!checked) {
          const filterMetas = selectedMetas.filter(
            type => type.id !== name,
          );
          return {
            siteInfo: {
              ...state.siteInfo,
              selectedMetas: filterMetas,
            },
          };
        }
      },
      () => {
        const { siteInfo } = this.state;
        this.props.handleSiteAddValue(siteInfo);
      },
    );
  };

  handleValueCheck = (e, item) => {
    const { checked } = e.target;
    const {
      siteInfo: { selectedValue },
    } = this.state;
    this.setState(
      state => {
        if (checked) {
          return {
            siteInfo: {
              ...state.siteInfo,
              selectedValue: [...state.siteInfo.selectedValue, item],
            },
          };
        }
        if (!checked) {
          const newMetasArr = selectedValue.filter(
            s => s.code !== item.code,
          );
          return {
            siteInfo: {
              ...state.siteInfo,
              selectedValue: newMetasArr,
            },
          };
        }
      },
      () => {
        const { siteInfo } = this.state;
        this.props.handleSiteAddValue(siteInfo);
      },
    );
  };

  render() {
    const {
      siteInfo: { selectedMetas, siteValues },
    } = this.state;
    const { selectedMetrics, metaAttributes } = this.props;
    return (
      <div className="acc-item">
        <div className="acc-header">
          <h5>site information</h5>
        </div>
        <div className="acc-body">
          <div className="form-list">
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  {/* <label className="mb-2">site information</label> */}
                  <div
                    style={{
                      position: 'relative',
                      height: `200px `,
                    }}
                  >
                    <PerfectScrollbar>
                      <ul className="role-list">
                        {metaAttributes.length > 0 &&
                          metaAttributes.map(item => {
                            const filterList = selectedMetas.filter(
                              i => i.id === item.id,
                            );
                            const isChecked =
                              filterList && filterList[0]
                                ? true
                                : false;
                            return (
                              <li key={item.id}>
                                <CustomCheckBox
                                  id={item.id}
                                  label={item.label}
                                  name={item.id}
                                  checked={isChecked}
                                  changeHandler={e => {
                                    this.handleSelectMeta(e, item);
                                  }}
                                />
                              </li>
                            );
                          })}
                      </ul>
                    </PerfectScrollbar>
                  </div>
                </div>
              </div>
              {/* <div className="col-lg-6">
                <div className="form-group">
                  <label className="mb-2">values</label>
                  <div className="common-select">
                    <div
                      className={
                        toggleSelectClass['siteValue']
                          ? 'select-wrapper select-toggle'
                          : 'select-wrapper'
                      }
                      onClick={() => {
                        handleToggleClass('siteValue');
                      }}
                    >
                      <span className="select-item">Form Values</span>
                      <ul>
                        {siteValues.length > 0 &&
                          siteValues.map(option => {
                            const filterList = selectedMetrics.filter(
                              i =>
                                i.value &&
                                i.value.code === option.code,
                            );
                            const isChecked =
                              filterList && filterList[0]
                                ? true
                                : false;
                            return (
                              <li key={`option_${option.code}`}>
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id={option.code}
                                    name={option.code}
                                    checked={isChecked}
                                    onChange={e => {
                                      this.handleSelectMeta(e, {}, option);
                                    }}
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor={option.code}
                                    style={{ paddingLeft: '2em' }}
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
