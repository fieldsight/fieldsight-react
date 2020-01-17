import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import format from 'date-fns/format';
import RadioElement from '../../common/RadioElement';
import CheckBox from '../../common/CheckBox';
import SelectElement from '../../common/SelectElement';

export default class ScheduleFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '1',
      scheduleType: '0',
      dailyArrDays: [],
      frequency: '1',
      weekDays: '1',
      selectedMonthlyDays: '1',

      startedDate: '',
      endedDate: '',
    };
  }

  handleRadioChange = e => {
    const { value } = e.target;
    if (value === '0') {
      this.setState({
        status: value,
      });
    }
    if (value === '1') {
      this.setState({
        status: value,
      });
    }
    if (value === '2') {
      this.setState({
        status: value,
      });
    }
    if (value === '3') {
      this.setState({
        status: value,
      });
    }
  };

  handleCheckbox = e => {
    const {
      state: { dailyArrDays },
    } = this;
    const {
      target: { name, checked },
    } = e;
    this.setState(preState => {
      if (checked) {
        return {
          dailyArrDays: [...preState.dailyArrDays, name],
        };
      }
      if (!checked) {
        const newArr = dailyArrDays.filter(
          daily => daily[name] !== name,
        );
        return { dailyArrDays: newArr };
      }
      return null;
    });
  };

  handleFrequencyChange = e => {
    const { value } = e.target;
    this.setState({ frequency: value });
  };

  handleYearlyChange = e => {
    const { value } = e.target;
    if (value === '0') {
      this.setState({
        scheduleType: value,
      });
    }
    if (value === '1') {
      this.setState({
        scheduleType: value,
      });
    }
    if (value === '2') {
      this.setState({
        scheduleType: value,
      });
    }
  };

  handleOnWeekCheckbox = e => {
    const { name } = e.target;
    this.setState(() => {
      if (name === '1') {
        return { weekDays: name };
      }
      if (name === '2') {
        return { weekDays: name };
      }
      if (name === '3') {
        return { weekDays: name };
      }
      if (name === '4') {
        return { weekDays: name };
      }
      if (name === '5') {
        return { weekDays: name };
      }
      if (name === '6') {
        return { weekDays: name };
      }
      if (name === '7') {
        return { weekDays: name };
      }

      return null;
    });
  };

  handleDaySelect = e => {
    const { value } = e.target;
    this.setState({
      selectedMonthlyDays: value,
    });
  };

  handleStartDateChange = date => {
    this.setState({
      startedDate: date,
    });
  };

  handleEndDate = date => {
    this.setState({
      endedDate: date,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const {
      props: { selected, formType, id, handleAllModel },
      state: {
        dailyArrDays,
        startedDate,
        endedDate,
        scheduleType,
        weekDays,
        status,
        frequency,
        selectedMonthlyDays,
      },
    } = this;

    const result = dailyArrDays.map(function(x) {
      return parseInt(x, 10);
    });

    // const selectedIdxs = selected.map(function(x) {
    //   return parseInt(x, 10);
    // });

    const StarttedDate = format(startedDate, ['YYYY-MM-DD']);
    const EndedDate = format(endedDate, ['YYYY-MM-DD']);

    const body = {
      schedule_level_id: JSON.parse(scheduleType),
      form_type: JSON.parse(formType),
      date_range_start: StarttedDate,
      date_range_end: EndedDate,
      ...(scheduleType === '0' && {
        selected_days: result,
      }),
      ...(scheduleType === '1' && {
        selected_days: weekDays,
      }),
      default_submission_status: JSON.parse(status),
      frequency: JSON.parse(frequency),
      month_day: JSON.parse(selectedMonthlyDays),
      xf_ids: JSON.parse(selected),
    };

    axios
      .post(
        `/fv3/api/manage-super-organizations-library/${id}/`,
        body,
      )
      .then(res => {
        if (res.status === 201) {
          handleAllModel(res);
        }
      })
      .catch();
  };

  render() {
    const {
      status,
      scheduleType,
      dailyArrDays,
      frequency,
      weekDays,
      selectedMonthlyDays,
      endedDate,
      startedDate,
    } = this.state;

    const weeks = [];
    const months = [];
    const day = [];
    for (let i = 1; i < 52; i += 1) {
      weeks.push({ key: i, name: i });
    }
    for (let i = 1; i <= 12; i += 1) {
      months.push({ key: i, name: i });
    }
    for (let i = 1; i <= 31; i += 1) {
      if (i <= 30) {
        day.push({ key: i, name: i });
      } else day.push({ id: i, name: 'Last' });
    }
    return (
      <form className="floating-form" onSubmit={this.handleSubmit}>
        <div className="form-form">
          <div className="selected-form">
            <div className="selected-text">
              <div className="form-group checkbox-group">
                <label>Type of schedule</label>
                <div className="custom-checkbox display-inline">
                  <RadioElement
                    label="Daily"
                    name="scheduleType"
                    value={0}
                    changeHandler={this.handleYearlyChange}
                    checked={scheduleType === '0'}
                  />
                  <RadioElement
                    label="Weekly"
                    name="scheduleType"
                    value={1}
                    changeHandler={this.handleYearlyChange}
                    checked={scheduleType === '1'}
                  />
                  <RadioElement
                    label="Monthly"
                    name="scheduleType"
                    value={2}
                    changeHandler={this.handleYearlyChange}
                    checked={scheduleType === '2'}
                  />
                </div>
              </div>
              {scheduleType === '0' && (
                <div className="form-group">
                  <div className="custom-checkbox display-inline">
                    <CheckBox
                      label="Sun"
                      name="1"
                      changeHandler={this.handleCheckbox}
                      checked={dailyArrDays.sun}
                    />
                    <CheckBox
                      label="Mon"
                      name="2"
                      changeHandler={this.handleCheckbox}
                      checked={dailyArrDays.mon}
                    />
                    <CheckBox
                      label="Tue"
                      name="3"
                      changeHandler={this.handleCheckbox}
                      checked={dailyArrDays.tue}
                    />
                    <CheckBox
                      label="Wed"
                      name="4"
                      changeHandler={this.handleCheckbox}
                      checked={dailyArrDays.wed}
                    />
                    <CheckBox
                      label="Thu"
                      name="5"
                      changeHandler={this.handleCheckbox}
                      checked={dailyArrDays.thu}
                    />
                    <CheckBox
                      label="Fri"
                      name="6"
                      changeHandler={this.handleCheckbox}
                      checked={dailyArrDays.fri}
                    />
                    <CheckBox
                      label="Sat"
                      name="7"
                      changeHandler={this.handleCheckbox}
                      checked={dailyArrDays.sat}
                    />
                  </div>
                </div>
              )}

              {scheduleType === '1' && (
                <div className="every-week flex">
                  <span className="ml-0">every</span>
                  <SelectElement
                    classname="border-0"
                    options={weeks}
                    value={frequency}
                    changeHandler={this.handleFrequencyChange}
                  />
                  <span>weeks on</span>
                  <div className="form-group">
                    <div className="custom-checkbox display-inline">
                      <RadioElement
                        label="Sun"
                        name="1"
                        changeHandler={this.handleOnWeekCheckbox}
                        checked={weekDays === '1'}
                      />
                      <RadioElement
                        label="Mon"
                        name="2"
                        changeHandler={this.handleOnWeekCheckbox}
                        checked={weekDays === '2'}
                      />
                      <RadioElement
                        label="Tue"
                        name="3"
                        changeHandler={this.handleOnWeekCheckbox}
                        checked={weekDays === '3'}
                      />
                      <RadioElement
                        label="Wed"
                        name="4"
                        changeHandler={this.handleOnWeekCheckbox}
                        checked={weekDays === '4'}
                      />
                      <RadioElement
                        label="Thu"
                        name="5"
                        changeHandler={this.handleOnWeekCheckbox}
                        checked={weekDays === '5'}
                      />
                      <RadioElement
                        label="Fri"
                        name="6"
                        changeHandler={this.handleOnWeekCheckbox}
                        checked={weekDays === '6'}
                      />
                      <RadioElement
                        label="Sat"
                        name="7"
                        changeHandler={this.handleOnWeekCheckbox}
                        checked={weekDays === '7'}
                      />
                    </div>
                  </div>
                </div>
              )}
              {scheduleType === '2' && (
                <div className="every-week flex">
                  <span className="ml-0">every</span>
                  <SelectElement
                    classname="border-0"
                    options={months}
                    value={frequency}
                    changeHandler={this.handleFrequencyChange}
                  />
                  <span>Months on day</span>
                  <SelectElement
                    options={day}
                    value={selectedMonthlyDays}
                    changeHandler={this.handleDaySelect}
                  />
                </div>
              )}

              <div className="row">
                <div className="col-xl-6">
                  <div className="form-group mrt-15">
                    <label>Start Date</label>
                    <DatePicker
                      selected={startedDate}
                      onChange={this.handleStartDateChange}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Start Date"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="form-group mrt-15">
                    <label>End Date</label>
                    <DatePicker
                      selected={endedDate}
                      onChange={this.handleEndDate}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Not Specified"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group flexrow checkbox-group">
                <label>Default submission status</label>
                <div className="custom-checkbox display-inline">
                  <RadioElement
                    label="Approved"
                    className="approved"
                    name="status"
                    value={3}
                    changeHandler={this.handleRadioChange}
                    checked={status === '3'}
                  />
                  <RadioElement
                    label="Pending"
                    className="pending"
                    name="status"
                    value={0}
                    changeHandler={this.handleRadioChange}
                    checked={status === '0'}
                  />
                  <RadioElement
                    label="Flagged"
                    className="flagged"
                    name="status"
                    value={2}
                    changeHandler={this.handleRadioChange}
                    checked={status === '2'}
                  />
                  <RadioElement
                    label="Rejected"
                    className="rejected"
                    name="status"
                    value={1}
                    changeHandler={this.handleRadioChange}
                    checked={status === '1'}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-group pull-right no-margin">
          <button type="submit" className="fieldsight-btn">
            Save
          </button>
        </div>
      </form>
    );
  }
}
