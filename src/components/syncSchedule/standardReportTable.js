import React, { PureComponent } from 'react';
import Table from 'react-bootstrap/Table';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Sheet from '../../static/images/sheets.png';
/* eslint-disable react/destructuring-assignment */

export default class StandardReportTable extends PureComponent {
  render() {
    const {
      loader,
      data,
      scheduleType,
      getReportName,
      formatDate,
      canSyncOrEdit,
      getDayOnWeeklySchedule,
    } = this.props;
    return (
      <>
        <div style={{ display: 'flex' }}>
          <h6>{scheduleType}</h6>
        </div>
        <Table
          responsive="xl"
          className="table  table-bordered  dataTable "
        >
          <thead>
            <tr>
              <th>Report Name</th>
              <th>Schedule Type</th>
              <th>Google Sheet</th>
              <th>Last Synced Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!loader && data.length === 0 ? (
              <tr>
                <td colSpan={5}>No Form added yet.</td>
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
                      {each.schedule_type === 'Weekly'
                        ? `${
                            each.schedule_type
                          } on ${getDayOnWeeklySchedule(each.day)}`
                        : each.schedule_type === 'Monthly'
                        ? each.day === 0
                          ? ` ${each.schedule_type} on last day`
                          : ` ${each.schedule_type} on day ${each.day}`
                        : each.schedule_type}
                    </td>
                    <td>
                      {each.spreadsheet_id ? (
                        <a
                          href={each.spreadsheet_id}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip>View Google Sheet</Tooltip>
                            }
                          >
                            <img
                              src={Sheet}
                              style={{ height: '15px' }}
                              alt="sheet"
                            />
                          </OverlayTrigger>
                        </a>
                      ) : (
                        'No sheet created'
                      )}
                    </td>
                    <td>
                      {each.last_synced_date
                        ? formatDate(each.last_synced_date)
                        : 'Not Synced Yet'}
                    </td>
                    <td>
                      {canSyncOrEdit && (
                        <>
                          <span>
                            <a
                              role="button"
                              tabIndex="0"
                              onClick={() => {
                                this.props.editAction(each);
                              }}
                              onKeyDown={() => {
                                this.props.editAction(each);
                              }}
                              className="pending td-edit-btn td-btn"
                            >
                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip>Edit Schedule</Tooltip>
                                }
                              >
                                <i className="la la-edit" />
                              </OverlayTrigger>
                            </a>
                          </span>
                          {each.schedule_type === 'Manual' && (
                            <span>
                              <a
                                role="button"
                                tabIndex="0"
                                onKeyDown={() => {
                                  this.props.reqSync(each.report_id);
                                }}
                                onClick={() => {
                                  this.props.reqSync(each.report_id);
                                }}
                                className="pending td-edit-btn td-btn"
                              >
                                <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip>Sync Now</Tooltip>
                                  }
                                >
                                  <i className="la la-refresh ml-2" />
                                </OverlayTrigger>
                              </a>
                            </span>
                          )}
                        </>
                      )}
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
