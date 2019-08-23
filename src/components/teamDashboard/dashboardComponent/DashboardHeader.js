import React, { Component } from "react";

class DashboardHeader extends Component {
  render() {
    return (
      <div className="card mrb-30">
        <div className="card-header main-card-header dashboard-header">
          <div className="dash-pf">
            <figure>
              <img src="img/pf.jpg" alt="pf" />
            </figure>
            <div className="dash-pf-content">
              <h5>Rapid Market Assessment (Philippine Shelter Cluster)</h5>
              <span>
                Unit 304 SEDCCO 1 Building 120 Rada Street, Legaspi Village
                Makati, NCR, 1229, Philippines
              </span>
            </div>
          </div>
          <div className="dash-btn">
            <div className="dropdown">
              <button
                type="button"
                className="fieldsight-btn dropdown-toggle"
                data-toggle="dropdown"
              >
                <i className="la la-paste" />
                <span>Data</span>
                <i className="la la-angle-down" />
              </button>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#">
                  User
                </a>
                <a className="dropdown-item" href="#">
                  Project
                </a>
                <a className="dropdown-item" href="#">
                  Setting
                </a>
              </div>
            </div>
            <div className="dropdown">
              <button
                type="button"
                className="fieldsight-btn dropdown-toggle"
                data-toggle="dropdown"
              >
                <i className="la la-cog" />
                <span>Manage</span>
                <i className="la la-angle-down" />
              </button>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#">
                  User
                </a>
                <a className="dropdown-item" href="#">
                  Project
                </a>
                <a className="dropdown-item" href="#">
                  Setting
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="header-count">
            <div className="count-card">
              <div className="count-icon">
                <i className="la la-copy" />
              </div>
              <div className="count-content">
                <h4>50</h4>
                <h6>submissions</h6>
              </div>
            </div>
            <div className="count-card">
              <div className="count-icon">
                <i className="la la-map-marker" />
              </div>
              <div className="count-content">
                <h4>13</h4>
                <h6>Total sites</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardHeader;
