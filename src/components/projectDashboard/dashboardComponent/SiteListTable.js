import React from "react";
import Table from "react-bootstrap/Table";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { DotLoader } from "../../myForm/Loader";
import isEmpty from "../../../utils/isEmpty";
// import withPagination from "../../../hoc/WithPagination";
import { BlockContentLoader } from "../../common/Loader";

class SiteListTable extends React.Component {
  state = {
    project_id: JSON.parse(this.props.id)
  };
  render() {
    const { data, loader, terms } = this.props;

    return (
      <>
        {/* {loader ? (
          <BlockContentLoader number={10} height="15px" />
        ) : ( */}
        <div className="card-body">
          <div style={{ position: "relative", height: "360px" }}>
            <PerfectScrollbar>
              {loader && <DotLoader />}
              {!loader && (
                <Table
                  responsive="xl"
                  className="table  table-bordered  dataTable "
                >
                  <thead>
                    <tr>
                      <th>
                        {!isEmpty(terms) ? `${terms.site}` : "Sites"} Name
                      </th>
                      <th>id</th>
                      <th>Address</th>
                      <th>{!isEmpty(terms) ? `${terms.region}` : "Region"}</th>
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
              )}
            </PerfectScrollbar>
          </div>
          {/* {this.props.siteList.length > 0 && (
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
            )} */}
        </div>
        {/* )} */}
      </>
    );
  }
}
export default SiteListTable;
