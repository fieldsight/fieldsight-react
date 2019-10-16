import React, { Component } from "react";
import Table from "react-bootstrap/Table";

class StatusTable extends Component {
  state = {
    submission: []
  };

  static getDerivedStateFromProps(props, state) {
    return {
      submission: props.submission
    };
  }

  render() {
    return (
      <React.Fragment>
        <Table responsive="xl" className="table  table-bordered  dataTable ">
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Submitted By</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {!!this.state.submission &&
              this.state.submission.length > 0 &&
              this.state.submission.map((sub, key) => {
                return (
                  <tr key={key}>
                    <td>
                      <a href={sub.profile_url}>{sub.name}</a>
                    </td>
                    <td>{sub.id}</td>
                    <td>
                      <a href={sub.submission_url}>{sub.submitted_by}</a>
                    </td>
                    <td>{sub.date}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}
export default StatusTable;
