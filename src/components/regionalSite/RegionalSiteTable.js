import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { DotLoader } from "../myForm/Loader";
import { RegionContext } from "../../context";
import isEmpty from "../../utils/isEmpty";

import withPagination from "../../hoc/WithPagination";

let base_url = window.base_url
  ? window.base_url
  : "https://fieldsight.naxa.com.np";

// const project_id = window.project_id ? window.project_id : 137;

class RegionalSiteTable extends Component {
  static contextType = RegionContext;

  componentDidMount() {
    console.log("table",this.props.regionId)
    this.props.paginationHandler(1, null, {
      type: "regionSite",
      projectId: this.props.regionId
    });
  }

  onChangeHandler = e => {
    const searchValue = e.target.value;
    this.props.searchHandler(
      searchValue,
      `fv3/api/regional-sites/?page=1&region=${this.props.regionId}&q=${searchValue}`,
      {
        type: "regionSite",
        projectId: this.props.regionId
      }
    );
  };

  render() {
    const {
      context: { terms }
    } = this;
    return (
      <>
        
        <div className="card-header main-card-header sub-card-header">
          <h5>{!isEmpty(terms) ? `${terms.site}` : "Sites"}</h5>
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
                  base_url + "/fieldsight/site/add/" + this.props.regionId + "/"
                )
              }
            >
              <i className="la la-plus" />
            </button>
            {/* <a>
              <button
                className="fieldsight-btn"
                onClick={e =>
                  this.props.OpenTabHandler(
                    e,
                    base_url +
                    "/fieldsight/application/?project=" +
                    project_id +
                    "#/project-settings/site-information"
                  )
                }
              >
                {!isEmpty(terms) ? `Export ${terms.site}s ` : "Export Sites"}
              </button>
            </a> */}
            <button
              className="fieldsight-btn"
              onClick={e =>
                this.props.OpenTabHandler(
                  e,
                  base_url + "/fieldsight/upload/" + this.props.regionId + "/"
                )
              }
            >
              Meta Attributes
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
                      {!isEmpty(terms) ? `${terms.site} Name` : "Site Name"}
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
              {this.props.dLoader && <DotLoader />}
            </PerfectScrollbar>
          </div>
          <div className="table-footer">
            <div className="showing-rows">
              <p>
                Showing <span>{this.props.fromData}</span> to{" "}
                <span> {this.props.toData} </span> of{" "}
                <span>{this.props.totalCount}</span> entries.
              </p>
            </div>
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
          </div>
        </div>
      </>
    );
  }
}
export default withPagination(RegionalSiteTable);
