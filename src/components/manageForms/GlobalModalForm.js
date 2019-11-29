import React, { Component } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import RadioElement from '../common/RadioElement';
import CheckBox from '../common/CheckBox';
import SelectElement from '../common/SelectElement';

/* eslint-disable   react/destructuring-assignment */

const getArrValue = (arr, value) => {
  if (arr.includes(value)) return true;
  return false;
  // else return false;
};

class GlobalModalForm extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      id: props.formData ? props.formData.id : '',
      em: props.formData ? props.formData.em : null,
      status:
        props.formData && props.formData.default_submission_status
          ? props.formData.default_submission_status
          : 0,
      isDonor:
        props.formData && props.formData.setting
          ? props.formData.setting.donor_visibility
          : true,
      isEdit:
        props.formData && props.formData.setting
          ? props.formData.setting.can_edit
          : true,
      isDelete:
        props.formData && props.formData.setting
          ? props.formData.setting.can_delete
          : true,
      regionSelected: [],
      typeSelected: [],
      startDate:
        props.formData && props.formData.date_range_start
          ? new Date(props.formData.date_range_start)
          : new Date(),
      endDate:
        props.formData && props.formData.date_range_end
          ? new Date(props.formData.date_range_end)
          : null,
      hasLoaded: false,
      order:
        props.formData && props.formData.order
          ? props.formData.order
          : 0,
      settingId:
        props.formData && props.formData.setting
          ? props.formData.setting.id
          : '',
      isDeploy:
        props.formData && props.formData.is_deployed
          ? props.formData.is_deployed
          : false,
      scheduleType:
        props.formData && props.formData.schedule_level_id
          ? props.formData.schedule_level_id
          : 0,
      dailyArrDays: {
        mon:
          props.formData && props.formData.selected_days
            ? getArrValue(props.formData.selected_days, 1)
            : false,
        tue:
          props.formData && props.formData.selected_days
            ? getArrValue(props.formData.selected_days, 2)
            : false,
        wed:
          props.formData && props.formData.selected_days
            ? getArrValue(props.formData.selected_days, 3)
            : false,
        thu:
          props.formData && props.formData.selected_days
            ? getArrValue(props.formData.selected_days, 4)
            : false,
        fri:
          props.formData && props.formData.selected_days
            ? getArrValue(props.formData.selected_days, 5)
            : false,
        sat:
          props.formData && props.formData.selected_days
            ? getArrValue(props.formData.selected_days, 6)
            : false,
        sun:
          props.formData && props.formData.selected_days
            ? getArrValue(props.formData.selected_days, 7)
            : false,
      },
      selectedDays:
        props.formData && props.formData.selected_days
          ? props.formData.selected_days
          : [],
      weeklyArrDays: {
        mon:
          props.formData && props.formData.selected_days
            ? getArrValue(props.formData.selected_days, 1)
            : false,
        tue:
          props.formData && props.formData.selected_days
            ? getArrValue(props.formData.selected_days, 2)
            : false,
        wed:
          props.formData && props.formData.selected_days
            ? getArrValue(props.formData.selected_days, 3)
            : false,
        thu:
          props.formData && props.formData.selected_days
            ? getArrValue(props.formData.selected_days, 4)
            : false,
        fri:
          props.formData && props.formData.selected_days
            ? getArrValue(props.formData.selected_days, 5)
            : false,
        sat:
          props.formData && props.formData.selected_days
            ? getArrValue(props.formData.selected_days, 6)
            : false,
        sun:
          props.formData && props.formData.selected_days
            ? getArrValue(props.formData.selected_days, 7)
            : false,
      },
      frequency:
        props.formData && props.formData.frequency
          ? props.formData.frequency
          : 1,
      notifyIncomplete:
        props.formData && props.formData.setting
          ? props.formData.setting.notify_incomplete_schedule
          : true,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    const {
      typeOptions,
      regionOptions,
      formData,
      isProjectWide,
    } = this.props;
    if (!isProjectWide) {
      const regionSelected =
        formData && formData.setting && formData.setting.regions;
      const typeSelected =
        formData && formData.setting && formData.setting.types;

      if (this._isMounted) {
        const newRegionArr =
          regionOptions &&
          regionOptions.map(each => ({
            ...each,
            value: each.identifier,
            label: each.name,
          }));
        const newTypeArr =
          typeOptions &&
          typeOptions.map(each => ({
            ...each,
            value: each.identifier,
            label: each.name,
          }));

        let selectedRegion = [];
        let selectedType = [];

        if (formData && formData.setting) {
          if (regionSelected && regionSelected.length > 0) {
            regionOptions.map(region => {
              if (regionSelected.indexOf(region.id) > -1) {
                return selectedRegion.push({
                  ...region,
                  value: region.identifier,
                  label: region.name,
                });
              }
              return selectedRegion;
            });
          }

          if (typeSelected && typeSelected.length > 0) {
            typeOptions.map(type => {
              if (typeSelected.indexOf(type.id) > -1) {
                return selectedType.push({
                  ...type,
                  value: type.identifier,
                  label: type.name,
                });
              }
              return selectedType;
            });
          }
        } else {
          selectedRegion = newRegionArr;
          selectedType = newTypeArr;
        }

        this.setState({
          hasLoaded: true,
          regionDropdown: newRegionArr,
          typeDropdown: newTypeArr,
          regionSelected: selectedRegion,
          typeSelected: selectedType,
        });
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleClearState = () => {
    const { handleToggleForm } = this;
    this.setState(
      {
        status: 0,
        isDonor: true,
        isEdit: true,
        isDelete: true,
        regionSelected: [],
        typeSelected: [],
        startDate: new Date(),
        endDate: null,
        hasLoaded: false,
        errors: {},
      },
      () => {
        handleToggleForm();
      },
    );
  };

  handleRadioChange = e => {
    const { name, value } = e.target;

    this.setState(() => {
      switch (name) {
        case 'status':
          return {
            status: value,
          };
        case 'donor':
          return {
            isDonor: JSON.parse(value),
          };
        case 'edit':
          return {
            isEdit: JSON.parse(value),
          };
        case 'delete':
          return {
            isDelete: JSON.parse(value),
          };
        case 'scheduleType':
          return {
            scheduleType: JSON.parse(value),
            selectedDays: [],
          };
        case 'notifyIncomplete':
          return {
            notifyIncomplete: JSON.parse(value),
          };
        default:
          return null;
      }

      //   if (name === 'status') {
      //     return {
      //       status: value,
      //     };
      //   }
      //   if (name === 'donor') {
      //     return {
      //       isDonor: JSON.parse(value),
      //     };
      //   }
      //   if (name === 'edit') {
      //     return {
      //       isEdit: JSON.parse(value),
      //     };
      //   }
      //   if (name === 'delete') {
      //     return {
      //       isDelete: JSON.parse(value),
      //     };
      //   }
      //   if (name === 'scheduleType') {
      //     return {
      //       scheduleType: JSON.parse(value),
      //       selectedDays: [],
      //     };
      //   }
      //   if (name === 'notifyIncomplete') {
      //     return {
      //       notifyIncomplete: JSON.parse(value),
      //     };
      //   }
    });
  };

  handleSelectRegionChange = region => {
    this.setState({
      // return {
      regionSelected: region,
      // };
    });
  };

  handleSelectTypeChange = type => {
    this.setState({
      // return {
      typeSelected: type,
      // };
    });
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleStartDateChange = e => {
    const { endDate } = this.state;
    const errors = {};
    this.setState(() => {
      if (endDate && e > endDate) {
        errors.endDate = 'Invalid Date';
        return {
          endDate: e,
          errors,
        };
      }
      // else {
      //   errors = {};
      return {
        // startDate: e,
        errors,
      };
      // }
    });
  };

  handleEndDateChange = e => {
    const { startDate } = this.state;
    const errors = {};
    this.setState(() => {
      if (e < startDate) {
        errors.endDate = 'Invalid Date';
        return {
          startDate: e,
          errors,
        };
      }
      // else {
      //   errors = {};
      return {
        // endDate: e,
        errors,
      };
      // }
    });
  };

  getDay = day => {
    if (day === 'mon') return 1;
    if (day === 'tue') return 2;
    if (day === 'wed') return 3;
    if (day === 'thu') return 4;
    if (day === 'fri') return 5;
    if (day === 'sat') return 6;
    if (day === 'sun') return 7;
    return null;
  };

  handleCheckbox = e => {
    const {
      state: { dailyArrDays },
    } = this;

    const {
      target: { name, checked },
    } = e;
    const selectedDay = this.getDay(name);
    this.setState(
      preState => ({
        dailyArrDays: {
          ...preState.dailyArrDays,

          [e.target.name]: !dailyArrDays[name],
        },
      }),
      () => {
        this.setState(state => {
          if (checked) {
            return {
              selectedDays: [...state.selectedDays, selectedDay],
            };
          }
          if (!checked) {
            const days = state.selectedDays;
            return {
              selectedDays: days.filter(day => day !== selectedDay),
            };
          }
          return null;
        });
      },
    );
  };

  handleOnWeekCheckbox = e => {
    const {
      target: { name, checked },
    } = e;
    const day = this.getDay(name);
    this.setState(
      state => {
        if (name === 'sun') {
          return {
            weeklyArrDays: {
              ...state.weeklyArrDays,
              [name]: !state.weeklyArrDays[name],
              mon: false,
              tue: false,
              wed: false,
              thu: false,
              fri: false,
              sat: false,
            },
          };
        }
        if (name === 'mon') {
          return {
            weeklyArrDays: {
              ...state.weeklyArrDays,
              [name]: !state.weeklyArrDays[name],
              sun: false,
              tue: false,
              wed: false,
              thu: false,
              fri: false,
              sat: false,
            },
          };
        }
        if (name === 'tue') {
          return {
            weeklyArrDays: {
              ...state.weeklyArrDays,
              [name]: !state.weeklyArrDays[name],
              sun: false,
              mon: false,
              wed: false,
              thu: false,
              fri: false,
              sat: false,
            },
          };
        }
        if (name === 'wed') {
          return {
            weeklyArrDays: {
              ...state.weeklyArrDays,
              [name]: !state.weeklyArrDays[name],
              sun: false,
              tue: false,
              mon: false,
              thu: false,
              fri: false,
              sat: false,
            },
          };
        }
        if (name === 'thu') {
          return {
            weeklyArrDays: {
              ...state.weeklyArrDays,
              [name]: !state.weeklyArrDays[name],
              sun: false,
              tue: false,
              wed: false,
              mon: false,
              fri: false,
              sat: false,
            },
          };
        }
        if (name === 'fri') {
          return {
            weeklyArrDays: {
              ...state.weeklyArrDays,
              [name]: !state.weeklyArrDays[name],
              sun: false,
              tue: false,
              wed: false,
              thu: false,
              mon: false,
              sat: false,
            },
          };
        }
        if (name === 'sat') {
          return {
            weeklyArrDays: {
              ...state.weeklyArrDays,
              [name]: !state.weeklyArrDays[name],
              sun: false,
              tue: false,
              wed: false,
              thu: false,
              fri: false,
              mon: false,
            },
          };
        }
        return null;
      },
      () => {
        this.setState(() => {
          if (checked) {
            return { selectedDays: [day] };
          }
          if (!checked) {
            return { selectedDays: [] };
          }
          return null;
        });
      },
    );
  };

  handleFrequencyChange = e => {
    const { value } = e.target;
    this.setState({ frequency: JSON.parse(value) });
  };

  handleDaySelect = e => {
    const { value } = e.target;
    this.setState({
      selectedDays: [JSON.parse(value)],
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { handleCreateForm } = this.props;
    handleCreateForm(this.state);
  };

  render() {
    const {
      props: {
        formType,
        isProjectWide,
        toggleFormModal,
        formTitle,
        isEditForm,
      },
      state: {
        regionDropdown,
        regionSelected,
        typeDropdown,
        typeSelected,
        status,
        // isDonor,
        // isEdit,
        // isDelete,
        hasLoaded,
        startDate,
        endDate,
        errors,
        scheduleType,
        dailyArrDays,
        weeklyArrDays,
        selectedDays,
        frequency,
        notifyIncomplete,
      },
    } = this;

    const weekOptions = [];
    const monthOPtions = [];
    const dayOptions = [];
    for (let i = 1; i < 52; i += 1) {
      weekOptions.push({ key: i, name: i });
    }
    for (let i = 1; i <= 12; i += 1) {
      monthOPtions.push({ key: i, name: i });
    }
    for (let i = 1; i <= 31; i += 1) {
      if (i <= 30) dayOptions.push({ key: i, name: i });
      else dayOptions.push({ key: 0, name: 'Last' });
    }
    return (
      <>
        <form className="floating-form" onSubmit={this.handleSubmit}>
          <div className="form-form">
            <div className="selected-form">
              <div className="selected-text">
                <span>{formTitle}</span>
              </div>
              {!isEditForm && (
                <div className="add-btn flex-start">
                  <a
                    data-tab="choose-form"
                    onClick={toggleFormModal}
                    tabIndex="0"
                    role="button"
                    onKeyDown={toggleFormModal}
                  >
                    {formTitle ? 'Change form' : ' Choose form'}
                    <span>
                      <i className="la la-file-text-o" />
                    </span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {formType === 'schedule' && (
            <>
              {/* // for schedule form */}
              <div className="form-group checkbox-group">
                <label>Type of schedule</label>
                <div className="custom-checkbox display-inline">
                  <RadioElement
                    label="Daily"
                    name="scheduleType"
                    value={0}
                    changeHandler={this.handleRadioChange}
                    checked={scheduleType === 0}
                  />
                  <RadioElement
                    label="Weekly"
                    name="scheduleType"
                    value={1}
                    changeHandler={this.handleRadioChange}
                    checked={scheduleType === 1}
                  />
                  <RadioElement
                    label="Monthly"
                    name="scheduleType"
                    value={2}
                    changeHandler={this.handleRadioChange}
                    checked={scheduleType === 2}
                  />
                </div>
              </div>
              {scheduleType === 0 && (
                <div className="form-group">
                  <div className="custom-checkbox display-inline">
                    <CheckBox
                      label="Sun"
                      name="sun"
                      changeHandler={this.handleCheckbox}
                      checked={dailyArrDays.sun}
                    />
                    <CheckBox
                      label="Mon"
                      name="mon"
                      changeHandler={this.handleCheckbox}
                      checked={dailyArrDays.mon}
                    />
                    <CheckBox
                      label="Tue"
                      name="tue"
                      changeHandler={this.handleCheckbox}
                      checked={dailyArrDays.tue}
                    />
                    <CheckBox
                      label="Wed"
                      name="wed"
                      changeHandler={this.handleCheckbox}
                      checked={dailyArrDays.wed}
                    />
                    <CheckBox
                      label="Thu"
                      name="thu"
                      changeHandler={this.handleCheckbox}
                      checked={dailyArrDays.thu}
                    />
                    <CheckBox
                      label="Fri"
                      name="fri"
                      changeHandler={this.handleCheckbox}
                      checked={dailyArrDays.fri}
                    />
                    <CheckBox
                      label="Sat"
                      name="sat"
                      changeHandler={this.handleCheckbox}
                      checked={dailyArrDays.sat}
                    />
                  </div>
                </div>
              )}
              {scheduleType === 1 && (
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
              )}
              {scheduleType === 2 && (
                <div className="every-week flex">
                  <span className="ml-0">every</span>
                  <SelectElement
                    classname="border-0"
                    options={monthOPtions}
                    value={frequency}
                    changeHandler={this.handleFrequencyChange}
                  />
                  <span>Months on day</span>
                  <SelectElement
                    options={dayOptions}
                    value={selectedDays[0]}
                    changeHandler={this.handleDaySelect}
                  />
                </div>
              )}
              <div className="form-group flexrow checkbox-group">
                <label>Notify if incomplete</label>
                <div className="custom-checkbox display-inline">
                  <RadioElement
                    label="Yes"
                    name="notifyIncomplete"
                    changeHandler={this.handleRadioChange}
                    value
                    checked={notifyIncomplete === true}
                  />
                  <RadioElement
                    label="No"
                    name="notifyIncomplete"
                    changeHandler={this.handleRadioChange}
                    value={false}
                    checked={notifyIncomplete === false}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-xl-6">
                  <div className="form-group mrt-15">
                    <label>Start Date</label>
                    <DatePicker
                      selected={startDate}
                      onChange={this.handleStartDateChange}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Start Date"
                      className="form-control"
                    />
                    {errors && errors.startDate && (
                      <span color="red" className="error">
                        {errors.startDate}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="form-group mrt-15">
                    <label>End Date</label>
                    <DatePicker
                      selected={endDate}
                      onChange={this.handleEndDateChange}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Not Specified"
                      className="form-control"
                    />
                    {errors && errors.endDate && (
                      <span color="red" className="error">
                        {errors.endDate}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="form-group flexrow checkbox-group">
            <label>Default submission status</label>
            <div className="custom-checkbox display-inline">
              <RadioElement
                label="Approved"
                className="approved"
                name="status"
                value={3}
                changeHandler={this.handleRadioChange}
                checked={status === 3}
              />
              <RadioElement
                label="Pending"
                className="pending"
                name="status"
                value={0}
                changeHandler={this.handleRadioChange}
                checked={status === 0}
              />
              <RadioElement
                label="Flagged"
                className="flagged"
                name="status"
                value={2}
                changeHandler={this.handleRadioChange}
                checked={status === 2}
              />
              <RadioElement
                label="Rejected"
                className="rejected"
                name="status"
                value={1}
                changeHandler={this.handleRadioChange}
                checked={status === 1}
              />
            </div>
          </div>
          {!isProjectWide &&
            regionDropdown &&
            regionDropdown.length > 0 && (
              <div>
                <label>Regions</label>
                {hasLoaded && (
                  <Select
                    defaultValue={regionSelected}
                    isMulti
                    options={regionDropdown}
                    onChange={this.handleSelectRegionChange}
                  />
                )}
              </div>
            )}
          {!isProjectWide && typeDropdown && typeDropdown.length > 0 && (
            <div>
              <label>Types</label>
              {hasLoaded && (
                <Select
                  defaultValue={typeSelected}
                  isMulti
                  options={typeDropdown}
                  onChange={this.handleSelectTypeChange}
                />
              )}
            </div>
          )}
          {/* <div className="form-group checkbox-group">
            <label>Donor visibility</label>
            <div className="custom-checkbox display-inline">
              <RadioElement
                label="Yes"
                name="donor"
                changeHandler={this.handleRadioChange}
                value={true}
                checked={isDonor == true}
              />
              <RadioElement
                label="No"
                name="donor"
                changeHandler={this.handleRadioChange}
                value={false}
                checked={isDonor == false}
              />
            </div>
          </div>
          <div className="form-group checkbox-group">
            <label>Can edit submission ?</label>
            <div className="custom-checkbox display-inline">
              <RadioElement
                label="Yes"
                name="edit"
                changeHandler={this.handleRadioChange}
                value={true}
                checked={isEdit == true}
              />
              <RadioElement
                label="No"
                name="edit"
                changeHandler={this.handleRadioChange}
                value={false}
                checked={isEdit == false}
              />
            </div>
          </div>
          <div className="form-group checkbox-group">
            <label>Can delete submission ?</label>
            <div className="custom-checkbox display-inline">
              <RadioElement
                label="Yes"
                name="delete"
                changeHandler={this.handleRadioChange}
                value={true}
                checked={isDelete == true}
              />
              <RadioElement
                label="No"
                name="delete"
                changeHandler={this.handleRadioChange}
                value={false}
                checked={isDelete == false}
              />
            </div>
          </div> */}
          <div className="form-group pull-right no-margin">
            <button type="submit" className="fieldsight-btn">
              Save
            </button>
          </div>
        </form>
      </>
    );
  }
}
export default GlobalModalForm;
