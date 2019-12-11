import React, { Component, Fragment } from "react";
import Axios from "axios";

import { DotLoader } from "../myForm/Loader";
import Modal from "../common/Modal";
import SyncScheduleForm from "./form";
import ReportTable from "./reportTable";
import StandardReportTable from "./standardReportTable";
import StageReportTable from "./stageReportTable";
import { successToast, errorToast } from "../../utils/toastHandler";

const formatDate = date => {
  const dateIdx = date.getDate();
  const monthIndex = date.getMonth() + 1;
  const year = date.getFullYear();
  return year + "-" + monthIndex + "-" + dateIdx;
};

const getScheduleType = schedule => {
  if (schedule === "Manual") {
    return 0;
  }
  if (schedule === "Daily") {
    return 1;
  }
  if (schedule === "Weekly") {
    return 2;
  }
  if (schedule === "Monthly") {
    return 3;
  }
  return null;
};

const getReportName = report => {
  const split = report.split("_");
  const newStr = split.map(str => str.replace(/^\w/, c => c.toUpperCase()));
  return newStr.join(" ");
};

export default class SyncSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reportList: [],
      loader: false,
      showForm: false,
      data: {},
      standardReports: [],
      generalReports: [],
      scheduledReports: [],
      surveyReports: [],
      stagedReports: [],
      canSyncOrEdit: false
    };
  }

  componentWillMount() {
    const {
      match: {
        params: { projectId }
      }
    } = this.props;

    this.requestList(projectId);
  }

  requestList = projectId => {
    this.setState({ loader: true }, () => {
      Axios.get(`/fv3/api/report-sync-settings-list/?project_id=${projectId}`)
        .then(res => {
          if (res.data) {
            const resData = Object.entries(res.data);
            const standardReports = [];
            const generalReports = [];
            const scheduledReports = [];
            const surveyReports = [];
            const stagedReports = [];
            let canSyncOrEdit = false;
            resData.map(each => {
              if (each[0] === "standard_reports") {
                standardReports.push(each);
              }
              if (each[0] === "general_reports") {
                generalReports.push(each);
              }
              if (each[0] === "schedule_reports") {
                scheduledReports.push(each);
              }
              if (each[0] === "survey_reports") {
                surveyReports.push(each);
              }
              if (each[0] === "stage_reports") {
                stagedReports.push(each);
              }
              if (each[0] === "can_edit_or_sync") {
                canSyncOrEdit = each[1];
              }
            });
            this.setState({
              reportList: resData,
              standardReports,
              generalReports,
              scheduledReports,
              surveyReports,
              stagedReports,
              canSyncOrEdit,
              loader: false
            });
          }
        })
        .catch(() => {
          this.setState({ loader: false });
          // console.log("err", err);
        });
    });
  };

  handleToggleFlag = () => {
    this.setState(state => ({ showForm: !state.showForm }));
  };

  updateListOnSuccess = data => {
    this.setState(
      {
        showForm: false
      },
      () => {
        this.requestList(data.project);
      }
    );
  };

  handleEdit = data => {
    this.setState({
      showForm: true,
      data
    });
  };

  handleSyncReq = id => {
    Axios.post(`/fv3/api/report-sync/${id}/`)
      .then(res => {
        if (res.data) {
          // console.log("res", res.data);

          successToast("Report", "synced");
        }
      })
      .catch(err => {
        const errors = err.response;
        errorToast(errors.data.detail);
      });
  };

  render() {
    const {
      state: {
        loader,
        showForm,
        data,
        standardReports,
        generalReports,
        scheduledReports,
        surveyReports,
        stagedReports,
        canSyncOrEdit
      },
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
            {standardReports.length > 0 &&
              standardReports.map(standard => (
                <Fragment key={`report_${standard[0]}`}>
                  <StandardReportTable
                    loader={loader}
                    data={standard[1]}
                    editAction={this.handleEdit}
                    scheduleType={getReportName(standard[0])}
                    getReportName={getReportName}
                    formatDate={formatDate}
                    canSyncOrEdit={canSyncOrEdit}
                    reqSync={this.handleSyncReq}
                  />
                </Fragment>
              ))}
            {generalReports.length > 0 &&
              generalReports.map(general => (
                <Fragment key={`report_${general[0]}`}>
                  <ReportTable
                    loader={loader}
                    data={general[1]}
                    editAction={this.handleEdit}
                    scheduleType={getReportName(general[0])}
                    formatDate={formatDate}
                    canSyncOrEdit={canSyncOrEdit}
                    reqSync={this.handleSyncReq}
                  />
                </Fragment>
              ))}
            {scheduledReports.length > 0 &&
              scheduledReports.map(schedule => (
                <Fragment key={`report_${schedule[0]}`}>
                  <ReportTable
                    loader={loader}
                    data={schedule[1]}
                    editAction={this.handleEdit}
                    scheduleType={getReportName(schedule[0])}
                    canSyncOrEdit={canSyncOrEdit}
                    formatDate={formatDate}
                    reqSync={this.handleSyncReq}
                  />
                </Fragment>
              ))}
            {surveyReports.length > 0 &&
              surveyReports.map(survey => (
                <Fragment key={`report_${survey[0]}`}>
                  <ReportTable
                    loader={loader}
                    data={survey[1]}
                    editAction={this.handleEdit}
                    scheduleType={getReportName(survey[0])}
                    canSyncOrEdit={canSyncOrEdit}
                    formatDate={formatDate}
                    reqSync={this.handleSyncReq}
                  />
                </Fragment>
              ))}
            {stagedReports.length > 0 &&
              stagedReports.map(stage => {
                return (
                  <Fragment key={`report_${stage[0]}`}>
                    <div style={{ display: "flex" }}>
                      <h6>{getReportName(stage[0])}</h6>
                    </div>

                    <StageReportTable
                      loader={loader}
                      stages={stage[1]}
                      editAction={this.handleEdit}
                      scheduleType={getReportName(stage[0])}
                      canSyncOrEdit={canSyncOrEdit}
                      formatDate={formatDate}
                      reqSync={this.handleSyncReq}
                    />
                  </Fragment>
                );
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
                  getReportName={getReportName}
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
