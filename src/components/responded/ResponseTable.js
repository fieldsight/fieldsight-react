import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
class ResponseTable extends Component {
  state = {
    generals_forms: []
  };

  static getDerivedStateFromProps(props, state) {
    return {
      generals_forms: props.generals_forms
    };
  }
  render() {
    return (
      <React.Fragment>
        <Table responsive="xl" className="table  table-bordered  dataTable ">
          <thead>
            <tr>
              <th>Name</th>
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
                  <td style={{ width: "45px" }}>
                    <a href={`#`}>{generals.name}</a>
                  </td>
                  <td>
                    <Link
                      to={`/submission-data/${this.props.id}/${generals.id}`}
                    >
                      {generals.response_count}
                    </Link>
                  </td>
                  <td>{generals.last_response}</td>
                  <td>{generals.created_date}</td>
                  <td>
                    {generals.view_submission_url === null ? (
                      <>
                        <i className="la la-eye view-tag tag"></i>
                      </>
                    ) : (
                      <a
                        href={generals.view_submission_url}
                        className="view-tag tag"
                      >
                        <i className="la la-eye"></i>
                      </a>
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
