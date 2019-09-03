import React, { Component } from "react";
import { connect } from "react-redux";
import DashboardHeader from "./dashboardComponent/DashboardHeader";
import TeamMap from "./dashboardComponent/TeamMap";
import ProjectList from "./dashboardComponent/ProjectList";
import DashboardCounter from "./dashboardComponent/DashboardCounter";
import About from "./dashboardComponent/About";
import Admin from "./dashboardComponent/Admin";
import { getTeamDashboard } from "../../actions/teamDashboardActions";
import PricingStepOne from "./dashboardComponent/PricingStepOne";
import Modal from "../common/Modal";

const INITIAL_STATE = {
  activeTab: "general",
  showHeaderModal: false,
  showSubmissionModal: false,
  showCropper: false,
  showSubsites: false,
  showGallery: false,
  stepOne: true,
  stepTwo: false,
  stepThree: false
};
class TeamDashboard extends Component {
  state = INITIAL_STATE;

  closeModal = () => {
    this.setState({
      stepOne: true,
      stepTwo: false,
      stepThree: false
    });
  };

  openModal = type => {
    const { id: teamId } = this.props.match.params;

    if (type === "Header" || type === "Submission") {
      return this.setState({
        [`show${type}Modal`]: true
      });
    }

    if (type === "Subsites") {
      return this.setState(
        {
          showSubsites: true
        }
        // () => this.props.getSubsites(teamId)
      );
    }

    this.setState({
      [`show${type}`]: true
    });
  };

  toggleTab = formType => {
    // const { id: teamId } = this.props.match.params;
    // this.setState(
    //   {
    //     activeTab: formType
    //   },
    // );
  };

  componentDidMount() {
    const { id: teamId } = this.props.match.params;
    this.props.getTeamDashboard(teamId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      const { id: teamId } = this.props.match.params;
      this.setState(
        {
          ...INITIAL_STATE
        },
        () => {
          this.props.getTeamDashboard(teamId);
        }
      );
    }
  }

  handleNext = step => {
    console.log("next", step);
  };
  handlePrevious = () => {
    console.log("previous");
  };
  render() {
    const {
      props: {
        teamDashboard: {
          id,
          name,
          address,
          public_desc,
          logo,
          contact,
          total_sites,
          submissions,
          projects,
          admin,
          breadcrumbs,
          teamDashboardLoader,
          total_projects,
          total_users,
          package_details
        },
        match: {
          params: { id: teamId }
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
    console.log("props", this.props);

    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          {Object.keys(breadcrumbs).length > 0 && (
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href={breadcrumbs.teams_url}>{breadcrumbs.teams}</a>
              </li>
              <li className="breadcrumb-item">{breadcrumbs.name}</li>
            </ol>
          )}
        </nav>
        {package_details.length > 0 && (
          <Modal title="Choose a plan" toggleModal={this.closeModal}>
            <PricingStepOne
              packageDetails={package_details}
              handleNext={this.handleNext}
            />
          </Modal>
        )}
        <div className="row">
          <div className="col-xl-12">
            <div className="right-content no-bg new-dashboard">
              <DashboardHeader
                name={name}
                address={address}
                logo={logo}
                public_desc={public_desc}
                totalSites={total_sites}
                totalUser={total_users}
                totalProjects={total_projects}
                totalSubmissions={submissions.total_submissions}
                id={id}
                showContentLoader={teamDashboardLoader}
                activeTab={activeTab}
                closeModal={this.closeModal}
                openModal={this.openModal}
                showCropper={showCropper}
                showGallery={showGallery}
              />
              <div className="row">
                <div className="col-lg-8">
                  <div className="card map">
                    <div className="card-header main-card-header sub-card-header">
                      <h5>Project maps</h5>
                      <div className="dash-btn">
                        <a href="#" className="fieldsight-btn left-icon">
                          <i className="la la-map" /> full map
                        </a>
                      </div>
                    </div>
                    <TeamMap />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card project-list">
                    <div className="card-header main-card-header sub-card-header">
                      <h5>Project maps</h5>
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
                    <ProjectList projects={projects} />
                  </div>
                </div>
              </div>
              <DashboardCounter submissions={submissions} />
              <div className="about-section ">
                <div className="row">
                  <About contacts={contact} desc={public_desc} />
                  <div className="col-lg-4">
                    <div className="card admin">
                      <div className="card-header main-card-header sub-card-header">
                        <h5>Admin</h5>
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
                          <a href="#" className="fieldsight-btn">
                            <i className="la la-plus" />
                          </a>
                        </div> */}
                      </div>
                      <Admin
                        admin={admin}
                        showContentLoader={teamDashboardLoader}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ teamDashboard }) => ({
  teamDashboard
});

export default connect(
  mapStateToProps,
  {
    getTeamDashboard
  }
)(TeamDashboard);
