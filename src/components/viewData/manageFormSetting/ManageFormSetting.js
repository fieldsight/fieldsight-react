import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

const sideNavRoutes = [
  { to: "/", path: "", title: "General Forms" },
  { to: "/scheduled", title: "Scheduled Forms" },
  {
    to: "/stage",

    title: "Staged Forms"
  },
  { to: "/survey", title: "Survey Forms" }
];

const viewByStatus = [
  { to: "/rejected", path: "/rejected", title: "Rejected Submissions" },
  { to: "/flagged", path: "/flagged", title: "Flagged Submissions" },
  { to: "/pending", path: "/pending", title: "Pending Submissions" },
  { to: "/approved", path: "/approved", title: "Approved Submissions" }
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
                  to={`/project-responses/${this.props.match.params.id}${route.to}`}
                  className={
                    pathname === route.path ? "nav-link active" : "nav-link"
                  }
                >
                  {route.title}
                </Link>
                <h5>{route.heading}</h5>
              </li>
            ))}
          </ul>
        )}
        {this.props.show_submission && (
          <ul className="nav nav-tabs flex-column border-tabs">
            {viewByStatus.map((route, i) => (
              <li className="nav-item" key={i}>
                <Link
                  to={`/project-responses/${this.props.match.params.id}${route.to}`}
                  className={
                    pathname === route.path ? "nav-link active" : "nav-link"
                  }
                >
                  {route.title}
                </Link>
                <h5>{route.heading}</h5>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default withRouter(ManageFormSetting);
