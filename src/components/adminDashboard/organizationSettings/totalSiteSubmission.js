import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { DotLoader } from '../../myForm/Loader';
import WithPagination from '../../../hoc/WithPagination';
import Modal from '../../common/Modal';

/* eslint-disable  camelcase */

class TotalSiteSubmission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteList: [],
      mastersiteList: [],
      showConfirmation: false,
      deleteId: '',
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id, pid },
      },
      paginationHandler,
    } = this.props;

    paginationHandler(1, null, {
      type: 'SiteSubmission',
      projectId: pid,
      org_form_lib: id,
      status: 'SiteSubmission',
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.siteList !== this.props.siteList) {
      this.setState({
        siteList: nextProps.siteList,
        mastersiteList: nextProps.siteList,
      });
    }
  }

  cancleModel = () => {
    this.setState({
      showConfirmation: false,
    });
  };

  handleDelete = deleteId => {
    this.setState({
      showConfirmation: true,
      deleteId,
    });
  };

  delete = () => {
    const { deleteId } = this.state;
    console.log(deleteId, 'deleteId');
    let list = this.state.siteList;

    axios
      .get(`/fv3/api/delete-submission/${deleteId}/`)
      .then(res => {
        if (res.status === 204) {
          this.setState(() => {
            const result = list.filter(
              data => data.submission_id !== deleteId,
            );
            list = result;

            return {
              deleteId: '',
              showConfirmation: false,
              siteList: list,
            };
          });
        }
      })
      .catch(() => {
        // console.log(err);
      });
  };

  handleChange = async e => {
    const {
      target: { value },
    } = e;
    const { siteList, mastersiteList } = this.state;

    if (value) {
      const search = await siteList.filter(result => {
        return (
          result.submitted_by
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          (result.site_name !== null
            ? result.site_name
                .toLowerCase()
                .includes(value.toLowerCase())
            : '') ||
          (result.site_identifier !== null
            ? result.site_identifier
                .toLowerCase()
                .includes(value.toLowerCase())
            : '')
        );
      });

      this.setState({
        siteList: search,
      });
    } else {
      this.setState({
        siteList: mastersiteList,
      });
    }
  };

  render() {
    const {
      props: {
        match: {
          params: { id, pid },
        },
        dLoader,
        form_id_string,
        fromData,
        toData,
        totalCount,
        pageNum,
        paginationHandler,
        renderPageNumbers,
        breadcrumbs,
      },
      // state: { breadcrumbs },
    } = this;
    const {
      // breadcrumbs,
      siteSubmission,
      loader,
      siteList,
      showConfirmation,
    } = this.state;

    return (
      <>
        {breadcrumbs && Object.keys(breadcrumbs).length > 0 && (
          <nav aria-label="breadcrumb" role="navigation">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={breadcrumbs.organization_url}>
                  {breadcrumbs.organization_name}
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={breadcrumbs.responses_url}>
                  {breadcrumbs.responses}
                </Link>
              </li>
              <li className="breadcrumb-item">
                {breadcrumbs.current_page}
              </li>
            </ol>
          </nav>
        )}

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div
                className="right-content"
                style={{ minHeight: '512px' }}
              >
                <div className="card no-boxshadow">
                  <div className="card-header main-card-header">
                    <h5>Organization Submission</h5>
                  </div>
                  {!dLoader ? (
                    <>
                      <div className="dash-btn">
                        <form className="floating-form">
                          <div className="form-group mr-0">
                            <label htmlFor="input">
                              Search
                              <input
                                type="search"
                                className="form-control"
                                onChange={e => this.handleChange(e)}
                                required
                              />
                            </label>
                            <i className="la la-search" />
                          </div>
                        </form>
                      </div>

                      <div className="card-body ">
                        <Table
                          responsive="xl"
                          className="table table-bordered dataTable "
                        >
                          <thead>
                            <tr>
                              <th>Site Name</th>
                              <th>Site Id</th>
                              <th>submission id</th>
                              <th>Submission By</th>
                              <th>Submission Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>

                          <tbody>
                            {siteList.length > 0 &&
                              siteList.map(submission => (
                                <tr key={submission.submission_id}>
                                  <td>{submission.site_name}</td>
                                  <td>
                                    {submission.site_identifier}
                                  </td>
                                  <td>{submission.submission_id}</td>
                                  <td>{submission.submitted_by}</td>
                                  <td>{submission.date}</td>
                                  <td>
                                    <a
                                      className="view-tag tag"
                                      href={`/fieldsight/application/?submission=${submission.submission_id}#/submission-details`}
                                    >
                                      <i className="la la-eye" />
                                    </a>
                                    <a
                                      className="edit-tag tag"
                                      href={`/forms/edit/${form_id_string}/${submission.submission_id}`}
                                    >
                                      <i className="la la-edit" />
                                    </a>

                                    <a
                                      className="delete-tag tag"
                                      tabIndex="0"
                                      role="button"
                                      onKeyDown={() => {
                                        this.handleDelete(
                                          submission.id,
                                        );
                                      }}
                                      onClick={() => {
                                        this.handleDelete(
                                          submission.id,
                                        );
                                      }}
                                    >
                                      <i className="la la-trash-o" />
                                    </a>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </Table>
                        {siteList && siteList.length > 0 ? (
                          <div className="card-body">
                            <div className="table-footer">
                              <div className="showing-rows">
                                <p>
                                  Showing &nbsp;
                                  <span>{fromData}</span>
                                  &nbsp; to &nbsp;
                                  <span>
                                    {toData > totalCount
                                      ? totalCount
                                      : toData}
                                  </span>
                                  &nbsp; of &nbsp;
                                  <span>{totalCount}</span>
                                  &nbsp; entries .
                                </p>
                              </div>

                              {toData < totalCount ? (
                                <div className="table-pagination">
                                  <ul>
                                    <li className="page-item">
                                      <a
                                        tabIndex="0"
                                        role="button"
                                        onKeyDown={() => {
                                          paginationHandler(
                                            pageNum - 1,
                                            null,
                                            {
                                              type: 'SiteSubmission',
                                              projectId: pid,
                                              org_form_lib: id,
                                              status:
                                                'SiteSubmission',
                                            },
                                          );
                                        }}
                                        onClick={() => {
                                          paginationHandler(
                                            pageNum - 1,
                                            null,
                                            {
                                              type: 'SiteSubmission',
                                              projectId: pid,
                                              org_form_lib: id,
                                              status:
                                                'SiteSubmission',
                                            },
                                          );
                                        }}
                                      >
                                        <i
                                          className={`la la-long-arrow-left ${fromData ===
                                            1}?disable-btn :""`}
                                        />
                                      </a>
                                    </li>

                                    {renderPageNumbers({
                                      type: 'SiteSubmission',
                                      projectId: pid,
                                      org_form_lib: id,
                                      status: 'SiteSubmission',
                                    })}

                                    <li className="page-item ">
                                      <a
                                        tabIndex="0"
                                        role="button"
                                        onKeyDown={() => {
                                          paginationHandler(
                                            pageNum + 1,
                                            null,
                                            {
                                              type: 'SiteSubmission',
                                              projectId: pid,
                                              org_form_lib: id,
                                              status:
                                                'SiteSubmission',
                                            },
                                          );
                                        }}
                                        onClick={() => {
                                          paginationHandler(
                                            pageNum + 1,
                                            null,
                                            {
                                              type: 'SiteSubmission',
                                              projectId: pid,
                                              org_form_lib: id,
                                              status:
                                                'SiteSubmission',
                                            },
                                          );
                                        }}
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
                    </>
                  ) : (
                    <DotLoader />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {showConfirmation && (
          <Modal
            title={`Are you sure you want to delete this submission ${id}?`}
            toggleModal={this.cancleModel}
          >
            <div className="warning">
              <h5>Warning</h5>
            </div>
            <div>
              <p>
                &quot;All the data within the submission will be
                completely removed. Do you still want to
                continue?&quot;
              </p>
            </div>
            <div className="warning-footer text-center">
              <a
                tabIndex="0"
                role="button"
                onKeyDown={() => {
                  this.setState({ showConfirmation: false });
                }}
                className="fieldsight-btn rejected-btn"
                onClick={() => {
                  this.setState({ showConfirmation: false });
                }}
              >
                cancel
              </a>
              <a
                tabIndex="0"
                role="button"
                onKeyDown={() => {
                  this.delete(id);
                }}
                className="fieldsight-btn"
                onClick={() => this.delete(id)}
              >
                confirm
              </a>
            </div>
          </Modal>
        )}
      </>
    );
  }
}
export default WithPagination(TotalSiteSubmission);
