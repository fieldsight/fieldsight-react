import React, { Component } from 'react';
import axios from 'axios';
import RadioElement from '../../common/RadioElement';

/* eslint-disable  camelcase */
export default class GeneralFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '0',
    };
  }

  handleRadioChange = e => {
    const { value } = e.target;
    if (value === '0') {
      this.setState({
        status: value,
      });
    }
    if (value === '1') {
      this.setState({
        status: value,
      });
    }
    if (value === '2') {
      this.setState({
        status: value,
      });
    }
    if (value === '3') {
      this.setState({
        status: value,
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    // const selected = this.props.selected.map(function(x) {
    //   return parseInt(x, 10);
    // });
    const {
      props: {
        selected,
        formType,
        id,
        handleAllModel,
        organization,
        is_form_library,
      },
      state: { status },
    } = this;

    const body = {
      xf_ids:
        selected !== ''
          ? JSON.parse(selected)
          : organization
          ? JSON.parse(organization)
          : '',
      default_submission_status: JSON.parse(status),
      form_type: JSON.parse(formType),
      ...(is_form_library && { is_form_library }),
    };

    axios
      .post(
        `/fv3/api/manage-super-organizations-library/${id}/`,
        body,
      )
      .then(res => {
        if (res.status === 201) {
          handleAllModel(res);
        }
      })
      .catch();
  };

  render() {
    const { status } = this.state;

    return (
      <form className="floating-form" onSubmit={this.handleSubmit}>
        <div className="form-form">
          <div className="selected-form">
            <div className="selected-text">
              <div className="form-group flexrow checkbox-group">
                <label>Default submission status</label>
                <div className="custom-checkbox display-inline">
                  <RadioElement
                    label="Approved"
                    className="approved"
                    name="status"
                    value={3}
                    changeHandler={this.handleRadioChange}
                    checked={status === '3'}
                  />
                  <RadioElement
                    label="Pending"
                    className="pending"
                    name="status"
                    value={0}
                    changeHandler={this.handleRadioChange}
                    checked={status === '0'}
                  />
                  <RadioElement
                    label="Flagged"
                    className="flagged"
                    name="status"
                    value={2}
                    changeHandler={this.handleRadioChange}
                    checked={status === '2'}
                  />
                  <RadioElement
                    label="Rejected"
                    className="rejected"
                    name="status"
                    value={1}
                    changeHandler={this.handleRadioChange}
                    checked={status === '1'}
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={this.props.handleFormType}
              className="fieldsight-btn"
            >
              Select Form
            </button>
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
