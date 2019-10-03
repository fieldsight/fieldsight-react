import React, { Component } from "react";
import StatusTable from "../../responded/StatusTable";
import axios from "axios";
import withPagination from "../../../hoc/WithPagination";

class FlaggedTable extends Component {
  state = {
    flagged_submissions: []
  };
  componentDidMount() {
    this.props.paginationHandler(1, null, {
      type: "viewByStatus",
      projectId: this.props.id,
      status: "flagged"
    });
    if (this.props.id != "") {
      axios
        .get(
          `fv3/api/view-by-status/?project=${this.props.id}&submission_status=flagged 
            `
        )
        .then(res => {
          this.setState({
            flagged_submissions: res.data.results
          });
        })
        .catch(err => {
          console.log(err, "err");
        });
    }
  }

  render() {
    console.log(this.props, "props");
    const {
      props: { data, showViewData }
    } = this;
    return (
      <React.Fragment>
        <div className="card-header main-card-header sub-card-header">
          <h5>Flagged Submissions</h5>
          <div className="dash-btn">
            <button onClick={showViewData} className="fieldsight-btn">
              {data ? "View By Status" : "View by Form"}
            </button>
          </div>
        </div>
        <div className="card-body">
          <StatusTable submission={this.state.flagged_submissions} />
        </div>
        {this.props.siteList.length > 0 && (
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
        )}
      </React.Fragment>
    );
  }
}
export default withPagination(FlaggedTable);
