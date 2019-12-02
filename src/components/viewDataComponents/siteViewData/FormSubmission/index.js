import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { FormattedMessage } from 'react-intl';
import axios from 'axios';

import PropTypes from 'prop-types';
import WithPagination from '../../../../hoc/WithPagination';
import Modal from '../../../common/Modal';
import { DotLoader } from '../../../myForm/Loader';
/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */

/* eslint-disable react/prop-types */

class SubmissionData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fid: props.match.params && props.match.params.fid,
      id: props.match.params && props.match.params.id,
      showConfirmation: false,
      siteList: [],
      mastersiteList: [],
      breadcrumbs: {},
      dLoader: true,
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id, fid },
      },
      siteList,
    } = this.props;

    this.props.paginationHandler(1, null, {
      type: 'siteSubmission',
      projectId: id,
      fsxf_id: fid,
      status: 'form-submission',
    });

    this.setState({
      fid,
      siteList,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.siteList !== this.props.siteList) {
      this.setState({
        siteList: nextProps.siteList,
        mastersiteList: nextProps.siteList,
        breadcrumbs: nextProps.breadcrumbs,
        dLoader: nextProps.dLoader,
      });
    }
  }

  cancleModel = () => {
    this.setState({
      showConfirmation: false,
    });
  };

  handleDelete = id => {
    this.setState({
      showConfirmation: true,
      id,
    });
  };

  delete = id => {
    let { siteList: list } = this.state;

    axios
      .get(`/fv3/api/delete-submission/${id}/`)
      .then(res => {
        if (res.status === 204) {
          this.setState(() => {
            const result = list.filter(
              data => data.submission_id !== id,
            );
            // (data => {
            //   if (id !== data.submission_id) {
            //     return data;
            //   }
            // });
            list = result;

            return {
              id: '',
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
    const { value } = e.target;
    const { siteList, mastersiteList } = this.state;

    if (value) {
      const search = siteList.filter(result => {
        return result.submitted_by
          .toLowerCase()
          .includes(value.toLowerCase());
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
      state: {
        breadcrumbs,
        dLoader,
        siteList,
        showConfirmation,
        id,
        fid,
      },
      props: {
        fromData,
        toData,
        totalCount,
        paginationHandler,
        pageNum,
        form_id_string,
        renderPageNumbers,
      },
    } = this;
    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href={breadcrumbs.site_url}>
                {breadcrumbs.site_name}
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
        <div className="card">
          <div className="card-header main-card-header sub-card-header">
            <h5>
              <FormattedMessage
                id="app.site-submissions"
                defaultMessage="Site Submissions"
              />
            </h5>
            <div className="dash-btn">
              <form className="floating-form">
                <div className="form-group mr-0">
                  <label htmlFor="search">
                    Search
                    <input
                      id="search"
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
          </div>

          {dLoader === false ? (
            <div className="card-body">
              <Table
                responsive="xl"
                className="table  table-bordered  dataTable "
              >
                <thead>
                  <tr>
                    {/* <th>S.N.</th> */}
                    <th>
                      <FormattedMessage
                        id="app.submission-id"
                        defaultMessage="submission id"
                      />
                    </th>
                    <th>
                      <FormattedMessage
                        id="app.submission-by"
                        defaultMessage="Submission By"
                      />
                    </th>
                    <th>
                      <FormattedMessage
                        id="app.submission-date"
                        defaultMessage="Submission Date"
                      />
                    </th>
                    <th>
                      <FormattedMessage
                        id="app.action"
                        defaultMessage="Action"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {siteList.length > 0 &&
                    siteList.map(list => {
                      return (
                        <tr key={list.id}>
                          <td>{list.submission_id}</td>
                          <td>
                            <a href={list.profile_url}>
                              {list.submitted_by}
                            </a>
                          </td>
                          <td>{list.date}</td>

                          <td>
                            <a
                              className="view-tag tag"
                              href={`/fieldsight/application/?submission=${list.submission_id}#/submission-details`}
                            >
                              <i className="la la-eye" />
                            </a>
                            <a
                              className="edit-tag tag"
                              href={`/forms/edit/${form_id_string}/${list.submission_id}`}
                            >
                              <i className="la la-edit" />
                            </a>

                            <a
                              tabIndex="0"
                              role="button"
                              onKeyDown={() => {
                                this.handleDelete(list.submission_id);
                              }}
                              className="delete-tag tag"
                              onClick={() => {
                                this.handleDelete(list.submission_id);
                              }}
                            >
                              <i className="la la-trash-o" />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
              {siteList && siteList.length > 0 ? (
                <div className="card-body">
                  <div className="table-footer">
                    <div className="showing-rows">
                      <p>
                        <FormattedMessage
                          id="app.showing"
                          defaultMessage="Showing"
                        />
                        <span>{this.props.fromData}</span>
                        <FormattedMessage
                          id="app.to"
                          defaultMessage="to"
                        />
                        <span>
                          {toData > totalCount ? totalCount : toData}
                        </span>
                        <FormattedMessage
                          id="app.of"
                          defaultMessage="of"
                        />
                        <span>{this.props.totalCount}</span>
                        <FormattedMessage
                          id="app.entries"
                          defaultMessage="entries"
                        />
                        .
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
                                paginationHandler(pageNum - 1, null, {
                                  type: 'formSubmission',
                                  projectId: id,
                                  fsxf_id: fid,
                                  status: 'form-submission',
                                });
                              }}
                              onClick={() => {
                                paginationHandler(pageNum - 1, null, {
                                  type: 'formSubmission',
                                  projectId: id,
                                  fsxf_id: fid,
                                  status: 'form-submission',
                                });
                              }}
                            >
                              <i className="la la-long-arrow-left" />
                            </a>
                          </li>

                          {renderPageNumbers({
                            type: 'formSubmission',
                            projectId: id,
                            fsxf_id: fid,
                            status: 'form-submission',
                          })}

                          <li className="page-item ">
                            <a
                              tabIndex="0"
                              role="button"
                              onKeyDown={() => {
                                paginationHandler(pageNum + 1, null, {
                                  type: 'formSubmission',
                                  projectId: id,
                                  fsxf_id: fid,
                                  status: 'form-submission',
                                });
                              }}
                              onClick={() => {
                                paginationHandler(pageNum + 1, null, {
                                  type: 'formSubmission',
                                  projectId: id,
                                  fsxf_id: fid,
                                  status: 'form-submission',
                                });
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
                      <p>
                        <FormattedMessage
                          id="app.sorryNoData"
                          defaultMessage="Sorry No Data"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <DotLoader />
          )}
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

export default WithPagination(SubmissionData);
