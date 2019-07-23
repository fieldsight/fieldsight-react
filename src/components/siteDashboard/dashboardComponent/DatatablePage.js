import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import PerfectScrollbar from "react-perfect-scrollbar";
import format from "date-fns/format";
import uuid from "uuid/v4";
import ContentLoader from "react-content-loader";
const number = [
  0,
  20,
  40,
  60,
  80,
  100,
  120,
  140,
  160,
  180,
  200,
  220,
  240,
  260,
  280,
  300
];
const TableLoader = ({ className, number }) => (
  <ContentLoader>
    {number.map((num, i) => (
      <>
        <rect x="0" y={num} rx="0" ry="0" width="150" height="12" />
        <rect x="160" y={num} rx="0" ry="0" width="150" height="12" />
        <rect x="320" y={num} rx="0" ry="0" width="150" height="12" />
        <rect x="480" y={num} rx="0" ry="0" width="150" height="12" />
      </>
    ))}
  </ContentLoader>
);
class DatatablePage extends Component {
  render() {
    const { siteSubmissions } = this.props;
    return (
      <>
        {/* {siteSubmissions.results && (
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
                {siteSubmissions.results.map((submission, i) => (
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
        )} */}
        {!siteSubmissions.results && <TableLoader number={number} />}
      </>
    );
  }
}

export default DatatablePage;
