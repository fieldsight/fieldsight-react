import React, { Component } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import Table from "react-bootstrap/Table";


let base_url = window.base_url
  ? window.base_url
  : "https://fieldsight.naxa.com.np";


class SiteTable extends Component {
  render() {
    return (
      <div
        className="table-wrapper"
        role="tabpanel"
        aria-labelledby="region_tab"
        style={{ position: "relative", height: "650px" }}
      >
        <PerfectScrollbar>
              <Table
                responsive="xl"
                className="table  table-bordered  dataTable "
              >
                <thead>
                  <tr>
                    <th>
                    Site Name
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
                 {
                    this.props.site.map((item, i) => (
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
            
            </PerfectScrollbar>
      </div>
    );
  }
}

export default SiteTable;
