import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import DotLoader from "../../myForm/Loader";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

class VersionTable extends Component {
  state = {
    latest: [],
    versions: [],
    breadcrumbs: {},
    loader: false
  };
  componentDidMount() {
    let data = this.props.project == "project" ? 1 : 0;
    axios
      .get(
        `/fv3/api/submissions-versions/${
          this.props.project == "project" ? 1 : 0
        }/${this.props.id}/${this.props.fid}/`
      )
      .then(res => {
        this.setState({
          latest: res.data.data.latest,
          versions: res.data.data.versions,
          breadcrumbs: res.data.data.breadcrumbs,
          loader: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const { latest, versions, breadcrumbs, loader } = this.state;
    return (
      <React.Fragment>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a
                href={
                  this.props.project == "project"
                    ? breadcrumbs.project_url
                    : breadcrumbs.site_url
                }
              >
                {this.props.project == "project"
                  ? breadcrumbs.project_name
                  : breadcrumbs.site_name}
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href={breadcrumbs.responses_url}>{breadcrumbs.responses}</a>
            </li>
            <li className="breadcrumb-item">{breadcrumbs.current_page}</li>
          </ol>
        </nav>
        <div className="card">
          <div className="card-header main-card-header sub-card-header">
            {/*<h5>Version Submissions</h5>*/}
            <h5>
              <FormattedMessage
                id="app.version-submissions"
                defaultMessage="Version Submissions"
              />
            </h5>
          </div>
          <div className="card-body">
            {loader == true ? (
              <Table
                responsive="xl"
                className="table  table-bordered  dataTable "
              >
                <thead>
                  <tr>
                    <th>
                      <FormattedMessage id="app.title" defaultMessage="Title" />
                    </th>
                    <th>
                      <FormattedMessage
                        id="app.version"
                        defaultMessage="Version"
                      />
                    </th>
                    <th>
                      <FormattedMessage
                        id="app.overidden-date"
                        defaultMessage="Overidden Date"
                      />
                    </th>
                    <th>
                      <FormattedMessage
                        id="app.last-response-on"
                        defaultMessage="Last Response On"
                      />
                    </th>
                    <th>
                      <FormattedMessage
                        id="app.no-of-submissions"
                        defaultMessage="No of Submissions"
                      />
                    </th>
                    <th>
                      <FormattedMessage
                        id="app.download-excel"
                        defaultMessage="Download Excel"
                      />
                    </th>
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
                      {latest.total_submissions > 0 ? (
                        <a className="td-delete-btn" href={latest.download_url}>
                          <i className="la la-download "></i>
                        </a>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                  {versions.length > 0 &&
                    versions.map((version, key) => {
                      return (
                        <tr key={key}>
                          <td>{version.title}</td>
                          <td>{version.version}</td>
                          <td>{version.overidden_date}</td>
                          <td>{version.last_response}</td>
                          <td>{version.total_submissions}</td>
                          <td>
                            {version.total_submissions > 0 ? (
                              <a
                                href
                                className="td-delete-btn"
                                href={version.download_url}
                                target="_blank"
                              >
                                <i className="la la-download "></i>
                              </a>
                            ) : (
                              ""
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
      </React.Fragment>
    );
  }
}

export default VersionTable;
