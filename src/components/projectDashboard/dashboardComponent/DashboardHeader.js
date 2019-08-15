import React from "react";

import pf from "../../../static/images/pf.jpg";
import { Button, Dropdown } from "react-bootstrap";
import CountCard from "../../common/CountCard";

class DashboardHeader extends React.Component {
  render() {
    const DataDropdown = [
      { title: "User", link: `/#` },
      { title: "Project", link: `/#` },
      { title: "Setting", link: `/#` }
    ];
    const ManageDropdown = [
      { title: "User", link: `/#` },
      { title: "Project", link: `/#` },
      { title: "Setting", link: `/#` }
    ];

    return (
      <div className="card mrb-30">
        <div className="card-header main-card-header dashboard-header">
          <div className="dash-pf">
            <figure>
              <img src={pf} alt="pf" />
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
            <Dropdown>
              <Dropdown.Toggle
                variant=""
                id="dropdown-Data"
                className="fieldsight-btn"
              >
                <i className="la la-paste" />
                <span>Data</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-right">
                {DataDropdown.map((item, i) => (
                  <Dropdown.Item href={item.link} key={i} target="_blank">
                    {item.title}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle
                variant=""
                id="dropdown-Manage"
                className="fieldsight-btn"
              >
                <i className="la la-cog" />
                <span>Manage</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-right">
                {ManageDropdown.map((item, i) => (
                  <Dropdown.Item href={item.link} key={i} target="_blank">
                    {item.title}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="card-body">
          <div className="header-count">
            <a href={`/#`} target="_blank">
              <CountCard
                countName="Submissions"
                countNumber={50}
                icon="la-copy"
              />
            </a>
            <a href={`/#`}>
              <CountCard
                countName="Total Users"
                countNumber={12}
                icon="la-user"
                noSubmissionText={true}
              />
            </a>
            <a href={`/#`}>
              <CountCard
                countName="Total sites"
                countNumber={12}
                icon="la-map-marker"
                noSubmissionText={true}
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default DashboardHeader;
