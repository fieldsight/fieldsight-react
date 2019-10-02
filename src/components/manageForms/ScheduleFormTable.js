import React, { Component } from "react";
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

class ScheduleFormTable extends Component {
  render() {
    const {
      props: { data, loader, changeDeployStatus, deleteItem, handleEditForm }
    } = this;
    return (
      <Table responsive="xl" className="table  table-bordered  dataTable">
        <thead>
          <tr>
            <th>form title</th>
            <th>Responses</th>
            <th>Form Guide</th>
            <th>assigned date</th>
            <th>Default status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {!loader && data.length === 0 && (
            <tr>
              <td>
                <p>No Form Data Available</p>
              </td>
            </tr>
          )}
          {!loader &&
            data.map((item, i) => (
              <tr key={i}>
                <td>{item.xf ? item.xf.title : ""}</td>
                <td>{item.responses_count}</td>
                <td>
                  {/* {item.em && ( */}
                  <a onClick={() => handleEditGuide(item.em)}>
                    <i className="la la-book" />
                    {item.em ? item.em.title : ""}
                  </a>
                  {/* )} */}
                </td>
                <td>
                  <time>
                    <i className="la la-clock-o"></i>{" "}
                    {formatDate(new Date(item.date_created))}
                  </time>
                </td>
                <td>
                  <a
                    href="#"
                    className={getClass(item.default_submission_status)}
                  >
                    {getStatus(item.default_submission_status)}
                  </a>
                </td>
                <td>
                  {!!item.is_deployed && (
                    <a
                      className="flagged"
                      onClick={() =>
                        changeDeployStatus(item.id, item.is_deployed)
                      }
                    >
                      <i className="la la-close"> </i>
                    </a>
                  )}
                  {!item.is_deployed && (
                    <div>
                      <span>
                        <a
                          className="pending"
                          onClick={() =>
                            changeDeployStatus(item.id, item.is_deployed)
                          }
                        >
                          <i className="la la-rocket"> </i>
                        </a>
                      </span>
                      <span>
                        <a
                          className="rejected"
                          onClick={() => deleteItem(item.id, item.is_deployed)}
                        >
                          <i className="la la-trash"> </i>
                        </a>
                      </span>
                    </div>
                  )}
                  <a onClick={() => handleEditForm(item)}>
                    <i className="la la-edit"> </i>
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    );
  }
}

export default ScheduleFormTable;
