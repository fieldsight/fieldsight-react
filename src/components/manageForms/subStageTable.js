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

const DragHandle = sortableHandle(
  ({ sub, index, formTable }) => (
    // data.map((sub, index) => (
    <tr key={`sub_stage_${index}`}>
      {/* <> */}
      <td>
        <span className="drag-icon">
          <i className="la la-ellipsis-v"></i>
          <i className="la la-ellipsis-v"></i>
        </span>
        {!!sub && sub.name}
      </td>
      <td>{sub && sub.xf && sub.xf.title ? sub.xf.title : "-"}</td>
      <td>{sub && sub.responses_count}</td>
      <td>
        <EducationMaterialForProject
          formTable={formTable}
          item={sub && sub}
          toDrag={true}
          // editForm={handleEditGuide}
        />
      </td>
      <td>{sub && sub.weight}</td>
      <td>
        <time>
          <i className="la la-clock-o"></i>{" "}
          {formatDate(new Date(sub && sub.date_created))}
        </time>
      </td>
      <td>
        <a className={getClass(sub && sub.default_submission_status)}>
          {getStatus(sub && sub.default_submission_status)}
        </a>
      </td>
      <td>
        <GetActionForProject
          formTable={formTable}
          item={sub && sub}
          // deployAction={changeDeployStatus}
          // deleteAction={deleteItem}
          // editAction={editSubStageForm}
        />
      </td>
      {/* </> */}
    </tr>
  )
  // ))
);

const EducationMaterialForProject = props => {
  const { formTable, item, editForm, toDrag } = props;
  if (formTable == "project") {
    return (
      <>
        {!!toDrag ? (
          <span>
            <i className="la la-book" />
            {item && item.em ? item.em.title : ""}
          </span>
        ) : (
          <span>
            <a onClick={() => editForm(item.em, item.id)}>
              <i className="la la-book" />
              {item && item.em ? item.em.title : ""}
            </a>
          </span>
        )}
      </>
    );
  } else if (formTable == "site") {
    return (
      <>
        <span>
          {!!item.site && (
            <a onClick={() => editForm(item.em, item.id)}>
              <i className="la la-book" />
              {item && item.em ? item.em.title : ""}
            </a>
          )}
        </span>
      </>
    );
  }
};
const GetActionForProject = props => {
  const { formTable, item, deployAction, deleteAction, editAction } = props;
  if (formTable == "project") {
    return (
      <div>
        {item && !!item.is_deployed && (
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
        {item && !item.is_deployed && (
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

        {item && !item.is_deployed && (
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
        {item && !!item.site && !!item.is_deployed && (
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
        {item && !!item.site && !item.is_deployed && (
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
        {item && !!item.site && (
          <a
            onClick={() => editAction(item)}
            className="pending td-edit-btn td-btn"
          >
            <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
              <i className="la la-edit"> </i>
            </OverlayTrigger>
          </a>
        )}
        {item && !!item.site && !item.is_deployed && (
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

const SortableItem = sortableElement(({ sub, index, formTable }) => (
  <DragHandle sub={sub} index={index} formTable={formTable} />
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
    this.setState(({ data }) => {
      return {
        data: arrayMove(data, oldIndex, newIndex)
      };
    });
  };

  render() {
    const {
      props: {
        changeDeployStatus,
        deleteItem,
        handleEditGuide,
        editSubStageForm,
        reorderSubstage,
        isSubstageReorderCancel,
        formTable
      },
      state: { data }
    } = this;
    // console.log(data, "issite");

    return (
      <>
        {data.length === 0 ? (
          <div>No Substage added yet.</div>
        ) : (
          <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
            {reorderSubstage ? (
              <tbody>
                {!!data &&
                  data.map((sub, index) => (
                    // <tr key={`sub_stage_${index}`}>
                    <SortableItem
                      key={`item-${index}`}
                      index={index}
                      // name={sub.name}
                      sub={sub}
                      formTable={formTable}
                    />
                    // </tr>
                  ))}
              </tbody>
            ) : (
              <tbody>
                {!!data &&
                  data.map((sub, index) => (
                    <tr key={`sub_stage_${index}`}>
                      <td>{sub.name}</td>
                      <td>{sub.xf && sub.xf.title ? sub.xf.title : "-"}</td>
                      <td>{sub.responses_count}</td>
                      <td>
                        <EducationMaterialForProject
                          formTable={formTable}
                          item={sub}
                          editForm={handleEditGuide}
                        />
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
                          style={{ cursor: "pointer" }}
                          className={getClass(sub.default_submission_status)}
                        >
                          {getStatus(sub.default_submission_status)}
                        </a>
                      </td>
                      <td>
                        <GetActionForProject
                          formTable={formTable}
                          item={sub}
                          deployAction={changeDeployStatus}
                          deleteAction={deleteItem}
                          editAction={editSubStageForm}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            )}
          </SortableContainer>
        )}
      </>
    );
  }
}
export default SubStageTable;
