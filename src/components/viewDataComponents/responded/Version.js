import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

import { DotLoader } from '../../myForm/Loader';

class VersionTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latest: [],
      versions: [],
      breadcrumbs: {},
      loader: false,
    };
  }

  componentDidMount() {
    const { project, id, fid } = this.props;
    const data = project === 'project' ? 1 : 0;
    axios
      .get(`/fv3/api/submissions-versions/${data}/${id}/${fid}/`)
      .then(res => {
        this.setState({
          latest: res.data.data.latest,
          versions: res.data.data.versions,
          breadcrumbs: res.data.data.breadcrumbs,
          loader: true,
        });
      })
      .catch();
  }

  render() {
    const { latest, versions, breadcrumbs, loader } = this.state;
    const { project, id, fid } = this.props;
    const isProject = project === 'project' ? 1 : 0;

    return (
      <>
        {breadcrumbs && Object.keys(breadcrumbs).length > 0 ? (
          <nav aria-label="breadcrumb" role="navigation">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a
                  href={
                    project === 'project'
                      ? breadcrumbs.project_url
                      : breadcrumbs.site_url
                  }
                >
                  {project === 'project'
                    ? breadcrumbs.project_name
                    : breadcrumbs.site_name}
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href={breadcrumbs.responses_url}>
                  {breadcrumbs.responses}
                </a>
              </li>
              <li className="breadcrumb-item">
                {breadcrumbs.current_page}
              </li>
            </ol>
          </nav>
        ) : (
          ''
        )}
        <div className="card">
          <div className="card-header main-card-header sub-card-header">
            <h5>Version Submissions</h5>
          </div>
          <div className="card-body">
            {loader === true ? (
              <Table
                responsive="xl"
                className="table  table-bordered  dataTable "
              >
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Version</th>
                    <th>Overidden Date</th>
                    <th>Last Response On</th>
                    <th>No of Submissions</th>
                    <th>Download Excel</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{latest.title}</td>
                    <td>{latest.version}</td>
                    <td>{latest.overidden_date}</td>
                    <td>{latest.last_response}</td>
                    <td>{latest.total_submissions}</td>
                    <td>
                      {isProject === 0 ? (
                        <a
                          href={`/fieldsight/application/#/exports/0/${fid}/${id}/${latest.version_id}`}
                          className="edit-tag tag"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="la la-download " />
                        </a>
                      ) : (
                        <a
                          href={`/fieldsight/application/#/exports/1/${fid}/${id}/${latest.version_id}`}
                          className="edit-tag tag"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="la la-download " />
                        </a>
                      )}
                    </td>
                  </tr>
                  {versions &&
                    versions.length > 0 &&
                    versions.map(version => {
                      return (
                        <tr key={version.id}>
                          <td>{version.title}</td>
                          <td>{version.version}</td>
                          <td>{version.overidden_date}</td>
                          <td>{version.last_response}</td>
                          <td>{version.total_submissions}</td>
                          <td>
                            {isProject === 0 ? (
                              <a
                                href={`/fieldsight/application/#/exports/0/${fid}/${id}/${version.version_id}`}
                                className="edit-tag tag"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <i className="la la-download " />
                              </a>
                            ) : (
                              <a
                                href={`/fieldsight/application/#/exports/1/${fid}/${id}/${version.version_id}`}
                                className="edit-tag tag"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <i className="la la-download " />
                              </a>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            ) : (
              <DotLoader />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default VersionTable;
