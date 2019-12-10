import React, { Component } from "react";
import Axios from "axios";
import { Dropdown, DropdownButton } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import SelectElement from "../common/SelectElement";
import { errorToast, successToast } from "../../utils/toastHandler";

const weekOptions = [
  { id: 1, name: "Mon" },
  { id: 2, name: "Tue" },
  { id: 3, name: "Wed" },
  { id: 4, name: "Thurs" },
  { id: 5, name: "Fri" },
  { id: 6, name: "Sat" },
  { id: 7, name: "Sun" }
];

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedType: props.data.title ? props.data.title : "",
      scheduleType: props.data.scheduleType ? props.data.scheduleType : 0,
      selectedDayOnWeek:
        props.data.scheduleType &&
        props.data.scheduleType === 2 &&
        props.data.day,
      selectedDayOnMonth:
        props.data.scheduleType &&
        props.data.scheduleType === 3 &&
        props.data.day,
      isFormSelected: false,
      selectedForm: "",
      formList: [],
      projectId: props.projectId
    };
  }

  componentWillMount() {
    const { projectId } = this.state;
    // Axios.get(`/fv3/api/project-forms/${projectId}/`)
    //   .then(res => {
    //     if (res.data) {
    //       this.setState({ formList: res.data });
    //     }
    //   })
    //   .catch(err => {
    //     console.log("err", err);
    //   });
  }

  handleScheduleTypeChange = e => {
    const { value } = e.target;
    this.setState(() => {
      if (value > 1)
        return {
          scheduleType: JSON.parse(value),
          selectedDayOnWeek: null,
          selectedDayOnMonth: null
        };
      return { scheduleType: JSON.parse(value) };
    });
  };

  handleSelectedDayChange = e => {
    const { value } = e.target;
    this.setState({ selectedDayOnWeek: JSON.parse(value) });
  };

  handleSelectedMonthDayChange = e => {
    const { value } = e.target;
    this.setState({ selectedDayOnMonth: JSON.parse(value) });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      state: {
        selectedType,
        scheduleType,
        selectedDayOnWeek,
        selectedDayOnMonth,
        selectedForm,
        projectId
      }
    } = this;
    const body = {
      spreadsheet_id: null,
      grid_id: null,
      range: null,
      report_type: selectedType,
      schedule_type: scheduleType,
      description: null,
      project: JSON.parse(projectId),
      day:
        scheduleType === 2 && selectedDayOnWeek
          ? selectedDayOnWeek
          : scheduleType === 3 && selectedDayOnMonth
          ? selectedDayOnMonth
          : null,
      form: selectedForm
    };
    Axios.post("/fv3/api/report-sync-settings/", body)
      .then(res => {
        this.props.handleSuccess(res.data);
        successToast("form", "created");
      })
      .catch(err => {
        const errors = err.response;
        errorToast(errors.data.error);
      });
  };

  render() {
    const {
      state: {
        selectedDayOnWeek,
        selectedDayOnMonth,
        scheduleType,
        selectedType
        // selectedType
      },
      props: { getScheduleType }
    } = this;
    let dayOptions = [];
    for (var i = 1; i <= 31; i += 1) {
      if (i <= 30) dayOptions.push({ id: i, name: i });
      else dayOptions.push({ id: 0, name: "Last" });
    }
    const scheduleOptions = [
      { id: 0, name: "manual" },
      { id: 1, name: "daily" },
      { id: 2, name: "weekly" },
      { id: 3, name: "monthly" }
    ];

    return (
      <>
        <form className="floating-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            {/* <label>Type:</label> */}
            <h6>{selectedType}</h6>
          </div>
          <div className="form-group">
            <label>Schedule Type:</label>
            <SelectElement
              classname="border-0"
              options={scheduleOptions}
              value={scheduleType}
              changeHandler={this.handleScheduleTypeChange}
            />
            {/* <Dropdown>
              <Dropdown.Toggle variant="" className="fieldsight-btn">
                <span>{getScheduleType(scheduleType)}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-right">
                <Dropdown.Item
                  target="_blank"
                  onSelect={this.handleScheduleTypeChange}
                  eventKey={0}
                >
                  Manual
                </Dropdown.Item>
                <Dropdown.Item
                  target="_blank"
                  onSelect={this.handleScheduleTypeChange}
                  eventKey={1}
                >
                  Daily
                </Dropdown.Item>
                <Dropdown.Item
                  target="_blank"
                  onSelect={this.handleScheduleTypeChange}
                  eventKey={2}
                >
                  Weekly
                </Dropdown.Item>
                <Dropdown.Item
                  target="_blank"
                  onSelect={this.handleScheduleTypeChange}
                  eventKey={3}
                >
                  Monthly
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
          </div>
          {scheduleType === 2 && (
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
          {scheduleType === 3 && (
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
          <div className="form-group pull-right no-margin">
            {/* <button
              type="button"
              className="fieldsight-btn"
              onClick={this.props.onCancel}
            >
              Cancel
            </button> */}
            &nbsp;
            <button type="submit" className="fieldsight-btn">
              Save
            </button>
          </div>
        </form>
      </>
    );
  }
}
