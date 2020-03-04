import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { DotLoader } from '../myForm/Loader';
import { RegionContext } from '../../context';
import isEmpty from '../../utils/isEmpty';

import withPagination from '../../hoc/WithPagination';
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */

const base_url = window.base_url
  ? window.base_url
  : 'https://fieldsight.naxa.com.np';

const project_id = window.project_id
  ? window.project_id
  : process.env.PROJECT_ID;

class ProjectSiteTable extends Component {
  static contextType = RegionContext;

  componentDidMount() {
    this.props.paginationHandler(1, null, {
      type: 'projectSiteList',
      projectId: project_id,
    });
  }

  componentWillUpdate(prevProps) {
    if (prevProps.breadcrumbs !== this.props.breadcrumbs) {
      prevProps.breadcrumbhandler(prevProps.breadcrumbs);
    }
  }

  onChangeHandler = e => {
    const searchValue = e.target.value;
    this.props.searchHandler(
      searchValue,
      `/fv3/api/project-site-list/?page=1&project=${project_id}&q=${searchValue}`,
      {
        type: 'projectSiteList',
        projectId: project_id,
      },
    );
  };

  render() {
    const {
      context: { terms },
      props: {
        OpenTabHandler,
        dLoader,
        siteList,
        fromData,
        toData,
        totalCount,
        pageNum,
        paginationHandler,
        renderPageNumbers,
      },
    } = this;
    const { formatMessage } = this.props.intl;

    return (
      <>
        <div className="card-header main-card-header sub-card-header">
          <h5>
            <h5>{!isEmpty(terms) ? `${terms.site}` : 'Sites'}</h5>
          </h5>
          <div className="dash-btn">
            <form
              className="floating-form"
              onSubmit={e => {
                e.preventDefault();
              }}
            >
              <div className="form-group mr-0">
                <input
                  type="search"
                  className="form-control"
                  onChange={this.onChangeHandler}
                  placeholder={formatMessage({
                    id: 'app.teams-search',
                  })}
                />

                <i className="la la-search" />
              </div>
            </form>
            <button
              type="button"
              className="fieldsight-btn"
              onClick={e => {
                OpenTabHandler(
                  e,
                  `${base_url}/fieldsight/application/#/create-site/${project_id} /`,
                );
              }}
            >
              <i className="la la-plus" />
            </button>
            <a
              className="fieldsight-btn"
              href={`/fieldsight/multi-site-assign-region/${project_id}/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Assign Sites to Regions
            </a>
            <a
              className="fieldsight-btn"
              href={`/fieldsight/bulksitesample/${project_id}/1/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {!isEmpty(terms)
                ? `Export ${terms.site} `
                : 'Export Sites'}
            </a>
            <button
              type="button"
              className="fieldsight-btn"
              onClick={e => {
                OpenTabHandler(
                  e,
                  `base_url/fieldsight/upload/${project_id}/`,
                );
              }}
            >
              Bulk upload/update
            </button>
          </div>
        </div>
        <div className="card-body">
          <div style={{ position: 'relative', height: '800px' }}>
            <PerfectScrollbar>
              <Table
                responsive="xl"
                className="table  table-bordered  dataTable "
              >
                <thead>
                  <tr>
                    <th>
                      {!isEmpty(terms)
                        ? `${terms.site} Name`
                        : 'Site Name'}
                    </th>
                    <th>Id</th>
                    <th>Address</th>
                    <th>Region</th>
                    <th>Type</th>
                    <th>Progress</th>
                    <th>Submissions</th>
                    <th>Latest status</th>
                  </tr>
                </thead>

                <tbody>
                  {!dLoader && siteList.length === 0 && (
                    <tr>
                      <td>
                        <p>No Form Data Available</p>
                      </td>
                    </tr>
                  )}

                  {!dLoader &&
                    siteList.map((item, i) => (
                      <tr key={i}>
                        <td>
                          <a
                            href={`/fieldsight/application/#/site-dashboard/${item.id}`}
                            className="pending table-profile"
                          >
                            <figure>
                              <img src={item.logo} alt="site-logo" />
                            </figure>
                            <h5>{item.name}</h5>
                          </a>
                        </td>
                        <td>{item.identifier}</td>

                        <td>{item.address}</td>
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
                              style={{ width: `${item.progress} %` }}
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
                              item.status != null
                                ? item.status.toLowerCase()
                                : ''
                            }
                          >
                            {item.status != null
                              ? item.status
                              : 'No Submission Yet'}
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              {dLoader && <DotLoader />}
            </PerfectScrollbar>
          </div>
          {siteList.length > 0 && (
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
              {toData < totalCount ? (
                <div className="table-pagination">
                  <ul>
                    <li className="page-item">
                      <a
                        tabIndex="0"
                        role="button"
                        onKeyDown={() => {
                          paginationHandler(pageNum - 1, null, {
                            projectId: project_id,
                          });
                        }}
                        onClick={() => {
                          paginationHandler(pageNum - 1, null, {
                            projectId: project_id,
                          });
                        }}
                      >
                        <i className="la la-long-arrow-left" />
                      </a>
                    </li>

                    {renderPageNumbers({
                      type: 'projectSiteList',
                      projectId: project_id,
                    })}

                    <li className="page-item ">
                      <a
                        tabIndex="0"
                        role="button"
                        onKeyDown={() => {
                          paginationHandler(pageNum + 1, null, {
                            projectId: project_id,
                          });
                        }}
                        onClick={() => {
                          paginationHandler(pageNum + 1, null, {
                            projectId: project_id,
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
          )}
        </div>
      </>
    );
  }
}
export default withPagination(ProjectSiteTable);
