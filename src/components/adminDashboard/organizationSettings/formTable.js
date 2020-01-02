import React, { PureComponent } from 'react';
import Table from 'react-bootstrap/Table';

/* eslint-disable camelcase */

export default class FormTable extends PureComponent {
  render() {
    const { selected_forms, handleConfirm, openDelete } = this.props;
    console.log(selected_forms, 'selected_forms');
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
          {selected_forms &&
            selected_forms.length > 0 &&
            selected_forms.map(teams => (
              <tr key={teams.id}>
                <td>{teams.title}</td>
                <td>
                  <a
                    role="button"
                    onKeyDown={handleConfirm}
                    tabIndex="0"
                    className="td-delete-btn"
                    onClick={() => {
                      this.props.openDelete(teams.id);
                    }}
                  >
                    <i className="la la-close" />
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    );
  }
}
