import React, { Component } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import InputElement from "../common/InputElement";
import RadioElement from "../common/RadioElement";
import CheckBox from "../common/CheckBox";
import Modal from "../common/Modal";

const animatedComponents = makeAnimated();

const RegionType = [
  { value: "1", label: "Region 1" },
  { value: "2", label: "Region 2" },
  { value: "3", label: "Region 3" }
];

class CommonPopupForm extends Component {
  state = {
    optionRegion: [],
    optionType: [],
    regionDropdown: [],
    typeDropdown: []
  };
  componentDidMount() {
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
      optionType: newTypeArr
      // commonFormData: {
      //   ...this.state.commonFormData,
      //   regionSelected: newRegionArr,
      //   typeSelected: newTypeArr
      // }
    });
  }
  render() {
    const {
      props: {
        handleRadioChange,
        handleSelectRegionChange,
        handleSelectTypeChange
      },
      state: { optionRegion, optionType }
    } = this;

    return (
      <>
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
      </>
    );
  }
}
export default CommonPopupForm;
