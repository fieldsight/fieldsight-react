import React, { Component, Fragment } from "react";
// import {Link} from 'react-router-dom';
import { Dropdown } from "react-bootstrap";
import Zoom from "react-reveal/Zoom";
import ContentLoader from "react-content-loader";
import CountCard from "../../common/CountCard";

const ManageDropdown = ["Generate Report", "View Data"];
const HeaderDropdown = [
  "Edit site information",
  "site document",
  "user",
  "form"
];

const AvatarLoader = ({ className }) => (
  <div style={{ height: "80px", width: "300px" }}>
    <ContentLoader
      height="100%"
      width="100%"
      speed={1}
      primaryColor="#f3f3f3"
      secondaryColor="#ebedec"
      className={className}
    >
      <rect x="0" y="0" rx="0" ry="0" width="80" height="80" />
      <rect x="100" y="15" rx="0" ry="0" width="250" height="16" />
      <rect x="100" y="45" rx="0" ry="0" width="250" height="16" />
    </ContentLoader>
  </div>
);

class DashboardHeader extends Component {
  state = {
    showPopup: false,
    tabOne: true,
    tabTwo: false,
    tabThree: false
  };

  render() {
    const {
      props: {
        name,
        address,
        enableSubsites,
        logo,
        region,
        totalUsers,
        totalSubmission
      }
    } = this;

    return (
      <div className="card mrb-30">
        <div className="card-header main-card-header dashboard-header">
          {/* {address && name ? (
            <div className="dash-pf">
              <figure>
                <img src={logo} alt={logo} />
              </figure>
              <div className="dash-pf-content">
                <h5>{name}</h5>
                <span>
                  {region ? `${region}, ` : null}
                  {address}
                </span>
              </div>
            </div>
          ) : ( */}
          <AvatarLoader />
          {/* )} */}

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
              <a href={`#/`} onClick={this.togglePopup}>
                {" "}
                add data <i className="la la-plus" />
              </a>
            </div>
          </div>

          {/* {this.state.showPopup && (
            <Zoom duration={500}>
              <div className="fieldsight-popup open" id="add-data">
                <div className="popup-body">
                  <div className="card">
                    <div className="card-header main-card-header">
                      <h5>Add Data</h5>
                      <span className="popup-close" onClick={this.togglePopup}>
                        <i className="la la-close" />
                      </span>
                    </div>
                    <div className="card-body">
                      <form className="floating-form">
                        <div className="form-group">
                          <ul className="nav nav-tabs ">
                            <li className="nav-item">
                              <a
                                className={
                                  this.state.tabOne
                                    ? "nav-link active"
                                    : "nav-link"
                                }
                                href={`#/`}
                                onClick={this.openTabOne}
                              >
                                General Form
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className={
                                  this.state.tabTwo
                                    ? "nav-link active"
                                    : "nav-link"
                                }
                                href={`#/`}
                                onClick={this.openTabTwo}
                              >
                                scheduled form
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className={
                                  this.state.tabThree
                                    ? "nav-link active"
                                    : "nav-link"
                                }
                                href={`#/`}
                                onClick={this.openTabThree}
                              >
                                Staged Form
                              </a>
                            </li>
                          </ul>
                        </div>
                        {this.state.tabTwo && (
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Form Name</th>
                                <th>New</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>General Informations</td>
                                <td>
                                  <a href={`#/`} target={`_blank`}>
                                    <i class="la la-plus approved" />
                                  </a>{" "}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  General Information (ALL structural typ.)
                                </td>
                                <td>
                                  <a href={`#/`} target={`_blank`}>
                                    <i class="la la-plus approved" />
                                  </a>{" "}
                                </td>
                              </tr>
                              <tr>
                                <td>Foundation (ALL structural typ.)</td>
                                <td>
                                  <a href={`#/`} target={`_blank`}>
                                    <i class="la la-plus approved" />
                                  </a>{" "}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        )}
                        {this.state.tabOne && (
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Form Name</th>
                                <th>New</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Vertical Members (ALL structural typ.)</td>
                                <td>
                                  <a href={`#/`} target={`_blank`}>
                                    <i class="la la-plus approved" />
                                  </a>{" "}
                                </td>
                              </tr>
                              <tr>
                                <td>Plinth Beam (ALL structural typ.)</td>
                                <td>
                                  <a href={`#/`} target={`_blank`}>
                                    <i class="la la-plus approved" />
                                  </a>{" "}
                                </td>
                              </tr>
                              <tr>
                                <td>TSC Visitors - STFC</td>
                                <td>
                                  <a href={`#/`} target={`_blank`}>
                                    <i class="la la-plus approved" />
                                  </a>{" "}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        )}
                        {this.state.tabThree && (
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Form Name</th>
                                <th>New</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Retrofitting Go/No-Go with Measurement</td>
                                <td>
                                  <a href={`#/`} target={`_blank`}>
                                    <i class="la la-plus approved" />
                                  </a>{" "}
                                </td>
                              </tr>
                              <tr>
                                <td>Retrofitting Go/No-Go Survey</td>
                                <td>
                                  <a href={`#/`} target={`_blank`}>
                                    <i class="la la-plus approved" />
                                  </a>{" "}
                                </td>
                              </tr>
                              <tr>
                                <td>TSC Visitors - STFC</td>
                                <td>
                                  <a href={`#/`} target={`_blank`}>
                                    <i class="la la-plus approved" />
                                  </a>{" "}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        )}

                        <div className="form-group pull-right no-margin">
                          <button type="submit" class="fieldsight-btn">
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </Zoom>
          )} */}
        </div>
      </div>
    );
  }
}

export default DashboardHeader;
