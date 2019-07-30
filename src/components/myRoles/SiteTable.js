import React, { Component ,Fragment } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import Table from "react-bootstrap/Table";
import { TableContentLoader } from "../common/Loader";

let base_url = window.base_url
  ? window.base_url
  : "https://fieldsight.naxa.com.np";

class SiteTable extends Component {
  render() {
    return (
      <Fragment>
      <div
        className="table-wrapper"
        role="tabpanel"
        aria-labelledby="region_tab"
        style={{ position: "relative", height: "650px" }}
      >
        {this.props.siteLoader && <TableContentLoader row={20} column={5} />}

        {!this.props.siteLoader && (
          <PerfectScrollbar>
            <Table
              responsive="xl"
              className="table  table-bordered  dataTable "
            >
              <thead>
                <tr>
                  <th>Site Name</th>
                  <th>id</th>
                  <th>Role</th>
                  <th>Region</th>
                  <th>Progress</th>
                  <th>Submissions</th>
                  <th>Latest status</th>
                </tr>
              </thead>

              <tbody>
                {this.props.site.length === 0 && (
                  <tr>
                    <td>
                      <p>No Form Data Available</p>
                    </td>
                  </tr>
                )}

                {this.props.site.map((item, i) => (
                  <tr key={i}>
                    <td>
                      <a
                        href={
                          base_url +
                          "/fieldsight/application/?site=" +
                          item.id +
                          "#/site-dashboard"
                        }
                        className="pending table-profile"
                      >
                        <h5>{item.name}</h5>
                      </a>
                    </td>
                    <td>{item.identifier}</td>

                    <td>{item.role != null
                          ? item.role
                          : "Manager"}</td>
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
                          item.status != null ? item.status.toLowerCase() : null
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
          </PerfectScrollbar>
        )}
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
                     this.props.paginationHandler(this.props.pageNum - 1, null,this.props.siteId)
                   }
                 >
                   <i className="la la-long-arrow-left" />
                 </a>
               </li>

               {this.props.renderPageNumbers({
                 type:"projectSiteList",
                 projectId:this.props.siteId
               })}

               <li className="page-item ">
                 <a
                   onClick={e =>
                     this.props.paginationHandler(this.props.pageNum + 1, null,this.props.siteId)
                   }
                 >
                   <i className="la la-long-arrow-right" />
                 </a>
               </li>
             </ul>
           </div>
        </div>
        </Fragment>
    );
  }
}

export default SiteTable;
