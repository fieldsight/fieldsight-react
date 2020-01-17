import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';

/* eslint-disable react/destructuring-assignment */

export default class OrganizationTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      masterresult: [],
      breadcrumbs: {},
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    axios.get(`/fv3/api/organization-teams/${id}/`).then(req => {
      this.setState({
        results: req.data.teams,
        masterresult: req.data.teams,
        breadcrumbs: req.data.breadcrumbs,
      });
    });
  }

  handleChange = e => {
    const {
      target: { value },
    } = e;
    const { results, masterresult } = this.state;
    if (value) {
      const search = results.filter(result => {
        return (
          result.name.toLowerCase().includes(value.toLowerCase()) ||
          (result.address !== null
            ? result.address
                .toLowerCase()
                .includes(value.toLowerCase())
            : '')
        );
      });
      this.setState({
        results: search,
      });
    } else {
      this.setState({
        results: masterresult,
      });
    }
  };

  render() {
    const { results, breadcrumbs } = this.state;

    return (
      <>
        {breadcrumbs && Object.keys(breadcrumbs).length > 0 && (
          <nav aria-label="breadcrumb" role="navigation">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href={breadcrumbs.organization_url}>
                  {breadcrumbs.organization}
                </a>
              </li>
              <li className="breadcrumb-item">{breadcrumbs.name}</li>
            </ol>
          </nav>
        )}
        <main id="main-content">
          <div className="card">
            <div
              className="card-header 
          main-card-header sub-card-header"
            >
              Organization Team List
              <div className="dash-btn">
                <form className="floating-form">
                  <div className="form-group mr-0">
                    <input
                      type="search"
                      className="form-control"
                      onChange={e => this.handleChange(e)}
                      required
                    />
                    <label htmlFor="input">Search</label>
                    <i className="la la-search" />
                  </div>
                </form>
                <a
                  href="/fieldsight/application/#/create-team/"
                  className="fieldsight-btn"
                >
                  <i className="la la-plus" />
                </a>
              </div>
            </div>

            <div className="card-body">
              <div style={{ position: 'relative', height: '800px' }}>
                <PerfectScrollbar>
                  <Table
                    id="manage_table"
                    className="table dataTable table-bordered manage_table"
                  >
                    <thead>
                      <tr>
                        <th>Teams</th>
                        <th>Address</th>
                        <th>Projects</th>
                        <th>Sites</th>
                        <th>Users</th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results &&
                        results.length > 0 &&
                        results.map(project => {
                          return (
                            <tr key={project.id}>
                              <td>
                                <a
                                  href={`/fieldsight/application/#/team-dashboard/${project.id}`}
                                  className="pending table-profile"
                                >
                                  <figure>
                                    <img
                                      src={project.logo}
                                      alt="site-logo"
                                    />
                                  </figure>
                                  <h5>{project.name}</h5>
                                </a>
                              </td>

                              <td>{project.address}</td>
                              <td>{project.projects}</td>
                              <td>{project.sites}</td>
                              <td>{project.users}</td>

                              <td>
                                <a
                                  href={`/fieldsight/application/#/team-dashboard/${project.id}`}
                                  className="td-view-btn td-btn"
                                >
                                  <i className="la la-eye" />
                                </a>
                                <a
                                  href={`/fieldsight/application/#/team-settings/${project.id}`}
                                  className="td-edit-btn td-btn"
                                >
                                  <i className="la la-edit" />
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </PerfectScrollbar>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}
