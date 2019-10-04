import React, { Component } from "react";
import StatusTable from "../../responded/StatusTable";
import axios from "axios";
import WithPagination from "../../../hoc/WithPagination";
import { Link } from "react-router-dom";

class RejectedTable extends Component {
  state = {
    rejected_submissions: []
  };
  componentDidMount() {
    if (!!this.props.id) {
      this.props.paginationHandler(1, null, {
        type: "viewByStatus",
        projectId: this.props.id,
        status: "rejected"
      });
    }
  }

  render() {
    const {
      props: { data, showViewData }
    } = this;
    console.log(this.props.url, "rejeted");

    return (
      <React.Fragment>
        <div className="card-header main-card-header sub-card-header">
          <h5>Rejected Submission</h5>
          <div className="dash-btn">
            <Link to={this.props.url}>
              <button onClick={showViewData} className="fieldsight-btn">
                {data ? "View By Status" : "View by Form"}
              </button>
            </Link>
          </div>
        </div>
        <div className="card-body">
          <StatusTable submission={this.props.siteList} />
        </div>

        {this.props.siteList && this.props.siteList.length > 0 ? (
          <div className="card-body">
            <div className="table-footer">
              <div className="showing-rows">
                {console.log("hjkk")}
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
                      status: "flagged"
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
      </React.Fragment>
    );
  }
}
export default WithPagination(RejectedTable);
