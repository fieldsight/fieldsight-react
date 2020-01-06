import React, { Component } from 'react';
import Select from 'react-select';
import RadioElement from '../../common/RadioElement';

export default class ScheduleFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '1',
    };
  }

  handleRadioChange = e => {
    const { value } = e.target;
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
    if (value === '4') {
      this.setState({
        status: value,
      });
    }
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
                    value={1}
                    changeHandler={this.handleRadioChange}
                    checked={status === '1'}
                  />
                  <RadioElement
                    label="Pending"
                    className="pending"
                    name="status"
                    value={2}
                    changeHandler={this.handleRadioChange}
                    checked={status === '2'}
                  />
                  <RadioElement
                    label="Flagged"
                    className="flagged"
                    name="status"
                    value={3}
                    changeHandler={this.handleRadioChange}
                    checked={status === '3'}
                  />
                  <RadioElement
                    label="Rejected"
                    className="rejected"
                    name="status"
                    value={4}
                    changeHandler={this.handleRadioChange}
                    checked={status === '4'}
                  />
                </div>
              </div>
            </div>
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
