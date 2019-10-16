import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import WithPagination from "../../../hoc/WithPagination";
import Modal from "../../common/Modal";

class SubmissionData extends Component {
  state = {
    fid: this.props.match.params && this.props.match.params.fid,
    showConfirmation: false,
    id: ""
  };

  componentDidMount() {
    const {
      match: {
        params: { id, fid }
      }
    } = this.props;

    this.props.paginationHandler(1, null, {
      type: "siteSubmission",
      projectId: id,
      fsxf_id: fid,
      status: "form-submission"
    });
    this.setState({
      fid
    });
  }

  cancleModel = () => {
    this.setState({
      showConfirmation: false
    });
  };
  handleDelete = id => {
    this.setState({
      showConfirmation: true,
      id: id
    });
  };
  delete = id => {
    console.log(id, "gfhjk");

    axios
      .get(`/fv3/api/delete-submission/${id}/`)
      .then(res => {
        console.log(res, "delete");

        if (res.status == 204) {
          console.log("delete res");
          let delet = this.props.siteList.filter(data => {
            if (id !== data.id) {
              return data;
            }
          });
          {
            console.log(this.state.showConfirmation, "1");
          }
          this.setState(
            {
              id: "",
              showConfirmation: false
            },
            () => console.log(this.state.showConfirmation, "2")
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href=""> Submission</a>
            </li>
            <li className="breadcrumb-item">Site</li>
          </ol>
        </nav>
        <div className="card">
          <div className="card-header main-card-header sub-card-header">
            <h5>Site Submissions</h5>
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
                  <i className="la la-search"></i>
                </div>
              </form>
            </div>
          </div>
          <div className="card-body">
            <Table
              responsive="xl"
              className="table  table-bordered  dataTable "
            >
              <thead>
                <tr>
                  <th>S.N.</th>
                  <th>Submission Id</th>
                  <th>Submitted By</th>
                  <th>Submission Date</th>
                  <th>Enketo</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {console.log(this.props.form_id_string, "ghjk")}
                {this.props.siteList.length > 0 &&
                  this.props.siteList.map((list, key) => {
                    return (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>
                          <a
                            href={`/fieldsight/application/?submission=${list.id}#/submission-details`}
                          >
                            {list.submission_id}
                          </a>
                        </td>
                        <td>
                          <a href={list.profile_url}>{list.submitted_by}</a>
                        </td>
                        <td>{list.date}</td>

                        <td>
                          <a
                            href={`/form/view/${this.props.form_id_string}/${list.submission_id}`}
                          >
                            <i className="la la-eye"></i>
                          </a>
                          <a
                            href={`/form/edit/${this.props.form_id_string}/${list.submission_id}`}
                          >
                            <i className="la la-edit"></i>
                          </a>
                        </td>
                        <td>
                          <a>
                            <a
                              className="td-delete-btn"
                              onClick={() => {
                                this.handleDelete(list.submission_id);
                              }}
                            >
                              {" "}
                              <i className="la la-trash-o"> </i>{" "}
                            </a>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            {this.props.siteList && this.props.siteList.length > 0 ? (
              <div className="card-body">
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
        {this.state.showConfirmation && (
          <Modal
            title={`Are you sure you want to delete this submission ${this.state.id}?`}
            toggleModal={this.cancleModel}
          >
            <div className="warning">
              <h5>Warning</h5>
            </div>
            <div>
              <p>
                "All the data within the submission will be completely removed.
                Do u still want to continue?"
              </p>
            </div>
            <div className="warning-footer text-center">
              <a
                className="fieldsight-btn rejected-btn"
                onClick={() => {
                  this.setState({ showConfirmation: false });
                }}
              >
                cancel
              </a>
              <a
                className="fieldsight-btn"
                onClick={() => this.delete(this.state.id)}
              >
                confirm
              </a>
            </div>
          </Modal>
        )}
      </React.Fragment>
    );
  }
}

export default WithPagination(SubmissionData);
