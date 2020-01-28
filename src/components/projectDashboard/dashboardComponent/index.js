import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  getRegionData,
  getProgressTableData,
  getSurveyForm,
} from '../../../actions/projectDashboardActions';
import withPagination from '../../../hoc/WithPagination';
import SiteMap from '../../common/SiteMap';
import RegionsTable from './RegionsTable';
import DashboardCounter from './DashboardCounter';
import ProjectActivity from './ProjectActivity';
import ProgressTable from './ProgressTable';
import SubmissionChart from '../../siteDashboard/dashboardComponent/SubmissionChart';
import ProgressChart from './ProgressChart';
import About from './About';
import ProjectManager from './ProjectManager';
import Logs from '../../common/Logs';
import SiteListTable from './SiteListTable';
/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line  */

const user_id = window.user_id ? window.user_id : 1;

class ProjectDashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'site',
    };
  }

  componentWillMount() {
    const { projectId } = this.props;
    this.props.getProgressTableData(projectId);
    this.props.getSurveyForm(projectId);
    this.props.paginationHandler(1, null, {
      type: 'projectSiteList',
      projectId,
    });
  }

  componentDidMount() {
    const { projectId } = this.props;
    this.props.getProgressTableData(projectId);
  }

  toggleTab = formType => {
    const {
      props: { paginationHandler, projectId },
    } = this;
    this.setState(
      {
        activeTab: formType,
      },
      () => {
        const { activeTab } = this.state;
        if (activeTab === 'region') {
          this.props.getRegionData(projectId);
        }
        if (activeTab === 'site') {
          paginationHandler(1, null, {
            type: 'projectSiteList',
            projectId,
          });
        }
      },
    );
  };

  onChangeHandler = e => {
    const searchValue = e.target.value;
    const { projectId } = this.props;
    this.props.searchHandler(
      searchValue,
      `/fv3/api/project-site-list/?page=1&project=${projectId}&q=${searchValue}`,
      {
        type: 'projectSiteList',
        projectId,
      },
    );
  };

  render() {
    const {
      projectId,
      siteList,
      dLoader,
      fromData,
      toData,
      totalCount,
      pageNum,
      paginationHandler,
      renderPageNumbers,
      projectDashboard: {
        terms_and_labels,
        id,
        map,
        showContentLoader,
        has_region,
        is_project_manager,
        project_activity,
        form_submissions_chart_data,
        site_progress_chart_data,
        contacts,
        public_desc,
        project_managers,
        logs,
        regionData,
        projectRegionDataLoader,
        progressTableData,
        progressLoader,
      },
    } = this.props;
    const { activeTab } = this.state;
    return (
      <div className="new-dashboard">
        <div className="row">
          <div className="col-lg-6">
            <div className="card map">
              <div className="card-header main-card-header sub-card-header">
                <h5>
                  {terms_and_labels && terms_and_labels.site} Map
                </h5>

                {/* <h5>
                    <FormattedMessage
                      id={
                        terms_and_labels.site == "School"
                          ? "app.school-map"
                          : "app.map"
                      }
                      defaultMessage="School Map"
                    />
                    </h5> */}
                <div className="dash-btn">
                  <a
                    href={`/fieldsight/proj-map/${id}/`}
                    className="fieldsight-btn left-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="la la-map" />
                    <FormattedMessage
                      id="app.full-map"
                      defaultMessage="Full Map"
                    />
                  </a>
                </div>
              </div>
              <div className="card-body">
                <SiteMap
                  map={map}
                  showContentLoader={showContentLoader}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card region-table">
              <div className="card-header main-card-header sub-card-header">
                {/* <div className="form-group"> */}
                <ul className="nav nav-tabs ">
                  <li className="nav-item">
                    <a
                      tabIndex="0"
                      role="button"
                      onKeyDown={() => {
                        this.toggleTab('site');
                      }}
                      className={
                        activeTab === 'site'
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      onClick={() => {
                        this.toggleTab('site');
                      }}
                    >
                      <FormattedMessage
                        id="app.sites"
                        defaultMessage="Sites"
                      />
                    </a>
                  </li>
                  {!!has_region && (
                    <li className="nav-item">
                      <a
                        tabIndex="0"
                        role="button"
                        onKeyDown={() => {
                          this.toggleTab('region');
                        }}
                        className={
                          activeTab === 'region'
                            ? 'nav-link active'
                            : 'nav-link'
                        }
                        onClick={() => {
                          this.toggleTab('region');
                        }}
                      >
                        <FormattedMessage
                          id="app.regions"
                          defaultMessage="Regions"
                        />
                      </a>
                    </li>
                  )}
                </ul>
                {/* </div> */}
                {activeTab === 'site' && (
                  <div className="dash-btn">
                    <form
                      className="floating-form"
                      onSubmit={e => {
                        e.preventDefault();
                      }}
                    >
                      <div className="form-group mr-0">
                        <input
                          type="search"
                          className="form-control"
                          placeholder={
                            this.props.intl &&
                            this.props.intl.formatMessage({
                              id: 'app.teams-search',
                              defaultMessage: 'Search',
                            })
                          }
                          onChange={this.onChangeHandler}
                        />
                        {/* <label htmlFor="input">
                          Search
                          </label> */}
                        <i className="la la-search" />
                      </div>
                    </form>
                    {is_project_manager && (
                      <a
                        href={`/fieldsight/application/#/create-site/${projectId}/`}
                        target="_blank"
                        className="fieldsight-btn"
                        rel="noopener noreferrer"
                      >
                        <i className="la la-plus" />
                      </a>
                    )}
                  </div>
                )}
              </div>

              {activeTab === 'site' && (
                <>
                  <SiteListTable
                    id={projectId}
                    data={siteList}
                    loader={dLoader}
                    terms={terms_and_labels}
                  />

                  {siteList.length > 0 && (
                    <div className="card-body">
                      <div className="table-footer">
                        <div className="showing-rows">
                          <p>
                            <FormattedMessage
                              id="app.showing"
                              defaultMessage="Showing"
                            />
                            &nbsp;
                            <span>{fromData}</span>
                            &nbsp;
                            <FormattedMessage
                              id="app.to"
                              defaultMessage="to"
                            />
                            &nbsp;
                            <span>
                              {toData > totalCount
                                ? totalCount
                                : toData}
                            </span>
                            &nbsp;
                            <FormattedMessage
                              id="app.of"
                              defaultMessage="of"
                            />
                            &nbsp;
                            <span>{totalCount}</span>
                            &nbsp;
                            <FormattedMessage
                              id="app.entries"
                              defaultMessage="entries"
                            />
                            .
                          </p>
                        </div>
                        {toData < totalCount ? (
                          <div className="table-pagination">
                            <ul>
                              <li className="page-item">
                                <a
                                  tabIndex="0"
                                  role="button"
                                  onKeyDown={() => {
                                    paginationHandler(
                                      pageNum - 1,
                                      null,
                                      {
                                        type: 'projectSiteList',
                                        projectId,
                                      },
                                    );
                                  }}
                                  onClick={() => {
                                    paginationHandler(
                                      pageNum - 1,
                                      null,
                                      {
                                        type: 'projectSiteList',
                                        projectId,
                                      },
                                    );
                                  }}
                                >
                                  <i className="la la-long-arrow-left" />
                                </a>
                              </li>

                              {renderPageNumbers({
                                type: 'projectSiteList',
                                projectId,
                              })}

                              <li className="page-item ">
                                <a
                                  tabIndex="0"
                                  role="button"
                                  onKeyDown={() => {
                                    paginationHandler(
                                      pageNum + 1,
                                      null,
                                      {
                                        type: 'projectSiteList',
                                        projectId,
                                      },
                                    );
                                  }}
                                  onClick={() => {
                                    paginationHandler(
                                      pageNum + 1,
                                      null,
                                      {
                                        type: 'projectSiteList',
                                        projectId,
                                      },
                                    );
                                  }}
                                >
                                  <i className="la la-long-arrow-right" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  )}
                </>
              )}
              {activeTab === 'region' && (
                <RegionsTable
                  // id={projectId}
                  loader={projectRegionDataLoader}
                  data={regionData}
                  terms={terms_and_labels}
                />
              )}
            </div>
          </div>
        </div>
        <ProjectActivity projectActivity={project_activity} />
        <DashboardCounter
          projectActivity={project_activity}
          id={projectId}
        />
        <div className="progress-table mrb-30">
          <div className="card">
            <div className="card-header main-card-header sub-card-header">
              <h5>
                <FormattedMessage
                  id="app.progress-table"
                  defaultMessage="Progress table"
                />
              </h5>
            </div>

            <ProgressTable
              data={progressTableData}
              loader={progressLoader}
              id={projectId}
            />
          </div>
        </div>
        <div className="chart mrb-30">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header main-card-header sub-card-header">
                  <h5>
                    <FormattedMessage
                      id="app.form-submission"
                      defaultMessage="Form Submissions"
                    />
                  </h5>
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
                    <FormattedMessage
                      id="app.site-progress"
                      defaultMessage="Site Progress"
                    />
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
            <div className="col-xl-4 col-md-6">
              <div className="card ">
                <About contacts={contacts} desc={public_desc} />
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="card mangager-list">
                <div className="card-header main-card-header sub-card-header">
                  <h5>
                    <FormattedMessage
                      id="app.project-managers"
                      defaultMessage="Progress Managers"
                    />
                  </h5>
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
                <div className="card-body">
                  <div
                    className="thumb-list mr-0 "
                    style={{
                      position: 'relative',
                      height: '316px',
                    }}
                  >
                    <ProjectManager
                      projectManagers={project_managers}
                      showContentLoader={showContentLoader}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Logs
              siteLogs={logs}
              showContentLoader={showContentLoader}
              siteId={id}
              type="project"
              user_id={user_id}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ projectDashboard }) => ({
  projectDashboard,
});
export default compose(
  withPagination,
  injectIntl,
  connect(mapStateToProps, {
    getRegionData,
    getProgressTableData,
    getSurveyForm,
  }),
)(ProjectDashboardComponent);
