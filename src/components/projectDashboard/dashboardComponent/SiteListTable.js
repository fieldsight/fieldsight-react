import React from "react";
import Table from "react-bootstrap/Table";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { DotLoader } from "../../myForm/Loader";
import isEmpty from "../../../utils/isEmpty";

class SiteListTable extends React.Component {
  state = {
    project_id: JSON.parse(this.props.id)
  };
  render() {
    const { data, loader, terms } = this.props;

    return (
      <>
        <div className="card-body">
          <div style={{ position: "relative", height: "324px" }}>
            <PerfectScrollbar>
              {loader && <DotLoader />}
              {!loader && (
                <Table
                  responsive="xl"
                  className="table  table-bordered  dataTable"

                   >
                  <thead>
                    <tr >
                      <th >
                        {!isEmpty(terms) ? `${terms.site}` : "Sites"} Name
                      </th>
                      <th>id</th>
                      {/* <th>Address</th> */}
                      <th>{!isEmpty(terms) ? `${terms.region}` : "Region"}</th>
                      <th>Type</th>
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
                              {/* <figure>
                                <img src={item.logo} alt="site-logo" />
                              </figure> */}
                              <h5>{item.name}</h5>
                            </a>
                          </td>
                          <td>{item.identifier}</td>

                          {/* <td>{item.address}</td> */}
                          <td>
                            {item.region}
                            {/* <a href="#" className="pending">
                            </a> */}
                          </td>
                          <td>{item.type}</td>
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
                                <span className="progress-counts">
                                  {item.progress + "%"}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td style={{ right: "-28px" }}>{item.submissions}</td>
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
        </div>
      </>
    );
  }
}
export default SiteListTable;
