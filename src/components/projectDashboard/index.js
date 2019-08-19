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

import { getProjectDashboard } from "../../actions/projectDashboardActions";

const INITIAL_STATE = {
  activeTab: "general",
  showHeaderModal: false,
  showSubmissionModal: false,
  showCropper: false,
  showSubsites: false,
  showGallery: false
};
class ProjectDashboard extends React.Component {
  state = INITIAL_STATE;

  closeModal = type => {
    const { id: projectId } = this.props.match.params;

    if (type === "Header" || type === "Submission") {
      return this.setState(
        {
          [`show${type}Modal`]: false,
          activeTab: "general"
        }
        // () => this.props.getSiteForms(siteId, "general")
      );
    }

    this.setState({
      [`show${type}`]: false
    });
  };

  openModal = type => {
    const { id: projectId } = this.props.match.params;

    if (type) {
      return this.setState({
        [`show${type}`]: true
      });
    }
  };

  // toggleTab = formType => {
  //   const { id: siteId } = this.props.match.params;
  //   this.setState(
  //     {
  //       activeTab: formType
  //     },
  //     this.props.getSiteForms(siteId, formType)
  //   );
  // };
  componentWillMount() {
    const { id: projectId } = this.props.match.params;
    this.props.getProjectDashboard(projectId);
  }
  render() {
    console.log("props--", this.props);
    const {
      projectDashboard: {
        id,
        name,
        address,
        public_desc,
        logo,
        contacts,
        project_activity,
        total_sites,
        total_users,
        project_managers,
        has_region,
        logs,
        form_submissions_chart_data,
        site_progress_chart_data,
        map,
        terms_and_labels,
        breadcrumbs,
        projectDashboardLoader
      },
      match: {
        params: { id: projectId }
      }
    } = this.props;
    const {
      showHeaderModal,
      showSubmissionModal,
      activeTab,
      showCropper,
      showGallery,
      showSubsites
    } = this.state;
    const location = { coordinates: ["123455", "434245"] };
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

              {/* <li className="breadcrumb-item">
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
          </li> */}
            </ol>
          )}
        </nav>
        {/* <main id="main-content"> */}
        <div className="row">
          <div className="col-xl-12" />
          <div className="right-content no-bg new-dashboard">
            <DashboardHeader
              name={name}
              address={address}
              logo={logo}
              public_desc={public_desc}
              totalUsers={total_users}
              totalSites={total_sites}
              id={id}
              showContentLoader={projectDashboardLoader}
              activeTab={activeTab}
              closeModal={this.closeModal}
              openModal={this.openModal}
              showCropper={showCropper}
              termsAndLabels={terms_and_labels}
              showGallery={showGallery}
            />
            {/* siteForms={siteForms}
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
            hasWritePermission={has_write_permission} */}
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
const mapStateToProps = ({ projectDashboard }) => ({
  projectDashboard
});
export default connect(
  mapStateToProps,
  {
    getProjectDashboard
  }
)(ProjectDashboard);
