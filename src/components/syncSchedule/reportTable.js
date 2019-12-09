import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { DotLoader } from "../myForm/Loader";

const getType = type => {
  if (type === "site_info") {
    return "Site Info";
  }
  if (type === "site_progress") {
    return "Site Progress";
  }
  if (type === "form") {
    return "Form";
  }
  return null;
};

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

const formatDate = date => {
  const dateIdx = date.getDate();
  const monthIndex = date.getMonth() + 1;
  const year = date.getFullYear();
  return year + "-" + monthIndex + "-" + dateIdx;
};

export default class ReportTable extends Component {
  render() {
    const { loader, data } = this.props;
    return (
      <>
        {!loader && data.length === 0 ? (
          <div>No Form added yet.</div>
        ) : (
          <div
            className="thumb-list mr-0 "
            style={{ position: "relative", height: "327px" }}
          >
            <PerfectScrollbar>
              <Table
                responsive="xl"
                className="table  table-bordered  dataTable "
              >
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Type</th>
                    <th>Schedule Type</th>
                    <th>Last Synced Date</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map(each => (
                    <tr key={`report_${each.id}`}>
                      <td>{each.id}</td>
                      <td>{getType(each.report_type)}</td>
                      <td>{getScheduleType(each.schedule_type)}</td>
                      <td>
                        {each.last_synced_date &&
                          formatDate(each.last_synced_date)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </PerfectScrollbar>
          </div>
        )}
        {loader && <DotLoader />}
      </>
    );
  }
}
