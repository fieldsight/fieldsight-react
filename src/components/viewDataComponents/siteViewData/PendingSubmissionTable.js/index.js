import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import StatusTable from '../../responded/StatusTable';
import WithPagination from '../../../../hoc/WithPagination';
import { DotLoader } from '../../../myForm/Loader';

/* eslint-disable react/prop-types */

class PendingTable extends Component {
  componentDidMount() {
    if (this.props.id !== '') {
      this.props.paginationHandler(1, null, {
        type: 'siteStatus',
        projectId: this.props.id,
        status: 'pending',
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.breadcrumbs !== this.props.breadcrumbs) {
      this.props.handleBreadCrumb(this.props.breadcrumbs);
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
                      <FormattedMessage
                        id="app.showing"
                        defaultMessage="Showing"
                      />
                      <span>{fromData}</span>
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
                      <span>{totalCount}</span>
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
                            href="#"
                            onClick={() => {
                              paginationHandler(pageNum - 1, null, {
                                projectId: id,
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
                            href="#"
                            onClick={() => {
                              paginationHandler(pageNum + 1, null, {
                                projectId: id,
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
          </>
        ) : (
          <DotLoader />
        )}
      </>
    );
  }
}

export default WithPagination(PendingTable);
