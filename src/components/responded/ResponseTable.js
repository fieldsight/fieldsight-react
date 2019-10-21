import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import format from "date-fns/format";

class ResponseTable extends Component {
  state = {
    generals_forms: [],
    table: ""
  };

  static getDerivedStateFromProps(props, state) {
    return {
      generals_forms: props.generals_forms,
      table: props.table,
      survey: props.survey
    };
  }

  render() {
    return (
      <React.Fragment>
        <Table responsive="xl" className="table  table-bordered  dataTable ">
          <thead>
            <tr>
              <th>
                {this.state.survey === "true" ? "Schedule Name" : "Name"}{" "}
              </th>
              {this.state.survey === "true" ? <th> Form Name</th> : ""}
              <th>Submission</th>
              <th>Last Response On</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.generals_forms.map((generals, key) => {
              return (
                <tr key={key}>
                  <td style={{ width: "45px" }}>{generals.name}</td>
                  {this.state.survey === "true" ? (
                    <td>{generals.form_name}</td>
                  ) : (
                    ""
                  )}
                  <td>
                    {this.state.table == "site" ? (
                      generals.fsxf_id ? (
                        <Link
                          to={`/site-submission-data/${this.props.id}/${generals.fsxf_id}`}
                        >
                          {generals.response_count}
                        </Link>
                      ) : (
                        <Link
                          to={`/site-submission-data/${this.props.id}/${generals.id}`}
                        >
                          {generals.response_count}
                        </Link>
                      )
                    ) : generals.fsxf_id ? (
                      <Link
                        to={`/submission-data/${this.props.id}/${generals.fsxf_id}`}
                      >
                        {generals.response_count}
                      </Link>
                    ) : (
                      <Link
                        to={`/submission-data/${this.props.id}/${generals.id}`}
                      >
                        {generals.response_count}
                      </Link>
                    )}
                  </td>
                  <td>
                    {generals.last_response.length > 0
                      ? format(generals.last_response, [
                          "MMMM Do YYYY, h:mm:ss a"
                        ])
                      : ""}
                  </td>
                  <td>{generals.created_date}</td>

                  <td>
                    {this.state.table == "site" ? (
                      generals.fsxf_id ? (
                        <Link
                          className="view-tag tag"
                          to={`/site-submission-data/${this.props.id}/${generals.fsxf_id}`}
                        >
                          <i className="la la-eye view-tag tag"></i>
                        </Link>
                      ) : (
                        <Link
                          className="view-tag tag"
                          to={`submission-data/${this.props.id}/${generals.id}`}
                        >
                          <i className="la la-eye view-tag tag"></i>
                        </Link>
                      )
                    ) : generals.fsxf_id ? (
                      <Link
                        className="view-tag tag"
                        to={`/site-submission-data/${this.props.id}/${generals.fsxf_id}`}
                      >
                        <i className="la la-eye view-tag tag"></i>
                      </Link>
                    ) : (
                      <Link
                        className="view-tag tag"
                        to={`/submission-data/${this.props.id}/${generals.id}`}
                      >
                        <i className="la la-eye view-tag tag"></i>
                      </Link>
                    )}
                    {generals.download_url === null ? (
                      <>
                        <i className="la la-download edit-tag tag"></i>
                      </>
                    ) : (
                      <a href={generals.download_url} className="edit-tag tag">
                        <i className="la la-download "></i>
                      </a>
                    )}
                    {generals.versions_url === null ? (
                      <>
                        <i className="la la-clone edit-tag tag"></i>
                      </>
                    ) : (
                      <a
                        href={generals.versions_url}
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
      </React.Fragment>
    );
  }
}
export default ResponseTable;
