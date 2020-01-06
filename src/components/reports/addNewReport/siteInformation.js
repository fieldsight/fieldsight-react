import React, { Component } from 'react';

import CustomMultiSelect from '../CustomMultiSelect';
/* eslint-disable */

export default class SiteInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleValueClass: false,
    };
  }

  handleToggleValueClass = () => {
    this.setState(({ toggleValueClass }) => ({
      toggleValueClass: !toggleValueClass,
    }));
  };

  render() {
    // const { toggleValueClass } = this.state;
    const {
      toggleSelectClass,
      handleToggleClass,
      siteValues,
      selectedMetrics,
      handleSelectMeta,
      metaAttributes,
      selectedMetas,
    } = this.props;

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
                  <label className="mb-2">site information</label>
                  <CustomMultiSelect
                    toggleSelectClass={toggleSelectClass}
                    handleToggleClass={() => {
                      handleToggleClass('siteType');
                    }}
                    toggleType="siteType"
                    checkboxOption={metaAttributes}
                    handleCheck={handleSelectMeta}
                    selectedArr={selectedMetas}
                    placeholderTxt="Form Answer"
                  />
                </div>
              </div>
              <div className="col-lg-6">
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
                                      handleSelectMeta(e, {}, option);
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
