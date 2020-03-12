import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardHeader from './DashboardHeader';
import SiteMap from '../common/SiteMap';
import About from './About';
import Project from './ProjectLists';
import TeamTable from './Team';
import Admin from './Admin';
import {
  getSuperAdminDashboard,
  getProgressTable,
} from '../../actions/superAdminDashboardActions';
import ProgressTable from './ProgressTable';

/* eslint-disable camelcase */

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'teams',
      projects: [],
      masterprojects: [],
      teams: [],
      masterteams: [],
      loader: false,
    };
  }

  componentDidMount() {
    const {
      props: {
        match: {
          params: { id: superAdminId },
        },
      },
    } = this;
    this.props.getSuperAdminDashboard(superAdminId);
    this.setState(
      {
        loader: true,
      },
      () => this.props.getProgressTable(superAdminId),
    );
  }

  componentWillReceiveProps(nextprops) {
    this.setState({
      projects: nextprops.superAdminDashboard.projects,
      masterprojects: nextprops.superAdminDashboard.projects,
      teams: nextprops.superAdminDashboard.teams,
      masterteams: nextprops.superAdminDashboard.teams,
      admins: nextprops.superAdminDashboard.admins,
      masteradmins: nextprops.superAdminDashboard.admins,
      loader: nextprops.superAdminDashboard.progressTable && false,
    });
  }

  toggleTab = formType => {
    this.setState({
      activeTab: formType,
    });
  };

  onChangeHandler = e => {
    const {
      target: { value },
    } = e;

    const { projects, masterprojects } = this.state;

    if (value) {
      const search = projects.filter(project => {
        return project.name
          .toLowerCase()
          .includes(value.toLowerCase());
      });
      this.setState({
        projects: search,
      });
    } else {
      this.setState({
        projects: masterprojects,
      });
    }
  };

  teamSearch = e => {
    const {
      target: { value },
    } = e;

    const { teams, masterteams } = this.state;

    if (value) {
      const search = teams.filter(project => {
        return project.name
          .toLowerCase()
          .includes(value.toLowerCase());
      });
      this.setState({
        teams: search,
      });
    } else {
      this.setState({
        teams: masterteams,
      });
    }
  };

  adminSearch = e => {
    const {
      target: { value },
    } = e;

    const { admins, masteradmins } = this.state;

    if (value) {
      const search = admins.filter(project => {
        return project.full_name
          .toLowerCase()
          .includes(value.toLowerCase());
      });
      this.setState({
        admins: search,
      });
    } else {
      this.setState({
        admins: masteradmins,
      });
    }
  };

  render() {
    const {
      props: {
        match: {
          params: { id: superAdminId },
        },
        superAdminDashboard: {
          id,
          name,
          phone,
          country,
          additional_desc,
          logo,
          total_sites,
          total_users,
          contact,
          map,
          showContentLoader,
          organizationDashboardLoader,
          progressTable,
          total_submissions,
          identifier,
          breadcrumbs,
        },
      },
      state: { activeTab, projects, teams, admins, loader },
    } = this;

    const total_team = teams.length;
    const total_project = projects.length;

    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          {Object.keys(breadcrumbs).length > 0 && (
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href={breadcrumbs.teams_url}>
                  {breadcrumbs.teams}
                </a>
              </li>
              <li className="breadcrumb-item">{breadcrumbs.name}</li>
            </ol>
          )}
        </nav>
        <div className="right-content no-bg new-dashboard">
          <DashboardHeader
            name={name}
            identifier={identifier}
            phone={phone}
            country={country}
            additional_desc={additional_desc}
            logo={logo}
            showContentLoader={showContentLoader}
            total_sites={total_sites}
            total_projects={total_project}
            total_users={total_users}
            total_teams={total_team}
            superAdminId={superAdminId}
            total_submissions={total_submissions}
          />

          <div className="row">
            <div className="col-lg-6">
              <div className="card map">
                <div className="card-header main-card-header sub-card-header">
                  <h5>Project Maps</h5>
                  <div className="dash-btn" />
                </div>
                <div className="card-body">
                  <SiteMap
                    map={map}
                    showContentLoader={organizationDashboardLoader}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card region-table">
                <div className="card-header main-card-header sub-card-header">
                  <ul className="nav nav-tabs ">
                    <li className="nav-item">
                      <a
                        tabIndex="0"
                        role="button"
                        onKeyDown={() => {
                          this.toggleTab('teams');
                        }}
                        className={
                          activeTab === 'teams'
                            ? 'nav-link active'
                            : 'nav-link'
                        }
                        onClick={() => {
                          this.toggleTab('teams');
                        }}
                      >
                        teams
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        tabIndex="0"
                        role="button"
                        onKeyDown={() => {
                          this.toggleTab('project');
                        }}
                        className={
                          activeTab === 'project'
                            ? 'nav-link active'
                            : 'nav-link'
                        }
                        onClick={() => {
                          this.toggleTab('project');
                        }}
                      >
                        project
                      </a>
                    </li>
                  </ul>
                  {/* </div> */}
                  {activeTab === 'teams' && (
                    <div className="dash-btn">
                      <form className="floating-form">
                        <div className="form-group mr-0">
                          <input
                            type="search"
                            className="form-control"
                            required
                            onChange={this.teamSearch}
                          />
                          <label htmlFor="input">Search</label>
                          <i className="la la-search" />
                        </div>
                      </form>
                      <a
                        href={`/fieldsight/application/#/create-team/${id}`}
                        className="fieldsight-btn"
                      >
                        <i className="la la-plus" />
                      </a>
                    </div>
                  )}
                  {activeTab === 'project' && (
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
                            placeholder="Search"
                            onChange={this.onChangeHandler}
                          />

                          <i className="la la-search" />
                        </div>
                      </form>

                      {/* )} */}
                    </div>
                  )}
                </div>

                {activeTab === 'project' && (
                  <>
                    <Project projects={projects} />
                  </>
                )}

                {activeTab === 'teams' && <TeamTable teams={teams} />}
              </div>
            </div>
          </div>
          <div className="progress-table mrb-30 mrt-30">
            <div className="card">
              <ProgressTable
                orgId={superAdminId}
                progressTable={progressTable}
                loader={loader}
              />
            </div>
          </div>
          <div className="about-section  mrt-30">
            <div className="row">
              <About contacts={contact} desc={additional_desc} />
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
                            onChange={this.adminSearch}
                          />
                          <label htmlFor="input">Search</label>
                          <i className="la la-search" />
                        </div>
                      </form>
                    </div>
                  </div>
                  <Admin
                    admin={admins}
                    showContentLoader={showContentLoader}
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

const mapStateToProps = ({ superAdminDashboard }) => {
  return {
    superAdminDashboard,
  };
};

export default connect(mapStateToProps, {
  getSuperAdminDashboard,
  getProgressTable,
})(AdminDashboard);
