import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { DotLoader } from "../myForm/Loader";
import { RegionContext } from "../../context";
import isEmpty from "../../utils/isEmpty";

<<<<<<< HEAD
let project_id = window.project_id ? window.project_id : 321;
=======
import withPagination from "../../hoc/WithPagination";
>>>>>>> a2946f9e038cdd8da42caf07eadbe40fe248a7d1

let base_url = window.base_url
  ? window.base_url
  : "https://fieldsight.naxa.com.np";

class ProjectSiteTable extends Component {
  static contextType = RegionContext;

  componentDidMount() {
    this.props.paginationHandler(1, null, "projectSiteList");
  }

  onChangeHandler = e => {
    const searchValue = e.target.value;
    this.props.searchHandler(
      searchValue,
      `/fv3/api/project-site-list/?page=1&project=${
        this.props.projectId
      }&q=${searchValue}`,
      "projectSiteList"
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
                  base_url +
                    "/fieldsight/site/add/" +
                    this.props.projectId +
                    "/"
                )
              }
            >
              <i className="la la-plus" />
            </button>
            <a>
            <button 
              className="fieldsight-btn"
              onClick={e =>
                this.props.OpenTabHandler(
                  e,
<<<<<<< HEAD
                  base_url+ "/fieldsight/bulksitesample/" + project_id +"/1/"
=======
                  base_url +
                    "/fieldsight/application/?project=" +
                    this.props.projectId +
                    "#/project-settings/site-information"
>>>>>>> a2946f9e038cdd8da42caf07eadbe40fe248a7d1
                )
              }
            >
              {!isEmpty(terms)
                ?  `Export ${terms.site}s `
                : "Export Sites"}
            </button>
            </a>
            <button
              className="fieldsight-btn"
              onClick={e =>
                this.props.OpenTabHandler(
                  e,
                  base_url + "/fieldsight/upload/" + this.props.projectId + "/"
                )
              }
            >
              Bulk upload/update
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
                    <th>id</th>
                    <th>Address</th>
                    <th>Region</th>
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
                              base_url +
                              "/fieldsight/site-dashboard/" +
                              item.id +
                              "/"
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
                      this.props.paginationHandler(this.props.pageNum - 1, null)
                    }
                  >
                    <i className="la la-long-arrow-left" />
                  </a>
                </li>

                {this.props.renderPageNumbers("projectSiteList")}

                <li className="page-item ">
                  <a
                    onClick={e =>
                      this.props.paginationHandler(this.props.pageNum + 1, null)
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
export default withPagination(ProjectSiteTable);
