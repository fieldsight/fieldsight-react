import React, { Component } from "react";
import { connect } from "react-redux";

import DashboardHeader from "./dashboardComponent/DashboardHeader";
import DatatablePage from "./dashboardComponent/DatatablePage";
import SiteMap from "./dashboardComponent/SiteMap";
import PhotoGallery from "./dashboardComponent/PhotoGallery";
import DashboardInfo from "./dashboardComponent/DashboardInfo";
import DashboardCounter from "./dashboardComponent/DashboardCounter";
import SubmissionChart from "./dashboardComponent/SubmissionChart";
import ProgressChart from "./dashboardComponent/ProgressChart";
import SiteDocument from "./dashboardComponent/SiteDocument";
import UsersList from "./dashboardComponent/UsersList";
import Logs from "./dashboardComponent/Logs";

import {
  getSiteDashboard,
  getSiteMetas,
  getSiteSubmissions,
  getSiteDocuments,
  getSiteLogs
} from "../../actions/siteDashboardActions";

class SiteDashboard extends Component {
  componentDidMount() {
    const siteId = window.site_id ? window.site_id : 59602;
    this.props.getSiteDashboard(siteId);
    this.props.getSiteMetas(siteId);
    this.props.getSiteSubmissions(siteId);
    this.props.getSiteDocuments(siteId);
    this.props.getSiteLogs(siteId);
  }
  render() {
    const {
      props: {
        siteDashboard: {
          name,
          address,
          enable_subsites,
          location,
          logo,
          region,
          total_users,
          submissions,
          users,
          siteMetas,
          siteSubmissions,
          siteDocuments,
          siteLogs,
          form_submissions_chart_data,
          site_progress_chart_data
        }
      }
    } = this;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-xl-12">
            <div className="right-content no-bg new-dashboard">
              <DashboardHeader
                name={name}
                address={address}
                logo={logo}
                region={region}
                totalUsers={total_users}
                enableSubsites={enable_subsites}
                totalSubmission={submissions.total_submissions}
              />
              <div className="row">
                <div className="col-lg-6">
                  <div className="card map">
                    <div className="card-header main-card-header sub-card-header">
                      <h5>Project map</h5>
                      <div className="dash-btn">
                        <a href={`#/`} className="fieldsight-btn left-icon">
                          <i className="la la-map" /> full map
                        </a>
                      </div>
                    </div>
                    <div className="card-body">
                      <SiteMap
                        name={name}
                        address={address}
                        location={location}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="card region-table">
                    <div className="card-header main-card-header sub-card-header">
                      <h5>Recent photo</h5>
                    </div>
                    <div
                      className="card-body"
                      style={{ position: "relative", height: "440px" }}
                    >
                      <PhotoGallery />
                    </div>
                  </div>
                </div>
              </div>
              <div className="siteinfo-section mrt-30">
                <div className="row">
                  <div className="col-xl-6 col-md-12">
                    <div className="card site_dashboard_info">
                      <div className="card-header main-card-header sub-card-header">
                        <h5>Site information</h5>
                      </div>
                      <div
                        className="card-body site-info board-site-info"
                        style={{ position: "relative", height: "434px" }}
                      >
                        <DashboardInfo siteMetas={siteMetas} />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-md-12">
                    <div className="card region-table">
                      <div className="card-header main-card-header sub-card-header">
                        <h5>Submission table</h5>
                        <div className="add-btn">
                          <a href={`#/`} data-tab="scheduled-popup">
                            Add new{" "}
                            <span>
                              <i className="la la-plus" />
                            </span>
                          </a>
                        </div>
                      </div>
                      <div
                        className="card-body"
                        style={{ position: "relative", height: "434px" }}
                      >
                        <DatatablePage siteSubmissions={siteSubmissions} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dashboard-counter mrt-30">
                <div className="row">
                  <DashboardCounter submissions={submissions} />
                </div>
              </div>
              <div className="chart mrb-30">
                <div className="row">
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header main-card-header sub-card-header">
                        <h5>Form submissions</h5>
                      </div>
                      <div className="card-body">
                        <SubmissionChart
                          submissionData={form_submissions_chart_data}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header main-card-header sub-card-header">
                        <h5>Site progress</h5>
                      </div>
                      <div className="card-body">
                        <ProgressChart
                          progressData={site_progress_chart_data}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about-section ">
                <div className="row">
                  <div className="col-xl-4 col-md-6">
                    <div className="card ">
                      <div className="about">
                        <div className="card-header main-card-header sub-card-header">
                          <h5>Site Documents</h5>
                        </div>
                        <div
                          className="card-body about-body"
                          style={{ position: "relative", height: "358px" }}
                        >
                          <SiteDocument siteDocuments={siteDocuments} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-6">
                    <div className="card mangager-list">
                      <div className="card-header main-card-header sub-card-header">
                        <h5>Users</h5>
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
                          <a href={`#/`} className="fieldsight-btn">
                            <i className="la la-plus" />
                          </a>
                        </div>
                      </div>
                      <div className="card-body">
                        <div
                          className="thumb-list mr-0 "
                          style={{ position: "relative", height: "312px" }}
                        >
                          <UsersList users={users} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-12">
                    <div className="card logs">
                      <div className="card-header main-card-header sub-card-header">
                        <h5>Logs</h5>
                        <a href={`#/`} className="fieldsight-btn">
                          view all
                        </a>
                      </div>
                      <div className="card-body">
                        <div
                          className="logs-list"
                          style={{ position: "relative", height: "314px" }}
                        >
                          <Logs siteLogs={siteLogs} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ siteDashboard }) => ({
  siteDashboard
});

export default connect(
  mapStateToProps,
  {
    getSiteDashboard,
    getSiteMetas,
    getSiteSubmissions,
    getSiteDocuments,
    getSiteLogs
  }
)(SiteDashboard);
