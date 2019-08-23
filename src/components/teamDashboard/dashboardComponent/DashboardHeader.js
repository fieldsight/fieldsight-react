import Reach, { Component } from "react";

class DashboardHeader extends Component {
  render() {
    return (
      <div class="card mrb-30">
        <div class="card-header main-card-header dashboard-header">
          <div class="dash-pf">
            <figure>
              <img src="img/pf.jpg" alt="pf" />
            </figure>
            <div class="dash-pf-content">
              <h5>Rapid Market Assessment (Philippine Shelter Cluster)</h5>
              <span>
                Unit 304 SEDCCO 1 Building 120 Rada Street, Legaspi Village
                Makati, NCR, 1229, Philippines
              </span>
            </div>
          </div>
          <div class="dash-btn">
            <div class="dropdown">
              <button
                type="button"
                class="fieldsight-btn dropdown-toggle"
                data-toggle="dropdown"
              >
                <i class="la la-paste" />
                <span>Data</span>
                <i class="la la-angle-down" />
              </button>
              <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="#">
                  User
                </a>
                <a class="dropdown-item" href="#">
                  Project
                </a>
                <a class="dropdown-item" href="#">
                  Setting
                </a>
              </div>
            </div>
            <div class="dropdown">
              <button
                type="button"
                class="fieldsight-btn dropdown-toggle"
                data-toggle="dropdown"
              >
                <i class="la la-cog" />
                <span>Manage</span>
                <i class="la la-angle-down" />
              </button>
              <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="#">
                  User
                </a>
                <a class="dropdown-item" href="#">
                  Project
                </a>
                <a class="dropdown-item" href="#">
                  Setting
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="header-count">
            <div class="count-card">
              <div class="count-icon">
                <i class="la la-copy" />
              </div>
              <div class="count-content">
                <h4>50</h4>
                <h6>submissions</h6>
              </div>
            </div>
            <div class="count-card">
              <div class="count-icon">
                <i class="la la-map-marker" />
              </div>
              <div class="count-content">
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
