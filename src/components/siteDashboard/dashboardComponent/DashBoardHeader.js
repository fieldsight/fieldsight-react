import React, { Component, Fragment } from "react";
// import {Link} from 'react-router-dom';
import { Dropdown } from "react-bootstrap";
import Zoom from "react-reveal/Zoom";
import CountCard from "../../common/CountCard";
import { AvatarContentLoader } from "../../common/Loader";
import Modal from "../../common/Modal";
import PerfectScrollbar from "react-perfect-scrollbar";

const ManageDropdown = ["Generate Report", "View Data"];
const HeaderDropdown = [
  "Edit site information",
  "site document",
  "user",
  "form"
];

const HeaderModal = ({ formData }) => {
  const formType = Object.keys(formData)[0];

  return (
    <PerfectScrollbar>
      {formData[formType] && formData[formType].length > 0 ? (
        formType === "stage_forms" ? (
          formData[formType].map(data => (
            <>
              <p>
                <b> {data.name}</b>{" "}
              </p>
              <table className="table table-bordered">
                <tbody>
                  {data.sub_stages.map(subStages => (
                    <tr>
                      <td style={{ width: "80%" }}>{subStages.form_name}</td>
                      <td style={{ width: "20%" }}>
                        <a
                          href={subStages.new_submission_url}
                          target={`_blank`}
                        >
                          <i class="la la-plus approved" />
                        </a>{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ))
        ) : (
          <table className="table table-bordered">
            <tbody>
              {formData[formType].map(data => (
                <tr>
                  <td style={{ width: "80%" }}>{data.form_name}</td>
                  <td style={{ width: "20%" }}>
                    <a href={data.new_submission_url} target={`_blank`}>
                      <i class="la la-plus approved" />
                    </a>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      ) : (
        <p>No Data Available</p>
      )}
    </PerfectScrollbar>
  );
};
class DashboardHeader extends Component {
  state = {
    activeTab: "general"
  };

  closeModal = () => {
    this.setState({
      showModal: false
    });
  };

  openModal = () => {
    this.setState({
      showModal: true
    });
  };

  componentDidMount() {
    this.props.getSiteForms(this.props.siteId, "general");
  }

  toggleTab = type => {
    this.setState(
      {
        activeTab: type
      },
      this.props.getSiteForms(this.props.siteId, type)
    );
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
        totalSubmission,
        siteForms
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
              <a onClick={this.openModal}>
                {" "}
                add data <i className="la la-plus" />
              </a>
            </div>
          </div>

          {this.state.showModal && (
            <Modal title="Add Data" toggleModal={this.closeModal}>
              <div className="floating-form">
                <div className="form-group">
                  <ul className="nav nav-tabs ">
                    <li className="nav-item">
                      <a
                        className={
                          this.state.activeTab === "general"
                            ? "nav-link active"
                            : "nav-link"
                        }
                        onClick={() => this.toggleTab("general")}
                      >
                        General Form
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={
                          this.state.activeTab === "scheduled"
                            ? "nav-link active"
                            : "nav-link"
                        }
                        onClick={() => this.toggleTab("scheduled")}
                      >
                        scheduled form
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={
                          this.state.activeTab === "stage"
                            ? "nav-link active"
                            : "nav-link"
                        }
                        onClick={() => this.toggleTab("stage")}
                      >
                        Staged Form
                      </a>
                    </li>
                  </ul>
                </div>
                <div style={{ position: "relative", height: "434px" }}>
                  <HeaderModal formData={siteForms} />
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    );
  }
}

export default DashboardHeader;
