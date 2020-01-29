import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { DotLoader } from '../../myForm/Loader';

export default class TotalOrganizationSubmission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submission: [],
      loader: false,
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
        this.setState({
          submission: res.data,
          loader: true,
        });
      });
  }

  render() {
    const {
      state: { submission, loader },
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
            <>
              {!loader && <DotLoader />}
              {submission.length > 0 &&
                submission.map(sub => (
                  <tr key={sub.id}>
                    <td>{sub.name}</td>
                    <td>{sub.team}</td>

                    <td>
                      <Link
                        to={`/organization-submission-data/${sub.id}`}
                      >
                        {sub.total_submissions}
                      </Link>
                    </td>
                    <td>{sub.submissions.pending}</td>
                    <td>{sub.submissions.approved}</td>
                    <td>{sub.submissions.rejected}</td>
                    <td>{sub.submissions.flagged}</td>
                  </tr>
                ))}
            </>
          </tbody>
        </Table>
      </>
    );
  }
}
