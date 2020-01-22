import React, { PureComponent } from 'react';
import Table from 'react-bootstrap/Table';
import format from 'date-fns/format';

export default class ExportTable extends PureComponent {
  handleFileName = name => {
    const fileName = name !== null ? name.split('/') : '';
    const newName =
      fileName[5] !== undefined || null || ''
        ? fileName[5] && fileName[5].split('_')
        : '';
    const newFileName =
      newName !== undefined || null || '' ? newName[2] : '';

    return name !== null ? newFileName : '';
  };

  render() {
    const { exportData } = this.props;
    return (
      <Table
        responsive="xl"
        className="table  table-bordered  dataTable "
      >
        <thead>
          <tr>
            <th>File Name</th>
            <th>Created By</th>
            <th>Status</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {exportData.length > 0 &&
            exportData.map(expo => {
              const name = this.handleFileName(expo.file);
              return (
                <tr key={expo.id}>
                  {expo.get_status_display !== 'Failed' && (
                    <>
                      <td>{name}</td>
                      <td>{expo.source_name}</td>

                      <td>{expo.get_status_display}</td>

                      <td>
                        {format(expo.date_added, ['YYYY-MM-DD'])}
                      </td>
                      <td>
                        <a href={expo.file}>
                          <i className="la la-download " />
                        </a>
                        <i className="la la-trash-o" />
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
        </tbody>
      </Table>
    );
  }
}
