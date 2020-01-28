import React, { PureComponent } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

export default class TotalOrganizationSubmission extends PureComponent {
  render() {
    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link
                to={`/organization-dashboard/${this.props.match.params.id}/`}
              >
                Organization Dashboard
              </Link>
            </li>
            <li className="breadcrumb-item">
              Total Organization Submission
            </li>
          </ol>
        </nav>
        {/* <Table
          responsive="xl"
          className="table  table-bordered  dataTable "
        >
          <thead>
            <tr>
              <th>Project Name</th>
              <th>total submission</th>
              <th>Last Response</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>dfghj</td>
              <td>dfghj</td>
              <td>dfghj</td>
            </tr>
          </tbody>
        </Table> */}
        <Table
          responsive="xl"
          className="table  table-bordered  dataTable "
        >
          <thead>
            <tr>
              <th>Project Name</th>
              <th>total submission</th>
              <th>Last Response</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>fdgjk</td>
              <td>fdghjk</td>
              <td>gjhjkjkl</td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  }
}
