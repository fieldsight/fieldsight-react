import React, { Component } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Table from 'react-bootstrap/Table';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { TableContentLoader } from '../common/Loader';
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key  */

// let base_url = window.base_url
//   ? window.base_url
//   : 'https://fieldsight.naxa.com.np';

class SiteTable extends Component {
  componentDidUpdate(prevProps) {
    const { props } = this;
    if (prevProps.initialTeamId !== props.initialTeamId) {
      props.requestSite(props.initialTeamId);
      props.requestRegions(props.initialTeamId);
      props.requestSubmission(props.initialTeamId);
      props.requestMap(props.initialTeamId);
    }
  }

  render() {
    const {
      siteLoader,
      site,
      profileId,
      fromData,
      toData,
      totalCount,
      pageNum,
      paginationHandler,
      siteId,
    } = this.props;
    return (
      <>
        <div
          className="table-wrapper"
          role="tabpanel"
          aria-labelledby="region_tab"
          style={{ position: 'relative', height: '650px' }}
        >
          {siteLoader && <TableContentLoader row={18} column={5} />}

          {!this.props.siteLoader && (
            <div>
              <ul style={{ position: 'relative', height: '650px' }}>
                {this.props.site.length === 0 && (
                  <p>You do not have any sites.</p>
                )}
                <PerfectScrollbar>
                  {this.props.site.length > 0 && (
                    <Table
                      responsive="xl"
                      className="table  table-bordered  dataTable "
                    >
                      <thead>
                        <tr>
                          <th>Site Name</th>
                          <th>id</th>
                          <th>Role</th>
                          <th>Region</th>
                          <th>Type</th>
                          <th>Progress</th>
                          <th>Submissions</th>
                          <th>Latest status</th>
                          {this.props.profileId && <th>Action</th>}
                        </tr>
                      </thead>

                      <tbody>
                        {/* this.props.site.length === 0 && (
                    <tr>
                      <td>
                        <p>No Form Data Available</p>
                      </td>
                    </tr>
                  ) */}

                        {this.props.site.map((item, i) => (
                          <tr key={i}>
                            <td>
                              <a
                                href={` /fieldsight/application/#/site-dashboard/${item.id}`}
                                className="pending table-profile"
                              >
                                <h5>{item.name}</h5>
                              </a>
                            </td>
                            <td>{item.identifier}</td>

                            <td>
                              {item.role !== null
                                ? item.role
                                : 'Manager'}
                            </td>
                            <td>
                              <a
                                tabIndex="0"
                                role="button"
                                className="pending"
                              >
                                {item.region}
                              </a>
                            </td>
                            <td>{item.type}</td>
                            <td>
                              <div className="progress">
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  aria-valuenow="40"
                                  aria-valuemin="0"
                                  aria-valuemax="200"
                                  style={{
                                    width: `${item.progress}%`,
                                  }}
                                >
                                  <span className="progress-count">
                                    {`${item.progress} %`}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>{item.submissions}</td>
                            <td>
                              <a
                                className={
                                  item.status !== null
                                    ? item.status.toLowerCase()
                                    : null
                                }
                              >
                                {item.status !== null
                                  ? item.status
                                  : 'No Submission Yet'}
                              </a>
                            </td>
                            {profileId && (
                              <td>
                                <a className="td-delete-btn td-btn">
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={
                                      <Tooltip>Delete</Tooltip>
                                    }
                                  >
                                    <i className="la la-trash-o" />
                                  </OverlayTrigger>
                                </a>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </PerfectScrollbar>
              </ul>
            </div>
          )}
        </div>
        {site.length > 0 && (
          <div className="table-footer">
            <div className="showing-rows">
              <p>
                Showing &nbsp;
                <span>{fromData}</span>
                &nbsp; to &nbsp;
                <span>
                  {toData > totalCount ? totalCount : toData}
                </span>
                &nbsp; of &nbsp;
                <span>{totalCount}</span>
                &nbsp; entries .
              </p>
            </div>

            <div className="table-pagination">
              <ul>
                {this.props.pageNum !== 1 && (
                  <li
                    className={` page-item
                    `}
                  >
                    <a
                      tabIndex="0"
                      role="button"
                      onKeyDown={() => {
                        paginationHandler(pageNum - 1, null, {
                          type: 'mySiteList',
                          projectId: siteId,
                        });
                      }}
                      onClick={() => {
                        paginationHandler(pageNum - 1, null, {
                          type: 'mySiteList',
                          projectId: siteId,
                        });
                      }}
                    >
                      <i className="la la-long-arrow-left " />
                    </a>
                  </li>
                )}

                {this.props.profileId
                  ? this.props.renderPageNumbers({
                      type: 'siteListByProfileId',
                      projectId: this.props.siteId,
                      profileId: this.props.profileId,
                    })
                  : this.props.renderPageNumbers({
                      type: 'mySiteList',
                      projectId: this.props.siteId,
                    })}

                {this.props.pageNum !== this.props.totalPage && (
                  <li className="page-item">
                    <a
                      tabIndex="0"
                      role="button"
                      onKeyDown={() => {
                        paginationHandler(pageNum + 1, null, {
                          type: 'mySiteList',
                          projectId: siteId,
                        });
                      }}
                      onClick={() => {
                        paginationHandler(pageNum + 1, null, {
                          type: 'mySiteList',
                          projectId: siteId,
                        });
                      }}
                    >
                      <i className="la la-long-arrow-right" />
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default SiteTable;
