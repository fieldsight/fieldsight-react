import React, { Component } from "react";
import Axios from "axios";
import { errorToast, successToast } from "../../utils/toastHandler";
import InputElement from "../common/InputElement";
import RightContentCard from "../common/RightContentCard";

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resetPsw: "",
      confirmResetPsw: "",

      errresetPsw: "",
      errconfirmResetPsw: ""
    };
  }
  onSubmitHandler = e => {
    e.preventDefault();

    const { resetPsw, confirmResetPsw } = this.state;

    this.handleResetValidation();

    if (errresetPsw !== undefined && errconfirmResetPsw !== undefined) {
      const formData = new FormData();
      formData.append("resetPsw", resetPsw);
      formData.append("confirmResetPsw", confirmResetPsw);
      Axios.post(``, formData)
        .then(res => {
          if (res.data) {
            successToast(res.data.message);
          }
        })
        .catch(err => {
          const errors = err.response;
          errorToast(errors.data.old_password[0]);
        });
    }
  };
  onChangeHandler = e => {
    const { value, name } = e.target;
    this.setState(
      {
        [name]: value
      },
      () => {
        const { resetPsw, confirmResetPsw } = this.state;
        if (resetPsw !== "") {
          this.setState({
            errresetPsw: ""
          });
        }
        if (confirmResetPsw !== "") {
          this.setState({
            errconfirmResetPsw: ""
          });
        }
      }
    );
  };

  handleResetValidation = () => {
    const testRegex = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    );
    const errors = {};
    const { resetPsw, confirmResetPsw } = this.state;
    // debugger;
    if (!resetPsw) {
      this.setState({
        errresetPsw: "require"
      });
    }

    if (!confirmResetPsw) {
      this.setState({ errconfirmResetPsw: "require" });
    }
    if (resetPsw !== confirmResetPsw) {
      this.setState({ errconfirmResetPsw: "Password Mismatch." });
    }
    if (resetPsw && !testRegex.test(resetPsw)) {
      this.setState({
        errresetPsw:
          "The new password must contains at least  one lowercase " +
          "and one uppercase alphabetical character and 6 characters long."
      });
    }

    return errors;
  };

  render() {
    const {
      resetPsw,
      confirmResetPsw,
      errresetPsw,
      errconfirmResetPsw
    } = this.state;
    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a>Reset Password</a>
            </li>
          </ol>
        </nav>
        <RightContentCard title="Reset Password">
          <form className="edit-form" onSubmit={this.onSubmitHandler}>
            <InputElement
              formType="editForm"
              tag="input"
              type="password"
              //   required={true}
              label="Reset Password"
              name="resetPsw"
              value={resetPsw}
              changeHandler={this.onChangeHandler}
            />
            {errresetPsw && errresetPsw && (
              <small style={{ color: "red" }}>*{errresetPsw}</small>
            )}
            <InputElement
              formType="editForm"
              tag="input"
              type="password"
              //   required={true}
              label="Confirm Password"
              name="confirmResetPsw"
              value={confirmResetPsw}
              changeHandler={this.onChangeHandler}
            />
            {errconfirmResetPsw && errconfirmResetPsw && (
              <small style={{ color: "red" }}>*{errconfirmResetPsw}</small>
            )}
            <div className="col-sm-12">
              <button type="submit" className="fieldsight-btn pull-right">
                Reset Password
              </button>
            </div>
          </form>
        </RightContentCard>
      </>
    );
  }
}
