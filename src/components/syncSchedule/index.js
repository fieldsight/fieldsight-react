import React, { Component } from "react";
import Axios from "axios";
import { Dropdown, DropdownButton } from "react-bootstrap";
import SelectElement from "../common/SelectElement";

const forms = ["form1", "form2", "form3"];
const weekOptions = [
  { id: 1, name: "Mon" },
  { id: 2, name: "Tue" },
  { id: 3, name: "Wed" },
  { id: 4, name: "Thurs" },
  { id: 5, name: "Fri" },
  { id: 6, name: "Sat" },
  { id: 7, name: "Sun" }
];

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

  handleScheduleTypeChange = e => {
    console.log("on form", e);

    this.setState({ scheduleType: e });
  };

  handleSelectedDayChange = e => {
    const { value } = e.target;
    this.setState({ selectedDayOnWeek: JSON.parse(value) });
  };

  handleSelectedMonthDayChange = e => {
    const { value } = e.target;
    this.setState({ selectedDayOnMonth: JSON.parse(value) });
  };

  render() {
    const {
      state: { selectedDayOnWeek, selectedDayOnMonth, scheduleType }
    } = this;
    let dayOptions = [];
    for (var i = 1; i <= 31; i += 1) {
      if (i <= 30) dayOptions.push({ id: i, name: i });
      else dayOptions.push({ id: 0, name: "Last" });
    }

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
                      onSelect={this.handleScheduleTypeChange}
                      eventKey="manual"
                    >
                      Manual
                    </Dropdown.Item>
                    <Dropdown.Item
                      target="_blank"
                      onSelect={this.handleScheduleTypeChange}
                      eventKey="daily"
                    >
                      Daily
                    </Dropdown.Item>
                    <Dropdown.Item
                      target="_blank"
                      onSelect={this.handleScheduleTypeChange}
                      eventKey="weekly"
                    >
                      Weekly
                    </Dropdown.Item>
                    <Dropdown.Item
                      target="_blank"
                      onSelect={this.handleScheduleTypeChange}
                      eventKey="monthly"
                    >
                      Monthly
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              {scheduleType === "weekly" && (
                <div className="every-week flex">
                  <span className="ml-0">every</span>
                  <SelectElement
                    classname="border-0"
                    options={weekOptions}
                    value={selectedDayOnWeek}
                    changeHandler={this.handleSelectedDayChange}
                  />
                  <span>Day</span>
                </div>
              )}
              {scheduleType === "monthly" && (
                <div className="every-week flex">
                  <span className="ml-0">every</span>
                  <SelectElement
                    classname="border-0"
                    options={dayOptions}
                    value={selectedDayOnMonth}
                    changeHandler={this.handleSelectedMonthDayChange}
                  />
                  <span>Date of Month</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </>
    );
  }
}
