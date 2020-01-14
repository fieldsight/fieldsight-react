import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { DotLoader } from '../myForm/Loader';

export default class OragnizatonProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: [],
      masterprojectList: [],
      breadcrumbs: {},
      id: '',
      loader: false,
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    axios
      .get(`/fv3/api/organization-projects/${id}/`)
      .then(req => {
        this.setState({
          projectList: req.data.projects,
          masterprojectList: req.data.projects,
          breadcrumbs: req.data.breadcrumbs,
          id,
          loader: true,
        });
      })
      .catch();
  }

  handleChange = e => {
    const {
      target: { value },
    } = e;
    const { projectList, masterprojectList } = this.state;
    if (value) {
      const search = projectList.filter(project => {
        return project.name
          .toLowerCase()
          .includes(value.toLowerCase());
      });

      this.setState({
        projectList: search,
      });
    } else {
      this.setState({
        projectList: masterprojectList,
      });
    }
  };

  render() {
    const { breadcrumbs, projectList, id, loader } = this.state;
    return (
      <>
        {Object.keys(breadcrumbs).length > 0 && (
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
            <div className="card-header main-card-header sub-card-header">
              <h5>Project List</h5>

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
                  href={`/fieldsight/application/#/project-add/${id}`}
                  className="fieldsight-btn"
                >
                  <i className="la la-plus" />
                </a>
              </div>
            </div>

            <div className="card-body">
              <div style={{ position: 'relative', height: '800px' }}>
                {loader === true ? (
                  <PerfectScrollbar>
                    <Table
                      id="manage_table"
                      className="table  table-bordered  dataTable"
                    >
                      <thead>
                        <tr>
                          <th>name</th>
                          <th>address</th>
                          <th>total_users</th>
                          <th>total_submissions</th>
                          <th>total_regions</th>
                          <th>total_sites</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loader === true ? (
                          projectList.length > 0 &&
                          projectList.map(project => {
                            return (
                              <tr key={project.id}>
                                <td>
                                  <a
                                    href={`/fieldsight/application/#/project-dashboard/${project.id}`}
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
                                <td>{project.total_users}</td>
                                <td>{project.total_submissions}</td>
                                <td>{project.total_regions}</td>
                                <td>{project.total_sites}</td>
                                <td>
                                  <a
                                    href={`/fieldsight/application/#/project-dashboard/${project.id}`}
                                    className="td-view-btn td-btn"
                                  >
                                    <i className="la la-eye" />
                                  </a>
                                  <a
                                    href={`/fieldsight/application/?project=${project.id}#/project-settings`}
                                    className="td-edit-btn td-btn"
                                  >
                                    <i className="la la-edit" />
                                  </a>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <DotLoader />
                        )}
                      </tbody>
                    </Table>
                  </PerfectScrollbar>
                ) : (
                  <DotLoader />
                )}
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}
