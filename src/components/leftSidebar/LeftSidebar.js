import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { RegionContext } from "../../context";
import isEmpty from "../../utils/isEmpty";

class LeftSidebar extends Component {
  static contextType = RegionContext;

  renderNavRoutes = () => {
    const { terms } = this.context;

    const {
      location: { pathname },
      match: { url }
    } = this.props;

    const sideNavRoutes = [
      {
        to: `${url}`,
        path: `${url}`,
        title: "Project Information"
      },
      {
        to: `${url}/site-type`,
        path: `${url}/site-type`,
        title: !isEmpty(terms) ? `${terms.site} Types` : "Site Types"
      },
      {
        to: `${url}/site-information`,
        path: `${url}/site-information`,
        title: !isEmpty(terms)
          ? `${terms.site} Information`
          : "Site Information"
      },
      {
        to: `${url}/manage-region`,
        path: `${url}/manage-region`,
        title: !isEmpty(terms) ? `${terms.region}` : "Regions"
      },
      { to: `${url}/map-layer`, path: `${url}/map-layer`, title: "Map Layers" },
      {
        to: `${url}/term-and-label`,
        path: `${url}/term-and-label`,
        title: "Terms And Labels"
      }
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

export default withRouter(LeftSidebar);
