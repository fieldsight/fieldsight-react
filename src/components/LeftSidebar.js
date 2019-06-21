import React, { Component } from "react";
import { Link } from "react-router-dom";

class LeftSidebar extends Component {
  render() {
    return (
      <ul className="nav nav-tabs flex-column border-tabs">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            {" "}
            Project Information
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/site-type" className="nav-link">
            {" "}
            Site Types{" "}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/site-information" className="nav-link">
            {" "}
            Site Information{" "}
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link to="/manage-region" className="nav-link">
            {" "}
            Manage Region{" "}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/manage-site" className="nav-link">
            manage sites{" "}
          </Link>
        </li> */}
        <li className="nav-item">
          <Link to="/map-layer" className="nav-link">
            Map Layers
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/term-and-label" className="nav-link">
            Terms And Labels
          </Link>
        </li>
      </ul>
    );
  }
}

export default LeftSidebar;
