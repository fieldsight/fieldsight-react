import React, { PureComponent } from 'react';
import CustomMultiSelect from '../CustomMultiSelect';

export default class SiteInformation extends PureComponent {
  render() {
    const {
      toggleSelectClass,
      handleCheck,
      handleToggleClass,
      checkboxOption,
      selectedArr,
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
                    handleToggleClass={handleToggleClass}
                    checkboxOption={checkboxOption}
                    handleCheck={handleCheck}
                    selectedArr={selectedArr}
                    placeholderTxt="Form Answer"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="mb-2">values</label>
                  <CustomMultiSelect
                    toggleSelectClass={toggleSelectClass}
                    handleToggleClass={handleToggleClass}
                    checkboxOption={checkboxOption}
                    handleCheck={handleCheck}
                    selectedArr={selectedArr}
                    placeholderTxt="Maximum"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
