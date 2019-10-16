import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import WithPagination from "../../../hoc/WithPagination";

class SubmissionData extends Component {
  state = {
    fid: this.props.match.params && this.props.match.params.fid
  };

  componentDidMount() {
    const {
      match: {
        params: { id, fid }
      }
    } = this.props;

    this.props.paginationHandler(1, null, {
      type: "formSubmission",
      projectId: id,
      fsxf_id: fid,
      status: "form-submission"
    });
    this.setState({
      fid
    });
  }

  render() {
    return (
      <React.Fragment>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="">Submission</a>
            </li>
            <li className="breadcrumb-item">Data</li>
          </ol>
        </nav>
        <div className="card">
          <div className="card-body">
            <Table
              responsive="xl"
              className="table  table-bordered  dataTable "
            >
              <thead>
                <tr>
                  <th>S.N.</th>
                  <th>Site Name</th>
                  <th>Site Id</th>
                  <th>Submission Id</th>
                  <th>Submitted By</th>
                  <th>Submission Date</th>
                  <th>Enketo</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.props.siteList.length > 0 &&
                  this.props.siteList.map((list, key) => {
                    return (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{list.site_name}</td>
                        <td>{this.state.fid}</td>
                        <td>{list.id}</td>
                        <td>
                          <a href={list.profile_url}>{list.submitted_by}</a>
                        </td>
                        <td>{list.date}</td>

                        <td>
                          <a>
                            <i className="la la-eye"></i>
                          </a>
                          <a>
                            <i className="la la-edit"></i>
                          </a>
                        </td>
                        <td>
                          <a>
                            <i className="la la-trash"></i>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            {this.props.siteList && this.props.siteList.length > 0 ? (
              <div className="card-body">
                {console.log("hhh")}

                <div className="table-footer">
                  <div className="showing-rows">
                    <p>
                      Showing <span>{this.props.fromData}</span> to{" "}
                      <span>
                        {" "}
                        {this.props.toData > this.props.totalCount
                          ? this.props.totalCount
                          : this.props.toData}{" "}
                      </span>{" "}
                      of <span>{this.props.totalCount}</span> entries.
                    </p>
                  </div>
                  {this.props.toData < this.props.totalCount ? (
                    <div className="table-pagination">
                      <ul>
                        <li className="page-item">
                          <a
                            onClick={e =>
                              this.props.paginationHandler(
                                this.props.pageNum - 1,
                                null,
                                project_id
                              )
                            }
                          >
                            <i className="la la-long-arrow-left" />
                          </a>
                        </li>

                        {this.props.renderPageNumbers({
                          type: "formSubmission",
                          projectId: id,
                          fsxf_id: fid,
                          status: "form-submission"
                        })}

                        <li className="page-item ">
                          <a
                            onClick={e =>
                              this.props.paginationHandler(
                                this.props.pageNum + 1,
                                null,
                                project_id
                              )
                            }
                          >
                            <i className="la la-long-arrow-right" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="card-body">
                <div className="table-footer">
                  <div className="showing-rows">
                    <p>Sorry No Data</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default WithPagination(SubmissionData);
