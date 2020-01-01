import React, { PureComponent } from 'react';

export default class Roles extends PureComponent {
  render() {
    const roles = [
      {
        id: '1',
        post: 'Project Manager',
        in: 'Retro Field',
        address: 'Dhading Kathmandu',
      },
      {
        id: '2',
        post: 'Manager',
        in: 'Retro Field',
        address: ' Kathmandu',
      },
      {
        id: '3',
        post: 'Project Manager',
        in: 'Retro Field',
        address: 'Dhading Kathmandu',
      },
      {
        id: '4',
        post: 'Project Manager',
        in: 'Retro Field',
        address: 'Dhading Kathmandu',
      },
      {
        id: '5',
        post: 'Project Manager',
        in: 'Retro Field',
        address: 'Dhading Kathmandu',
      },
      {
        id: '6',
        post: 'Project Manager',
        in: 'Retro Field',
        address: 'Dhading Kathmandu',
      },
      {
        id: '7',
        post: 'Project Manager',
        in: 'Retro Field',
        address: 'Dhading Kathmandu',
      },
      {
        id: '8',
        post: 'Project Manager',
        in: 'Retro Field',
        address: 'Dhading Kathmandu',
      },
      {
        id: '9',
        post: 'Project Manager',
        in: 'Retro Field',
        address: 'Dhading Kathmandu',
      },
    ];
    const { rolebutton } = this.props;
    return (
      <div
        className={
          rolebutton ? 'tab-pane fade show active' : 'tab-pane fade'
        }
        id="role"
        role="tabpanel"
        aria-labelledby="role_tab"
      >
        <table
          id="paging7_table"
          className="table  table-bordered  no_paging_table"
        >
          <thead>
            <tr>
              <th>Post</th>
              <th>In</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {roles.map(role => (
              <tr key={role.id}>
                <td>{role.post}</td>
                <td>{role.in}</td>
                <td>{role.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
