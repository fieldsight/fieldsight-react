import React, { Component } from "react";
import Axios from "axios";

import SyncScheduleForm from "./form";
import ReportTable from "./reportTable";

export default class SyncSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reportList: [],
      loader: false,
      showForm: false
    };
  }

  componentWillMount() {
    const {
      match: {
        params: { projectId }
      }
    } = this.props;
    this.setState({ loader: true }, () => {
      Axios.get(`fv3/api/report-sync-settings-list/?project_id=${projectId}`)
        .then(res => {
          if (res.data) {
            this.setState({ reportList: res.data, loader: false });
          }
        })
        .catch(err => {
          this.setState({ loader: false });
          console.log("err", err);
        });
    });
  }

  handleToggleFlag = () => {
    this.setState(state => ({ showForm: !state.showForm }));
  };

  updateListOnSuccess = data => {
    this.setState(state => ({
      reportList: [data, ...state.reportList],
      showForm: false
    }));
  };
  render() {
    const {
      state: { reportList, loader, showForm },
      props: {
        match: {
          params: { projectId }
        }
      }
    } = this;
    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a>Setting</a>
            </li>
          </ol>
        </nav>
        <div className="card">
          {!showForm && (
            <div className="card-header main-card-header">
              <h5>Project Schedule List</h5>
              <div className="add-btn">
                <a onClick={this.handleToggleFlag}> Add Form</a>
              </div>
            </div>
          )}
          {showForm && (
            <div className="card-header main-card-header">
              <h5>
                <i className="la la-building" />
                Project Schedule Settings
              </h5>
            </div>
          )}
          <div className="card-body">
            {showForm && (
              <SyncScheduleForm
                projectId={projectId}
                handleSuccess={this.updateListOnSuccess}
                onCancel={this.handleToggleFlag}
              />
            )}
            {!showForm && <ReportTable loader={loader} data={reportList} />}
          </div>
        </div>
      </>
    );
  }
}
