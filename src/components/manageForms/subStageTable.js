import React, { Component } from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import Table from "react-bootstrap/Table";

const getStatus = value => {
  if (value == 0) return <span>pending</span>;
  else if (value == 1) return <span>Rejected</span>;
  else if (value == 2) return <span>Flagged</span>;
  else if (value == 3) return <span>Approved</span>;
};
const getClass = status => {
  if (status == 0) return "pending";
  if (status == 1) return "rejected";
  if (status == 2) return "flagged";
  if (status == 3) return "approved";
};
const formatDate = date => {
  const dateIdx = date.getDate();
  const monthIndex = date.getMonth() + 1;
  const year = date.getFullYear();
  return year + "-" + monthIndex + "-" + dateIdx;
};

class SubStageTable extends Component {
  render() {
    const {
      data,
      changeDeployStatus,
      deleteItem,
      handleEditGuide
    } = this.props;
    // console.log("substage ma", data);

    return (
      // <div style={{ position: "relative", height: "324px" }}>
      //   <PerfectScrollbar>
      <Table responsive="xl" className="table  table-bordered  dataTable">
        <thead>
          <tr>
            <th>Substage Name</th>
            <th>form Name</th>
            <th>Responses</th>
            <th>Form Guide</th>
            <th>Weight</th>
            <th>assigned date</th>
            <th>Default status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td>
                <p>No Data Available</p>
              </td>
            </tr>
          )}
          {data.length > 0 &&
            data.map((sub, index) => (
              <tr key={`sub_stage_${index}`}>
                <td>{sub.name}</td>
                <td>{sub.xf && sub.xf.title ? sub.xf.title : ""}</td>
                <td>{sub.responses_count}</td>
                <td>
                  <a onClick={() => handleEditGuide(item.em, item.id)}>
                    <i className="la la-book" />
                    {sub.em ? sub.em.title : ""}
                  </a>
                </td>
                <td>{sub.weight}</td>
                <td>
                  <time>
                    <i className="la la-clock-o"></i>{" "}
                    {formatDate(new Date(sub.date_created))}
                  </time>
                </td>
                <td>
                  <a
                    href="#"
                    className={getClass(sub.default_submission_status)}
                  >
                    {getStatus(sub.default_submission_status)}
                  </a>
                </td>
                <td>
                  {!!sub.is_deployed && (
                    <a
                      className="badge badge-danger"
                      onClick={() =>
                        changeDeployStatus(sub.id, sub.is_deployed)
                      }
                    >
                      Undeployed
                      <i className="la la-close"> </i>
                    </a>
                  )}
                  {!sub.is_deployed && (
                    <div>
                      <span>
                        <a
                          className="badge badge-success"
                          onClick={() =>
                            changeDeployStatus(sub.id, sub.is_deployed)
                          }
                        >
                          Deploy
                        </a>
                      </span>
                      <span>
                        <a
                          className="badge badge-danger"
                          onClick={() => deleteItem(sub.id, sub.is_deployed)}
                        >
                          Delete
                          <i className="la la-close"> </i>
                        </a>
                      </span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      //   </PerfectScrollbar>
      // </div>
    );
  }
}
export default SubStageTable;
