import React, { PureComponent } from 'react';
import Table from 'react-bootstrap/Table';
import format from 'date-fns/format';

export default class ExportTable extends PureComponent {
  render() {
    const { exportData } = this.props;
    return (
      <Table
        responsive="xl"
        className="table  table-bordered  dataTable "
      >
        <thead>
          <tr>
            <th> Name</th>
            <th>File</th>
            <th>Status</th>
            <th>Created By</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {exportData.length > 0 &&
            exportData.map(expo => (
              <tr key={expo.id}>
                <td>
                  <a
                    href={expo.get_source_url}
                    className="pending table-profile"
                  >
                    <figure>
                      <img src={expo.source_img} alt="site-logo" />
                    </figure>
                    <h5>{expo.source_name}</h5>
                  </a>
                </td>
                <td>
                  <a href={expo.file}>
                    <i className="la la-download " />
                  </a>
                </td>

                <td>{expo.status}</td>

                <td>{format(expo.date_added, ['YYYY-MM-DD'])}</td>
                <td>
                  {/* <a
                                href={`/fieldsight/application/#/team-settings/${project.id}`}
                                className="td-edit-btn td-btn"
                              > */}
                  <i className="la la-edit" />
                  {/* </a> */}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    );
  }
}
