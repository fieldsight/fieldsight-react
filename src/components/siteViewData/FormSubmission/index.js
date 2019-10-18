import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import WithPagination from "../../../hoc/WithPagination";
import Modal from "../../common/Modal";

class SubmissionData extends Component {
  state = {
    fid: this.props.match.params && this.props.match.params.fid,
    id: this.props.match.params && this.props.match.params.id,
    showConfirmation: false,
    siteList: [],
    mastersiteList: [],
    breadcrumbs: {}
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
      fid,
      siteList: this.props.siteList
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
    let list = this.state.siteList;

    axios
      .get(`/fv3/api/delete-submission/${id}/`)
      .then(res => {
        if (res.status == 204) {
          this.setState(state => {
            const result = list.filter(data => {
              if (id !== data.submission_id) {
                return data;
              }
            });
            list = result;

            return {
              id: "",
              showConfirmation: false,
              siteList: list
            };
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.siteList != this.props.siteList) {
      this.setState({
        siteList: nextProps.siteList,
        mastersiteList: nextProps.siteList,
        breadcrumbs: nextProps.breadcrumbs
      });
    }
  }
  handleChange = async e => {
    const {
      target: { value }
    } = e;
    const { siteList, mastersiteList } = this.state;

    if (value) {
      const search = await siteList.filter(result => {
        return result.submitted_by.toLowerCase().includes(value.toLowerCase());
      });
      this.setState({
        siteList: search
      });
    } else {
      this.setState({
        siteList: mastersiteList
      });
    }
  };
  render() {
    console.log(this.state.siteList, "this.state.siteList");

    return (
      <React.Fragment>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href={this.state.breadcrumbs.site_url}>
                {this.state.breadcrumbs.site_name}
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href={this.state.breadcrumbs.responses_url}>
                {this.state.breadcrumbs.responses}
              </a>
            </li>
            <li className="breadcrumb-item">
              {this.state.breadcrumbs.current_page}
            </li>
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
                {this.state.siteList.length > 0 &&
                  this.state.siteList.map((list, key) => {
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
                          <a
                            className="td-delete-btn"
                            onClick={() => {
                              this.handleDelete(list.submission_id);
                            }}
                          >
                            {" "}
                            <i className="la la-trash-o"> </i>{" "}
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
                          projectId: this.state.id,
                          fsxf_id: this.state.fid,
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
