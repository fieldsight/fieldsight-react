import React, { PureComponent } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PreviewModal from './PreviewModal';
import ShareModal from './ShareModal';
/* eslint-disable react/prop-types  */

class FormShare extends PureComponent {
  render() {
    const {
      item,
      replaceToggleModal,
      commonPopupHandler,
      OpenTabHandler,
      deleteHandler,
      shareToggle,
    } = this.props;
    return (
      <tr key={item.id_string}>
        <td style={{ width: '50%' }}>{item.title}</td>
        <td>
          <i className="fa fa-clock-o" />
          <span>{item.date_created}</span>
        </td>
        <td>
          <i className="fa fa-clock-o" />
          <span>{item.date_modified}</span>
        </td>
        <td>
          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">Preview</Tooltip>}
          >
            <a
              onClick={e => {
                commonPopupHandler(
                  e,
                  PreviewModal,
                  item.preview_url,
                  'Preview Form',
                  'preview',
                  null,
                );
              }}
              className="td-view-btn td-btn"
              tabIndex="0"
              role="button"
              onKeyDown={e => {
                commonPopupHandler(
                  e,
                  PreviewModal,
                  item.preview_url,
                  'Preview Form',
                  'preview',
                  null,
                );
              }}
            >
              <i className="la la-eye" />
            </a>
          </OverlayTrigger>

          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">Media</Tooltip>}
          >
            <a
              onClick={e => {
                commonPopupHandler(
                  e,
                  PreviewModal,
                  item.media_url,
                  'Preview Form',
                  'preview',
                  null,
                );
              }}
              className="td-view-btn td-btn"
              tabIndex="0"
              role="button"
              onKeyDown={e => {
                commonPopupHandler(
                  e,
                  PreviewModal,
                  item.media_url,
                  'Preview Form',
                  'preview',
                  null,
                );
              }}
            >
              <i className="la la-file-image-o" />
            </a>
          </OverlayTrigger>

          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">Edit</Tooltip>}
          >
            <a
              onClick={e => {
                OpenTabHandler(e, item.edit_url);
              }}
              className="td-edit-btn td-btn"
              tabIndex="0"
              role="button"
              onKeyDown={e => {
                OpenTabHandler(e, item.edit_url);
              }}
            >
              <i className="la la-edit" />
            </a>
          </OverlayTrigger>

          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">Replace</Tooltip>}
          >
            <a
              onClick={() => {
                replaceToggleModal(item.id_string, item.edit_url);
              }}
              className="td-edit-btn td-btn"
              tabIndex="0"
              role="button"
              onKeyDown={() => {
                replaceToggleModal(item.id_string, item.edit_url);
              }}
            >
              <i className="la la-refresh" />
            </a>
          </OverlayTrigger>
          <OverlayTrigger
            overlay={
              <Tooltip id="tooltip-disabled">Download</Tooltip>
            }
          >
            <a
              onClick={e => {
                OpenTabHandler(e, item.download_url);
              }}
              className="td-edit-btn td-btn"
              tabIndex="0"
              role="button"
              onKeyDown={e => OpenTabHandler(e, item.download_url)}
              data-toggle="tooltip"
              data-placement="top"
              title="Edit"
            >
              <i className="la la-download" />
            </a>
          </OverlayTrigger>

          <span className="share-icon">
            <OverlayTrigger
              overlay={<Tooltip id="tooltip-disabled">Share</Tooltip>}
            >
              <a
                onClick={e => shareToggle(e, item.id_string)}
                className="td-share-btn td-btn"
                tabIndex="0"
                role="button"
                onKeyDown={e => shareToggle(e, item.id_string)}
              >
                <i className="la la-share-alt" />
              </a>
            </OverlayTrigger>

            {item.share && (
              <ul className="share-drop">
                <h5>Share to</h5>
                <li>
                  <a
                    onClick={e => {
                      commonPopupHandler(
                        e,
                        ShareModal,
                        item.id_string,
                        'Select User',
                        'users',
                        item.share_users_url,
                      );
                    }}
                    data-tab="user-share"
                    tabIndex="0"
                    role="button"
                    onKeyDown={e => {
                      commonPopupHandler(
                        e,
                        ShareModal,
                        item.id_string,
                        'Select User',
                        'users',
                        item.share_users_url,
                      );
                    }}
                  >
                    User
                  </a>
                </li>
                <li>
                  <a
                    onClick={e => {
                      commonPopupHandler(
                        e,
                        ShareModal,
                        item.id_string,
                        'Select Projects',
                        'projects',
                        item.share_project_url,
                      );
                    }}
                    data-tab="project-share"
                    tabIndex="0"
                    role="button"
                    onKeyDown={e => {
                      commonPopupHandler(
                        e,
                        ShareModal,
                        item.id_string,
                        'Select Projects',
                        'projects',
                        item.share_project_url,
                      );
                    }}
                  >
                    Project
                  </a>
                </li>
                {/* <li>
                  <a
                    onClick={e =>
                      this.props.commonPopupHandler(
                        e,
                        ShareModal,
                        item.id_string,
                        "Select Teams",
                        "teams",
                        item.share_team_url
                      )
                    }
                    data-tab="team-share"
                  >
                    Team
                  </a>
                </li> */}

                {/* <li>
                  <a
                    onClick={e =>
                      this.props.commonPopupHandler(
                        e,
                        GlobalModel,
                        item.id_string,
                        " Select Global",
                        "global",
                        item.share_global_url
                      )
                    }
                    data-tab="global-share"
                  >
                    Globle
                  </a>
                </li> */}
              </ul>
            )}
          </span>
          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">Delete</Tooltip>}
          >
            <a
              onClick={e => {
                deleteHandler(e, item.id_string);
              }}
              className="td-delete-btn td-btn"
              tabIndex="0"
              role="button"
              onKeyDown={e => {
                deleteHandler(e, item.id_string);
              }}
            >
              <i className="la la-trash" />
            </a>
          </OverlayTrigger>
        </td>
      </tr>
    );
  }
}

export default FormShare;
