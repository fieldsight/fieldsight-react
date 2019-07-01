import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { RegionContext } from "../../context";
import isEmpty from "../../utils/isEmpty";

class LeftSidebar extends Component {
  static contextType = RegionContext;

  renderNavRoutes = () => {
    const { terms } = this.context;

    const {
      location: { pathname }
    } = this.props;

    const sideNavRoutes = [
      {
        to: `/project-settings`,
        path: "/project-settings",
        title: "Project Information"
      },
      {
        to: "/site-type",
        path: "/site-type",
        title: !isEmpty(terms) ? `${terms.site} Types` : "Site Types"
      },
      {
        to: "/site-information",
        path: "/site-information",
        title: !isEmpty(terms)
          ? `${terms.site} Information`
          : "Site Information"
      },
      {
        to: "/manage-region",
        path: "/manage-region",
        title: !isEmpty(terms) ? `Manage ${terms.region}` : "Manage Region"
      },
      { to: "/map-layer", path: "/map-layer", title: "Map Layers" },
      {
        to: "/term-and-label",
        path: "/term-and-label",
        title: "Terms And Labels"
      }
    ];

    return sideNavRoutes.map((route, i) => (
      <li className="nav-item" key={i}>
        <Link
          to={route.to}
          className={
            pathname.includes(route.path) ? "nav-link active" : "nav-link"
          }
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

export default withRouter(LeftSidebar);
