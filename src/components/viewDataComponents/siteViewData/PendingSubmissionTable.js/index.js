import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import StatusTable from '../../responded/StatusTable';
import WithPagination from '../../../../hoc/WithPagination';
import { DotLoader } from '../../../myForm/Loader';
/* eslint-disable react/destructuring-assignment */

class PendingTable extends Component {
  componentDidMount() {
    const { id } = this.props;
    if (id !== '') {
      this.props.paginationHandler(1, null, {
        type: 'siteStatus',
        projectId: id,
        status: 'pending',
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { breadcrumbs } = this.props;
    if (prevProps.breadcrumbs !== breadcrumbs) {
      this.props.handleBreadCrumb(breadcrumbs);
    }
  }

  render() {
    const {
      props: {
        data,
        showViewData,
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
          <h5>
            <FormattedMessage
              id="app.pending-submissions"
              defaultMessage="Pending Submissions"
            />
          </h5>
          <div className="dash-btn">
            <button
              type="button"
              onClick={showViewData}
              className="fieldsight-btn"
            >
              {data ? (
                <FormattedMessage
                  id="app.view-by-form"
                  defaultMessage="View By Form"
                />
              ) : (
                <FormattedMessage
                  id="app.view-by-status"
                  defaultMessage="View By Status"
                />
              )}
            </button>
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
                      entries.
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
                                type: 'viewByStatus',
                                projectId: id,
                                status: 'flagged',
                              });
                            }}
                            onClick={() => {
                              paginationHandler(pageNum - 1, null, {
                                type: 'viewByStatus',
                                projectId: id,
                                status: 'flagged',
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
                                type: 'viewByStatus',
                                projectId: id,
                                status: 'flagged',
                              });
                            }}
                            onClick={() => {
                              paginationHandler(pageNum + 1, null, {
                                type: 'viewByStatus',
                                projectId: id,
                                status: 'flagged',
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
PendingTable.propTypes = {
  id: PropTypes.string.isRequired,
  paginationHandler: PropTypes.func.isRequired,
  breadcrumbs: PropTypes.objectOf.isRequired,
  handleBreadCrumb: PropTypes.func.isRequired,
  data: PropTypes.objectOf.isRequired,
  showViewData: PropTypes.bool.isRequired,
  dLoader: PropTypes.bool.isRequired,
  siteList: PropTypes.arrayOf.isRequired,
  fromData: PropTypes.number.isRequired,
  toData: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  pageNum: PropTypes.number.isRequired,
  renderPageNumbers: PropTypes.func.isRequired,
};

export default WithPagination(PendingTable);
