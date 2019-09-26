import React, { Component } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import InputElement from "../common/InputElement";

const animatedComponents = makeAnimated();

class AddStageForm extends Component {
  state = {
    form: {
      selectedRegion: [],
      selectedType: [],
      name: "",
      desc: ""
    },
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
      regionDropdown: newRegionArr,
      typeDropdown: newTypeArr,
      form: {
        ...this.state.form,
        selectedRegion: newRegionArr,
        selectedType: newTypeArr
      }
    });
  }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      form: {
        ...this.state.form,

        [name]: value
      }
    });
  };
  handleSelectRegionChange = region => {
    this.setState({
      form: {
        ...this.state.form,
        selectedRegion: region
      }
    });
  };
  handleSelectTypeChange = type => {
    this.setState({
      form: {
        ...this.state.form,
        selectedType: type
      }
    });
  };
  handleSubmitForm = e => {
    e.preventDefault();
    this.props.handleSubmit(this.state.form);
  };
  render() {
    const {
      state: {
        regionDropdown,
        typeDropdown,
        form: { name, desc, selectedRegion, selectedType }
      },
      handleChange,
      handleSelectRegionChange,
      handleSelectTypeChange,
      handleSubmitForm
    } = this;
    return (
      <form className="floating-form " onSubmit={handleSubmitForm}>
        <div className="form-group">
          <InputElement
            formType="editForm"
            tag="input"
            type="text"
            required={true}
            label="Name"
            name="name"
            value={name}
            changeHandler={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Regions</label>
          <Select
            // closeMenuOnSelect={false}
            onChange={handleSelectRegionChange}
            options={regionDropdown}
            isMulti={true}
            defaultValue={selectedRegion}
            components={animatedComponents}
          />
        </div>
        <div className="form-group">
          <label>Types</label>
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            onChange={handleSelectTypeChange}
            defaultValue={typeDropdown}
            isMulti
            options={typeDropdown}
          />
        </div>
        <div className="form-group">
          <InputElement
            formType="editForm"
            tag="input"
            type="text"
            required={true}
            label="Description"
            name="desc"
            value={desc}
            changeHandler={handleChange}
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
