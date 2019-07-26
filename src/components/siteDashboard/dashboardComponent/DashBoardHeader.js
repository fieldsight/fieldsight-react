import React, { Component } from "react";

import { Dropdown } from "react-bootstrap";

import CountCard from "../../common/CountCard";
import { AvatarContentLoader } from "../../common/Loader";
import SubmissionModal from "./SubmissionModal";

const projectId = window.project_id ? window.project_id : 137;
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
        siteId,
        showModal,
        showDotLoader,
        activeTab,
        closeModal,
        openModal,
        toggleTab
      }
    } = this;

    const ManageDropdown = [
      { title: "Generate Report", link: `/#` },
      { title: "View Data", link: `/forms/responses/${siteId}/` }
    ];
    const HeaderDropdown = [
      { title: "Edit site information", link: `/fieldsight/site/${siteId}/` },
      {
        title: "site document",
        link: `/fieldsight/site/blue-prints/${siteId}/`
      },
      { title: "user", link: `/fieldsight/manage/people/site/${siteId}/` },
      { title: "form", link: `/forms/setup-forms/0/${siteId}` },
      {
        ...(enableSubsites && {
          title: "Add Subsites",
          link: `/fieldsight/site/add/subsite/${projectId}/${siteId}`
        })
      }
    ];

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
                <i className="fa fa-cog" />
                <span>Manage</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-right">
                {HeaderDropdown.map((item, i) => (
                  <Dropdown.Item href={item.link} key={i} target="_blank">
                    {item.title}
                  </Dropdown.Item>
                ))}
                {/* {enableSubsites && (
                  <Dropdown.Item
                    href={`/fieldsight/site/add/subsite/${projectId}/${site_id}`}
                  >
                    Add Subsites
                  </Dropdown.Item>
                )} */}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="card-body">
          <div className="header-count">
            <a
              href={`/fieldsight/site-submission/${siteId}/2/`}
              target="_blank"
            >
              <CountCard
                countName="Total"
                countNumber={totalSubmission}
                icon="la-map-marker"
              />
            </a>
            <a href={`/fieldsight/site-users/${siteId}/`} target="_blank">
              <CountCard
                countName="Users"
                countNumber={totalUsers}
                icon="la-user"
                noSubmissionText={true}
              />
            </a>

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
