import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Sheet from "../../static/images/sheets.png";

export default class ReportTable extends Component {
  render() {
    const {
      loader,
      data,
      scheduleType,
      formatDate,
      canSyncOrEdit,
      getDayOnWeeklySchedule
    } = this.props;
    return (
      <>
        <div style={{ display: "flex" }}>
          <h6>{scheduleType}</h6>
        </div>
        <Table responsive="xl" className="table  table-bordered  dataTable ">
          <thead>
            <tr>
              <th>Form Name</th>
              <th>Schedule Type</th>
              <th>Google Sheet</th>
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
                    <td>
                      {each.schedule_type === "Weekly"
                        ? `${each.schedule_type} on ${getDayOnWeeklySchedule(
                            each.day
                          )}`
                        : each.schedule_type === "Monthly"
                        ? ` ${each.schedule_type} on day ${each.day}`
                        : each.schedule_type}
                    </td>
                    <td>
                      {each.spreadsheet_id ? (
                        <a href={each.spreadsheet_id} target="_blank">
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>View Google Sheet</Tooltip>}
                          >
                            <img src={Sheet} style={{ height: "15px" }} />
                          </OverlayTrigger>
                        </a>
                      ) : (
                        "No sheet created"
                      )}
                    </td>
                    <td>
                      {each.last_synced_date
                        ? formatDate(each.last_synced_date)
                        : "Not synced yet"}
                    </td>
                    <td>
                      {canSyncOrEdit && (
                        <>
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
                              onClick={() => this.props.reqSync(each.report_id)}
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
                        </>
                      )}
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
