import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

const sideNavRoutes = [
  { to: "/", title: "General Forms" },
  { to: "/scheduled",  title: "Scheduled Forms" },
  {
    to: "/stage",
    
    title: "Stage Form"
  },
  { to: "/survey",  title: "Survey Form" },
 
];

const viewByStatus=[
  { to: "/rejected", title: "Rejected Submission"},
  { to: "/flagged", title: "Flagged Submission" },
  {
    to: "/pending",
    
    title: "Pending Submission"
  },
  { to: "/approved",  title: "Approved Submission" },
 
]

class ManageFormSetting extends Component {
  render() {
    const {
      location: { pathname }
    } = this.props;
  
    
    return (
      <>
    {!this.props.show_submission && <ul className="nav nav-tabs flex-column border-tabs">
        {sideNavRoutes.map((route, i) => (
          <li className="nav-item" key={i}>
            <Link
              to={`${this.props.match.url}${route.to}`}

              className={
                pathname === route.path ? "nav-link active" : "nav-link"
              }
            >
              {route.title}
            </Link>
            <h5>{route.heading}</h5>
          </li>
        ))}
      </ul>}
      { this.props.show_submission && <ul className="nav nav-tabs flex-column border-tabs">
        {viewByStatus.map((route, i) => (
          <li className="nav-item" key={i}>
            <Link
              to={`${this.props.match.url}${route.to}`}
              className={
                pathname === route.path ? "nav-link active" : "nav-link"
              }
            >
              {route.title}
            </Link>
            <h5>{route.heading}</h5>
          </li>
        ))}
      </ul>}

      </>
    );
  }
}

export default withRouter(ManageFormSetting);