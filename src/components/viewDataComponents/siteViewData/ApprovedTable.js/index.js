import React, { Component } from 'react';
import StatusTable from '../../responded/StatusTable';
import { DotLoader } from '../../../myForm/Loader';
import WithPagination from '../../../../hoc/WithPagination';

class ApprovedTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      approved_submissions: [],
    };
  }

  componentDidMount() {
    if (this.props.id != '') {
      this.props.paginationHandler(1, null, {
        type: 'siteStatus',
        projectId: this.props.id,
        status: 'approved',
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
        id,
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
      },
    } = this;
    return (
      <React.Fragment>
        <div className="card-header main-card-header sub-card-header">
          <h5>Approved Submissions</h5>
          <div className="dash-btn">
            <button onClick={showViewData} className="fieldsight-btn">
              {data ? 'View By Form' : 'View by Status'}
            </button>
          </div>
        </div>
        {dLoader == false ? (
          <>
            {' '}
            <div className="card-body">
              <StatusTable submission={siteList} />
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
                          status: 'flagged',
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
            )}{' '}
          </>
        ) : (
          <DotLoader />
        )}
      </React.Fragment>
    );
  }
}
export default WithPagination(ApprovedTable);
