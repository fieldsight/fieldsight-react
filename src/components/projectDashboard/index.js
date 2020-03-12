import React from 'react';
import { connect } from 'react-redux';
import DashboardHeader from './DashboardHeader';
import ProjectDashboardComponent from './dashboardComponent';

import {
  getProjectDashboard,
  getRegionData,
  getProgressTableData,
  getSurveyForm,
  getChartData,
  getProjectLogs,
} from '../../actions/projectDashboardActions';
/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */

const INITIAL_STATE = {
  // activeTab: 'home',
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
    this.props.getChartData(projectId);
    this.props.getProjectLogs(projectId);
    this.setState({ projectId });
    // this.props.paginationHandler(1, null, {
    //   type: 'projectSiteList',
    //   projectId,
    // });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      const { id: projectId } = this.props.match.params;

      this.fetchData(projectId);
    }
  }

  fetchData = projectId => {
    this.setState(
      {
        ...INITIAL_STATE,
      },
      () => {
        this.props.getProjectDashboard(projectId);
        this.props.getProgressTableData(projectId);
        this.props.getChartData(projectId);
        this.props.getProjectLogs(projectId);
        this.setState({ projectId });
      },
    );
  };

  onChangeHandler = e => {
    const searchValue = e.target.value;
    const { projectId } = this.state;
    this.props.searchHandler(
      searchValue,
      `/fv3/api/project-site-list/?page=1&project=${projectId}&q=${searchValue}`,
      {
        type: 'projectSiteList',
        projectId,
      },
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
        name,
        address,
        public_desc,
        logo,
        project_activity,
        total_sites,
        total_users,
        terms_and_labels,
        breadcrumbs,
        projectDashboardLoader,
        is_project_manager,
        surveyData,
        identifier,
      },
      siteList,
      dLoader,
      totalPage,
      pageNum,
      match: {
        params: { id: projectId },
        url,
      },
    } = this.props;

    const { showCropper, showGallery } = this.state;
    // console.log('url-', this.props);
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
        <div className="row">
          <div className="col-xl-12">
            <DashboardHeader
              name={name}
              address={address}
              logo={logo}
              public_desc={public_desc}
              totalUsers={total_users}
              totalSites={total_sites}
              totalSubmissions={project_activity.total_submissions}
              id={projectId}
              showContentLoader={projectDashboardLoader}
              closeModal={this.closeModal}
              openModal={this.openModal}
              showCropper={showCropper}
              termsAndLabels={terms_and_labels}
              showGallery={showGallery}
              isProjectManager={is_project_manager}
              surveyData={surveyData}
              path={url}
              identifier={identifier}
            />
            <ProjectDashboardComponent projectId={projectId} />
          </div>
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
  getChartData,
  getProjectLogs,
})(ProjectDashboard);
