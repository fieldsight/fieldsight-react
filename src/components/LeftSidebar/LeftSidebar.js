import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

const projectId = window.project_id ? window.project_id : 137;
const sideNavRoutes = [
  {
    to: `/project-settings/${projectId}`,
    path: "/",
    title: "Project Information"
  },
  { to: "/site-type", path: "/site-type", title: "Site Types" },
  {
    to: "/site-information",
    path: "/site-information",
    title: "Site Information"
  },
  { to: "/manage-region", path: "/manage-region", title: "Manage Region" },
  { to: "/map-layer", path: "/map-layer", title: "Map Layers" },
  { to: "term-and-label", path: "/term-and-label", title: "Terms And Labels" }
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
              to={route.to}
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
