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
        <label>General Table</label>
        <Table
          responsive="xl"
          className="table  table-bordered  dataTable "
        >
          <thead>
            <tr>
              <th>Title</th>
              <th>Default Submission</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {general_forms &&
              general_forms.length > 0 &&
              general_forms.map(teams => (
                <tr key={teams.id}>
                  <td>{teams.title}</td>
                  <td>{teams.default_submission_status}</td>
                  {/* <td>
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
                  </td> */}
                </tr>
              ))}
          </tbody>
        </Table>
        <label>Schedule Table</label>
        <Table
          responsive="xl"
          className="table  table-bordered  dataTable "
        >
          <thead>
            <tr>
              <th>Title</th>
              <th>start date</th>
              <th>end date</th>
              <th>scheduled type</th>
              <th>default submission status</th>

              {/* <th>Action</th> */}
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

                  {/* <td>
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
                  </td> */}
                </tr>
              ))}
          </tbody>
        </Table>
      </>
    );
  }
}
