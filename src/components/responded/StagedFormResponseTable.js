import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
export default class SurveyFormResponseTable extends Component {
  state = {
    stage_forms: []
  };
  static getDerivedStateFromProps(props, state) {
    return {
      stage_forms: props.stage_forms,
      table: props.table
    };
  }
  render() {
    return (
      <React.Fragment>
        <div>
          {this.state.stage_forms &&
            this.state.stage_forms.length > 0 &&
            this.state.stage_forms.map((stage, key) => {
              return (
                <div key={key}>
                  <div style={{ display: "flex" }}>
                    <h6>{stage.name}</h6>
                  </div>
                  <Table
                    responsive="xl"
                    className="table  table-bordered  dataTable "
                  >
                    <thead>
                      <tr>
                        <th>sub stage name</th>
                        <th>form name</th>
                        <th>last response on</th>
                        <th>Submissions</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stage.sub_stages.map((sub_stages, key) => {
                        return (
                          <tr key={key}>
                            <td style={{ width: "70px" }}>{sub_stages.name}</td>
                            <td style={{ width: "183px" }}>
                              {sub_stages.form_name}
                            </td>
                            <td>{sub_stages.last_response}</td>
                            <td>
                              {this.state.table === "site" ? (
                                <Link
                                  to={`/site-submission-data/${this.props.id}/${sub_stages.fsxf_id}`}
                                >
                                  {sub_stages.response_count}
                                </Link>
                              ) : (
                                <Link
                                  to={`/submission-data/${this.props.id}/${sub_stages.fsxf_id}`}
                                >
                                  {sub_stages.response_count}
                                </Link>
                              )}
                            </td>

                            <td>
                              {this.state.table === "site" ? (
                                <Link
                                  className="view-tag tag"
                                  to={`/site-submission-data/${this.props.id}/${sub_stages.fsxf_id}`}
                                >
                                  <i className="la la-eye"></i>
                                </Link>
                              ) : (
                                <Link
                                  className="view-tag tag"
                                  to={`/submission-data/${this.props.id}/${sub_stages.fsxf_id}`}
                                >
                                  <i className="la la-eye"></i>
                                </Link>
                              )}

                              {sub_stages.download_url === null ? (
                                <>
                                  <i className="la la-download"></i>
                                </>
                              ) : (
                                <a
                                  href={sub_stages.download_url}
                                  className="edit-tag tag"
                                >
                                  <i className="la la-download"></i>
                                </a>
                              )}
                              {sub_stages.versions_url === null ? (
                                <>
                                  <i className="la la-clone"></i>
                                </>
                              ) : (
                                <a
                                  href={sub_stages.versions_url}
                                  className="pending-tag tag"
                                >
                                  <i className="la la-clone"></i>
                                </a>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              );
            })}
        </div>
      </React.Fragment>
    );
  }
}
