import React, { PureComponent } from 'react';
import Table from 'react-bootstrap/Table';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

/* eslint-disable camelcase */

export default class FormTable extends PureComponent {
  render() {
    const {
      selected_forms,
      handleConfirm,
      openDelete,
      general_forms,
    } = this.props;

    return (
      <>
        <label style={{ fontWeight: 'bold' }}>General Forms</label>
        {general_forms.length > 0 ? (
          <Table
            responsive="xl"
            className="table  table-bordered  dataTable "
          >
            <thead>
              <tr>
                <th>Title</th>
                <th>Default Submission Status</th>
                <th>total submission</th>
                <th>Last Response</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {general_forms &&
                general_forms.length > 0 &&
                general_forms.map(teams => (
                  <tr key={teams.id}>
                    <td>{teams.title}</td>
                    <td>{teams.default_submission_status}</td>
                    <td>{teams.total_submissions}</td>
                    <td>{teams.last_response_on}</td>
                    <td>
                      <a
                        role="button"
                        onKeyDown={handleConfirm}
                        tabIndex="0"
                        className="td-delete-btn"
                        onClick={() => {
                          openDelete(teams.id, 'general');
                        }}
                      >
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>Remove</Tooltip>}
                        >
                          <i className="la la-close" />
                        </OverlayTrigger>
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        ) : (
          <p>No general forms assigned yet.</p>
        )}
        <label style={{ fontWeight: 'bold' }}>Scheduled Forms</label>
        {selected_forms.length > 0 ? (
          <Table
            responsive="xl"
            className="table  table-bordered  dataTable "
          >
            <thead>
              <tr>
                <th>Title</th>
                <th>start date</th>
                <th>end date</th>
                <th>schedule type</th>
                <th>default submission status</th>
                <th>total submission</th>
                <th>Last Response</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {selected_forms &&
                selected_forms.length > 0 &&
                selected_forms.map(teams => (
                  <tr key={teams.id}>
                    <td>{teams.title}</td>
                    <td>{teams.start_date}</td>

                    <td>{teams.end_date}</td>
                    <td>{teams.scheduled_type}</td>
                    <td>{teams.default_submission_status}</td>
                    <td>{teams.total_submissions}</td>
                    <td>{teams.last_response_on}</td>

                    <td>
                      <a
                        role="button"
                        onKeyDown={handleConfirm}
                        tabIndex="0"
                        className="td-delete-btn"
                        onClick={() => {
                          openDelete(teams.id, 'scheduled');
                        }}
                      >
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>Remove</Tooltip>}
                        >
                          <i className="la la-close" />
                        </OverlayTrigger>
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        ) : (
          <p>No scheduled forms assigned yet.</p>
        )}
      </>
    );
  }
}
