import React, { Component } from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import Table from "react-bootstrap/Table";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc";
import arrayMove from "array-move";

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

const DragHandle = sortableHandle(() => (
  <span style={{ cursor: "pointer" }}>#</span>
));

const SortableContainer = sortableContainer(({ children }) => {
  return (
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
          <th width="15%">Action</th>
        </tr>
      </thead>
      {children}
    </Table>
  );
});

const SortableItem = sortableElement(({ name }) => (
  <span>
    <DragHandle />
    {name}
  </span>
));

class SubStageTable extends Component {
  state = {
    data: this.props.data
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.data != this.props.data) {
      this.setState({
        data: nextProps.data
      });
    }
    if (
      nextProps.isSubstageReorderCancel != this.props.isSubstageReorderCancel
    ) {
      this.setState(state => {
        if (nextProps.isSubstageReorderCancel) {
          return { data: this.props.data };
        }
      });
    }
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(
      ({ data }) => ({
        data: arrayMove(data, oldIndex, newIndex)
      }),
      () => {
        this.props.handleNewSubstageOrder(this.state.data);
      }
    );
  };

  render() {
    const {
      props: {
        changeDeployStatus,
        deleteItem,
        handleEditGuide,
        editSubStageForm,
        reorderSubstage,
        isSubstageReorderCancel
      },
      state: { data }
    } = this;

    return (
      // <div style={{ position: "relative", height: "324px" }}>
      //   <PerfectScrollbar>
      <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
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
                <td>
                  {reorderSubstage ? (
                    <SortableItem
                      key={`item-${sub.id}`}
                      index={index}
                      name={sub.name}
                    />
                  ) : (
                    sub.name
                  )}
                </td>
                <td>{sub.xf && sub.xf.title ? sub.xf.title : "-"}</td>
                <td>{sub.responses_count}</td>
                <td>
                  <a onClick={() => handleEditGuide(sub.em, sub.id)}>
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
                      className="rejected td-btn"
                      onClick={() =>
                        changeDeployStatus(sub.id, sub.is_deployed)
                      }
                    >
                      <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Undeploy</Tooltip>}
                    >
                      <i className="la la-rocket"> </i>
                    </OverlayTrigger>
                      
                    </a>
                  )}
                  {!sub.is_deployed && (
                    <>
                        <a
                          className="approved td-btn"
                          onClick={() =>
                            changeDeployStatus(sub.id, sub.is_deployed)
                          }
                        >
                          <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Deploy</Tooltip>}
                    >
                      <i className="la la-rocket"> </i>
                    </OverlayTrigger>
                        </a>
                        <a
                          className="rejected td-btn"
                          onClick={() => deleteItem(sub.id, sub.is_deployed)}
                        >
                          <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Delete</Tooltip>}
                    >
                      <i className="la la-trash"> </i>
                    </OverlayTrigger>
                        </a>
                        </>
                  )}
                  <a
                    className="td-edit-btn"
                    onClick={() => {
                      editSubStageForm(sub);
                    }}
                  >
                    <i className="la la-edit"> </i>{" "}
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </SortableContainer>

      //   </PerfectScrollbar>
      // </div>
    );
  }
}
export default SubStageTable;
