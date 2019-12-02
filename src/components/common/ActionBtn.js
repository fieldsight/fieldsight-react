import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

const ActionBtn = () => (
  <>
    <a href="#" className="td-edit-btn">
      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip>
            <FormattedMessage id="app.edit" defaultMessage="Edit" />
          </Tooltip>
        }
      >
        <i className="la la-edit" />
      </OverlayTrigger>
    </a>
    <a href="#" className="td-delete-btn">
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
        <i className="la la-trash-o" />
      </OverlayTrigger>
    </a>
  </>
);

export default ActionBtn;
