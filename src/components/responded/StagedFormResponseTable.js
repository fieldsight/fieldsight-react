import React, { Component } from "react";
import Table from "react-bootstrap/Table";
export default class SurveyFormResponseTable extends Component {
  state = {
    stage_forms: []
  };
  static getDerivedStateFromProps(props, state) {
    return {
      stage_forms: props.stage_forms,
      deleted_forms: props.deleted_forms
    };
  }
  render() {
    return (
      <React.Fragment>
        <div>
          {this.state.stage_forms.map((stage, key) => {
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
                      <th>responses</th>
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
                          <td>{sub_stages.response_count}</td>
                          <td>
                            {sub_stages.view_submission_url === null ||
                            sub_stages.view_submission_url !== "" ? (
                              <>
                                <i className="la la-eye"></i>
                              </>
                            ) : (
                              <a
                                href={sub_stages.view_submission_url}
                                className="view-tag tag"
                              >
                                <i className="la la-eye"></i>
                              </a>
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
