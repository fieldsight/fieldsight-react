import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import PerfectScrollbar from "react-perfect-scrollbar";
import format from "date-fns/format";
import uuid from "uuid/v4";
import { ListContentLoader } from "../../common/Loader";
class DatatablePage extends Component {
  render() {
    const { siteSubmissions, showContentLoader } = this.props;
    console.log("siteSubmissions", siteSubmissions);
    return (
      <>
        {showContentLoader ? (
          <ListContentLoader number={19} />
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
                    <td>{submission.form}</td>
                    <td>{submission.submitted_by}</td>
                    <td>{submission.reviewed_by}</td>
                    <td>
                      <span className={submission.status.toLowerCase()}>
                        {submission.status}
                      </span>
                    </td>
                    <td>
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
      </>
    );
  }
}

export default DatatablePage;
