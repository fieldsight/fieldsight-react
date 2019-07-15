import React, { Component } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "react-perfect-scrollbar/dist/css/styles.css";
import PreviewModal from "./PreviewModal";
import ReplaceModal from "./ReplaceModal";
import ShareModal from "./ShareModal";
import GlobalModel from "./GlobalModal";

class FormShare extends Component {
  state = {
    shareOption: false
  };

  // shareToggle = e => {
  //   this.setState({
  //     shareOption: !this.state.shareOption
  //   });
  // };

  render() {
    const item = this.props.item;
    return (
      <tr key={item.id_string}>
        <td style={{ width: "50%" }}>{item.title}</td>
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
              onClick={e =>
                this.props.commonPopupHandler(
                  e,
                  PreviewModal,
                  item.preview_url,
                  "Preview Form",
                  "preview",
                  null
                )
              }
              className="td-view-btn td-btn"
            >
              {" "}
              <i className="la la-eye"> </i>{" "}
            </a>
          </OverlayTrigger>

          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">Media</Tooltip>}
          >
            <a
              onClick={e =>
                this.props.commonPopupHandler(
                  e,
                  PreviewModal,
                  item.media_url,
                  "Preview Form",
                  "preview",
                  null
                )
              }
              className="td-view-btn td-btn"
            >
              {" "}
              <i className="la la-file-image-o"> </i>{" "}
            </a>
          </OverlayTrigger>

          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">Edit</Tooltip>}
          >
            <a
              onClick={e => this.props.OpenTabHandler(e, item.edit_url)}
              className="td-edit-btn td-btn"
            >
              {" "}
              <i className="la la-edit" />{" "}
            </a>
          </OverlayTrigger>

          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">Replace</Tooltip>}
          >
            <a
              onClick={e =>
                this.props.commonPopupHandler(
                  e,
                  ReplaceModal,
                  item.edit_url,
                  "Replace Form",
                  "replace",
                  item.id_string
                )
              }
              className="td-edit-btn td-btn"
            >
              {" "}
              <i className="la la-refresh"> </i>{" "}
            </a>
          </OverlayTrigger>
          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">Download</Tooltip>}
          >
            <a
              onClick={e => this.props.OpenTabHandler(e, item.download_url)}
              className="td-edit-btn td-btn"
              data-toggle="tooltip"
              data-placement="top"
              title="Edit"
            >
              {" "}
              <i className="la la-download" />{" "}
            </a>
          </OverlayTrigger>

          <span className="share-icon">
            <OverlayTrigger
              overlay={<Tooltip id="tooltip-disabled">Share</Tooltip>}
            >
              <a
                onClick={e => this.props.shareToggle(e,item.id_string)}
                className="td-share-btn td-btn"
              >
                {" "}
                <i className="la la-share-alt"> </i>
              </a>
            </OverlayTrigger>

            {item.share && (
              <ul className="share-drop">
                <h5>Share to</h5>
                <li>
                  <a
                    onClick={e =>
                      this.props.commonPopupHandler(
                        e,
                        ShareModal,
                        item.id_string,
                        "Select User",
                        "users",
                        item.share_users_url
                      )
                    }
                    data-tab="user-share"
                  >
                    User
                  </a>
                </li>
                <li>
                  <a
                    onClick={e =>
                      this.props.commonPopupHandler(
                        e,
                        ShareModal,
                        item.id_string,
                        "Select Projects",
                        "projects",
                        item.share_project_url
                      )
                    }
                    data-tab="project-share"
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
              onClick={e => this.props.deleteHandler(e, item.id_string)}
              className="td-delete-btn td-btn"
            >
              {" "}
              <i className="la la-trash" />{" "}
            </a>
          </OverlayTrigger>
        </td>
      </tr>
    );
  }
}

export default FormShare;
