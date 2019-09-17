import React, { Component } from "react";
import Select from "react-select";
import InputElement from "../common/InputElement";
import RadioElement from "../common/RadioElement";
import CheckBox from "../common/CheckBox";

const RegionType = [
  { value: "1", label: "Region 1" },
  { value: "2", label: "Region 2" },
  { value: "3", label: "Region 3" }
];
const Types = [
  { value: "1", label: "BMC" },
  { value: "2", label: "MMC" },
  { value: "3", label: "RRC" }
];
class CommonPopupForm extends Component {
  render() {
    return (
      <div className="card-body">
        <form className="floating-form">
          <div className="form-form">
            <div className="selected-form">
              <div className="add-btn flex-start">
                <a href="#" data-tab="choose-form">
                  Choose form
                  <span>
                    <i className="la la-plus"></i>
                  </span>
                </a>
              </div>
              <div className="selected-text">
                <span>Skills for Tourism Assessment Form - Test</span>
              </div>
            </div>
          </div>
          <div className="form-group flexrow checkbox-group">
            <label>Default submission status</label>
            <div className="custom-checkbox display-inline">
              <RadioElement
                label="Approved"
                className="approved"
                name="approved"
              />
              <RadioElement
                label="Pending"
                className="pending"
                name="pending"
              />
              <RadioElement
                label="Flagged"
                className="flagged"
                name="flagged"
              />
              <RadioElement
                label="Rejected"
                className="rejected"
                name="rejected"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Regions</label>
            <Select
              className="select2-select select2"
              // label="Type of Team"
              // onChange={this.handleChange}
              options={RegionType}
              isMulti={true}
            />
          </div>
          <div className="form-group">
            <label>Types</label>
            <Select
              className="select2-select select2"
              // label="Type of Team"
              // onChange={this.handleChange}
              options={Types}
              isMulti={true}
            />
          </div>
          <div className="form-group checkbox-group">
            <label>Donor visibility</label>
            <div className="custom-checkbox display-inline">
              <RadioElement label="Yes" name="yes" />
              <RadioElement label="No" name="no" />
            </div>
          </div>
          <div className="form-group checkbox-group">
            <label>Can edit submission ?</label>
            <div className="custom-checkbox display-inline">
              <RadioElement label="Yes" name="yes" />
              <RadioElement label="No" name="no" />
            </div>
          </div>
          <div className="form-group checkbox-group">
            <label>Can delete submission ?</label>
            <div className="custom-checkbox display-inline">
              <RadioElement label="Yes" name="yes" />
              <RadioElement label="No" name="no" />
            </div>
          </div>
          <div className="form-group pull-right no-margin">
            <button type="submit" className="fieldsight-btn">
              Add Form
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default CommonPopupForm;
