import React from 'react';
import { connect } from 'react-redux';
import DashboardHeader from './DashboardHeader';
import ProjectDashboardComponent from './dashboardComponent';
import Reports from '../reports';
import {
  getProjectDashboard,
  getRegionData,
  getProgressTableData,
  getSurveyForm,
} from '../../actions/projectDashboardActions';
/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */

const INITIAL_STATE = {
  activeTab: 'home',
  showHeaderModal: false,
  showSubmissionModal: false,
  showCropper: false,
  showSubsites: false,
  showGallery: false,
  // projectId: '',
};

class ProjectDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentWillMount() {
    const {
      match: {
        params: {
          id: projectId,
          // projectId: id,
        },
      },
    } = this.props;
    this.props.getProjectDashboard(projectId);
    this.props.getProgressTableData(projectId);
    this.props.getSurveyForm(projectId);
    // this.setState({ projectId });
  }

  componentWillReceiveProps(nextProps) {
    const { props } = this;
    if (nextProps.match.params.id !== props.match.params.id) {
      const { id: projectId } = props.match.params;

      this.setState(
        {
          ...INITIAL_STATE,
        },
        () => {
          props.getProjectDashboard(projectId);
          props.getProgressTableData(projectId);

          // this.setState({ projectId });
        },
      );
    }
  }

  toggleTab = tab => {
    this.setState({
      activeTab: tab,
    });
  };

  closeModal = type => {
    // if (type) {
    return (
      type &&
      this.setState({
        [`show${type}`]: false,
      })
    );
    // }
  };

  openModal = type => {
    // if (type) {
    return (
      type &&
      this.setState({
        [`show${type}`]: true,
      })
    );
    // }
  };

  render() {
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
        projectDashboardLoader,
        regionData,
        projectRegionDataLoader,
        progressTableData,
        progressLoader,
        is_project_manager,
        surveyData,
      },

      match: {
        params: { id: projectId },
      },
    } = this.props;
    console.log(map, 'map');

    const { showCropper, showGallery, activeTab } = this.state;

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
              <li className="breadcrumb-item">{breadcrumbs.name}</li>

              {/* <li className="breadcrumb-item active" aria-current="page">
                {breadcrumbs.site}
              </li> */}
            </ol>
          )}
        </nav>
        <div className="right-content no-bg new-dashboard">
          <DashboardHeader
            name={name}
            address={address}
            logo={logo}
            public_desc={public_desc}
            totalUsers={total_users}
            totalSites={total_sites}
            totalSubmissions={project_activity.total_submissions}
            id={id}
            showContentLoader={projectDashboardLoader}
            closeModal={this.closeModal}
            openModal={this.openModal}
            showCropper={showCropper}
            termsAndLabels={terms_and_labels}
            showGallery={showGallery}
            isProjectManager={is_project_manager}
            surveyData={surveyData}
            activeTab={activeTab}
            toggleTab={this.toggleTab}
          />
          {activeTab !== 'reports' && (
            <ProjectDashboardComponent
              terms_and_labels={terms_and_labels}
              id={id}
              map={map}
              showContentLoader={projectDashboardLoader}
              has_region={has_region}
              regionData={regionData}
              projectRegionDataLoader={projectRegionDataLoader}
              getRegionData={this.props.getRegionData}
              is_project_manager={is_project_manager}
              projectId={projectId}
              project_activity={project_activity}
              form_submissions_chart_data={
                form_submissions_chart_data
              }
              site_progress_chart_data={site_progress_chart_data}
              contacts={contacts}
              public_desc={public_desc}
              project_managers={project_managers}
              logs={logs}
              progressTableData={progressTableData}
              progressLoader={progressLoader}
            />
          )}
          {activeTab === 'reports' && (
            <Reports projectId={projectId} />
          )}
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ projectDashboard }) => ({
  projectDashboard,
});
export default connect(mapStateToProps, {
  getProjectDashboard,
  getRegionData,
  getProgressTableData,
  getSurveyForm,
})(ProjectDashboard);
