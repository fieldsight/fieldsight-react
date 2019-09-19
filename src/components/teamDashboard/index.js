import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { StripeProvider, Elements } from "react-stripe-elements";

import DashboardHeader from "./dashboardComponent/DashboardHeader";
import TeamMap from "./dashboardComponent/TeamMap";
import ProjectList from "./dashboardComponent/ProjectList";
import DashboardCounter from "./dashboardComponent/DashboardCounter";
import About from "./dashboardComponent/About";
import Admin from "./dashboardComponent/Admin";
import SiteMap from "../common/SiteMap";

import {
  getTeamDashboard,
  postPackageSubscribe
} from "../../actions/teamDashboardActions";
import PricingStepOne from "./dashboardComponent/PricingStepOne";
import PricingStepTwo from "./dashboardComponent/PricingStepTwo";
import PricingStepThree from "./dashboardComponent/PricingStepThree";

const now = new Date();
const INITIAL_STATE = {
  activeTab: "general",
  showHeaderModal: false,
  showSubmissionModal: false,
  showSubsites: false,
  showModal: true,
  stepOne: true,
  stepTwo: false,
  stepThree: false,
  plan: "",
  stripeToken: "",
  interval: "monthly",
  selectedPlan: {},
  packageStartDate: new Date(),
  packageEndDate: new Date(now.setMonth(now.getMonth() + 2)),
  tokenId: "",
  cardError: "required"
};
class TeamDashboard extends Component {
  state = INITIAL_STATE;

  closeModal = () => {
    this.setState({
      stepOne: true,
      stepTwo: false,
      stepThree: false,
      showModal: false
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
    if (prevProps.teamDashboard !== this.props.teamDashboard) {
      this.setState({
        stripeToken: this.props.teamDashboard.stripe_token
          ? this.props.teamDashboard.stripe_token
          : "",
        selectedPlan: this.props.teamDashboard.package_details
          ? this.props.teamDashboard.package_details[0]
          : {}
      });
    }
  }

  handleIntervalPeriod = e => {
    const value = e.target.value;
    const { packageStartDate } = this.state;
    this.setState(
      {
        interval: value
      },
      () => {
        if (value == "monthly") {
          const endDate = packageStartDate.setMonth(
            packageStartDate.getMonth() + 2
          );
          this.setState({
            packageStartDate: new Date(),
            packageEndDate: new Date(endDate)
          });
        } else if (value == "yearly") {
          const endDate = packageStartDate.setFullYear(
            packageStartDate.getFullYear() + 1
          );
          this.setState({
            packageStartDate: new Date(),
            packageEndDate: new Date(endDate)
          });
        }
      }
    );
  };
  handleNext = step => {
    const { cardError } = this.state;

    this.setState(
      state => {
        if (step == "second") {
          return {
            stepOne: false,
            stepTwo: true
          };
        } else if (step == "third") {
          if (Object.keys(cardError).length == 0) {
            return {
              stepThree: true,
              stepTwo: false
            };
          }
        } else {
          return {
            stepOne: true,
            stepTwo: false,
            stepThree: false
          };
        }
      },
      () => {
        if (this.state.stepThree) {
          const { tokenId, plan, interval } = this.state;
          const { id: teamId } = this.props.match.params;
          const payload = {
            stripeToken: tokenId,
            interval: interval,
            plan_name: plan
          };
          this.props.postPackageSubscribe(teamId, payload);
        }
      }
    );
  };
  handlePrevious = () => {
    this.setState({
      stepOne: true,
      stepTwo: false
    });
  };
  handleFirstStepSelect = (selected, data) => {
    this.setState({ plan: selected, selectedPlan: data });
  };
  handlePriceSubmit = e => { };
  passStripeToken = (id, error) => {
    this.setState(
      state => {
        if (!!error) return { cardError: error };
        else if (!!id) {
          return { tokenId: id, cardError: "" };
        }
      },
      () => {
        if (!!id) {
          this.handleNext("third");
        }
      }
    );
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
          map,
          breadcrumbs,
          teamDashboardLoader,
          total_projects,
          total_users,
          package_details,
          postCardResponse
        },
        match: {
          params: { id: teamId }
        }
      },
      state: {
        packageStartDate,
        packageEndDate,
        activeTab,
        showModal,
        stepOne,
        stepTwo,
        stepThree,
        interval,
        stripeToken,
        plan,
        selectedPlan,
        cardError
      },
      closeModal,
      openModal,
      toggleTab,
      handleFirstStepSelect
    } = this;
    // console.log("props", this.props);
    const packageSelected =
      Object.keys(this.state.plan).length > 0 ? true : false;
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
        {!!package_details && package_details.length > 0 && (
          <Modal
            className="modal-container custom-map-modal"
            show={showModal}
            onHide={this.closeModal}
            animation={true}
          >
            <Modal.Header closeButton>
              <Modal.Title>Choose a plan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {stepOne && (
                <PricingStepOne
                  packageDetails={package_details}
                  handleNext={this.handleNext}
                  handleFirstStepSelect={handleFirstStepSelect}
                  handleIntervalPeriod={this.handleIntervalPeriod}
                  periodType={interval}
                  isPackageSelected={packageSelected}
                />
              )}
              {stepTwo && (
                <StripeProvider apiKey={stripeToken}>
                  <Elements>
                    <PricingStepTwo
                      selectedPackage={selectedPlan}
                      // handleNext={this.handleNext}
                      handlePrevious={this.handlePrevious}
                      packageStartDate={packageStartDate}
                      packageEndDate={packageEndDate}
                      selectedPlan={plan}
                      interval={interval}
                      passStripeToken={this.passStripeToken}
                    />
                  </Elements>
                </StripeProvider>
              )}
              {stepThree && (
                <PricingStepThree
                  cardResponse={postCardResponse}
                  handleSubmit={this.closeModal}
                />
              )}
            </Modal.Body>
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
                closeModal={closeModal}
                openModal={openModal}
              />
              <div className="row">
                <div className="col-lg-8">
                  <div className="card map">
                    <div className="card-header main-card-header sub-card-header">
                      <h5>Project maps</h5>
                      <div className="dash-btn">
                        <a
                          href={`/fieldsight/org-map/${teamId}/`}
                          className="fieldsight-btn left-icon"
                          target="_blank"
                        >
                          <i className="la la-map" /> full map
                        </a>
                      </div>
                    </div>
                    <div className="card-body">
                      <SiteMap
                        map={map}
                        showContentLoader={teamDashboardLoader}
                      />
                    </div>

                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card project-list">
                    <div className="card-header main-card-header sub-card-header">
                      <h5>Projects</h5>
                      <div className="dash-btn">
                        {/* <form className="floating-form">
                          <div className="form-group mr-0">
                            <input
                              type="search"
                              className="form-control"
                              required
                            />
                            <label htmlFor="input">Search</label>
                            <i className="la la-search" />
                          </div>
                        </form> */}
                        <a
                          href={`/fieldsight/project/add/${teamId}/`}
                          className="fieldsight-btn"
                        // target="_blank"
                        >
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
    getTeamDashboard,
    postPackageSubscribe
  }
)(TeamDashboard);
