import React, { Component } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import DatePicker from "react-datepicker";

import InputElement from "../common/InputElement";
import RadioElement from "../common/RadioElement";
import CheckBox from "../common/CheckBox";
import SelectElement from "../common/SelectElement";

const animatedComponents = makeAnimated();

const getArrValue = (arr, value) => {
  if (arr.includes(value)) return true;
  else return false;
};

class GlobalModalForm extends Component {
  _isMounted = false;
  state = {
    id: this.props.formData ? this.props.formData.id : "",
    em: this.props.formData ? this.props.formData.em : null,
    status:
      this.props.formData && this.props.formData.default_submission_status
        ? this.props.formData.default_submission_status
        : 0,
    isDonor:
      this.props.formData && this.props.formData.setting
        ? this.props.formData.setting.donor_visibility
        : true,
    isEdit:
      this.props.formData && this.props.formData.setting
        ? this.props.formData.setting.can_edit
        : true,
    isDelete:
      this.props.formData && this.props.formData.setting
        ? this.props.formData.setting.can_delete
        : true,
    regionSelected: [],
    typeSelected: [],
    startDate:
      this.props.formData && this.props.formData.date_range_start
        ? new Date(this.props.formData.date_range_start)
        : new Date(),
    endDate:
      this.props.formData && this.props.formData.date_range_end
        ? new Date(this.props.formData.date_range_end)
        : null,
    weight:
      this.props.formData && this.props.formData.weight
        ? this.props.formData.weight
        : "",
    substageTitle:
      this.props.formData && this.props.formData.name
        ? this.props.formData.name
        : "",
    substageDesc:
      this.props.formData && this.props.formData.description
        ? this.props.formData.description
        : "",
    hasLoaded: false,
    order:
      this.props.formData && this.props.formData.order
        ? this.props.formData.order
        : 0,
    settingId:
      this.props.formData && this.props.formData.setting
        ? this.props.formData.setting.id
        : "",
    isDeploy:
      this.props.formData && this.props.formData.is_deployed
        ? this.props.formData.is_deployed
        : false,
    scheduleType:
      this.props.formData && this.props.formData.schedule_level_id
        ? this.props.formData.schedule_level_id
        : 0,
    dailyArrDays: {
      sun:
        this.props.formData && this.props.formData.selected_days
          ? getArrValue(this.props.formData.selected_days, 7)
          : false,
      mon:
        this.props.formData && this.props.formData.selected_days
          ? getArrValue(this.props.formData.selected_days, 1)
          : false,
      tue:
        this.props.formData && this.props.formData.selected_days
          ? getArrValue(this.props.formData.selected_days, 2)
          : false,
      wed:
        this.props.formData && this.props.formData.selected_days
          ? getArrValue(this.props.formData.selected_days, 3)
          : false,
      thu:
        this.props.formData && this.props.formData.selected_days
          ? getArrValue(this.props.formData.selected_days, 4)
          : false,
      fri:
        this.props.formData && this.props.formData.selected_days
          ? getArrValue(this.props.formData.selected_days, 5)
          : false,
      sat:
        this.props.formData && this.props.formData.selected_days
          ? getArrValue(this.props.formData.selected_days, 6)
          : false
    },
    selectedDays:
      this.props.formData && this.props.formData.selected_days
        ? this.props.formData.selected_days
        : [],
    weeklyArrDays: {
      sun:
        this.props.formData && this.props.formData.selected_days
          ? getArrValue(this.props.formData.selected_days, 7)
          : false,
      mon:
        this.props.formData && this.props.formData.selected_days
          ? getArrValue(this.props.formData.selected_days, 1)
          : false,
      tue:
        this.props.formData && this.props.formData.selected_days
          ? getArrValue(this.props.formData.selected_days, 2)
          : false,
      wed:
        this.props.formData && this.props.formData.selected_days
          ? getArrValue(this.props.formData.selected_days, 3)
          : false,
      thu:
        this.props.formData && this.props.formData.selected_days
          ? getArrValue(this.props.formData.selected_days, 4)
          : false,
      fri:
        this.props.formData && this.props.formData.selected_days
          ? getArrValue(this.props.formData.selected_days, 5)
          : false,
      sat:
        this.props.formData && this.props.formData.selected_days
          ? getArrValue(this.props.formData.selected_days, 6)
          : false
    },
    frequency:
      this.props.formData && this.props.formData.frequency
        ? this.props.formData.frequency
        : 1,
    notifyIncomplete:
      this.props.formData &&
      this.props.formData.setting &&
      this.props.formData.setting.notify_incomplete_schedule
        ? this.props.formData.setting.notify_incomplete_schedule
        : true
  };
  componentDidMount() {
    this._isMounted = true;
    const { typeOptions, regionOptions, formData } = this.props;

    const regionSelected = formData && formData.regions;
    const typeSelected = formData && formData.types;

    if (this._isMounted) {
      const newRegionArr =
        regionOptions &&
        regionOptions.map(each => ({
          ...each,
          value: each.identifier,
          label: each.name
        }));
      const newTypeArr =
        typeOptions &&
        typeOptions.map(each => ({
          ...each,
          value: each.identifier,
          label: each.name
        }));

      let selectedRegion = [];
      let selectedType = [];

      if (!!regionSelected && regionSelected.length > 0) {
        regionOptions.map(region => {
          if (stageData.regions.indexOf(region.id) > -1) {
            selectedRegion.push({
              ...region,
              value: region.identifier,
              label: region.name
            });
          }
        });
      } else {
        selectedRegion = newRegionArr;
      }

      if (typeSelected && typeSelected.length > 0) {
        typeOptions.map(type => {
          if (stageData.tags.indexOf(type.id) > -1) {
            selectedType.push({
              ...type,
              value: type.identifier,
              label: type.name
            });
          }
        });
      } else {
        selectedType = newTypeArr;
      }

      this.setState({
        hasLoaded: true,
        regionDropdown: newRegionArr,
        typeDropdown: newTypeArr,
        regionSelected: newRegionArr,
        typeSelected: newTypeArr
      });
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  handleClearState = () => {
    this.setState(
      {
        status: 0,
        isDonor: true,
        isEdit: true,
        isDelete: true,
        regionSelected: [],
        typeSelected: [],
        startDate: new Date(),
        endDate: new Date(),
        weight: "",
        substageTitle: "",
        substageDesc: "",
        hasLoaded: false,
        errors: {}
      },
      () => {
        this.props.handleToggleForm();
      }
    );
  };

  handleRadioChange = e => {
    const { name, value } = e.target;

    this.setState(state => {
      if (name == "status") {
        return {
          status: value
        };
      } else if (name == "donor") {
        return {
          isDonor: JSON.parse(value)
        };
      } else if (name == "edit") {
        return {
          isEdit: JSON.parse(value)
        };
      } else if (name == "delete") {
        return {
          isDelete: JSON.parse(value)
        };
      } else if (name == "scheduleType") {
        return {
          scheduleType: JSON.parse(value),
          selectedDays: []
        };
      } else if (name == "notifyIncomplete") {
        return {
          notifyIncomplete: JSON.parse(value)
        };
      }
    });
  };
  handleSelectRegionChange = region => {
    this.setState(state => {
      return {
        regionSelected: region
      };
    });
  };
  handleSelectTypeChange = type => {
    this.setState(state => {
      return {
        typeSelected: type
      };
    });
  };
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleStartDateChange = e => {
    const { endDate } = this.state;
    let errors = {};
    this.setState(state => {
      if (e > endDate) {
        errors.endDate = "Invalid Date";
        return {
          endDate: e,
          errors
        };
      } else {
        errors = {};
        return {
          startDate: e,
          errors
        };
      }
    });
  };
  handleEndDateChange = e => {
    const { startDate } = this.state;
    let errors = {};
    this.setState(state => {
      if (e < startDate) {
        errors.endDate = "Invalid Date";
        return {
          startDate: e,
          errors
        };
      } else {
        errors = {};
        return {
          endDate: e,
          errors
        };
      }
    });
  };
  getDay = day => {
    if (day == "mon") return 0;
    else if (day == "tue") return 1;
    else if (day == "wed") return 2;
    else if (day == "thu") return 3;
    else if (day == "fri") return 4;
    else if (day == "sat") return 5;
    else if (day == "sun") return 6;
  };

  handleCheckbox = e => {
    const name = e.target.name;
    const checked = e.target.checked;
    const selectedDay = this.getDay(name);
    this.setState(
      {
        dailyArrDays: {
          ...this.state.dailyArrDays,

          [e.target.name]: !this.state.dailyArrDays[name]
        }
      },
      () => {
        this.setState(state => {
          if (!!checked) {
            return { selectedDays: [...this.state.selectedDays, selectedDay] };
          } else {
            const days = this.state.selectedDays;
            return { selectedDays: days.filter(day => day != selectedDay) };
          }
        });
      }
    );
  };
  handleOnWeekCheckbox = e => {
    const name = e.target.name;
    const checked = e.target.checked;
    const day = this.getDay(name);
    this.setState(
      state => {
        if (name == "sun") {
          return {
            weeklyArrDays: {
              ...this.state.weeklyArrDays,
              [name]: !this.state.weeklyArrDays[name],
              mon: false,
              tue: false,
              wed: false,
              thu: false,
              fri: false,
              sat: false
            }
          };
        } else if (name == "mon") {
          return {
            weeklyArrDays: {
              ...this.state.weeklyArrDays,
              [name]: !this.state.weeklyArrDays[name],
              sun: false,
              tue: false,
              wed: false,
              thu: false,
              fri: false,
              sat: false
            }
          };
        } else if (name == "tue") {
          return {
            weeklyArrDays: {
              ...this.state.weeklyArrDays,
              [name]: !this.state.weeklyArrDays[name],
              sun: false,
              mon: false,
              wed: false,
              thu: false,
              fri: false,
              sat: false
            }
          };
        } else if (name == "wed") {
          return {
            weeklyArrDays: {
              ...this.state.weeklyArrDays,
              [name]: !this.state.weeklyArrDays[name],
              sun: false,
              tue: false,
              mon: false,
              thu: false,
              fri: false,
              sat: false
            }
          };
        } else if (name == "thu") {
          return {
            weeklyArrDays: {
              ...this.state.weeklyArrDays,
              [name]: !this.state.weeklyArrDays[name],
              sun: false,
              tue: false,
              wed: false,
              mon: false,
              fri: false,
              sat: false
            }
          };
        } else if (name == "fri") {
          return {
            weeklyArrDays: {
              ...this.state.weeklyArrDays,
              [name]: !this.state.weeklyArrDays[name],
              sun: false,
              tue: false,
              wed: false,
              thu: false,
              mon: false,
              sat: false
            }
          };
        } else if (name == "sat") {
          return {
            weeklyArrDays: {
              ...this.state.weeklyArrDays,
              [name]: !this.state.weeklyArrDays[name],
              sun: false,
              tue: false,
              wed: false,
              thu: false,
              fri: false,
              mon: false
            }
          };
        }
      },
      () => {
        this.setState(state => {
          if (!!checked) {
            return { selectedDays: [day] };
          } else {
            return { selectedDays: [] };
          }
        });
      }
    );
  };
  handleFrequencyChange = e => {
    const { value } = e.target;
    this.setState({ frequency: JSON.parse(value) });
  };
  handleDaySelect = e => {
    const { value } = e.target;
    this.setState({
      selectedDays: [JSON.parse(value)]
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.handleCreateForm(this.state);
  };

  render() {
    const {
      handleRadioChange,
      handleSelectRegionChange,
      handleSelectTypeChange,
      handleStartDateChange,
      handleEndDateChange,
      handleInputChange,
      handleSubmit,
      handleCheckbox,
      handleOnWeekCheckbox,
      handleFrequencyChange,
      handleDaySelect,
      props: {
        formType,
        isProjectWide,
        toggleFormModal,
        formTitle,
        isEditForm
      },
      state: {
        regionDropdown,
        regionSelected,
        typeDropdown,
        typeSelected,
        status,
        isDonor,
        isEdit,
        isDelete,
        weight,
        substageTitle,
        substageDesc,
        hasLoaded,
        startDate,
        endDate,
        errors,
        scheduleType,
        dailyArrDays,
        weeklyArrDays,
        selectedDays,
        frequency,
        notifyIncomplete
      }
    } = this;
    // console.log("in form", dailyArrDays);
    let weekOptions = [];
    let monthOPtions = [];
    let dayOptions = [];
    for (var i = 1; i < 52; i++) {
      weekOptions.push({ key: i, name: i });
    }
    for (var i = 1; i <= 12; i++) {
      monthOPtions.push({ key: i, name: i });
    }
    for (var i = 1; i <= 31; i++) {
      if (i <= 30) dayOptions.push({ key: i, name: i });
      else dayOptions.push({ key: 0, name: "last day" });
    }
    return (
      <>
        <form className="floating-form" onSubmit={handleSubmit}>
          <div className="form-form">
            <div className="selected-form">
              {!isEditForm && (
                <div className="add-btn flex-start">
                  <a data-tab="choose-form" onClick={toggleFormModal}>
                    {formTitle ? "Change form" : " Choose form"}
                    <span>
                      <i className="la la-plus"></i>
                    </span>
                  </a>
                </div>
              )}
              <div className="selected-text">
                <span>{formTitle}</span>
              </div>
            </div>
          </div>

          {formType == "schedule" && (
            <>
              {/* // for schedule form */}
              <div className="form-group checkbox-group">
                <label>Type of schedule</label>
                <div className="custom-checkbox display-inline">
                  <RadioElement
                    label="Daily"
                    name="scheduleType"
                    value={0}
                    changeHandler={handleRadioChange}
                    checked={scheduleType == 0}
                  />
                  <RadioElement
                    label="Weekly"
                    name="scheduleType"
                    value={1}
                    changeHandler={handleRadioChange}
                    checked={scheduleType == 1}
                  />
                  <RadioElement
                    label="Monthly"
                    name="scheduleType"
                    value={2}
                    changeHandler={handleRadioChange}
                    checked={scheduleType == 2}
                  />
                </div>
              </div>
              {scheduleType == 0 && (
                <div className="form-group">
                  <div className="custom-checkbox display-inline">
                    <CheckBox
                      label="Sun"
                      name="sun"
                      changeHandler={handleCheckbox}
                      checked={dailyArrDays.sun}
                    />
                    <CheckBox
                      label="Mon"
                      name="mon"
                      changeHandler={handleCheckbox}
                      checked={dailyArrDays.mon}
                    />
                    <CheckBox
                      label="Tue"
                      name="tue"
                      changeHandler={handleCheckbox}
                      checked={dailyArrDays.tue}
                    />
                    <CheckBox
                      label="Wed"
                      name="wed"
                      changeHandler={handleCheckbox}
                      checked={dailyArrDays.wed}
                    />
                    <CheckBox
                      label="Thu"
                      name="thu"
                      changeHandler={handleCheckbox}
                      checked={dailyArrDays.thu}
                    />
                    <CheckBox
                      label="Fri"
                      name="fri"
                      changeHandler={handleCheckbox}
                      checked={dailyArrDays.fri}
                    />
                    <CheckBox
                      label="Sat"
                      name="sat"
                      changeHandler={handleCheckbox}
                      checked={dailyArrDays.sat}
                    />
                  </div>
                </div>
              )}
              {scheduleType == 1 && (
                <div className="every-week flex">
                  <span className="ml-0">every</span>
                  <div className="select-option">
                    <SelectElement
                      options={weekOptions}
                      value={frequency}
                      changeHandler={handleFrequencyChange}
                    />
                  </div>
                  <span>weeks on</span>
                  <div className="form-group">
                    <div className="custom-checkbox display-inline">
                      <CheckBox
                        label="Sun"
                        name="sun"
                        changeHandler={handleOnWeekCheckbox}
                        checked={weeklyArrDays.sun}
                      />
                      <CheckBox
                        label="Mon"
                        name="mon"
                        changeHandler={handleOnWeekCheckbox}
                        checked={weeklyArrDays.mon}
                      />
                      <CheckBox
                        label="Tue"
                        name="tue"
                        changeHandler={handleOnWeekCheckbox}
                        checked={weeklyArrDays.tue}
                      />
                      <CheckBox
                        label="Wed"
                        name="wed"
                        changeHandler={handleOnWeekCheckbox}
                        checked={weeklyArrDays.wed}
                      />
                      <CheckBox
                        label="Thu"
                        name="thu"
                        changeHandler={handleOnWeekCheckbox}
                        checked={weeklyArrDays.thu}
                      />
                      <CheckBox
                        label="Fri"
                        name="fri"
                        changeHandler={handleOnWeekCheckbox}
                        checked={weeklyArrDays.fri}
                      />
                      <CheckBox
                        label="Sat"
                        name="sat"
                        changeHandler={handleOnWeekCheckbox}
                        checked={weeklyArrDays.sat}
                      />
                    </div>
                  </div>
                </div>
              )}
              {scheduleType == 2 && (
                <div className="every-week flex">
                  <span className="ml-0">every</span>
                  <div className="select-option">
                    <SelectElement
                      options={monthOPtions}
                      value={frequency}
                      changeHandler={handleFrequencyChange}
                    />
                  </div>
                  <span>Month on</span>
                  <SelectElement
                    options={dayOptions}
                    value={selectedDays[0]}
                    changeHandler={handleDaySelect}
                  />
                </div>
              )}
              <div className="form-group flexrow checkbox-group">
                <label>Notify if incomplete</label>
                <div className="custom-checkbox display-inline">
                  <RadioElement
                    label="Yes"
                    name="notifyIncomplete"
                    changeHandler={handleRadioChange}
                    value={true}
                    checked={notifyIncomplete == true}
                  />
                  <RadioElement
                    label="No"
                    name="notifyIncomplete"
                    changeHandler={handleRadioChange}
                    value={false}
                    checked={notifyIncomplete == false}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-xl-6">
                  <div className="form-group">
                    <DatePicker
                      selected={startDate}
                      onChange={handleStartDateChange}
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
                  <div className="form-group">
                    <DatePicker
                      selected={endDate}
                      onChange={handleEndDateChange}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="End Date"
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
          {formType == "substage" && (
            <>
              {/* for subStage form */}
              <div className="form-group">
                <InputElement
                  formType="editForm"
                  tag="input"
                  type="number"
                  //   required={true}
                  label="Weight"
                  name="weight"
                  value={weight}
                  changeHandler={handleInputChange}
                />
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
                changeHandler={handleRadioChange}
                checked={status == 3}
              />
              <RadioElement
                label="Pending"
                className="pending"
                name="status"
                value={0}
                changeHandler={handleRadioChange}
                checked={status == 0}
              />
              <RadioElement
                label="Flagged"
                className="flagged"
                name="status"
                value={2}
                changeHandler={handleRadioChange}
                checked={status == 2}
              />
              <RadioElement
                label="Rejected"
                className="rejected"
                name="status"
                value={1}
                changeHandler={handleRadioChange}
                checked={status == 1}
              />
            </div>
          </div>
          {!isProjectWide && regionDropdown && regionDropdown.length > 0 && (
            <div className="form-group">
              <label>Regions</label>
              {hasLoaded && (
                <Select
                  onChange={handleSelectRegionChange}
                  options={regionDropdown}
                  isMulti={true}
                  defaultValue={regionSelected}
                  components={animatedComponents}
                />
              )}
            </div>
          )}
          {!isProjectWide && typeDropdown && typeDropdown.length > 0 && (
            <div className="form-group">
              <label>Types</label>
              {hasLoaded && (
                <Select
                  defaultValue={typeSelected}
                  isMulti
                  onChange={handleSelectTypeChange}
                  options={typeDropdown}
                />
              )}
            </div>
          )}
          <div className="form-group checkbox-group">
            <label>Donor visibility</label>
            <div className="custom-checkbox display-inline">
              <RadioElement
                label="Yes"
                name="donor"
                changeHandler={handleRadioChange}
                value={true}
                checked={isDonor == true}
              />
              <RadioElement
                label="No"
                name="donor"
                changeHandler={handleRadioChange}
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
                changeHandler={handleRadioChange}
                value={true}
                checked={isEdit == true}
              />
              <RadioElement
                label="No"
                name="edit"
                changeHandler={handleRadioChange}
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
                changeHandler={handleRadioChange}
                value={true}
                checked={isDelete == true}
              />
              <RadioElement
                label="No"
                name="delete"
                changeHandler={handleRadioChange}
                value={false}
                checked={isDelete == false}
              />
            </div>
          </div>
          {formType == "substage" && (
            <>
              <div className="form-group">
                <InputElement
                  formType="editForm"
                  tag="input"
                  type="text"
                  required={true}
                  label="Name"
                  name="substageTitle"
                  value={substageTitle}
                  changeHandler={handleInputChange}
                />
              </div>
              <div className="form-group">
                <InputElement
                  formType="editForm"
                  tag="input"
                  type="text"
                  //   required={true}
                  label="Description"
                  name="substageDesc"
                  value={substageDesc}
                  changeHandler={handleInputChange}
                />
              </div>
            </>
          )}
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
