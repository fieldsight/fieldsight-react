import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import StatusTable from '../../responded/StatusTable';
import WithPagination from '../../../../hoc/WithPagination';
import { DotLoader } from '../../../myForm/Loader';

class RejectedTable extends Component {
  componentDidMount() {
    const { id, paginationHandler } = this.props;
    if (id !== '') {
      paginationHandler(1, null, {
        type: 'siteStatus',
        projectId: id,
        status: 'rejected',
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { props } = this;
    if (prevProps.breadcrumbs !== props.breadcrumbs) {
      props.handleBreadCrumb(props.breadcrumbs);
    }
  }

  render() {
    const {
      props: {
        dLoader,
        siteList,
        fromData,
        toData,
        totalCount,
        pageNum,
        paginationHandler,
        renderPageNumbers,
        id,
      },
    } = this;
    return (
      <>
        <div className="card-header main-card-header sub-card-header">
          <h5>Rejected Submissions</h5>
          <div className="dash-btn">
            <Link to={`/site-responses/${id}/general`}>
              <button type="button" className="fieldsight-btn">
                View By Status
              </button>
            </Link>
          </div>
        </div>
        {dLoader === false ? (
          <>
            <div className="card-body">
              <StatusTable submission={siteList} />
            </div>
            {siteList && siteList.length > 0 ? (
              <div className="card-body">
                <div className="table-footer">
                  <div className="showing-rows">
                    <p>
                      Showing
                      <span>{fromData}</span>
                      to
                      <span>
                        {toData > totalCount ? totalCount : toData}
                      </span>
                      of
                      <span>{totalCount}</span>
                      entries .
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
                                type: 'siteStatus',
                                projectId: id,
                                status: 'rejected',
                              });
                            }}
                            onClick={() => {
                              paginationHandler(pageNum - 1, null, {
                                type: 'siteStatus',
                                projectId: id,
                                status: 'rejected',
                              });
                            }}
                          >
                            <i className="la la-long-arrow-left" />
                          </a>
                        </li>

                        {renderPageNumbers({
                          type: 'viewByStatus',
                          projectId: id,
                          status: 'flagged',
                        })}

                        <li className="page-item ">
                          <a
                            tabIndex="0"
                            role="button"
                            onKeyDown={() => {
                              paginationHandler(pageNum + 1, null, {
                                type: 'siteStatus',
                                projectId: id,
                                status: 'rejected',
                              });
                            }}
                            onClick={() => {
                              paginationHandler(pageNum + 1, null, {
                                type: 'siteStatus',
                                projectId: id,
                                status: 'rejected',
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
                    <p>Sorry No Data</p>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <DotLoader />
        )}
      </>
    );
  }
}

export default WithPagination(RejectedTable);
