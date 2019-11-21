import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const sideNavRoutes = [
  {
    to: "/general",
    path: "/general",
    title: "General Forms",
    id: "app.generate-forms"
  },
  {
    to: "/scheduled",
    path: "/scheduled",
    title: "Scheduled Forms",
    id: "app.scheduled-form"
  },
  {
    to: "/stage",
    path: "/stage",
    title: "Stage Form",
    id: "app.staged-form"
  }
];

const viewByStatus = [
  {
    to: "/rejected",
    path: "/rejected",
    title: "Rejected Submission",
    id: "app.rejected-submissions"
  },
  {
    to: "/flagged",
    path: "/flagged",
    title: "Flagged Submission",
    id: "app.flagged-submissions"
  },
  {
    to: "/pending",
    path: "/pending",
    title: "Pending Submission",
    id: "app.pending-submissions"
  },
  {
    to: "/approved",
    path: "/approved",
    title: "Approved Submission",
    id: "app.approved-submissions"
  }
];

class ManageFormSetting extends Component {
  render() {
    const {
      location: { pathname }
    } = this.props;

    return (
      <>
        {!this.props.show_submission && (
          <ul className="nav nav-tabs flex-column border-tabs">
            {sideNavRoutes.map((route, i) => (
              <li className="nav-item" key={i}>
                <Link
                  to={`/site-responses/${this.props.match.params.id}${route.to}`}
                  className={
                    this.props.location.pathname ==
                    `/site-responses/${this.props.match.params.id}${route.path}`
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  {/*route.title*/}
                  <FormattedMessage
                    id={route.id}
                    defaultMessage={route.title}
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
        {this.props.show_submission && (
          <ul className="nav nav-tabs flex-column border-tabs">
            {viewByStatus.map((route, i) => (
              <li className="nav-item" key={i}>
                <Link
                  to={`/site-responses/${this.props.match.params.id}${route.to}`}
                  className={
                    this.props.location.pathname ==
                    `/site-responses/${this.props.match.params.id}${route.path}`
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  {/*route.title*/}
                  <FormattedMessage
                    id={route.id}
                    defaultMessage={route.title}
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default withRouter(ManageFormSetting);
