import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class TotalOrganizationSubmission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submission: [],
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    axios
      .get(`/fv3/api/organization-project-forms/${id}/`)
      .then(res => {
        console.log(res, 'res');
        this.setState({
          submission: res.data,
        });
      });
  }

  render() {
    console.log(this.state.submission, 'submission');
    const {
      state: { submission },
    } = this;
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

        <Table
          responsive="xl"
          className="table table-bordered dataTable "
        >
          <thead>
            <tr>
              <th>Project Name</th>
              <th>team</th>
              <th>total submission</th>
              <th>pending</th>
              <th>approved</th>
              <th>rejected</th>
              <th>flagged</th>
            </tr>
          </thead>
          <tbody>
            {submission.length > 0 &&
              submission.map(sub => (
                <tr key={sub.id}>
                  <td>{sub.name}</td>
                  <td>{sub.team}</td>
                  <td>{sub.total_submissions}</td>
                  <td>{sub.submissions.pending}</td>
                  <td>{sub.submissions.approved}</td>
                  <td>{sub.submissions.rejected}</td>
                  <td>{sub.submissions.flagged}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </>
    );
  }
}
