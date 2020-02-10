import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import DeleteModal from '../common/DeleteModal';
import { getStatus, getClass, formatDate } from './GeneralFormTable';
/* eslint-disable react/destructuring-assignment */

const EducationMaterialForProject = props => {
  const { formTable, item, editForm } = props;
  if (formTable === 'project') {
    return (
      <span>
        <a
          onClick={() => editForm(item.em, item.id, item.fsxf)}
          tabIndex="0"
          role="button"
          onKeyDown={() => editForm(item.em, item.id, item.fsxf)}
        >
          <i className="la la-book" />
          {item.em ? item.em.title : ''}
        </a>
      </span>
    );
  }
  if (formTable === 'site') {
    return (
      <span>
        {item.site && (
          <a
            onClick={() => editForm(item.em, item.id, item.fsxf)}
            tabIndex="0"
            role="button"
            onKeyDown={() => editForm(item.em, item.id, item.fsxf)}
          >
            <i className="la la-book" />
            {item.em ? item.em.title : ''}
          </a>
        )}
      </span>
    );
  }
  return null;
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
  } = props;
  if (formTable === 'project') {
    return (
      <div>
        {item.is_deployed && (
          <a
            className="rejected td-edit-btn td-btn"
            onClick={() => deployAction(item.id, item.is_deployed)}
            tabIndex="0"
            role="button"
            onKeyDown={() => deployAction(item.id, item.is_deployed)}
          >
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  <FormattedMessage
                    id="app.undeploy"
                    defaultMessage="Undeploy"
                  />
                </Tooltip>
              }
            >
              <i className="la la-rocket" />
            </OverlayTrigger>
          </a>
        )}
        {!item.is_deployed && (
          <span>
            <a
              className="td-edit-btn td-btn approved"
              onClick={() => {
                deployAction(item.id, item.is_deployed);
              }}
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
        {!item.from_organization && (
          <a
            onClick={() => {
              editAction(item);
            }}
            className="pending td-edit-btn td-btn"
            tabIndex="0"
            role="button"
            onKeyDown={() => {
              editAction(item);
            }}
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

        {!item.is_deployed && (
          <span>
            <a
              className="rejected td-edit-btn td-btn"
              onClick={() => {
                handleToggle(item.id, item.is_deployed);
              }}
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
        {item.site && item.is_deployed && (
          <a
            className="rejected td-edit-btn td-btn"
            onClick={() => {
              deployAction(item.id, item.is_deployed);
            }}
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
                    id="app.undeploy"
                    defaultMessage="Undeploy"
                  />
                </Tooltip>
              }
            >
              <i className="la la-rocket" />
            </OverlayTrigger>
          </a>
        )}
        {item.site && !item.is_deployed && (
          <span>
            <a
              className="td-edit-btn td-btn approved"
              onClick={() => {
                deployAction(item.id, item.is_deployed);
              }}
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
        {item.site && (
          <a
            onClick={() => {
              editAction(item);
            }}
            className="pending td-edit-btn td-btn"
            tabIndex="0"
            role="button"
            onKeyDown={() => {
              editAction(item);
            }}
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
        {item.site && !item.is_deployed && (
          <span>
            <a
              className="rejected td-edit-btn td-btn"
              onClick={() => {
                handleToggle(item.id, item.is_deployed);
              }}
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
  return null;
};

class ScheduleFormTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDelete: false,
      formId: '',
      isDeploy: false,
    };
  }

  handleToggle = (formId, isDeploy) => {
    this.setState(state => ({
      confirmDelete: !state.confirmDelete,
      formId,
      isDeploy,
    }));
  };

  handleConfirm = () => {
    const { formId, isDeploy } = this.state;
    this.setState(
      {
        confirmDelete: false,
      },
      () => {
        this.props.deleteItem(formId, isDeploy);
      },
    );
  };

  handleCancel = () => {
    this.setState({ confirmDelete: false });
  };

  render() {
    const {
      props: {
        data,
        loader,
        changeDeployStatus,
        handleEditForm,
        handleEditGuide,
        formTable,
      },
    } = this;
    const hasOrgForm = data.some(e => e.from_organization);

    return (
      <>
        {!loader && data.length === 0 ? (
          <FormattedMessage
            id="app.noFormAddedYet."
            defaultMessage="No Form added yet."
          />
        ) : (
          <>
            <Table
              responsive="xl"
              className="table  table-bordered  dataTable"
            >
              <thead>
                <tr>
                  <th>
                    <FormattedMessage
                      id="app.form-title"
                      defaultMessage="Form Title"
                    />
                  </th>
                  <th>
                    {' '}
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
              <tbody>
                {/* {!loader && data.length === 0 && (
                <tr>
                  <td colSpan={6}>
                    <p>No Form Data Available</p>
                  </td>
                </tr>
              )} */}
                {!loader &&
                  data.map((item, i) => (
                    <tr key={item.id}>
                      <td>
                        {item.xf
                          ? item.from_organization
                            ? `*${item.xf.title}`
                            : item.xf.title
                          : ''}
                      </td>
                      <td>{item.responses_count}</td>
                      <td>
                        <EducationMaterialForProject
                          formTable={formTable}
                          item={item}
                          editForm={handleEditGuide}
                        />
                      </td>
                      <td>
                        <time>
                          <i className="la la-clock-o" />
                          {formatDate(new Date(item.date_created))}
                        </time>
                      </td>
                      <td>
                        <span
                          className={getClass(
                            item.default_submission_status,
                          )}
                        >
                          {getStatus(item.default_submission_status)}
                        </span>
                      </td>
                      <td>
                        <GetActionForProject
                          formTable={formTable}
                          item={item}
                          deployAction={changeDeployStatus}
                          isDelete={this.state.confirmDelete}
                          handleConfirm={this.handleConfirm}
                          handleToggle={this.handleToggle}
                          handleCancel={this.handleCancel}
                          editAction={handleEditForm}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            {hasOrgForm && (
              <div className="form-group pull-right no-margin">
                * denotes organization form
              </div>
            )}
          </>
        )}
      </>
    );
  }
}

export default ScheduleFormTable;
