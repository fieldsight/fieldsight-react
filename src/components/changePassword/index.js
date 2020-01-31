import React from 'react';
import Axios from 'axios';
import InputElement from '../common/InputElement';
import { errorToast, successToast } from '../../utils/toastHandler';

export default class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        oldPwd: '',
        newPwd: '',
        confirmPwd: '',
      },
      errors: {
        oldPwd: '',
        newPwd: '',
        confirmPwd: '',
      },
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(
      state => ({
        form: {
          ...state.form,
          [name]: value,
        },
      }),
      () => {
        const { errors } = this.state;
        this.setState(() => {
          if (errors[name] && name === 'oldPwd')
            return { errors: { oldPwd: '' } };
          if (errors[name] && name === 'newPwd')
            return { errors: { newPwd: '' } };
          if (errors[name] && name === 'confirmPwd') {
            return { errors: { confirmPwd: '' } };
          }
          return null;
        });
      },
    );
  };

  handlePasswordValidation = () => {
    const testRegex = new RegExp(
      '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})',
    );
    const errors = {};
    // this.setState(state => {
    const {
      form: { oldPwd, newPwd, confirmPwd },
    } = this.state;
    if (!oldPwd) return { errors: { oldPwd: 'require' } };
    if (!newPwd) return { errors: { newPwd: 'require' } };
    if (!confirmPwd) return { errors: { confirmPwd: 'require' } };

    if (oldPwd && newPwd && oldPwd === newPwd) {
      return {
        errors: {
          newPwd: 'New password cannot be same as Old password.',
        },
      };
    }
    if (confirmPwd && newPwd && newPwd !== confirmPwd) {
      return { errors: { confirmPwd: 'Password Mismatch.' } };
    }
    if (newPwd && !testRegex.test(newPwd)) {
      return {
        errors: {
          newPwd:
            'The new password must contains at least  one lowercase ' +
            'and one uppercase alphabetical character and 6 characters long.',
        },
      };
    }
    return errors;
    // }, () => { console.log('errors', this.state.errors); })
  };

  handleSubmitForm = () => {
    const {
      form: { oldPwd, newPwd },
    } = this.state;
    const err = this.handlePasswordValidation();
    this.setState({
      errors: err.errors,
    });

    if (err.errors === undefined) {
      const formData = new FormData();
      formData.append('old_password', oldPwd);
      formData.append('new_password', newPwd);

      Axios.post(`fv3/api/change-password/`, formData)
        .then(res => {
          if (res.data) {
            successToast(res.data.message);
          }
        })
        .catch(error => {
          const errors = error.response;
          errorToast(errors.data.old_password[0]);
        });
    }
  };

  render() {
    const {
      form: { oldPwd, newPwd, confirmPwd },
      errors,
    } = this.state;
    // console.log('error render ma', errors);
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
            <h3>
              <i className="la la-key" />
              Change Password
            </h3>
          </header>
          <div>
            <form
              className="edit-form"
              onSubmit={e => {
                e.preventDefault();
              }}
            >
              <div className="col-xl-4 col-md-6">
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
                {errors && errors.oldPwd && (
                  <small style={{ color: 'red' }}>
                    {`*${errors.oldPwd}`}
                  </small>
                )}
              </div>
              <div className="col-xl-4 col-md-6">
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
                {errors && errors.newPwd && (
                  <small style={{ color: 'red' }}>
                    {` *${errors.newPwd}`}
                  </small>
                )}
                <small id="input3" className="form-text text-muted">
                  Great passwords use upper and lower case characters,
                  numbers, and symbols like !&quot;@#$%. Passwords are
                  case sensitive.
                </small>
              </div>
              <div className="col-xl-4 col-md-6">
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
                {errors && errors.confirmPwd && (
                  <small style={{ color: 'red' }}>
                    {`*${errors.confirmPwd}`}
                  </small>
                )}
                <small id="input4" className="form-text text-muted">
                  Confirm your new password by entering same password.
                </small>
              </div>
              <div className="form-group pull-right no-margin">
                <button
                  type="button"
                  className="fieldsight-btn"
                  onClick={() => {
                    this.handleSubmitForm();
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      </>
    );
  }
}
