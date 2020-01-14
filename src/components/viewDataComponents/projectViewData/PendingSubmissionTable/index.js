import React, { Component } from "react";
import StatusTable from "../../responded/StatusTable";
import WithPagination from "../../../../hoc/WithPagination";
import axios from "axios";
import { DotLoader } from "../../../myForm/Loader";
class PendingTable extends Component {
  state = {
    pending_submissions: []
  };
  componentDidMount() {
    if (!!this.props.id) {
      this.props.paginationHandler(1, null, {
        type: "viewByStatus",
        projectId: this.props.id,
        status: "pending"
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
      props: { data, showViewData, dLoader }
    } = this;

    return (
      <React.Fragment>
        <div className="card-header main-card-header sub-card-header">
          <h5>Pending Submissions</h5>
          <div className="dash-btn">
            <button onClick={showViewData} className="fieldsight-btn">
              {data ? "View By Form" : "View by Status"}
            </button>
          </div>
        </div>
        {dLoader == false ? (
          <>
            <div className="card-body">
              <StatusTable
                submission={this.props.siteList}
                count={this.state.count}
                next={this.state.next}
                previous={this.state.previous}
                projectId={this.props.id}
              />
            </div>

            {this.props.siteList && this.props.siteList.length > 0 ? (
              <div className="card-body">
                <div className="table-footer">
                  <div className="showing-rows">
                    <p>
                      Showing <span>{this.props.fromData}</span> to{" "}
                      <span>
                        {" "}
                        {this.props.toData > this.props.totalCount
                          ? this.props.totalCount
                          : this.props.toData}{" "}
                      </span>{" "}
                      of <span>{this.props.totalCount}</span> entries.
                    </p>
                  </div>
                  {this.props.toData < this.props.totalCount ? (
                    <div className="table-pagination">
                      <ul>
                        <li className="page-item">
                          <a
                            onClick={e =>
                              this.props.paginationHandler(
                                this.props.pageNum - 1,
                                null,
                                project_id
                              )
                            }
                          >
                            <i className="la la-long-arrow-left" />
                          </a>
                        </li>

                        {this.props.renderPageNumbers({
                          type: "viewByStatus",
                          projectId: this.props.id,
                          status: "pending"
                        })}

                        <li className="page-item ">
                          <a
                            onClick={e =>
                              this.props.paginationHandler(
                                this.props.pageNum + 1,
                                null,
                                project_id
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
      </React.Fragment>
    );
  }
}
export default WithPagination(PendingTable);
