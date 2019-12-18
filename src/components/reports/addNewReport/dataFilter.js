import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import CustomSelect from '../CustomSelect';

export default class DataFilter extends PureComponent {
  render() {
    return (
      <div className="data-filter filter-bottom ">
        <form>
          <div className="row">
            <div className="col-xl-2 col-md-6">
              <div className="form-group inline-form-group">
                <label className="mb-2">project</label>
                <CustomSelect label="select Project" />
              </div>
            </div>
            <div className="col-xl-2 col-md-6">
              <div className="form-group inline-form-group">
                <label className="mb-2">region</label>
                <CustomSelect label="select region" />
              </div>
            </div>
            <div className="col-xl-2 col-md-6">
              <div className="form-group inline-form-group">
                <label className="mb-2">user roles</label>
                <CustomSelect label="select user roles" />
              </div>
            </div>
            <div className="col-xl-5 col-md-6">
              <div className="form-group icon-between inline-form-group">
                <label className="">Time period</label>
                <div className="inline-flex ">
                  <div className="custom-group">
                    <DatePicker placeholderText="Start Date" />
                    {/* <div className="custom-group-append">
                      <span className="custom-group-text">
                        <i className="material-icons">
                          calendar_today
                        </i>
                      </span>
                    </div> */}
                  </div>
                  <span className="icon-between">
                    <i className="material-icons">arrow_right_alt</i>
                  </span>
                  <div className="custom-group">
                    <DatePicker placeholderText="End Date" />
                    {/* <div className="custom-group-append">
                      <span className="custom-group-text">
                        <i className="material-icons">
                          calendar_today
                        </i>
                      </span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-md-6">
              <div className="form-group inline-form-group">
                <label className="">Site information</label>
                <CustomSelect label="select Project" />
              </div>
            </div>
            <div className="col-xl-2 col-md-6">
              <div className="form-group inline-form-group">
                <label className="">Value</label>
                <CustomSelect label="select Region" />
              </div>
            </div>
            <div className="col-xl-2 col-md-6">
              <div className="form-group inline-form-group">
                <label className="">Sub group</label>
                <CustomSelect label="select user roles" />
              </div>
            </div>
            <div className="col-md-12">
              <div className="buttons center mt-3">
                <button
                  disabled
                  type="submit"
                  className="common-button is-bg"
                >
                  Apply
                </button>
                <button
                  type="submit"
                  disabled
                  className="common-button  is-clear"
                >
                  Clear all
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
