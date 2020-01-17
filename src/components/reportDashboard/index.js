import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ExportTable from './exportTable';
import MetricsTable from './metricTable';

export default class ReportDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exportData: [],
    };
  }

  componentDidMount() {
    const {
      props: {
        match: {
          params: { id },
        },
      },
    } = this;
    axios.get(`/v4/api/reporting/export/logs/?id=${id}`).then(req => {
      this.setState({
        exportData: req.data.results,
      });
    });
  }

  render() {
    const {
      props: {
        match: {
          params: { id },
        },
        location: {
          state: { title, attributes },
        },
      },
      state: { exportData },
    } = this;

    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={`/project-dashboard/${id}`}>
                Project Dashboard
              </Link>
            </li>
            <li className="breadcrumb-item">{title}</li>
          </ol>
        </nav>
        <div className="new-dashboard">
          <div className="row">
            <div className="col-lg-6">
              <div className="card map">
                <div className="card-header main-card-header sub-card-header">
                  {/* <div className="dash-btn">
                  <label>hfgjhkj</label>
                </div> */}
                  <label>Export</label>
                </div>
                <div className="card-body">
                  <ExportTable exportData={exportData} />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card region-table">
                <div className="card-header main-card-header sub-card-header">
                  <MetricsTable attributes={attributes} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
