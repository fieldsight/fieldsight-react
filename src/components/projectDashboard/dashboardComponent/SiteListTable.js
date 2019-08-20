import React from "react";
import Table from "react-bootstrap/Table";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { DotLoader } from "../../myForm/Loader";

import withPagination from "../../../hoc/WithPagination";

class SiteListTable extends React.Component {
  state = {
    project_id: JSON.parse(this.props.id)
  };
  componentDidMount() {
    this.props.paginationHandler(1, null, {
      type: "projectSiteList",
      projectId: this.state.project_id
    });
  }

  onChangeHandler = e => {
    const searchValue = e.target.value;
    const { project_id } = this.state;
    this.props.searchHandler(
      searchValue,
      `/fv3/api/project-site-list/?page=1&project=${project_id}&q=${searchValue}`,
      {
        type: "projectSiteList",
        projectId: project_id
      }
    );
  };
  render() {
    const { data, loader } = this.props;

    const { project_id } = this.state;
    return (
      // <div className="card region-table">
      <>
        <div className="card-header main-card-header sub-card-header">
          <h5>Lists</h5>
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
                />
                <label htmlFor="input">Search</label>
                <i className="la la-search" />
              </div>
            </form>
          </div>
        </div>
        <div className="card-body">
          <div style={{ position: "relative", height: "360px" }}>
            <PerfectScrollbar>
              <Table
                responsive="xl"
                className="table  table-bordered  dataTable "
              >
                <thead>
                  <tr>
                    <th>Site Name</th>
                    <th>id</th>
                    <th>Address</th>
                    <th>Region</th>
                    <th>Progress</th>
                    <th>Submissions</th>
                    <th>Latest status</th>
                  </tr>
                </thead>

                <tbody>
                  {!loader && data.length === 0 && (
                    <tr>
                      <td>
                        <p>No Form Data Available</p>
                      </td>
                    </tr>
                  )}
                  {!loader &&
                    data.map((item, i) => (
                      <tr key={i}>
                        <td>
                          <a
                            href={
                              "/fieldsight/application/#/site-dashboard/" +
                              item.id
                            }
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
                          <a href="#" className="pending">
                            {item.region}
                          </a>
                        </td>
                        <td>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              aria-valuenow="40"
                              aria-valuemin="0"
                              aria-valuemax="200"
                              style={{ width: item.progress + "%" }}
                            >
                              <span className="progress-count">
                                {item.progress + "%"}
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
                                : ""
                            }
                          >
                            {item.status != null
                              ? item.status
                              : "No Submission Yet"}
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              {loader && <DotLoader />}
            </PerfectScrollbar>
          </div>
          {data.length > 0 && (
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
                      type: "projectSiteList",
                      projectId: project_id
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
          )}
        </div>
        {/* </div> */}
      </>
    );
  }
}
export default withPagination(SiteListTable);
