import React, { Component, Fragment } from "react";
// import {Link} from 'react-router-dom';
import { Dropdown } from "react-bootstrap";
import Zoom from "react-reveal/Zoom";
import CountCard from "../../common/CountCard";
import { AvatarContentLoader } from "../../common/Loader";
import SubmissionModal from "./SubmissionModal";

const ManageDropdown = ["Generate Report", "View Data"];
const HeaderDropdown = [
  "Edit site information",
  "site document",
  "user",
  "form"
];

class DashboardHeader extends Component {
  render() {
    const {
      props: {
        name,
        address,
        enableSubsites,
        logo,
        region,
        totalUsers,
        totalSubmission,
        siteForms,
        showModal,
        showDotLoader,
        activeTab,
        closeModal,
        openModal,
        toggleTab
      }
    } = this;

    return (
      <div className="card mrb-30">
        <div className="card-header main-card-header dashboard-header">
          {name ? (
            <div className="dash-pf">
              <figure>
                <img src={logo} alt={logo} />
              </figure>
              <div className="dash-pf-content">
                <h5>{name}</h5>
                <span>{address}</span>
                <span>{region} </span>
              </div>
            </div>
          ) : (
            <AvatarContentLoader number={1} width="300px" size="80" />
          )}

          <div className="dash-btn">
            <Dropdown>
              <Dropdown.Toggle
                variant=""
                id="dropdown-Data"
                className="fieldsight-btn"
              >
                <i className="fa fa-paste" />
                <span>Data</span>
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu-right">
                {ManageDropdown.map((item, i) => (
                  <Dropdown.Item href={`#/action-${i}`} key={i}>
                    {item}
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
                <i className="fa fa-cog" />
                <span>Manage</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-right">
                {HeaderDropdown.map((item, i) => (
                  <Dropdown.Item href={`#/action-${i}`} key={i}>
                    {item}
                  </Dropdown.Item>
                ))}
                {enableSubsites && (
                  <Dropdown.Item href={`#/action`}>Add Subsites</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="card-body">
          <div className="header-count">
            <CountCard
              countName="Total"
              countNumber={totalSubmission}
              icon="la-map-marker"
            />
            <CountCard
              countName="Users"
              countNumber={totalUsers}
              icon="la-user"
              noSubmissionText={true}
            />

            <div className="add-data">
              <a onClick={() => openModal("Header")}>
                {" "}
                add data <i className="la la-plus" />
              </a>
            </div>
          </div>

          {showModal && (
            <SubmissionModal
              showDotLoader={showDotLoader}
              siteForms={siteForms}
              activeTab={activeTab}
              closeModal={() => closeModal("Header")}
              toggleTab={toggleTab}
            />
          )}
        </div>
      </div>
    );
  }
}

export default DashboardHeader;
