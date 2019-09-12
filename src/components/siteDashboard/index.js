import React, { Component } from "react";
import { connect } from "react-redux";

import DashboardHeader from "./dashboardComponent/DashBoardHeader";
import DatatablePage from "./dashboardComponent/DatatablePage";
import SiteMap from "./dashboardComponent/SiteMap";
import PhotoGallery from "./dashboardComponent/PhotoGallery";
import DashboardInfo from "./dashboardComponent/DashboardInfo";
import DashboardCounter from "./dashboardComponent/DashboardCounter";
import SubmissionChart from "./dashboardComponent/SubmissionChart";
import ProgressChart from "./dashboardComponent/ProgressChart";
import SiteDocument from "./dashboardComponent/SiteDocument";
import UsersList from "./dashboardComponent/UsersList";
import Logs from "../common/Logs";

import {
  getSiteDashboard,
  getSiteMetas,
  getSiteSubmissions,
  getSiteDocuments,
  getSiteLogs,
  getSiteForms,
  getRecentPictures,
  getSubsites,
  putCropImage
} from "../../actions/siteDashboardActions";

//const siteId = window.site_id ? window.site_id : 81704;
//const siteId = window.site_id ? window.site_id : 81704;
const user_id = window.user_id ? window.user_id : 1;

const INITIAL_STATE = {
  activeTab: "general",
  showHeaderModal: false,
  showSubmissionModal: false,
  showCropper: false,
  showSubsites: false,
  showGallery: false,
  
};
class SiteDashboard extends Component {
  state = INITIAL_STATE;

  closeModal = type => {
    const { id: siteId } = this.props.match.params;

    if (type === "Header" || type === "Submission") {
      return this.setState(
        {
          [`show${type}Modal`]: false,
          activeTab: "general"
        },
        () => this.props.getSiteForms(siteId, "general")
      );
    }

    this.setState({
      [`show${type}`]: false
    });
  };

  openModal = type => {
    const { id: siteId } = this.props.match.params;

    if (type === "Header" || type === "Submission") {
      return this.setState({
        [`show${type}Modal`]: true
      });
    }

    if (type === "Subsites") {
      return this.setState(
        {
          showSubsites: true
        },
        () => this.props.getSubsites(siteId)
      );
    }

    this.setState({
      [`show${type}`]: true
    });
  };

  toggleTab = formType => {
    const { id: siteId } = this.props.match.params;
    this.setState(
      {
        activeTab: formType
      },
      this.props.getSiteForms(siteId, formType)
    );
  };

  componentDidMount() {
    const { id: siteId } = this.props.match.params;
    
    
    this.props.getSiteDashboard(siteId);
    this.props.getSiteMetas(siteId);
    this.props.getSiteSubmissions(siteId);
    this.props.getSiteDocuments(siteId);
    this.props.getSiteLogs(siteId);
    this.props.getSiteForms(siteId, "general");
    this.props.getRecentPictures(siteId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      const { id: siteId } = this.props.match.params;
      this.setState(
        {
          ...INITIAL_STATE
        },
        () => {
          this.props.getSiteDashboard(siteId);
          this.props.getSiteMetas(siteId);
          this.props.getSiteSubmissions(siteId);
          this.props.getSiteDocuments(siteId);
          this.props.getSiteLogs(siteId);
          this.props.getSiteForms(siteId, "general");
          this.props.getRecentPictures(siteId);
        }
      );
    }
  }
  render() { 
    const {
      props: {
        siteDashboard: {
          identifier,
          name,
          address,
          enable_subsites,
          location,
          logo,
          project_id,
          region,
          total_users,
          submissions,
          users,
          recentPictures,
          siteMetas,
          siteSubmissions,
          siteDocuments,
          siteLogs,
          siteForms,
          terms_and_labels,
          form_submissions_chart_data,
          site_progress_chart_data,
          total_subsites,
          subSites,
          showDotLoader,
          siteDashboardLoader,
          siteMetasLoader,
          siteSubmissionsLoader,
          siteLogsLoader,
          siteDocumentsLoader,
          sitePicturesLoader,
          subSitesLoader,
          has_write_permission,
          breadcrumbs
        },
        getSiteForms,
        putCropImage,
        match: {
          params: { id: siteId }
        }
      },
      state: {
        showHeaderModal,
        showSubmissionModal,
        activeTab,
        showCropper,
        showGallery,
        showSubsites
      },
      closeModal,
      openModal,
      toggleTab
    } = this;


    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          {Object.keys(breadcrumbs).length > 0 && (
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href={breadcrumbs.organization_url}>
                  {breadcrumbs.organization}
                </a>
              </li>

              <li className="breadcrumb-item">
                <a href={breadcrumbs.project_url}>{breadcrumbs.project}</a>
              </li>
              {breadcrumbs.root_site && (
                <li className="breadcrumb-item">
                  <a href={breadcrumbs.root_site_url}>
                    {breadcrumbs.root_site}
                  </a>
                </li>
              )}

              <li className="breadcrumb-item active" aria-current="page">
                {breadcrumbs.site}
              </li>
            </ol>
          )}
        </nav>
        <div className="row">
          <div className="col-xl-12">
            <div className="right-content no-bg new-dashboard">
              <DashboardHeader
                identifier={identifier}
                name={name}
                address={address}
                logo={logo}
                region={region}
                totalUsers={total_users}
                enableSubsites={enable_subsites}
                totalSubmission={submissions.total_submissions}
                getSiteForms={getSiteForms}
                showDotLoader={showDotLoader}
                siteId={siteId}
                siteForms={siteForms}
                showModal={showHeaderModal}
                activeTab={activeTab}
                closeModal={closeModal}
                openModal={openModal}
                toggleTab={toggleTab}
                showCropper={showCropper}
                showSubsites={showSubsites}
                subSites={subSites}
                totalSubsites={total_subsites}
                showContentLoader={siteDashboardLoader}
                subSitesLoader={subSitesLoader}
                putCropImage={putCropImage}
                termsAndLabels={terms_and_labels}
                showGallery={showGallery}
                hasWritePermission={has_write_permission}
                projectId={project_id}
              />
              <div className="row">
                <div className="col-lg-6">
                  <div className="card map">
                    <div className="card-header main-card-header sub-card-header">
                      <h5>{terms_and_labels && terms_and_labels.site} Map</h5>
                      <div className="dash-btn">
                        <a
                          href={`/fieldsight/site/response-coords/${siteId}/`}
                          className="fieldsight-btn left-icon"
                          target="_blank"
                        >
                          <i className="la la-map" /> full map
                        </a>
                      </div>
                    </div>
                    <div className="card-body">
                      <SiteMap
                        name={name}
                        address={address}
                        location={location}
                        showContentLoader={siteDashboardLoader}
                      />
                    </div>
                  </div>
                </div>
                <PhotoGallery
                  recentPictures={recentPictures}
                  showContentLoader={sitePicturesLoader}
                  siteId={siteId}
                />
              </div>
              <div className="siteinfo-section mrt-30">
                <div className="row">
                  <div className="col-xl-6 col-md-12">
                    <div className="card site_dashboard_info">
                      <div className="card-header main-card-header sub-card-header">
                        <h5>
                          {terms_and_labels && terms_and_labels.site}{" "}
                          information
                        </h5>
                        {/* <div className="dash-btn">
                          <a href={`#/`} className="fieldsight-btn left-icon">
                            <i className="la la-edit" />
                            edit
                          </a>
                        </div> */}
                      </div>
                      <div
                        className="card-body site-info board-site-info"
                        style={{ position: "relative", height: "434px" }}
                      >
                        <DashboardInfo
                          siteMetas={siteMetas}
                          showContentLoader={siteMetasLoader}
                        />
                      </div>
                    </div>
                  </div>

                  <DatatablePage
                    enableSubsites={enable_subsites}
                    siteSubmissions={siteSubmissions}
                    showContentLoader={siteSubmissionsLoader}
                    siteForms={siteForms}
                    showDotLoader={showDotLoader}
                    showModal={showSubmissionModal}
                    activeTab={activeTab}
                    closeModal={closeModal}
                    openModal={openModal}
                    toggleTab={toggleTab}
                    hasWritePermission={has_write_permission}
                  />
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
                        <h5>
                          {terms_and_labels && terms_and_labels.site} progress
                        </h5>
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
                  <SiteDocument
                    siteDocuments={siteDocuments}
                    showContentLoader={siteDocumentsLoader}
                    siteId={siteId}
                    termsAndLabels={terms_and_labels}
                  />

                  <div className="col-xl-4 col-md-6">
                    <div className="card mangager-list">
                      <div className="card-header main-card-header sub-card-header">
                        <h5>Users</h5>
                        {/* <div className="dash-btn">
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
                        </div> */}
                      </div>
                      <div className="card-body">
                        <div
                          className="thumb-list mr-0 "
                          style={{ position: "relative", height: "327px" }}
                        >
                          <UsersList
                            users={users}
                            showContentLoader={siteDashboardLoader}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Logs
                    siteLogs={siteLogs}
                    showContentLoader={siteLogsLoader}
                    siteId={siteId}
                    type="site"
                    user_id={user_id}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
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
    getSiteLogs,
    getSiteForms,
    getRecentPictures,
    getSubsites,
    putCropImage
  }
)(SiteDashboard);
