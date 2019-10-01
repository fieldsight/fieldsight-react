import React, { Component } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import DatePicker from "react-datepicker";

import InputElement from "../common/InputElement";
import RadioElement from "../common/RadioElement";

const animatedComponents = makeAnimated();

class GlobalModalForm extends Component {
  _isMounted = false;
  state = {
    id: this.props.formData ? this.props.formData.id : "",
    em: this.props.formData ? this.props.formData.em : null,
    status: this.props.formData
      ? this.props.formData.default_submission_status
      : 0,
    isDonor: this.props.formData
      ? this.props.formData.setting.donor_visibility
      : true,
    isEdit: this.props.formData ? this.props.formData.setting.can_edit : true,
    isDelete: this.props.formData
      ? this.props.formData.setting.can_delete
      : true,
    regionSelected: [],
    typeSelected: [],
    startDate: this.props.formData
      ? new Date(this.props.formData.date_range_start)
      : new Date(),
    endDate: this.props.formData
      ? new Date(this.props.formData.date_range_end)
      : new Date(),
    weight: this.props.formData ? this.props.formData.weight : "",
    substageTitle: this.props.formData ? this.props.formData.name : "",
    substageDesc: this.props.formData ? this.props.formData.description : "",
    hasLoaded: false,
    scheduleType: "daily",
    order: this.props.formData ? this.props.formData.order : 0,
    settingId: this.props.formData ? this.props.formData.setting.id : "",
    isDeploy: this.props.formData ? this.props.formData.is_deployed : false
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
          scheduleType: value
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
        scheduleType,
        startDate,
        endDate,
        errors
      }
    } = this;
    // console.log("in form", this.props.formData);

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
                    value={"daily"}
                    changeHandler={handleRadioChange}
                    checked={scheduleType == "daily"}
                  />
                  <RadioElement
                    label="Weekly"
                    name="scheduleType"
                    value={"weekly"}
                    changeHandler={handleRadioChange}
                    checked={scheduleType == "weekly"}
                  />
                  <RadioElement
                    label="Monthly"
                    name="scheduleType"
                    value={"monthly"}
                    changeHandler={handleRadioChange}
                    checked={scheduleType == "monthly"}
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
          {!isProjectWide && (
            <div className="form-group">
              <label>Regions</label>
              {hasLoaded && (
                <Select
                  // closeMenuOnSelect={false}
                  // className="select2-select select2"
                  onChange={handleSelectRegionChange}
                  options={regionDropdown}
                  isMulti={true}
                  defaultValue={regionSelected}
                  components={animatedComponents}
                />
              )}
            </div>
          )}
          {!isProjectWide && (
            <div className="form-group">
              <label>Types</label>
              {hasLoaded && (
                <Select
                  defaultValue={typeSelected}
                  isMulti
                  onChange={handleSelectTypeChange}
                  options={typeDropdown}
                  className="basic-multi-select"
                  classNamePrefix="select"
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
