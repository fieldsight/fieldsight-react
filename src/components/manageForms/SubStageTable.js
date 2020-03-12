import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import format from 'date-fns/format';
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import DeleteModal from '../common/DeleteModal';
import EducationMaterial from './common/EducationMaterial';
import GetStatus, { getClass } from './common/GetStatus';

/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */

const DragHandle = sortableHandle(({ sub, index, formTable }) => (
  <tr key={`sub_stage_${index}`}>
    <td>
      <span className="drag-icon">
        <i className="la la-ellipsis-v" />
        <i className="la la-ellipsis-v" />
      </span>
      {!!sub && sub.name}
    </td>
    <td>{sub && sub.xf && sub.xf.title ? sub.xf.title : '-'}</td>
    <td>{sub && sub.responses_count}</td>
    <td>
      <EducationMaterial
        formTable={formTable}
        item={sub && sub}
        toDrag
        // editForm={handleEditGuide}
      />
    </td>
    <td>{sub && sub.weight}</td>
    <td>
      <time>
        <i className="la la-clock-o" />
        {format(sub.date_created, 'YYYY-MM-DD')}
      </time>
    </td>
    <td>
      <span
        className={getClass(sub && sub.default_submission_status)}
      >
        {GetStatus(sub && sub.default_submission_status)}
      </span>
    </td>
    <td>
      <GetActionForProject
        formTable={formTable}
        item={sub && sub}
        toDrag
        // deployAction={changeDeployStatus}
        // deleteAction={deleteItem}
        // editAction={editSubStageForm}
      />
    </td>
  </tr>
));

const GetActionForProject = props => {
  const {
    formTable,
    item,
    deployAction,
    isDelete,
    handleToggle,
    handleCancel,
    handleConfirm,
    editAction,
    toDrag,
  } = props;

  if (formTable === 'project') {
    return (
      <div>
        {item && !!item.is_deployed && (
          <a
            className={`rejected td-edit-btn td-btn ${!!toDrag} ? disabled : ''`}
            onClick={() => deployAction(item.id, item.is_deployed)}
            tabIndex="0"
            role="button"
            onKeyDown={() => deployAction(item.id, item.is_deployed)}
          >
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Undeploy</Tooltip>}
            >
              <i className="la la-rocket" />
            </OverlayTrigger>
          </a>
        )}
        {item && !item.is_deployed && (
          <span>
            <a
              className={`td-edit-btn td-btn approved ${!!toDrag} ? disabled : ''`}
              onClick={() => deployAction(item.id, item.is_deployed)}
              tabIndex="0"
              role="button"
              onKeyDown={() => {
                deployAction(item.id, item.is_deployed);
              }}
            >
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Deploy</Tooltip>}
              >
                <i className="la la-rocket" />
              </OverlayTrigger>
            </a>
          </span>
        )}
        <a
          onClick={() => editAction(item)}
          className={`pending td-edit-btn td-btn ${!!toDrag} ? disabled : ''`}
          tabIndex="0"
          role="button"
          onKeyDown={() => editAction(item)}
        >
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Edit</Tooltip>}
          >
            <i className="la la-edit" />
          </OverlayTrigger>
        </a>

        {item && !item.is_deployed && (
          <span>
            <a
              className={`rejected td-edit-btn td-btn ${!!toDrag} ? disabled : ''`}
              onClick={() => handleToggle(item.id, item.is_deployed)}
              tabIndex="0"
              role="button"
              onKeyDown={() => {
                handleToggle(item.id, item.is_deployed);
              }}
            >
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Delete</Tooltip>}
              >
                <i className="la la-trash" />
              </OverlayTrigger>
            </a>
          </span>
        )}
        {isDelete && (
          <DeleteModal
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            onToggle={handleToggle}
            message="Deleting this form will also delete submissions to this form. Do you want to proceed?"
          />
        )}
      </div>
    );
  }
  if (formTable === 'site') {
    return (
      <div>
        {item && !!item.site && !!item.is_deployed && (
          <a
            className={`rejected td-edit-btn td-btn ${!!toDrag} ? disabled : ''`}
            onClick={() => deployAction(item.id, item.is_deployed)}
            tabIndex="0"
            role="button"
            onKeyDown={() => deployAction(item.id, item.is_deployed)}
          >
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Undeploy</Tooltip>}
            >
              <i className="la la-rocket" />
            </OverlayTrigger>
          </a>
        )}
        {item && !!item.site && !item.is_deployed && (
          <span>
            <a
              className={`td-edit-btn td-btn approved ${!!toDrag} ? disabled : ''`}
              onClick={() => deployAction(item.id, item.is_deployed)}
              tabIndex="0"
              role="button"
              onKeyDown={() => {
                deployAction(item.id, item.is_deployed);
              }}
            >
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Deploy</Tooltip>}
              >
                <i className="la la-rocket" />
              </OverlayTrigger>
            </a>
          </span>
        )}
        {item && !!item.site && (
          <a
            onClick={() => editAction(item)}
            className={`pending td-edit-btn td-btn ${!!toDrag} ? disabled : ''`}
            tabIndex="0"
            role="button"
            onKeyDown={() => editAction(item)}
          >
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Edit</Tooltip>}
            >
              <i className="la la-edit" />
            </OverlayTrigger>
          </a>
        )}
        {item && !!item.site && !item.is_deployed && (
          <span>
            <a
              className={`rejected td-edit-btn td-btn ${!!toDrag} ? disabled : ''`}
              onClick={() => handleToggle(item.id, item.is_deployed)}
              tabIndex="0"
              role="button"
              onKeyDown={() => {
                handleToggle(item.id, item.is_deployed);
              }}
            >
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Delete</Tooltip>}
              >
                <i className="la la-trash" />
              </OverlayTrigger>
            </a>
          </span>
        )}

        {isDelete && (
          <DeleteModal
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            onToggle={handleToggle}
            message="Deleting this form will also delete submissions to this form. Do you want to proceed?"
          />
        )}
      </div>
    );
  }
  return null;
};

const SortableContainer = sortableContainer(({ children }) => {
  return (
    <Table
      responsive="xl"
      className="table  table-bordered  dataTable"
    >
      <thead>
        <tr>
          <th>Substage Name</th>
          <th>form Name</th>
          <th>Responses</th>
          <th>Form Guide</th>
          <th>Weight</th>
          <th>Assigned Date</th>
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
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      confirmDelete: false,
      formId: '',
      isDeploy: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { props } = this;
    if (nextProps.data !== props.data) {
      this.setState({
        data: nextProps.data,
      });
    }

    if (
      nextProps.isSubstageReorderCancel !==
      props.isSubstageReorderCancel
    ) {
      this.setState(() => {
        if (nextProps.isSubstageReorderCancel) {
          return { data: props.data };
        }
        return null;
      });
    }
  }

  handleToggle = (formId, isDeploy) => {
    this.setState(prevState => ({
      confirmDelete: !prevState.confirmDelete,
      formId,
      isDeploy,
    }));
  };

  handleConfirm = () => {
    this.setState(
      {
        confirmDelete: false,
      },
      () => {
        this.props.deleteItem(this.state.formId, this.state.isDeploy);
      },
    );
  };

  handleCancel = () => {
    this.setState({ confirmDelete: false });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(
      ({ data }) => {
        return {
          data: arrayMove(data, oldIndex, newIndex),
        };
      },
      () => {
        this.props.handleNewSubstageOrder(this.state.data);
      },
    );
  };

  render() {
    const {
      props: {
        changeDeployStatus,
        handleEditGuide,
        editSubStageForm,
        reorderSubstage,
        formTable,
      },
      state: { data },
    } = this;

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
                      <td>
                        {sub.xf && sub.xf.title ? sub.xf.title : '-'}
                      </td>
                      <td>{sub.responses_count}</td>
                      <td>
                        <EducationMaterial
                          formTable={formTable}
                          item={sub}
                          editForm={handleEditGuide}
                        />
                      </td>
                      <td>{sub.weight}</td>
                      <td>
                        <time>
                          <i className="la la-clock-o" />
                          {format(sub.date_created, 'YYYY-MM-DD')}
                        </time>
                      </td>
                      <td>
                        <span
                          className={getClass(
                            sub.default_submission_status,
                          )}
                        >
                          {GetStatus(sub.default_submission_status)}
                        </span>
                      </td>
                      <td>
                        <GetActionForProject
                          formTable={formTable}
                          item={sub}
                          deployAction={changeDeployStatus}
                          isDelete={this.state.confirmDelete}
                          handleConfirm={this.handleConfirm}
                          handleToggle={this.handleToggle}
                          handleCancel={this.handleCancel}
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
