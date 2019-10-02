import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import withPagination from "../../hoc/WithPagination";

class StatusTable extends Component {
  state = {
    submission: []
  };

  static getDerivedStateFromProps(props, state) {
    return {
      submission: props.submission
    };
  }
  componentDidMount() {
    this.props.paginationHandler(this.props.count, null, {
      type: "viewByStatus",
      projectId: this.props.id,
      status: "approved"
    });
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
            {this.state.submission.map((sub, key) => {
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
export default withPagination(StatusTable);
