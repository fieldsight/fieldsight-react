import React, { PureComponent } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { DotLoader } from '../../myForm/Loader';

/* eslint-disable camelcase */

export default class FormTable extends PureComponent {
  render() {
    const {
      orgId,
      selected_forms,
      handleConfirm,
      openDelete,
      general_forms,
      loader,
    } = this.props;

    return (
      <>
        <label style={{ fontWeight: 'bold' }}>General Form</label>
        {loader ? (
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
                    <td>
                      <Link
                        to={`/organization-submission/${orgId}/${teams.id}/`}
                      >
                        {teams.total_submissions}
                      </Link>
                    </td>
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
                      <a
                        href={`/#/organization-exports/${orgId}/${teams.id}`}
                        className="edit-tag tag"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="la la-download " />
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        ) : (
          // <p>No general forms assigned yet.</p>
          <DotLoader />
        )}
        <label style={{ fontWeight: 'bold' }}>Scheduled Form</label>
        {loader ? (
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
                    <td>
                      <Link
                        to={`/organization-submission/${teams.id}/`}
                      >
                        {teams.total_submissions}
                      </Link>
                    </td>

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
                      <a
                        href={`/#/organization-exports/${orgId}/${teams.id}`}
                        className="edit-tag tag"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="la la-download " />
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        ) : (
          // <p>No scheduled forms assigned yet.</p>
          <DotLoader />
        )}
      </>
    );
  }
}
