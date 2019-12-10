import React, { Component, Fragment } from "react";
import Axios from "axios";

import { DotLoader } from "../myForm/Loader";
import Modal from "../common/Modal";
import SyncScheduleForm from "./form";
import ReportTable from "./reportTable";
import StandardReportTable from "./standardReportTable";

const getScheduleType = schedule => {
  if (schedule === 0) {
    return "Manual";
  }
  if (schedule === 1) {
    return "Daily";
  }
  if (schedule === 2) {
    return "Weekly";
  }
  if (schedule === 3) {
    return "Monthly";
  }
  return null;
};

const getReportName = report => {
  const split = report.split("_");
  return split.join(" ");
};

export default class SyncSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reportList: [],
      loader: false,
      showForm: false,
      data: {}
    };
  }

  componentWillMount() {
    const {
      match: {
        params: { projectId }
      }
    } = this.props;
    this.setState({ loader: true }, () => {
      Axios.get(`/fv3/api/report-sync-settings-list/?project_id=${projectId}`)
        .then(res => {
          if (res.data) {
            const resData = Object.entries(res.data);
            console.log(res.data, "resData", resData);

            this.setState({ reportList: resData, loader: false });
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

  handleEdit = data => {
    this.setState({
      showForm: true,
      data
    });
  };

  render() {
    const {
      state: { reportList, loader, showForm, data },
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
          <div className="card-header main-card-header">
            <h5>
              <i className="la la-building" />
              Project Schedule List
            </h5>
          </div>

          <div className="card-body">
            {loader && <DotLoader />}
            {reportList.length > 0 &&
              reportList.map(report => {
                if (report[0] && report[0] === "standard_reports") {
                  return (
                    <Fragment key={`report_${report[0]}`}>
                      <StandardReportTable
                        loader={loader}
                        data={report[1]}
                        editAction={this.handleEdit}
                        scheduleType={getReportName(report[0])}
                      />
                    </Fragment>
                  );
                }
                if (
                  report[0] &&
                  report[0] !== "standard_reports" &&
                  report[0] !== "stage_reports"
                ) {
                  return (
                    <Fragment key={`report_${report[0]}`}>
                      <ReportTable
                        loader={loader}
                        data={report[1]}
                        editAction={this.handleEdit}
                        scheduleType={getReportName(report[0])}
                      />
                    </Fragment>
                  );
                }
              })}
            {showForm && (
              <Modal
                title="Edit Project Schedule Settings"
                toggleModal={this.handleToggleFlag}
                classname="md-body"
              >
                <SyncScheduleForm
                  projectId={projectId}
                  handleSuccess={this.updateListOnSuccess}
                  data={data}
                  getScheduleType={getScheduleType}
                  // onCancel={this.handleToggleFlag}
                />
              </Modal>
            )}
          </div>
        </div>
      </>
    );
  }
}
