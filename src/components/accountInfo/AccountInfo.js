import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import RightContentCard from "../common/RightContentCard";

class AccountInfo extends Component {
  constructor(props) {
    super(props);
    this.submitCardInfo = this.submitCardInfo.bind(this);

    this.state = {
      isEdit: false,
      errors: ""
    };
  }
  handleEdit = e => {
    this.setState({ isEdit: !this.state.isEdit });
  };
  handleChange = () => {
    this.setState({ errors: "" });
  };
  async submitCardInfo(e) {
    const { token, error } = await this.props.stripe.createToken({
      name: "stripeToken"
    });
    if (!!token) console.log("token---", token);

    if (!!error)
      this.setState({ errors: error }, () => {
        console.log("error---", error);
      });
  }
  render() {
    const { isEdit, errors } = this.state;
    return (
      <RightContentCard title="Account Information">
        <div className="row">
          <div className="col-md-4">
            <h6 className="mt-4">
              <strong>Subscribed Package:</strong>
            </h6>
            <br />
            <h5>Starter Monthly Plan</h5>
            <h6>
              <strong>$115/Month</strong>
            </h6>
            <ul className="list-icon mt-4 mb-4">
              <li>
                <i className="la la-chevron-circle-right"></i>
                <strong>30</strong> Submissions
              </li>
              <li>
                <i className="la la-chevron-circle-right"></i>
                <strong>Unlimited</strong> Users, Projects, Sites
              </li>
              <li>
                <i className="la la-chevron-circle-right"></i>
                <strong>Unlimited</strong> Forms, Stages & Schedules
              </li>
              <li>
                <i className="la la-chevron-circle-right"></i>
                <strong>Unlimited</strong> Reports, Dashboards & Maps
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6 className="mt-4">
              <strong>Account Information:</strong>
            </h6>
            <ul className="list-icon mt-4 mb-4">
              <li>
                <i className="la la-envelope"></i>
                <div>Email Address</div>
                <p>
                  <strong>abc@naxa.com</strong>
                </p>
              </li>
              <li>
                <i className="la la-credit-card"></i>
                <div>Card Info</div>
                <p>
                  <strong>Card: **** **** **** 1234</strong>
                </p>
              </li>
            </ul>
            <div className="col-sm-12">
              <a
                title=""
                className="btn btn-primary"
                onClick={() => {
                  this.handleEdit("edit");
                }}
              >
                Edit Credit Info <i className="la la-edit"></i>
              </a>
            </div>
          </div>
          {!!isEdit && (
            <div className="col-md-8">
              <h6 className="mt-4">
                <strong>Edit Card Info:</strong>
              </h6>
              <div className="card-input-wrap mt-4 mb-4">
                <div className="checkout">
                  <p> Credit or debit card</p>
                  <CardElement onChange={this.handleChange} />
                  {Object.keys(errors).length > 0 && (
                    <span className="card-error">{errors.message}</span>
                  )}
                </div>
              </div>
              <div className="col-sm-12">
                <button
                  type="submit"
                  className="fieldsight-btn pull-left"
                  onClick={this.submitCardInfo}
                >
                  Save Info <i className="la la-save"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </RightContentCard>
    );
  }
}
export default injectStripe(AccountInfo);
