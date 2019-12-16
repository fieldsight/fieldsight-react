import React, { Component } from 'react';
import Axios from 'axios';
import SelectElement from '../common/SelectElement';
import { errorToast, successToast } from '../../utils/toastHandler';
/* eslint-disable react/destructuring-assignment */

const weekOptions = [
  { id: 1, name: 'Monday' },
  { id: 2, name: 'Tueday' },
  { id: 3, name: 'Wednesday' },
  { id: 4, name: 'Thursday' },
  { id: 5, name: 'Friday' },
  { id: 6, name: 'Saturday' },
  { id: 7, name: 'Sunday' },
];

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedReport: props.data.report_type
        ? props.data.report_type === 'form'
          ? props.data.title
          : props.data.report_type
        : '',
      reportId: props.data.report_id && props.data.report_id,
      scheduleType: props.data.schedule_type
        ? props.getScheduleType(props.data.schedule_type)
        : 0,
      selectedDayOnWeek:
        props.data.schedule_type &&
        props.data.schedule_type === 'Weekly'
          ? props.data.day
          : 1,
      selectedDayOnMonth:
        props.data.schedule_type &&
        props.data.schedule_type === 'Monthly'
          ? props.data.day === 0
            ? 31
            : props.data.day
          : 1,
      projectId: props.projectId,
    };
  }

  handleScheduleTypeChange = e => {
    const { value } = e.target;

    this.setState(() => {
      if (value === '0' || value === '1')
        return {
          scheduleType: value,
          selectedDayOnWeek: null,
          selectedDayOnMonth: null,
        };
      return { scheduleType: value };
    });
  };

  handleSelectedDayChange = e => {
    const { value } = e.target;
    this.setState({ selectedDayOnWeek: value });
  };

  handleSelectedMonthDayChange = e => {
    const { value } = e.target;
    this.setState({
      selectedDayOnMonth: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      state: {
        scheduleType,
        selectedDayOnWeek,
        selectedDayOnMonth,
        reportId,
        projectId,
      },
    } = this;
    const body = {
      schedule_type: scheduleType,
      project: JSON.parse(projectId),
      day:
        scheduleType === '2' && selectedDayOnWeek
          ? selectedDayOnWeek
          : scheduleType === '3' && selectedDayOnMonth
          ? selectedDayOnMonth === '31'
            ? '0'
            : selectedDayOnMonth
          : null,
    };

    Axios.put(
      `/fv3/api/update-report-sync-settings/${reportId}/`,
      body,
    )
      .then(res => {
        this.props.handleSuccess(res.data);
        successToast('form', 'updated');
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
        selectedReport,
      },
      props: { getReportName },
    } = this;
    const dayOptions = [];
    for (let i = 1; i <= 31; i += 1) {
      if (i <= 30) dayOptions.push({ id: i, name: i });
      else dayOptions.push({ id: i, name: 'Last' });
    }
    const scheduleOptions = [
      { id: '0', name: 'Manual' },
      { id: '1', name: 'Daily' },
      { id: '2', name: 'Weekly' },
      { id: '3', name: 'Monthly' },
    ];

    return (
      <>
        <form className="floating-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            {/* <label>Type:</label> */}
            <h6>{getReportName(selectedReport)}</h6>
          </div>
          <div className="form-group">
            <label>Schedule Type:</label>
            <SelectElement
              classname="border-0"
              options={scheduleOptions}
              value={scheduleType}
              changeHandler={this.handleScheduleTypeChange}
            />
          </div>
          {scheduleType === '2' && (
            <div className="every-week flex">
              <span className="ml-0">every</span>
              <SelectElement
                classname="border-0"
                options={weekOptions}
                value={selectedDayOnWeek}
                changeHandler={this.handleSelectedDayChange}
              />
              {/* <span>Day</span> */}
            </div>
          )}
          {scheduleType === '3' && (
            <div className="every-week flex">
              <span className="ml-0">sync on day</span>
              <SelectElement
                classname="border-0"
                options={dayOptions}
                value={selectedDayOnMonth}
                changeHandler={this.handleSelectedMonthDayChange}
              />
              {/* <span>of Month</span> */}
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
