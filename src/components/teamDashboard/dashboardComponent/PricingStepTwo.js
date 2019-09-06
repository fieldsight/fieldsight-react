import React, { Component } from "react";
import { Elements } from "react-stripe-elements";
import CheckoutForm from "../../common/CheckoutForm";

class PricingStepTwo extends Component {
  formatDate = date => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    const dayIndex = date.getDay();
    const dateIdx = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return (
      days[dayIndex] +
      ", " +
      monthNames[monthIndex] +
      " " +
      dateIdx +
      ",  " +
      year
    );
  };
  render() {
    const {
      props: {
        selectedPackage,
        handleNext,
        handleSecondStepSelect,
        handlePrevious,
        packageStartDate,
        packageEndDate,
        selectedPlan,
        interval
      }
    } = this;
    console.log(selectedPackage);

    return (
      <div className="fieldsight-new">
        <div className="bg-primary p-4">
          <div className="bg-light p-4 m-4">
            <div className="pb-2"></div>
            <input type="hidden" name="interval" value={interval} />
            <input type="hidden" name="plan_name" value={selectedPlan} />
            <h6 className="text-center mt-4">
              <strong>Thank you for signing up with FieldSight!</strong>
            </h6>
            <h5 className="text-center mt-2 mb-3">
              <strong>You have selected the Free Plan</strong>
            </h5>
            <p className="text-center mb-4 text-xlight">
              To complete the signup process, please provide your payment
              details. <br /> FieldSight subscription fees are charged at the
              start of delivering service and renew automatically.
            </p>
            <div className="row">
              <div className="col-md-3">
                <h6 className="mt-4">
                  <strong>Plan Detail :</strong>
                </h6>
                <ul className="list-icon mt-4 mb-4">
                  <li>
                    <i className="la la-chevron-circle-right"></i>
                    <strong>{selectedPackage.submissions}</strong> Submissions
                  </li>
                  <li>
                    <strong>Unlimited</strong> Users, Projects, Sites
                  </li>
                  <li>
                    <strong>Unlimited</strong> Forms, Stages & Schedules
                  </li>
                  <li>
                    <strong>Unlimited</strong> Reports, Dashboards & Maps
                  </li>
                  <li>
                    <i className="la la-chevron-circle-right"></i>
                    <strong>Access</strong> to our Android App
                  </li>
                </ul>
              </div>

              <div className="col-md-3">
                <h6 className="mt-4">
                  <strong>Plan Period :</strong>
                </h6>
                <ul className="list-icon mt-4 mb-4">
                  <li>
                    <i className="la la-calendar-check-o"></i>
                    <strong>Starting Date</strong>
                    <p>{this.formatDate(new Date(packageStartDate))}</p>
                  </li>
                  <li>
                    <i className="la la-calendar-minus-o"></i>
                    <strong>Ending Date</strong>
                    <p>{this.formatDate(new Date(packageEndDate))}</p>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <div className="card-input-wrap mt-4 mb-4">
                  <Elements>
                    <CheckoutForm />
                  </Elements>
                </div>
                <p className="text-center">
                  <small></small>
                </p>
              </div>
            </div>
            <div className="text-center">
              <a
                title=""
                className="btn btn-primary"
                onClick={() => {
                  handlePrevious("first");
                }}
              >
                <i className="la la-long-arrow-left"></i> Previous
              </a>
              <a
                title=""
                className="btn btn-primary"
                onClick={() => {
                  handleNext("third");
                }}
              >
                Next <i className="la la-long-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default PricingStepTwo;
