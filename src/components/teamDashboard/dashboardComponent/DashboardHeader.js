import React, { Component } from "react";
import { Button, Dropdown } from "react-bootstrap";

import { AvatarContentLoader } from "../../common/Loader";
import CountCard from "../../common/CountCard";

class DashboardHeader extends Component {
  render() {
    const {
      name,
      address,
      logo,
      public_desc,
      totalSites,
      totalUser,
      totalProjects,
      totalSubmissions,
      id,
      showContentLoader,
      activeTab,
      closeModal,
      openModal
    } = this.props;

    const ManageDropdown = [
      { title: "users", link: `/fieldsight/manage/people/organization/${id}/` },
      {
        title: "projects",
        link: `/fieldsight/application/#/team-projects/${id}`
      },
      {
        title: `settings`,
        link: `/fieldsight/organization/${id}`
      }
    ];

    return (
      <div className="card mrb-30">
        <div className="card-header main-card-header dashboard-header">
          {showContentLoader ? (
            <AvatarContentLoader number={1} width="300px" size="80" />
          ) : (
            <div className="dash-pf">
              <figure
                style={{
                  backgroundImage: `url(${logo})`,
                  width: "80px"
                }}
              >
                <span />
                <figcaption>
                  <a
                    className="photo-preview"
                    onClick={() => openModal("Gallery")}
                  >
                    <i className="la la-eye" />
                  </a>
                </figcaption>
              </figure>
              <div className="dash-pf-content">
                {name && <h5>{name}</h5>}
                {/* {identifier && <span>{identifier}</span>} */}
                {address && <span>{address}</span>}
                {/* {region && <span>{region} </span>} */}
              </div>
            </div>
          )}
          <div className="dash-btn">
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
            <a>
              <CountCard
                countName=""
                countNumber={totalSubmissions}
                icon="la-copy"
                // noSubmissionText={true}
              />
            </a>
            <a
              href={`/fieldsight/application/#/team-users/${id}`}
              target="_blank"
            >
              <CountCard
                countName="user"
                countNumber={totalUser}
                icon="la-user"
                noSubmissionText={true}
              />
            </a>
            <a
              href={`/fieldsight/application/#/team-projects/${id}`}
              target="_blank"
            >
              <CountCard
                countName="project"
                countNumber={totalProjects}
                icon="la la-tasks"
                noSubmissionText={true}
              />
            </a>
            <a>
              <CountCard
                countName="site"
                countNumber={totalSites}
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
