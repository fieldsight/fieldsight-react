import React, { Component, Fragment } from "react";
import Table from "react-bootstrap/Table";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default class StageReportTable extends Component {
  render() {
    const { loader, stages, formatDate } = this.props;

    return (
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
          {!loader && stages.length === 0 ? (
            <tr>
              <td colSpan={4}>No Form added yet.</td>
            </tr>
          ) : (
            <>
              {stages.length > 0 &&
                stages.map(stage => (
                  <Fragment key={`stage_${stage.id}`}>
                    <tr>
                      <td colSpan={4}>Stage: {stage.stage}</td>
                    </tr>
                    {!loader && stage.sub_stages && stage.sub_stages === 0 ? (
                      <tr>
                        <td colSpan={4}>No Substage added yet.</td>
                      </tr>
                    ) : (
                      <>
                        {stage.sub_stages &&
                          stage.sub_stages.length > 0 &&
                          stage.sub_stages.map(sub => (
                            <tr key={`substage_${sub.report_id}`}>
                              <td>
                                <label>
                                  {sub.report_type === "form"
                                    ? sub.title
                                    : sub.report_type}
                                </label>
                                <p>{sub.description && sub.description}</p>
                              </td>
                              <td>{sub.schedule_type}</td>
                              <td>
                                {sub.last_synced_date &&
                                  formatDate(sub.last_synced_date)}
                              </td>
                              <td>
                                <span>
                                  <a
                                    onClick={() => this.props.editAction(sub)}
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
                                    onClick={() => this.props.editAction(sub)}
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
                  </Fragment>
                ))}
            </>
          )}
        </tbody>
      </Table>
    );
  }
}
