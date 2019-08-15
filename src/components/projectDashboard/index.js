import React from "react";
import { connect } from "react-redux";

import DashboardHeader from "./dashboardComponent/DashboardHeader";
import SiteMap from "./dashboardComponent/SiteMap";
import RegionsTable from "./dashboardComponent/RegionsTable";
import DashboardCounter from "./dashboardComponent/DashboardCounter";
import ProjectActivity from "./dashboardComponent/ProjectActivity";
import ProgressTable from "./dashboardComponent/ProgressTable";
import SubmissionChart from "./dashboardComponent/SubmissionChart";
import ProgressChart from "./dashboardComponent/ProgressChart";
import About from "./dashboardComponent/About";
import ProjectManager from "./dashboardComponent/ProjectManager";
import Logs from "./dashboardComponent/Logs";

class ProjectDashboard extends React.Component {
  render() {
    console.log("props--", this.props);
    const location = { coordinates: ["123455", "434245"] };
    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/fieldsight/organization/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="/fieldsight/organization-dashboard/13/">organization</a>
            </li>

            <li className="breadcrumb-item active" aria-current="page">
              organization dashboard
            </li>
          </ol>
        </nav>
        {/* <main id="main-content"> */}
        <div className="row">
          <div className="col-xl-12" />
          <div className="right-content no-bg new-dashboard">
            <DashboardHeader />
            <div className="row">
              <div className="col-lg-6">
                <div className="card map">
                  <div className="card-header main-card-header sub-card-header">
                    <h5>Project maps</h5>
                    <div className="dash-btn">
                      <a
                        href={`/#`}
                        className="fieldsight-btn left-icon"
                        target="_blank"
                      >
                        <i className="la la-map" /> full map
                      </a>
                    </div>
                  </div>
                  <div className="card-body">
                    <SiteMap
                      name={"name"}
                      address={"address"}
                      location={location}
                      showContentLoader={false}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <RegionsTable />
              </div>
            </div>
            <ProjectActivity />
            <DashboardCounter />
            <div className="progress-table mrb-30">
              <div className="card">
                <div className="card-header main-card-header sub-card-header">
                  <h5>Progress table</h5>
                </div>
                <div className="card-body">{/* <ProgressTable /> */}</div>
              </div>
            </div>
            <div className="chart mrb-30">
              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header main-card-header sub-card-header">
                      <h5>Form submissions</h5>
                    </div>
                    <div className="card-body">{/* <SubmissionChart /> */}</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header main-card-header sub-card-header">
                      <h5>Site progress</h5>
                    </div>
                    <div className="card-body">{/* <ProgressChart /> */}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-section ">
              <div className="row">
                <div className="col-xl-4 col-md-6">
                  <About />
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="card mangager-list">
                    <div className="card-header main-card-header sub-card-header">
                      <h5>Project manager</h5>
                      <div className="dash-btn">
                        <form className="floating-form">
                          <div className="form-group mr-0">
                            <input
                              type="search"
                              className="form-control"
                              required
                            />
                            <label htmlFor="input">Search</label>
                            <i className="la la-search" />
                          </div>
                        </form>
                        <a href="#" className="fieldsight-btn">
                          <i className="la la-plus" />
                        </a>
                      </div>
                    </div>
                    <div className="card-body">{/* <ProjectManager /> */}</div>
                  </div>
                </div>

                {/* <Logs /> */}
              </div>
            </div>
          </div>
        </div>
        {/* </main> */}
      </>
    );
  }
}

export default ProjectDashboard;
