import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import PerfectScrollbar from "react-perfect-scrollbar";
import format from "date-fns/format";
import uuid from "uuid/v4";
import SubmissionModal from "./SubmissionModal";
import { TableContentLoader } from "../../common/Loader";
import Td from "../../common/TableData";
const DatatablePage = ({
  enableSubsites,
  siteSubmissions,
  showContentLoader,
  showModal,
  showDotLoader,
  siteForms,
  activeTab,
  closeModal,
  openModal,
  toggleTab,
  hasWritePermission
}) => (
  <>
    <div className="col-xl-6 col-md-12">
      <div className="card region-table">
        <div className="card-header main-card-header sub-card-header">
          <h5>Submissions</h5>
          {hasWritePermission && (
            <div className="add-btn">
              <a
                onClick={() => openModal("Submission")}
                data-tab="scheduled-popup"
              >
                <span>
                  <i className="la la-plus" />
                </span>
              </a>
            </div>
          )}
        </div>
        <div
          className="card-body"
          style={{ position: "relative", height: "430px" }}
        >
          {showContentLoader ? (
            <TableContentLoader row={11} column={5} />
          ) : siteSubmissions.length > 0 ? (
            <PerfectScrollbar>
              <Table
                responsive="xl"
                className="table  table-bordered  dataTable "
              >
                <thead>
                  <tr>
                    <th>Form</th>
                    <th>Submitted By</th>
                    <th>Reviewed By</th>
                    <th>Status</th>
                    <th>Submitted On</th>
                  </tr>
                </thead>

                <tbody>
                  {siteSubmissions.map((submission, i) => (
                    <tr key={uuid()}>
                      <td>
                        <a
                          href={`/fieldsight/application/?submission=${
                            submission.instance_id
                          }#/submission-details`}
                          target="_blank"
                        >
                          {submission.form}
                        </a>
                      </td>
                      <td>{submission.submitted_by}</td>
                      <td>{submission.reviewed_by}</td>
                      <td>
                        <span className={submission.status.toLowerCase()}>
                          {submission.status}{" "}
                        </span>
                      </td>
                      <td style={{ width: "25%" }}>
                        {format(submission.date, ["MMMM Do YYYY, h:mm:ss a"])}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </PerfectScrollbar>
          ) : (
            <p> No Data Available </p>
          )}

          {showModal && (
            <SubmissionModal
              enableSubsites={enableSubsites}
              showDotLoader={showDotLoader}
              siteForms={siteForms}
              activeTab={activeTab}
              closeModal={() => closeModal("Submission")}
              toggleTab={toggleTab}
            />
          )}
        </div>
      </div>
    </div>
  </>
);

export default DatatablePage;
