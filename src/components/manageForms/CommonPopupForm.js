import React, { Component } from "react";
import Select from "react-select";
import InputElement from "../common/InputElement";
import RadioElement from "../common/RadioElement";
import CheckBox from "../common/CheckBox";
import Modal from "../common/Modal";

const RegionType = [
  { value: "1", label: "Region 1" },
  { value: "2", label: "Region 2" },
  { value: "3", label: "Region 3" }
];

class CommonPopupForm extends Component {
  state = {
    optionRegion: [],
    optionType: []
  };
  componentDidMount() {
    const newRegionArr = [];
    const newTypeArr = [];
    const { typeOptions, regionOptions } = this.props;

    regionOptions.map(each => {
      newRegionArr.push({ ...each, value: each.identifier, label: each.name });
    });
    typeOptions.map(each => {
      newTypeArr.push({ ...each, value: each.identifier, label: each.name });
    });
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
    console.log("status", this.props);

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
          {/* <Select
            className="select2-select select2"
            // label="Type of Team"
            // onChange={this.handleChange}
            options={RegionType}
            isMulti={true}
            defaultValue={[RegionType[2]]}
          /> */}
          <Select
            className="select2-select select2"
            onChange={handleSelectRegionChange}
            options={optionRegion}
            isMulti={true}
            // defaultValue={[optionRegion.map((e, i) => optionRegion[i])]}
          />
        </div>
        <div className="form-group">
          <label>Types</label>
          <Select
            className="select2-select select2"
            classNamePrefix="select"
            onChange={handleSelectTypeChange}
            options={optionType}
            isMulti={true}
            // defaultValue={[optionType[0]]}
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
