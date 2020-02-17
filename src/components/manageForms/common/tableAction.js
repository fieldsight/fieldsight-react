import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import DeleteModal from '../../common/DeleteModal';

const TableAction = props => {
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

export default TableAction;
