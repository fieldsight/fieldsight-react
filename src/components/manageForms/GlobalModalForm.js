import React, { Component } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import DatePicker from "react-datepicker";

import InputElement from "../common/InputElement";
import RadioElement from "../common/RadioElement";
import CheckBox from "../common/CheckBox";
import Modal from "../common/Modal";
import AddForm from "./AddForm";

const animatedComponents = makeAnimated();

class GlobalModalForm extends Component {
  state = {
    optionRegion: [],
    optionType: [],
    formId: "",
    formTitle: "",
    status: 3,
    isDonor: false,
    isEdit: false,
    isDelete: false,
    regionSelected: [],
    typeSelected: [],
    xf: "",
    showFormModal: false,
    activeTab: "myForms",
    myFormList: [],
    projectFormList: [],
    sharedFormList: [],
    regionSelected: [],
    typeSelected: [],
    startDate: new Date(),
    endDate: new Date()
  };
  componentDidMount(nextProps) {
    const { typeOptions, regionOptions } = this.props;
    const newRegionArr = regionOptions.map(each => ({
      ...each,
      value: each.identifier,
      label: each.name
    }));
    const newTypeArr = typeOptions.map(each => ({
      ...each,
      value: each.identifier,
      label: each.name
    }));

    this.setState({
      optionRegion: newRegionArr,
      optionType: newTypeArr,
      regionSelected: newRegionArr,
      typeSelected: newTypeArr
      // commonFormData: {
      //   ...this.state.commonFormData,
      //   regionSelected: newRegionArr,
      //   typeSelected: newTypeArr
      // }
    });

    if (nextProps.myForms != this.props.myForms) {
      this.setState({
        myFormList: this.props.myForms
      });
    } else if (nextProps.projectForms != this.props.projectForms) {
      this.setState({
        projectFormList: this.props.projectForms
      });
    } else if (nextProps.sharedForms != this.props.sharedForms) {
      this.setState({
        sharedFormList: this.props.sharedForms
      });
    }
  }

  handleRadioChange = e => {
    console.log("radio");
  };
  handleSelectRegionChange = region => {
    console.log("region");
  };
  handleSelectTypeChange = type => {
    console.log("type");
  };
  toggleFormModal = () => {
    this.setState({ showFormModal: !this.state.showFormModal });
  };
  toggleTab = tab => {
    this.setState({
      activeTab: tab,
      myFormList: this.props.myForms,
      sharedFormList: this.props.sharedForms,
      projectFormList: this.props.projectForms
    });
  };

  handleMyFormChange = (e, title) => {
    this.setState({
      formId: e.target.value,
      formTitle: title
    });
  };
  handleSaveForm = () => {
    this.setState({
      // commonFormData: {
      //   ...this.state.commonFormData,
      xf: this.state.formId,
      // },
      showFormModal: !this.state.showFormModal
    });
  };
  onChangeHandler = () => {};
  render() {
    const {
      handleRadioChange,
      handleSelectRegionChange,
      handleSelectTypeChange,
      toggleFormModal,
      toggleTab,
      handleSaveForm,
      handleMyFormChange,
      onChangeHandler,
      props: {},
      state: {
        optionRegion,
        optionType,
        formTitle,
        formId,
        showFormModal,
        activeTab,
        myFormList,
        sharedFormList,
        projectFormList
      }
    } = this;

    return (
      <>
        <form
          className="floating-form"
          // onSubmit={this.handleCreateGeneralForm}
        >
          <div className="form-form">
            <div className="selected-form">
              <div className="add-btn flex-start">
                <a data-tab="choose-form" onClick={toggleFormModal}>
                  {formTitle ? "Change form" : " Choose form"}
                  <span>
                    <i className="la la-plus"></i>
                  </span>
                </a>
              </div>
              <div className="selected-text">
                <span>{formTitle}</span>
              </div>
            </div>
          </div>

          {/* // for schedule form */}
          <div className="form-group checkbox-group">
            <label>Type of schedule</label>
            <div className="custom-checkbox display-inline">
              <RadioElement
                label="Daily"
                name="scheduleType"
                value={"daily"}
                changeHandler={handleRadioChange}
              />
              <RadioElement
                label="Weekly"
                name="scheduleType"
                value={"weekly"}
                changeHandler={handleRadioChange}
              />
              <RadioElement
                label="Monthly"
                name="scheduleType"
                value={"monthly"}
                changeHandler={handleRadioChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6">
              <div className="form-group">
                <DatePicker />
                {/* <input type="text" className="form-control"
                          required />
                      <label for="input">Start Date</label> */}
              </div>
            </div>
            <div className="col-xl-6">
              <div className="form-group">
                {/* <input type="text" className="form-control"
                          required />
                      <label for="input">End Date</label> */}
              </div>
            </div>
          </div>

          {/* for subStage form */}
          <div className="form-group">
            <input type="text" className="form-control" value="0" required />
            <label forHTML="input">Weight</label>
          </div>

          <div className="form-group flexrow checkbox-group">
            <label>Default submission status</label>
            <div className="custom-checkbox display-inline">
              <RadioElement
                label="Approved"
                className="approved"
                name="status"
                value={3}
                changeHandler={handleRadioChange}
              />
              <RadioElement
                label="Pending"
                className="pending"
                name="status"
                value={0}
              />
              <RadioElement
                label="Flagged"
                className="flagged"
                name="status"
                value={2}
                changeHandler={handleRadioChange}
              />
              <RadioElement
                label="Rejected"
                className="rejected"
                name="status"
                value={1}
                changeHandler={handleRadioChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Regions</label>
            <Select
              // closeMenuOnSelect={false}
              // className="select2-select select2"
              onChange={handleSelectRegionChange}
              options={optionRegion}
              isMulti={true}
              defaultValue={optionRegion}
              components={animatedComponents}
            />
          </div>
          <div className="form-group">
            <label>Types</label>
            <Select
              // closeMenuOnSelect={false}
              // className="select2-select select2"
              onChange={handleSelectTypeChange}
              options={optionType}
              isMulti={true}
              defaultValue={optionType}
              components={animatedComponents}
            />
          </div>
          <div className="form-group checkbox-group">
            <label>Donor visibility</label>
            <div className="custom-checkbox display-inline">
              <RadioElement
                label="Yes"
                name="donor"
                changeHandler={handleRadioChange}
                value={true}
              />
              <RadioElement
                label="No"
                name="donor"
                changeHandler={handleRadioChange}
                value={false}
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
              />
              <RadioElement
                label="No"
                name="edit"
                changeHandler={handleRadioChange}
                value={false}
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
              />
              <RadioElement
                label="No"
                name="delete"
                changeHandler={handleRadioChange}
                value={false}
              />
            </div>
          </div>
          <div className="form-group pull-right no-margin">
            <button type="submit" className="fieldsight-btn">
              Add Form
            </button>
          </div>
        </form>

        {!!showFormModal && (
          <Modal
            title="Add Form"
            toggleModal={toggleFormModal}
            showButton={true}
            showText="Create Form"
            url="/forms/create/"
          >
            <AddForm
              activeTab={activeTab}
              toggleTab={toggleTab}
              onChangeHandler={onChangeHandler}
              formList={myFormList}
              projectList={projectFormList}
              sharedList={sharedFormList}
              handleRadioChange={handleMyFormChange}
              handleSaveForm={handleSaveForm}
            />
          </Modal>
        )}
      </>
    );
  }
}
export default GlobalModalForm;
