import React, { Component } from "react";
import Axios from "axios";
import { Dropdown, DropdownButton } from "react-bootstrap";
import SelectElement from "../common/SelectElement";

const forms = ["form1", "form2", "form3"];

export default class SyncSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        selectedType: "",
        scheduleType: "",
        selectedDayOnWeek: "",
        selectedDayOnMonth: ""
      },
      isFormSelected: false,
      selectedForm: ""
    };
  }

  handleDropdownChange = e => {
    console.log("event click", e);
    this.setState({ selectedType: e }, () => {
      if (e === "form") {
        console.log("getform here");
      }
    });
  };

  handleSelectForm = e => {
    console.log("on form", e);

    this.setState({ selectedForm: e });
  };

  render() {
    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a>Setting</a>
            </li>
          </ol>
        </nav>
        <div className="card">
          <div className="card-header main-card-header">
            <h5>
              <i className="la la-building" />
              Project Schedule Settings
            </h5>
          </div>
          <div className="card-body">
            <form className="floating-form">
              <div className="form-group">
                <label>Type:</label>
                <Dropdown>
                  <Dropdown.Toggle variant="" className="fieldsight-btn">
                    <span>Type</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu-right">
                    <Dropdown.Item
                      target="_blank"
                      onSelect={this.handleDropdownChange}
                      eventKey="siteInfo"
                    >
                      Site Info
                    </Dropdown.Item>
                    <Dropdown.Item
                      target="_blank"
                      onSelect={this.handleDropdownChange}
                      eventKey="progress"
                    >
                      Progress
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={DropdownButton}
                      target="_blank"
                      // onSelect={this.handleDropdownChange}
                      // eventKey="form"
                      drop="right"
                      title="Form"
                      variant=""
                    >
                      {/* <Dropdown.Toggle variant="">
                      <span>Form</span>
                    </Dropdown.Toggle> */}
                      {/* <Dropdown.Menu className="dropdown-menu-right"> */}
                      {forms.map((form, i) => (
                        <Dropdown.Item
                          key={`${form}_${i}`}
                          target="_blank"
                          onSelect={this.handleSelectForm}
                          eventKey={form}
                        >
                          {form}
                        </Dropdown.Item>
                      ))}
                      {/* </Dropdown.Menu> */}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="form-group">
                <label>Schedule Type:</label>
                <Dropdown>
                  <Dropdown.Toggle variant="" className="fieldsight-btn">
                    <span>Schedule Type</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu-right">
                    <Dropdown.Item
                      target="_blank"
                      onSelect={this.handleDropdownChange}
                      eventKey="siteInfo"
                    >
                      Manual
                    </Dropdown.Item>
                    <Dropdown.Item
                      target="_blank"
                      onSelect={this.handleDropdownChange}
                      eventKey="progress"
                    >
                      Daily
                    </Dropdown.Item>
                    <Dropdown.Item
                      target="_blank"
                      onSelect={this.handleDropdownChange}
                      eventKey="siteInfo"
                    >
                      Weekly
                    </Dropdown.Item>
                    <Dropdown.Item
                      target="_blank"
                      onSelect={this.handleDropdownChange}
                      eventKey="progress"
                    >
                      Monthly
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="form-group">
                <div className="every-week flex">
                  <span className="ml-0">every</span>
                  <SelectElement
                    classname="border-0"
                    options={weekOptions}
                    value={frequency}
                    changeHandler={this.handleFrequencyChange}
                  />
                  <span>weeks on</span>
                  <div className="form-group">
                    <div className="custom-checkbox display-inline">
                      <RadioElement
                        label="Sun"
                        name="sun"
                        changeHandler={this.handleOnWeekCheckbox}
                        checked={weeklyArrDays.sun}
                      />
                      <RadioElement
                        label="Mon"
                        name="mon"
                        changeHandler={this.handleOnWeekCheckbox}
                        checked={weeklyArrDays.mon}
                      />
                      <RadioElement
                        label="Tue"
                        name="tue"
                        changeHandler={this.handleOnWeekCheckbox}
                        checked={weeklyArrDays.tue}
                      />
                      <RadioElement
                        label="Wed"
                        name="wed"
                        changeHandler={this.handleOnWeekCheckbox}
                        checked={weeklyArrDays.wed}
                      />
                      <RadioElement
                        label="Thu"
                        name="thu"
                        changeHandler={this.handleOnWeekCheckbox}
                        checked={weeklyArrDays.thu}
                      />
                      <RadioElement
                        label="Fri"
                        name="fri"
                        changeHandler={this.handleOnWeekCheckbox}
                        checked={weeklyArrDays.fri}
                      />
                      <RadioElement
                        label="Sat"
                        name="sat"
                        changeHandler={this.handleOnWeekCheckbox}
                        checked={weeklyArrDays.sat}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
