import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default class StandardReportTable extends Component {
  render() {
    const { loader, data, scheduleType, getReportName } = this.props;
    return (
      <>
        <div style={{ display: "flex" }}>
          <h6>{scheduleType}</h6>
        </div>
        <Table responsive="xl" className="table  table-bordered  dataTable ">
          <thead>
            <tr>
              <th>Report Name</th>
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
                      <label>{getReportName(each.report_type)}</label>
                      <p>{each.description && each.description}</p>
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
      </>
    );
  }
}
