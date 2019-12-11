import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default class ReportTable extends Component {
  render() {
    const { loader, data, scheduleType, formatDate } = this.props;
    return (
      <>
        {/* <div
          className="thumb-list mr-0 "
          style={{ position: "relative", height: "327px" }}
        >
          <PerfectScrollbar> */}
        <div style={{ display: "flex" }}>
          <h6>{scheduleType}</h6>
        </div>
        <Table responsive="xl" className="table  table-bordered  dataTable ">
          <thead>
            <tr>
              <th>Form Name</th>
              <th>Schedule Type</th>
              <th>Last Synced Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!loader && data.length === 0 ? (
              <tr>
                <td colSpan={4}>No Form added yet.</td>
              </tr>
            ) : (
              <>
                {data.map(each => (
                  <tr key={`report_${each.report_id}`}>
                    <td>
                      <label>
                        {each.report_type === "form"
                          ? each.title
                          : each.report_type}
                      </label>
                      <p>{each.description && each.description}</p>
                    </td>
                    <td>{each.schedule_type}</td>
                    <td>
                      {each.last_synced_date &&
                        formatDate(each.last_synced_date)}
                    </td>
                    <td>
                      <span>
                        <a
                          onClick={() => this.props.editAction(each)}
                          className="pending td-edit-btn td-btn"
                        >
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Edit Schedule</Tooltip>}
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
        {/* </PerfectScrollbar>
        </div> */}
      </>
    );
  }
}
