import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

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

const GetActionForProject = props => {
  const { formTable, item, deployAction, deleteAction, editAction } = props;
  if (formTable == "project") {
    return (
      <div>
        {!!item.is_deployed && (
          <a
            className="rejected td-edit-btn td-btn"
            onClick={() => deployAction(item.id, item.is_deployed)}
          >
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Undeploy</Tooltip>}
            >
              <i className="la la-rocket"> </i>
            </OverlayTrigger>
          </a>
        )}
        {!item.is_deployed && (
          <span>
            <a
              className="td-edit-btn td-btn approved"
              onClick={() => deployAction(item.id, item.is_deployed)}
            >
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Deploy</Tooltip>}
              >
                <i className="la la-rocket"> </i>
              </OverlayTrigger>
            </a>
          </span>
        )}
        <a
          onClick={() => editAction(item)}
          className="pending td-edit-btn td-btn"
        >
          <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
            <i className="la la-edit"> </i>
          </OverlayTrigger>
        </a>

        {!item.is_deployed && (
          <span>
            <a
              className="rejected td-edit-btn td-btn"
              onClick={() => deleteAction(item.id, item.is_deployed)}
            >
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Delete</Tooltip>}
              >
                <i className="la la-trash"> </i>
              </OverlayTrigger>
            </a>
          </span>
        )}
      </div>
    );
  } else if (formTable == "site") {
    return (
      <div>
        {!!item.site && !!item.is_deployed && (
          <a
            className="rejected td-edit-btn td-btn"
            onClick={() => deployAction(item.id, item.is_deployed)}
          >
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Undeploy</Tooltip>}
            >
              <i className="la la-rocket"> </i>
            </OverlayTrigger>
          </a>
        )}
        {!!item.site && !item.is_deployed && (
          <span>
            <a
              className="td-edit-btn td-btn approved"
              onClick={() => deployAction(item.id, item.is_deployed)}
            >
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Deploy</Tooltip>}
              >
                <i className="la la-rocket"> </i>
              </OverlayTrigger>
            </a>
          </span>
        )}
        {!!item.site && (
          <a
            onClick={() => editAction(item)}
            className="pending td-edit-btn td-btn"
          >
            <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
              <i className="la la-edit"> </i>
            </OverlayTrigger>
          </a>
        )}
        {!!item.site && !item.is_deployed && (
          <span>
            <a
              className="rejected td-edit-btn td-btn"
              onClick={() => deleteAction(item.id, item.is_deployed)}
            >
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Delete</Tooltip>}
              >
                <i className="la la-trash"> </i>
              </OverlayTrigger>
            </a>
          </span>
        )}
      </div>
    );
  }
};
class GeneralFormTable extends Component {
  render() {
    const {
      props: {
        data,
        loader,
        handleEditGuide,
        changeDeployStatus,
        deleteItem,
        handleEditForm,
        formTable
      }
    } = this;
    // console.log("general table", data, formTable);

    return (
      <Table responsive="xl" className="table  table-bordered  dataTable">
        <thead>
          <tr>
            <th>form title</th>
            <th>Responses</th>
            <th>Form Guide</th>
            <th>assigned date</th>
            <th>Default status</th>
            <th width="15%">Action</th>
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
                  <a onClick={() => handleEditGuide(item.em, item.id)}>
                    <i className="la la-book" />
                    {item.em ? item.em.title : ""}
                  </a>
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
                  <GetActionForProject
                    formTable={formTable}
                    item={item}
                    deployAction={changeDeployStatus}
                    deleteAction={deleteItem}
                    editAction={handleEditForm}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    );
  }
}
export default GeneralFormTable;
