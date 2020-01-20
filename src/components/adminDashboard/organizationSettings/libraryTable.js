import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

/*  eslint-disable  */
export default class LibraryTable extends Component {
  render() {
    const { organization_library_forms } = this.props;
    return (
      <Table
        responsive="xl"
        className="table  table-bordered  dataTable "
      >
        <thead>
          <tr>
            <th>Title</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {organization_library_forms &&
            organization_library_forms.length > 0 &&
            organization_library_forms.map(form => (
              <tr key={form.id}>
                <td>{form.title}</td>
                <td>
                  <a
                    role="button"
                    onKeyDown={this.props.openDelete}
                    tabIndex="0"
                    className="td-delete-btn"
                    onClick={() => {
                      this.props.openDelete(form.id);
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
    );
  }
}
