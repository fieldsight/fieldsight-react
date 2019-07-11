import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

const sideNavRoutes = [
  { to: "/", path: "/", title: "General Forms" },
  { to: "/components/Response/ResponseScheduledForm", path: "/components/Response/ResponseScheduledForm", title: "Scheduled Forms" },
  {
    to: "/components/Response/ResponseStageForm",
    path: "/components/Response/ResponseStageForm",
    title: "Stage Form"
  },
  { to: "/components/Response/ResponseSurveyForm", path: "/components/Response/ResponseSurveyForm", title: "Survey Form" },
 
];

class LeftSidebar extends Component {
  render() {
    const {
      location: { pathname }
    } = this.props;
    return (
      <ul className="nav nav-tabs flex-column border-tabs">
        {sideNavRoutes.map((route, i) => (
          <li className="nav-item" key={i}>
            <Link
              to={`${this.props.match.path}${route.to}`}
              className={
                pathname === route.path ? "nav-link active" : "nav-link"
              }
            >
              {route.title}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

export default withRouter(LeftSidebar);
