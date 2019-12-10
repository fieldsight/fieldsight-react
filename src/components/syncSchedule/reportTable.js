import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

// const getType = type => {
//   if (type === "site_info") {
//     return "Site Info";
//   }
//   if (type === "site_progress") {
//     return "Site Progress";
//   }
//   if (type === "form") {
//     return "Form";
//   }
//   return null;
// };

// const getScheduleType = schedule => {
//   if (schedule === 0) {
//     return "Manual";
//   }
//   if (schedule === 1) {
//     return "Daily";
//   }
//   if (schedule === 2) {
//     return "Weekly";
//   }
//   if (schedule === 3) {
//     return "Monthly";
//   }
//   return null;
// };

export default class ReportTable extends Component {
  render() {
    const { loader, data, scheduleType } = this.props;
    return (
      <>
        <div
          className="thumb-list mr-0 "
          style={{ position: "relative", height: "327px" }}
        >
          <PerfectScrollbar>
            <div style={{ display: "flex" }}>
              <h6>{scheduleType}</h6>
            </div>
            <Table
              responsive="xl"
              className="table  table-bordered  dataTable "
            >
              <thead>
                <tr>
                  <th>Form Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {!loader && data.length === 0 ? (
                  <tr>
                    <td colSpan={2}>No Form added yet.</td>
                  </tr>
                ) : (
                  <>
                    {data.map(each => (
                      <tr key={`report_${each.report_id}`}>
                        <td>
                          {each.report_type === "Form"
                            ? each.form
                            : each.report_type}
                        </td>
                        <td>
                          <span>
                            <a
                              onClick={() => this.props.editAction(each)}
                              className="pending td-edit-btn td-btn"
                            >
                              <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Edit</Tooltip>}
                              >
                                <i className="la la-edit" />
                              </OverlayTrigger>
                            </a>
                          </span>
                          <span>
                            <a
                              onClick={() => this.props.editAction(each)}
                              className="pending td-edit-btn td-btn"
                            >
                              <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Sync Now</Tooltip>}
                              >
                                <i className="la la-refresh ml-2" />
                              </OverlayTrigger>
                            </a>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </Table>
          </PerfectScrollbar>
        </div>
      </>
    );
  }
}
