import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';

class StatusTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submission: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      submission: props.submission,
    };
  }

  render() {
    const { submission } = this.state;
    return (
      <>
        <Table
          responsive="xl"
          className="table  table-bordered  dataTable "
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Submitted By</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {!!submission &&
              submission.length > 0 &&
              submission.map((sub, key) => {
                return (
                  <tr key={key}>
                    <td style={{ width: '380px' }}>
                      <a href={sub.submission_url}>{sub.name}</a>
                    </td>
                    <td>
                      <a href={sub.profile_url}>{sub.submitted_by}</a>
                    </td>
                    <td>{sub.date}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </>
    );
  }
}
export default StatusTable;
