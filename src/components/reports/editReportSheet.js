import React, { Component } from 'react';

// import SelectElement from '../common/SelectElement';

export default class editReportSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <form className="floating-form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          {/* <h6>{getReportName(selectedReport)}</h6> */}
        </div>
        <div className="form-group">
          <label>Schedule Type:</label>
          {/* <SelectElement
            classname="border-0"
            options={scheduleOptions}
            value={scheduleType}
            changeHandler={this.handleScheduleTypeChange}
          /> */}
        </div>
        {/* {scheduleType === '2' && (
          <div className="every-week flex">
            <span className="ml-0">every</span>
            <SelectElement
              classname="border-0"
              options={weekOptions}
              value={selectedDayOnWeek}
              changeHandler={this.handleSelectedDayChange}
            />
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
          </div>
        )} */}
        <div className="form-group pull-right no-margin">
          &nbsp;
          <button type="submit" className="fieldsight-btn">
            Save
          </button>
        </div>
      </form>
    );
  }
}
