import React, { PureComponent } from 'react';
import CustomSelect from '../CustomSelect';
import CustomMultiSelect from '../CustomMultiSelect';

export default class FormInformation extends PureComponent {
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
          <h5>form information</h5>
        </div>
        <div className="acc-body">
          <div className="form-list">
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="mb-2">Forms type</label>
                  <CustomSelect label="select forms type" />
                </div>
              </div>
              <div className="col-lg-6" />
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="mb-2">Forms</label>
                  <CustomSelect label="select forms" />
                </div>
              </div>
              <div className="col-lg-6" />
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="mb-2">Submission count</label>
                  <CustomSelect label="select" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="mb-2">Values</label>
                  <CustomSelect label="select" />
                </div>
              </div>
              <div className="col-lg-6">
                <button
                  type="button"
                  className="common-button is-border"
                >
                  Add
                </button>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <label className="mb-2">Questions</label>
                  <CustomMultiSelect
                    toggleSelectClass={toggleSelectClass}
                    handleToggleClass={handleToggleClass}
                    checkboxOption={checkboxOption}
                    handleCheck={handleCheck}
                    selectedArr={selectedArr}
                  />
                </div>
                <button
                  role="button"
                  className="common-button is-border"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
