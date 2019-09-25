import React, { Component } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import InputElement from "../common/InputElement";
import RadioElement from "../common/RadioElement";
const animatedComponents = makeAnimated();

class AddStageForm extends Component {
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
      state: { optionRegion, optionType }
    } = this;
    return (
      <form className="floating-form ">
        <div className="form-group">
          <InputElement
            formType="editForm"
            tag="input"
            type="text"
            //   required={true}
            label="Name"
            name="title"
            //   value={title}
            changeHandler={handleChange}
          />
          {/* <input type="text" className="form-control" required />
          <label for="input">Stage Name</label> */}
        </div>
        <div className="form-group">
          <Select
            // closeMenuOnSelect={false}
            // onChange={handleSelectRegionChange}
            options={optionRegion}
            isMulti={true}
            defaultValue={optionRegion}
            components={animatedComponents}
          />
        </div>
        <div className="form-group">
          <label>Types</label>
          <Select
            // onChange={handleSelectTypeChange}
            options={optionType}
            isMulti={true}
            defaultValue={optionType}
            components={animatedComponents}
          />
        </div>
        <div className="form-group">
          <InputElement
            formType="editForm"
            tag="input"
            type="text"
            //   required={true}
            label="Description"
            name="text"
            //   value={text}
            //   changeHandler={handleChange}
          />
        </div>

        <div className="form-group pull-right no-margin">
          <button type="submit" className="fieldsight-btn">
            Add stage
          </button>
        </div>
      </form>
    );
  }
}
export default AddStageForm;
