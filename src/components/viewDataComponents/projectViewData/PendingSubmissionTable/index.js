import React, { Component } from 'react';
import StatusTable from '../../responded/StatusTable';
import WithPagination from '../../../../hoc/WithPagination';
import { DotLoader } from '../../../myForm/Loader';

class PendingTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pending_submissions: [],
    };
  }

  componentDidMount() {
    if (!!this.props.id) {
      this.props.paginationHandler(1, null, {
        type: 'viewByStatus',
        projectId: this.props.id,
        status: 'pending',
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
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
        id,
        fromData,
        toData,
        totalCount,
        pageNum,
        paginationHandler,
        renderPageNumbers,
      },
    } = this;

    return (
      <>
        <div className="card-header main-card-header sub-card-header">
          <h5>Pending Submissions</h5>
          <div className="dash-btn">
            <button onClick={showViewData} className="fieldsight-btn">
              {data ? 'View By Form' : 'View by Status'}
            </button>
          </div>
        </div>
        {dLoader == false ? (
          <>
            <div className="card-body">
              <StatusTable
                submission={siteList}
                count={this.state.count}
                next={this.state.next}
                previous={this.state.previous}
                projectId={id}
              />
            </div>

            {siteList && siteList.length > 0 ? (
              <div className="card-body">
                <div className="table-footer">
                  <div className="showing-rows">
                    <p>
                      Showing <span>{fromData}</span> to{' '}
                      <span>
                        {' '}
                        {toData > totalCount
                          ? totalCount
                          : toData}{' '}
                      </span>{' '}
                      of <span>{totalCount}</span> entries.
                    </p>
                  </div>
                  {toData < totalCount ? (
                    <div className="table-pagination">
                      <ul>
                        <li className="page-item">
                          <a
                            onClick={e =>
                              paginationHandler(
                                pageNum - 1,
                                null,
                                project_id,
                              )
                            }
                          >
                            <i className="la la-long-arrow-left" />
                          </a>
                        </li>

                        {renderPageNumbers({
                          type: 'viewByStatus',
                          projectId: id,
                          status: 'pending',
                        })}

                        <li className="page-item ">
                          <a
                            onClick={e =>
                              paginationHandler(
                                pageNum + 1,
                                null,
                                project_id,
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
          </>
        ) : (
          <DotLoader />
        )}
      </>
    );
  }
}
export default WithPagination(PendingTable);
