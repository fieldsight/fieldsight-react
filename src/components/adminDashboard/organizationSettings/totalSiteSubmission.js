import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import axios from 'axios';

/* eslint-disable camelcase */

export default class TotalSiteSubmission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteSubmission: '',
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    axios
      .get(`/fv3/api/forms-submissions/?page=1&org_form_lib=${id}`)
      .then(res => {
        console.log(res, 'res');
        this.setState({
          siteSubmission: res.data,
        });
      });
  }

  render() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    console.log(this.state.siteSubmission, 'siteSubmission');
    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={`/organization-dashboard/${id}/`}>
                Organization Dashboard
              </Link>
            </li>
            <li className="breadcrumb-item">
              Total Organization Site Submission
            </li>
          </ol>
        </nav>
        <Table
          responsive="xl"
          className="table table-bordered dataTable "
        >
          <thead>
            <tr>
              <th>Site Name</th>
              <th>gfgfhh</th>
              <th>Site Name</th>
              <th>gfhj</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>dffghj</td>
              <td>dffghj</td>
              <td>dffghj</td>
              <td>dffghj</td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  }
}
