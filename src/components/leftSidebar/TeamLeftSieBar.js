import React, { Component, Fragment } from "react";
import { withRouter, Link } from "react-router-dom";
import isEmpty from "../../utils/isEmpty";

class TeamLeftSidebar extends Component {
  renderNavRoutes = () => {
    const {
      location: { pathname },
      match: {
        url,
        params: { id: teamId }
      },
      teamOwner
    } = this.props;

    const sideNavRoutes = [
      {
        to: `${url}`,
        path: `${url}`,
        title: "Team Information"
      },
      { to: `${url}/map-layer`, path: `${url}/map-layer`, title: "Map Layers" },
      {
        to: `${url}/subscription/team-settings`,
        path: `${url}/subscription/team-settings`,
        title: "Account Information"
      }
    ];

    return sideNavRoutes.map((route, i) => (
      <Fragment key={i}>
        {route.title != "Account Information" && (
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
        )}
        {route.title == "Account Information" && !!teamOwner && (
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
        )}
      </Fragment>
    ));
  };

  render() {
    const {height} =this.props;
    
    return (
      <ul className="nav nav-tabs flex-column border-tabs" style={{ minHeight:(height > 0 ? height:"") }}>
        {this.renderNavRoutes()}
      </ul>
    );
  }
}

export default withRouter(TeamLeftSidebar);
