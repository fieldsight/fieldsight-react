import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import isEmpty from "../../utils/isEmpty";

class TeamLeftSidebar extends Component {
  renderNavRoutes = () => {
    const {
      location: { pathname },
      match: {
        url,
        params: { id: teamId }
      }
    } = this.props;

    const sideNavRoutes = [
      {
        to: `${url}`,
        path: `${url}`,
        title: "Team Information"
      },
      { to: `${url}/map-layer`, path: `${url}/map-layer`, title: "Map Layers" }
    ];

    return sideNavRoutes.map((route, i) => (
      <li className="nav-item" key={i}>
        <Link
          to={route.to}
          className={pathname === route.path ? "nav-link active" : "nav-link"}
        >
          {route.title}
        </Link>
      </li>
    ));
  };

  render() {
    return (
      <ul className="nav nav-tabs flex-column border-tabs">
        {this.renderNavRoutes()}
      </ul>
    );
  }
}

export default withRouter(TeamLeftSidebar);
