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
      selectedType: "",
      scheduleType: "",
      selectedDayOnWeek: 1,
      selectedDayOnMonth: 1,
      isFormSelected: false,
      selectedForm: "",
      formList: [],
      projectId: props.projectId
    };
  }

  componentWillMount() {
    const { projectId } = this.state;
    Axios.get(`/fv3/api/project-forms/${projectId}/`)
      .then(res => {
        if (res.data) {
          this.setState({ formList: res.data });
        }
      })
      .catch(err => {
        console.log("err", err);
      });
  }

  handleDropdownChange = e => {
    this.setState({ selectedType: e, selectedForm: "" });
  };

  handleSelectForm = e => {
    this.setState({ selectedType: "form", selectedForm: JSON.parse(e) });
  };

  handleScheduleTypeChange = e => {
    this.setState(() => {
      if (e > 1)
        return {
          scheduleType: JSON.parse(e),
          selectedDayOnWeek: null,
          selectedDayOnMonth: null
        };
      return { scheduleType: JSON.parse(e) };
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
        formList
        // selectedType
      }
    } = this;
    let dayOptions = [];
    for (var i = 1; i <= 31; i += 1) {
      if (i <= 30) dayOptions.push({ id: i, name: i });
      else dayOptions.push({ id: 0, name: "Last" });
    }

    return (
      <>
        <form className="floating-form" onSubmit={this.handleSubmit}>
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
                  eventKey="site_info"
                >
                  Site Info
                </Dropdown.Item>
                <Dropdown.Item
                  target="_blank"
                  onSelect={this.handleDropdownChange}
                  eventKey="site_progress"
                >
                  Progress
                </Dropdown.Item>
                <Dropdown.Item
                  as={Dropdown}
                  target="_blank"
                  id="form"
                  key="form"
                  eventKey="form"
                  // title="form"
                  // className="fieldsight-btn"
                >
                  <div
                    className="thumb-list mr-0 "
                    style={{ position: "relative", height: "327px" }}
                  >
                    <Dropdown.Toggle variant="" drop="right">
                      <span>Form</span>
                    </Dropdown.Toggle>
                    <PerfectScrollbar>
                      {formList.length > 0 &&
                        formList.map(form => (
                          <Dropdown.Item
                            key={`form_${form.id}`}
                            target="_blank"
                            onSelect={this.handleSelectForm}
                            eventKey={form.id}
                          >
                            {form.title}
                          </Dropdown.Item>
                        ))}
                    </PerfectScrollbar>
                  </div>
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
            </Dropdown>
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
            <button
              type="button"
              className="fieldsight-btn"
              onClick={this.props.onCancel}
            >
              Cancel
            </button>
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
