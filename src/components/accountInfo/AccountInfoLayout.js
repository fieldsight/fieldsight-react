import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";

import RightContentCard from "../common/RightContentCard";
import AccountInfo from "./AccountInfo";

class AccountInfoLayout extends Component {
  render() {
    const {
      props: { data, teamId }
    } = this;

    return (
      <RightContentCard title="Account Information">
        {!data.has_free_package && (
          <StripeProvider apiKey={`${data.key}`} key={data.key}>
            <Elements>
              <AccountInfo data={data} teamId={teamId} />
            </Elements>
          </StripeProvider>
        )}
        {!!data.has_free_package && (
          <div className="row">
            <div className="col-md-4">
              <h6 className="mt-4">
                <strong>Subscribed Package:</strong>
              </h6>
              <br />
              <h5>Starter Monthly Plan</h5>
              <h6>
                <strong>
                  $
                  {data.subscribed_package &&
                    data.subscribed_package.total_charge}
                  /
                  {data.subscribed_package &&
                  data.subscribed_package.period == "Month"
                    ? "Mo"
                    : "Yr"}
                </strong>
              </h6>
              <ul className="list-icon mt-4 mb-4">
                <li>
                  <i className="la la-chevron-circle-right"></i>
                  <strong>
                    {data.subscribed_package &&
                      data.subscribed_package.total_submissions}
                  </strong>{" "}
                  Submissions
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
              <a
                title=""
                className="btn btn-primary"
                href={`/fieldsight/organization/#/team-dashboard/${teamId}`}
              >
                Upgrade Your Package
              </a>
            </div>
          </div>
        )}
      </RightContentCard>
    );
  }
}
export default AccountInfoLayout;
