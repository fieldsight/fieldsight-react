import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import DeleteModal from '../common/DeleteModal';
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */

const getStatus = value => {
  if (value === 0) return <span>pending</span>;
  if (value === 1) return <span>Rejected</span>;
  if (value === 2) return <span>Flagged</span>;
  if (value === 3) return <span>Approved</span>;
};

const getClass = status => {
  if (status === 0) return 'pending';
  if (status === 1) return 'rejected';
  if (status === 2) return 'flagged';
  if (status === 3) return 'approved';
};

const formatDate = date => {
  const dateIdx = date.getDate();
  const monthIndex = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}  '-'  ${monthIndex}  '-'  ${dateIdx}`;
};

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
      <EducationMaterialForProject
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
        {formatDate(new Date(sub && sub.date_created))}
      </time>
    </td>
    <td>
      <span
        className={getClass(sub && sub.default_submission_status)}
      >
        {getStatus(sub && sub.default_submission_status)}
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

const EducationMaterialForProject = props => {
  const { formTable, item, editForm, toDrag } = props;
  if (formTable === 'project') {
    return (
      <span className={`${!!toDrag} ? disabled : ''`}>
        <a
          onClick={() => editForm(item.em, item.id)}
          tabIndex="0"
          role="button"
          onKeyDown={() => editForm(item.em, item.id)}
        >
          <i className="la la-book" />
          {item && item.em ? item.em.title : ''}
        </a>
      </span>
    );
  }
  if (formTable === 'site') {
    return (
      <span className={`${!!toDrag} ? disabled : ''`}>
        {!!item.site && (
          <a
            onClick={() => editForm(item.em, item.id)}
            tabIndex="0"
            role="button"
            onKeyDown={() => editForm(item.em, item.id)}
          >
            <i className="la la-book" />
            {item && item.em ? item.em.title : ''}
          </a>
        )}
      </span>
    );
  }
};

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
                overlay={
                  <Tooltip>
                    <FormattedMessage
                      id="app.deploy"
                      defaultMessage="Deploy"
                    />
                  </Tooltip>
                }
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
            overlay={
              <Tooltip>
                <FormattedMessage
                  id="app.edit"
                  defaultMessage="Edit"
                />
              </Tooltip>
            }
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
                overlay={
                  <Tooltip>
                    <FormattedMessage
                      id="app.delete"
                      defaultMessage="Delete"
                    />
                  </Tooltip>
                }
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
                overlay={
                  <Tooltip>
                    <FormattedMessage
                      id="app.deploy"
                      defaultMessage="Deploy"
                    />
                  </Tooltip>
                }
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
              overlay={
                <Tooltip>
                  <FormattedMessage
                    id="app.edit"
                    defaultMessage="Edit"
                  />
                </Tooltip>
              }
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
};

const SortableContainer = sortableContainer(({ children }) => {
  return (
    <Table
      responsive="xl"
      className="table  table-bordered  dataTable"
    >
      <thead>
        <tr>
          <th>
            <FormattedMessage
              id="app.subStageName"
              defaultMessage="Substage Name"
            />
          </th>
          <th>
            <FormattedMessage
              id="app.form-title"
              defaultMessage="form Name"
            />
          </th>
          <th>
            <FormattedMessage
              id="app.response"
              defaultMessage="Responses"
            />
          </th>
          <th>
            <FormattedMessage
              id="app.formGuide"
              defaultMessage="Form Guide"
            />
          </th>
          <th>
            <FormattedMessage
              id="app.weight"
              defaultMessage="Weight"
            />
          </th>
          <th>
            <FormattedMessage
              id="app.assigned-date"
              defaultMessage="Assigned Date"
            />
          </th>
          <th>
            <FormattedMessage
              id="app.defaultStatus"
              defaultMessage="Default status"
            />
          </th>
          <th width="15%">
            <FormattedMessage
              id="app.action"
              defaultMessage="Action"
            />
          </th>
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
      this.setState(state => {
        if (nextProps.isSubstageReorderCancel) {
          return { data: props.data };
        }
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
        deleteItem,
        handleEditGuide,
        editSubStageForm,
        reorderSubstage,
        isSubstageReorderCancel,
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
                        <EducationMaterialForProject
                          formTable={formTable}
                          item={sub}
                          editForm={handleEditGuide}
                        />
                      </td>
                      <td>{sub.weight}</td>
                      <td>
                        <time>
                          <i className="la la-clock-o" />
                          {formatDate(new Date(sub.date_created))}
                        </time>
                      </td>
                      <td>
                        <span
                          className={getClass(
                            sub.default_submission_status,
                          )}
                        >
                          {getStatus(sub.default_submission_status)}
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
