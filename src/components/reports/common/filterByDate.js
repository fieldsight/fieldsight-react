import React, { Component, createRef } from 'react';
import DatePicker from 'react-datepicker';

const CustomInput = React.forwardRef((props, ref) => (
  <div className="custom-group" ref={ref}>
    <input
      className="custom-control"
      value={props.value ? props.value : props.placeholderText}
      onClick={props.onClick}
      readOnly
    />
    <div className="custom-group-append">
      <span className="custom-group-text">
        <i className="material-icons">calendar_today</i>
      </span>
    </div>
  </div>
));

export default class FilterByDate extends Component {
  constructor(props) {
    super(props);
    this.startRef = createRef();
    this.endRef = createRef();
  }

  render() {
    const {
      className,
      startDate,
      endDate,
      createdDate,
      tillDate,
      startDateHandler,
      endDateHandler,
      errors,
    } = this.props;
    return (
      <div className={className}>
        <label className="">Time period</label>
        <div className="inline-flex ">
          <DatePicker
            dateFormat="yyyy-MM-dd"
            customInput={
              <CustomInput
                ref={this.startRef}
                placeholderText="Start Date"
                value={startDate}
              />
            }
            onChange={startDateHandler}
            selected={startDate}
            minDate={createdDate}
          />
          {errors && errors.startDate && (
            <span color="red" className="error">
              {errors.startDate}
            </span>
          )}
          <span className="icon-between">
            <i className="material-icons">arrow_right_alt</i>
          </span>
          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={endDate}
            onChange={endDateHandler}
            customInput={
              <CustomInput
                ref={this.endRef}
                placeholderText="End Date"
                value={endDate}
              />
            }
            maxDate={tillDate}
          />
          {errors && errors.endDate && (
            <span color="red" className="error">
              {errors.endDate}
            </span>
          )}
        </div>
      </div>
    );
  }
}
