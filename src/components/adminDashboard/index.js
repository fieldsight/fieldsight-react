import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardHeader from './dashboardHeader';
// import DashboardComponents from './dashboardComponent';
import SiteMap from '../common/SiteMap';
import DashboardCounter from './dashboardCounter';
import About from './about';
import Project from './projectLists';
import { getSuperAdminDashboard } from '../../actions/superAdminDashboardActions';

/* eslint-disable camelcase */

class AdminDashboard extends Component {
  componentDidMount() {
    const {
      match: {
        params: { id: superAdminId },
      },
    } = this.props;
    this.props.getSuperAdminDashboard(superAdminId);
  }

  render() {
    const {
      match: {
        params: { id: superAdminId },
      },
    } = this.props;
    const {
      id,
      name,
      phone,
      country,
      additional_desc,
      logo,
      total_teams,
      email,
      total_sites,
      total_projects,
      total_users,
      submissions,
      contact,
      projects,
      breadcrumbs,
      teams,
      map,
      showContentLoader,
    } = this.props.superAdminDashboard;

    return (
      <div className="right-content no-bg new-dashboard">
        <DashboardHeader
          name={name}
          phone={phone}
          country={country}
          additional_desc={additional_desc}
          logo={logo}
          showContentLoader={showContentLoader}
          total_sites={total_sites}
          total_projects={total_projects}
          total_users={total_users}
          total_teams={total_teams}
          superAdminId={superAdminId}
        />

        <div className="row">
          <div className="col-lg-8">
            <div className="card map">
              <div className="card-header main-card-header sub-card-header">
                <h5>Project Maps</h5>
                <div className="dash-btn">
                  <a
                    href="/fieldsight/org-map/"
                    className="fieldsight-btn left-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="la la-map" />
                    Full map
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
          <div className="col-lg-4">
            <div className="card project-list">
              <div className="card-header main-card-header sub-card-header">
                <h5>Projects</h5>
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
                  <a
                    href="/fieldsight/org-map/"
                    className="fieldsight-btn"
                    // target="_blank"
                  >
                    <i className="la la-plus" />
                  </a>
                </div>
              </div>
              <Project projects={teams} />
            </div>
          </div>
        </div>
        <DashboardCounter submissions={submissions} />
        <div className="about-section ">
          <div className="row">
            <About contacts={contact} desc={additional_desc} />
            {/* <About contacts={contact} desc={public_desc} /> */}
            <div className="col-lg-4">
              <div className="card admin">
                <div className="card-header main-card-header sub-card-header">
                  <h5>Admin </h5>

                  {/* <h5>Admin</h5>
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
                  </div> */}
                </div>
                {/* <Admin
                  admin={admin}
                  showContentLoader={showContentLoader}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
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
})(AdminDashboard);
