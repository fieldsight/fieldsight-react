import React, { Component } from 'react';
import Axios from 'axios';

import ReportList from './ReportList';
/* eslint-disable */

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = { breadcrumb: {} };
  }

  componentDidMount() {
    const {
      match: {
        params: { projectId },
      },
    } = this.props;
    Axios.get(
      `/fv3/api/settings-breadcrumbs/${projectId}/?type=project`,
    )
      .then(res => {
        this.setState({ breadcrumb: res.data });
      })
      .catch(() => {});
  }

  render() {
    const {
      match: {
        params: { projectId },
      },
    } = this.props;
    const { breadcrumb } = this.state;

    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item ">
              <a
                href={breadcrumb.name_url}
                style={{ color: '#00628E' }}
              >
                {breadcrumb.name}
              </a>
            </li>

            <li className="breadcrumb-item" aria-current="page">
              Custom Reports
            </li>
          </ol>
        </nav>
        <ReportList id={projectId} history={this.props.history} />
      </>
    );
  }
}

export default Reports;
