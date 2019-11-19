import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StatusTable from '../../responded/StatusTable';
import WithPagination from '../../../../hoc/WithPagination';
import { DotLoader } from '../../../myForm/Loader';
// eslint-disable-next-line anchor-is-valid
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
          <h5>Rejected Submissions</h5>
          <div className="dash-btn">
            <button
              type="button"
              onClick={showViewData}
              className="fieldsight-btn"
            >
              {data ? 'View By Form' : 'View by Status'}
            </button>
          </div>
        </div>
        {dLoader === false ? (
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
                            onClick={e =>
                              paginationHandler(pageNum - 1, null, {
                                projectId: id,
                              })
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
                              paginationHandler(pageNum + 1, null, {
                                projectId: id,
                              })
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
RejectedTable.propTypes = {
  id: PropTypes.string,
  paginationHandler: PropTypes.func,
  breadcrumbs: PropTypes.object,
  handleBreadCrumb: PropTypes.func,
  data: PropTypes.object,
  showViewData: PropTypes.bool,
  dLoader: PropTypes.bool,
  siteList: PropTypes.arrayOf,
  fromData: PropTypes.number,
  toData: PropTypes.number,
  totalCount: PropTypes.number,
  pageNum: PropTypes.number,
  renderPageNumbers: PropTypes.func,
};

RejectedTable.defaultProps = {
  id: '',
  paginationHandler: () => {
    return;
  },
  breadcrumbs: PropTypes.object,
  handleBreadCrumb: () => {
    return;
  },
  data: {},
  showViewData: false,
  dLoader: false,
  siteList: [],
  fromData: 0,
  toData: 0,
  totalCount: 0,
  pageNum: 0,
  renderPageNumbers: () => {
    return;
  },
};
export default WithPagination(RejectedTable);
