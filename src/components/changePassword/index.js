import React from 'react';
import Axios from 'axios';
import InputElement from "../common/InputElement";
import { errorToast, successToast } from "../../utils/toastHandler";

const csrfVal = window.csrf ? window.csrf : process.env.CSRF;

export default class ChangePassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        oldPwd: '',
        newPwd: '',
        confirmPwd: ''

      }
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(state => ({
      form: {
        ...state.form,

        [name]: value
      }
    }));
  };

  handlePasswordValidation = () => {

  }

  handleSubmitForm = () => {
    const { form: { oldPwd, newPwd, confirmPwd } } = this.state
    const body = {
      csrfmiddlewaretoken: csrfVal,
      old_password: oldPwd,
      new_password1: newPwd,
      new_password2: confirmPwd
    }
    console.log("submit form for change pwd", body);
    // Axios.post(`url here`, body)
    //   .then(res => {
    //     if (res.data) {
    //     successToast('Password Changed')
    //   }
    //   })
    //   .catch(err => {
    //     if (err.response) {
    //     errorToast('something went wrong')
    //   }
    // })
  }

  render() {
    const { form: { oldPwd, newPwd, confirmPwd } } = this.state
    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a>Change Password</a>
            </li>
          </ol>
        </nav>
        <section className="panel">
          <header className="panel-heading clearfix">
            <h3><i className="la la-key" />Change Password</h3>
          </header>
          <form className="edit-form" onSubmit={e => {
            e.preventDefault();
          }}>
            <div>
              <InputElement
                formType="editForm"
                tag="input"
                type="password"
                required
                label="Old Password"
                name="oldPwd"
                value={oldPwd}
                changeHandler={this.handleChange}
              />

            </div>
            <div>
              <InputElement
                formType="editForm"
                tag="input"
                type="password"
                required
                label="New Password"
                name="newPwd"
                value={newPwd}
                changeHandler={this.handleChange}
              />
              <small id="input3" className="form-text text-muted">
                Great passwords use upper and lower case characters, numbers, and symbols like
                !"@#$%. Passwords are case sensitive.
                </small>
            </div>
            <div>
              <InputElement
                formType="editForm"
                tag="input"
                type="password"
                required
                label="Confirm Password"
                name="confirmPwd"
                value={confirmPwd}
                changeHandler={this.handleChange}
              />
              <small id="input4" className="form-text text-muted">
                Confirm your new password by entering same password.</small>
            </div>
            <div className="form-group pull-right no-margin">
              <button
                type="button"
                className="fieldsight-btn"
                onClick={() => { this.handleSubmitForm() }}
              >
                Submit
          </button>
            </div>
          </form>
        </section>
      </>)
  }
};
