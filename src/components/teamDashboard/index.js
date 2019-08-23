import React, { Component } from "react";
import { connect } from "react-redux";

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
    const {
      props: {
        teamDashboard: { breadcrumbs },
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
        <div class="right-content no-bg new-dashboard">dashboard Header</div>
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
    getSiteDashboard
  }
)(TeamDashboard);
