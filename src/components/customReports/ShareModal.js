import React, { Component } from 'react';
import axios from 'axios';
import { errorToast, successToast } from '../../utils/toastHandler';

export default class ShareModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkbox: [],
    };
  }

  checkboxhandler = e => {
    const { id, checked } = e.target;
    this.setState(prevState => {
      if (checked) {
        return { checkbox: [...prevState.checkbox, id] };
      }
      if (!checked) {
        return {
          checkbox: prevState.checkbox.filter(
            region => region !== id,
          ),
        };
      }
      return null;
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const {
      props: { Shareid, shareCloseButton },
      state: { checkbox },
    } = this;
    const selected = checkbox.map(x => {
      return parseInt(x, 10);
    });

    const body = {
      shared_users: selected,
    };

    axios
      .post(
        `/v4/api/reporting/report-action/${Shareid}/?action_type=share`,
        body,
      )
      .then(req => {
        if (req.status === 200) {
          shareCloseButton();
          successToast(req.data.detail);
        }
      })
      .catch(err => {
        const error = err.response.data;
        Object.entries(error).map(([key, value]) => {
          return errorToast(`${value}`);
        });
      });
  };

  render() {
    const {
      props: { forms },
      state: { checkbox },
    } = this;

    return (
      <>
        <ul>
          {forms.length > 0 &&
            forms.map(option => (
              <li key={option.id}>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id={option.id}
                    name={option.full_name}
                    checked={checkbox.includes[option.full_name]}
                    onChange={this.checkboxhandler}
                    value={option.id}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor={option.id}
                    style={{ paddingLeft: '2em' }}
                  >
                    {option.full_name}
                  </label>
                </div>
              </li>
            ))}
        </ul>
        <div className="modal-footer">
          <div className="form-group pull-right no-margin">
            <button
              type="button"
              className="fieldsight-btn"
              onClick={this.handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </>
    );
  }
}
