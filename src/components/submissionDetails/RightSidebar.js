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
        hasReviewPermission,
        postSubmissionDetail,
        getSubmissionDetail,
        toggleSubmission,
        hideNullValues
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
                {hasReviewPermission && editUrl && (
                  <a href={`${base_url}${editUrl}`} target="_blank">
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Edit Submission</Tooltip>}
                    >
                      <i className="la la-edit" />
                    </OverlayTrigger>
                  </a>
                )}

                <a onClick={toggleSubmission}>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>{`${
                        hideNullValues ? "Show" : "Hide"
                      } Null Values`}</Tooltip>
                    }
                  >
                    <i
                      className={`la la-${
                        hideNullValues ? "eye" : "eye-slash"
                      }`}
                    />
                  </OverlayTrigger>
                </a>

                {Object.keys(downloadUrl).length > 0 && (
                  <a
                    href={`${base_url}${
                      hideNullValues ? downloadUrl.null : downloadUrl.main
                    }`}
                    target="_blank"
                  >
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Download as PDF</Tooltip>}
                    >
                      <i className="la la-download" />
                    </OverlayTrigger>
                  </a>
                )}
              </div>
            </div>

            <div className="tab-content">
              {showStatus && (
                <StatusTab
                  statusData={statusData}
                  fieldSightInstance={fieldSightInstance}
                  postSubmissionDetail={postSubmissionDetail}
                  hasReviewPermission={hasReviewPermission}
                />
              )}
              {!showStatus && (
                <HistoryTab
                  submissionHistory={submissionHistory}
                  getSubmissionDetail={getSubmissionDetail}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RightSidebar;
