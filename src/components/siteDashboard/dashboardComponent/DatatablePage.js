import React, { Component } from "react";
import axios from "axios";

import Table from "react-bootstrap/Table";
import PerfectScrollbar from "react-perfect-scrollbar";
import format from "date-fns/format";
import uuid from "uuid/v4";
import SubmissionModal from "./SubmissionModal";
import { TableContentLoader } from "../../common/Loader";

class DatatablePage extends Component {
  state = {
    siteList: [],
    totalCount: 0,
    toData: 20,
    fromData: 1,
    pageNum: 1,
    dLoader: true,
    per_page: 20,
    totalPage: null
  };

  componentDidMount() {
    const { pageNum } = this.state;
    this.paginationHandler(pageNum);
  }

  paginationHandler = page_num => {
    const toNum = page_num * 20;
    const fromNum = (page_num - 1) * 20 + 1;

    this.setState(
      {
        toData: toNum,
        fromData: fromNum,
        pageNum: page_num,
        dLoader: true
      },
      () => this.requestHandler(page_num)
    );
  };

  requestHandler = page_num => {
    const { siteId } = this.props;
    axios
      .get(`/fv3/api/site-submissions/?page=${page_num}&site=${siteId}`)

      .then(async res => {
        if (res.status === 200) {
          await this.setState({
            siteList: res.data.results,
            dLoader: false,
            totalCount: res.data.count,
            totalPage: Math.ceil(res.data.count / 20)
          });
        }
      })
      .catch(err => {});
  };

  renderPageNumbers = () => {
    if (this.state.totalPage) {
      const pageNumbers = [];
      for (let i = 1; i <= this.state.totalPage; i++) {
        pageNumbers.push(i);
      }

      return pageNumbers.map(number => {
        let classes = this.state.pageNum === number ? "current" : "";

        if (
          number == 1 ||
          number == this.state.totalPage ||
          (number >= this.state.pageNum - 2 && number <= this.state.pageNum + 2)
        ) {
          return (
            <li key={number} className={classes}>
              <a onClick={() => this.paginationHandler(number, null)}>
                {number}
              </a>
            </li>
          );
        }
      });
    }
  };

  render() {
    const {
      enableSubsites,
      // siteSubmissions,
      // showContentLoader,
      showModal,
      showDotLoader,
      siteForms,
      activeTab,
      closeModal,
      openModal,
      toggleTab,
      hasWritePermission,
      siteId
    } = this.props;
    const {
      siteList,
      totalCount,
      toData,
      fromData,
      pageNum,
      dLoader,
      totalPage
    } = this.state;

    return (
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
              style={{
                position: "relative",
                height: `${!dLoader ? "363px" : "434px"}`
              }}
            >
              {dLoader ? (
                <TableContentLoader row={11} column={5} />
              ) : siteList.length > 0 ? (
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
                      {siteList.map((submission, i) => (
                        <tr key={uuid()}>
                          <td>
                            <a
                              href={`/fieldsight/application/?submission=${submission.instance_id}#/submission-details`}
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
                            {format(submission.date, [
                              "MMMM Do YYYY, h:mm:ss a"
                            ])}
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
            {siteList.length > 0 && (
              <div className="card-body">
                <div className="table-footer">
                  <div className="showing-rows">
                    <p>
                      Showing <span>{fromData}</span> to{" "}
                      <span> {toData > totalCount ? totalCount : toData} </span>{" "}
                      of <span>{totalCount}</span> entries.
                    </p>
                  </div>
                  {/* {toData < totalCount ? ( */}
                  <div className="table-pagination">
                    <ul>
                      {pageNum !== 1 && (
                        <li className="page-item">
                          <a
                            onClick={e =>
                              this.paginationHandler(pageNum - 1, null, {
                                siteId
                              })
                            }
                          >
                            <i className="la la-long-arrow-left" />
                          </a>
                        </li>
                      )}

                      {this.renderPageNumbers({
                        siteId
                      })}

                      {pageNum !== totalPage && (
                        <li className="page-item ">
                          <a
                            onClick={e =>
                              this.paginationHandler(pageNum + 1, null, {
                                siteId
                              })
                            }
                          >
                            <i className="la la-long-arrow-right" />
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                  {/* ) : null} */}
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default DatatablePage;
