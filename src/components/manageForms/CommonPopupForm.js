import React, { Component } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import InputElement from "../common/InputElement";
import RadioElement from "../common/RadioElement";
import CheckBox from "../common/CheckBox";
import Modal from "../common/Modal";

const animatedComponents = makeAnimated();

class CommonPopupForm extends Component {
  state = {
    regionSelected: [],
    typeSelected: [],
    regionDropdown: [],
    typeDropdown: []
  };
  componentDidMount() {
    const {
      typeOptions,
      regionOptions,
      commonFormData: { regionSelected, typeSelected }
    } = this.props;
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
    // if (!!stageData) {
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
      regionDropdown: newRegionArr,
      typeDropdown: newTypeArr,
      // commonFormData: {
      // ...this.state.commonFormData,
      regionSelected: newRegionArr,
      typeSelected: newTypeArr
      // }
    });
  }
  render() {
    const {
      props: {
        handleRadioChange,
        handleSelectRegionChange,
        handleSelectTypeChange,
        commonFormData
      },
      state: { regionDropdown, typeDropdown, regionSelected, typeSelected }
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
              checked={commonFormData.status == 3}
            />
            <RadioElement
              label="Pending"
              className="pending"
              name="status"
              value={0}
              changeHandler={handleRadioChange}
              checked={commonFormData.status == 0}
            />
            <RadioElement
              label="Flagged"
              className="flagged"
              name="status"
              value={2}
              changeHandler={handleRadioChange}
              checked={commonFormData.status == 2}
            />
            <RadioElement
              label="Rejected"
              className="rejected"
              name="status"
              value={1}
              changeHandler={handleRadioChange}
              checked={commonFormData.status == 1}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Regions</label>
          <Select
            // closeMenuOnSelect={false}
            // className="select2-select select2"
            onChange={handleSelectRegionChange}
            options={regionDropdown}
            isMulti={true}
            defaultValue={regionSelected}
            components={animatedComponents}
          />
        </div>
        <div className="form-group">
          <label>Types</label>
          <Select
            // closeMenuOnSelect={false}
            // className="select2-select select2"
            onChange={handleSelectTypeChange}
            options={typeDropdown}
            isMulti={true}
            defaultValue={typeSelected}
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
              checked={commonFormData.isDonor == true}
            />
            <RadioElement
              label="No"
              name="donor"
              changeHandler={handleRadioChange}
              value={false}
              checked={commonFormData.isDonor == false}
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
              checked={commonFormData.isEdit == true}
            />
            <RadioElement
              label="No"
              name="edit"
              changeHandler={handleRadioChange}
              value={false}
              checked={commonFormData.isEdit == false}
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
              checked={commonFormData.isDelete == true}
            />
            <RadioElement
              label="No"
              name="delete"
              changeHandler={handleRadioChange}
              value={false}
              checked={commonFormData.isDelete == false}
            />
          </div>
        </div>
      </>
    );
  }
}
export default CommonPopupForm;
