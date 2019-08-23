import React, { Component } from "react";
import { connect } from "react-redux";
import DashboardHeader from "./dashboardComponent/DashboardHeader";
import TeamMap from "./dashboardComponent/TeamMap";
import ProjectList from "./dashboardComponent/ProjectList";
import DashboardCounter from "./dashboardComponent/DashboardCounter";
import About from "./dashboardComponent/About";
import Admin from "./dashboardComponent/Admin";
// import {
//   getSiteDashboard,

// } from "../../actions/siteDashboardActions";

const INITIAL_STATE = {
  activeTab: "general",
  showHeaderModal: false,
  showSubmissionModal: false,
  showCropper: false,
  showSubsites: false,
  showGallery: false
};
class TeamDashboard extends Component {
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
    // const { id: siteId } = this.props.match.params;
    // this.props.getSiteDashboard(siteId);
  }

  componentDidUpdate(prevProps) {
    // if (prevProps.match.params.id !== this.props.match.params.id) {
    //   const { id: siteId } = this.props.match.params;
    //   this.setState(
    //     {
    //       ...INITIAL_STATE
    //     },
    //     () => {
    //       this.props.getSiteDashboard(siteId);
    //       this.props.getSiteMetas(siteId);
    //       this.props.getSiteSubmissions(siteId);
    //       this.props.getSiteDocuments(siteId);
    //       this.props.getSiteLogs(siteId);
    //       this.props.getSiteForms(siteId, "general");
    //       this.props.getRecentPictures(siteId);
    //     }
    //   );
    // }
  }
  render() {
    // const {
    //   props: {
    //     teamDashboard: { breadcrumbs },
    //     match: {
    //       params: { id: teamId }
    //     }
    //   },
    //   state: {
    //     showHeaderModal,
    //     showSubmissionModal,
    //     activeTab,
    //     showCropper,
    //     showGallery,
    //     showSubsites
    //   },
    //   closeModal,
    //   openModal,
    //   toggleTab
    // } = this;

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
        <div className="row">
          <div className="col-xl-12">
            <div className="right-content no-bg new-dashboard">
              <DashboardHeader />
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
                    <ProjectList />
                  </div>
                </div>
              </div>
              <DashboardCounter />
              <div className="about-section ">
                <div className="row">
                  <About />
                  <div className="col-lg-4">
                    <div className="card admin">
                      <div className="card-header main-card-header sub-card-header">
                        <h5>Admin</h5>
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
                      <Admin />
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

export default connect()(TeamDashboard);
// mapStateToProps,
// {
//   getSiteDashboard
// }
