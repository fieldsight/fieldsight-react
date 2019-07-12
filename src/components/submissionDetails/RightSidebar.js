import React, { Component } from "react";
import HistoryTab from "./HistoryTab";
import StatusTab from "./StatusTab";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const base_url = window.base_url
  ? window.base_url
  : "https://fieldsight.naxa.com.np";
class RightSidebar extends Component {
  state = {
    showStatus: true
  };
  render() {
    const {
      props: {
        statusData,
        submissionHistory,
        fieldSightInstance,
        editUrl,
        downloadUrl,
        postSubmissionDetail
      },
      state: { showStatus }
    } = this;
    return (
      <div className="new-sidebar submission-sidebar sticky-top">
        <div className="card">
          <div className="card-body">
            <div className="submission-header">
              <ul className="nav nav-tabs " id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    className={`nav-link ${showStatus ? "active" : ""}`}
                    onClick={() => this.setState({ showStatus: true })}
                  >
                    Status
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${!showStatus ? "active" : ""}`}
                    onClick={() => this.setState({ showStatus: false })}
                  >
                    History
                  </a>
                </li>
              </ul>
              <div className="head-icon">
                <a href={`${base_url}${editUrl}`} target="_blank">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Edit Submission</Tooltip>}
                  >
                    <i className="la la-edit" />
                  </OverlayTrigger>
                </a>
                <a href={`${base_url}${downloadUrl.main}`} target="_blank">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Download as PDF</Tooltip>}
                  >
                    <i className="la la-download" />
                  </OverlayTrigger>
                </a>
                {/* <a
                  href="#"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Hide Null Values"
                >
                  <i className="la la-sign-out" />
                </a> */}
              </div>
            </div>

            <div className="tab-content">
              {showStatus && (
                <StatusTab
                  statusData={statusData}
                  fieldSightInstance={fieldSightInstance}
                  postSubmissionDetail={postSubmissionDetail}
                />
              )}
              {!showStatus && (
                <HistoryTab submissionHistory={submissionHistory} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RightSidebar;
