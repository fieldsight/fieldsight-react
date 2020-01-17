import React, { Component } from 'react';
import axios from 'axios';
import SelectElement from '../../common/SelectElement';

/*  eslint-disable  */
export default class OrganizationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectId: '',
    };
  }

  selectHandler = e => {
    const { value } = e.target;

    this.setState({
      selectId: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log('hello');
    //   axios.post(``)
    //   .then(req=>{

    //   }).catch()
  };

  render() {
    const {
      props: { organization_library_forms },
      state: { selectId },
      handleSubmit,
    } = this;
    return (
      <form className="floating-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-xl-12 col-md-12">
            <SelectElement
              className="form-control"
              options={organization_library_forms}
              changeHandler={this.selectHandler}
              label="Form List"
              value={selectId}
            />
          </div>
        </div>
        <div className="form-group pull-right no-margin">
          <button type="submit" className="fieldsight-btn">
            Save
          </button>
        </div>
      </form>
    );
  }
}
