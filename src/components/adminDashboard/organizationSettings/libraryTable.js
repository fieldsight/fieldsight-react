import React, { Component } from 'react';
import { OverlayTrigger, Tooltip, Table } from 'react-bootstrap';
import { DotLoader } from '../../myForm/Loader';

/*  eslint-disable  */
export default class LibraryTable extends Component {
  render() {
    const { organization_library_forms, loader } = this.props;
    return loader ? (
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
    ) : (
      <DotLoader />
    );
  }
}
