import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { TableContentLoader } from "../common/Loader";
import withPagination from "../../hoc/WithPagination";
import isEmpty from "../../utils/isEmpty";

let base_url = window.base_url
  ? window.base_url
  : "https://fieldsight.naxa.com.np";

class RegionalSiteTable extends Component {
  componentDidMount() {
    this.props.paginationHandler(1, null, {
      type: "regionSite",
      projectId: this.props.regionId
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.regionId != this.props.regionId) {
      this.props.paginationHandler(1, null, {
        type: "regionSite",
        projectId: this.props.regionId
      });
    }
  }

  onChangeHandler = e => {
    const searchValue = e.target.value;
    this.props.searchHandler(
      searchValue,
      `fv3/api/regional-sites/?page=1&region=${
        this.props.regionId
      }&q=${searchValue}`,
      {
        type: "regionSite",
        projectId: this.props.regionId
      }
    );
  };

  render() {
    
    return (
      <>
        <div className="card-header main-card-header sub-card-header">
          <h5>Sites</h5>
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
            <button
              className="fieldsight-btn"
              onClick={e =>
                this.props.OpenTabHandler(
                  e,
                  "/fieldsight/site/add/" +
                    this.props.projectId +
                    "/" +
                    this.props.regionId +
                    "/"
                )
              }
            >
              <i className="la la-plus" />
            </button>
          </div>
        </div>
        <div className="card-body">
          <div style={{ position: "relative", height: "800px" }}>
            <PerfectScrollbar>
              <Table
                responsive="xl"
                className="table  table-bordered  dataTable "
              >
                <thead>
                  <tr>
                    <th>
                    {!isEmpty(this.props.terms) ? `${this.props.terms.site} name` : "Site name"}
                     
                    </th>
                    <th>identifier</th>
                    <th>Address</th>
                    <th>type</th>
                    <th>Progress</th>
                    <th>Submissions</th>
                    <th>Latest status</th>
                  </tr>
                </thead>

                <tbody>
                  {!this.props.dLoader &&
                    this.props.siteList.map((item, i) => (
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
                            {item.type}
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
                                : null
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
              {this.props.dLoader && <TableContentLoader column={7} row={20} />}
            </PerfectScrollbar>
          </div>
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
                          this.props.regionId
                        )
                      }
                    >
                      <i className="la la-long-arrow-left" />
                    </a>
                  </li>

                  {this.props.renderPageNumbers({
                    type: "regionSite",
                    projectId: this.props.regionId
                  })}

                  <li className="page-item ">
                    <a
                      onClick={e =>
                        this.props.paginationHandler(
                          this.props.pageNum + 1,
                          null,
                          this.props.regionId
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
      </>
    );
  }
}
export default withPagination(RegionalSiteTable);
