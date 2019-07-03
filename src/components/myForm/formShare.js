import React, { Component } from "react";
import Zoom from "react-reveal/Zoom";
import "react-perfect-scrollbar/dist/css/styles.css";
import PreviewModal from "./PreviewModal";
import ReplaceModal from "./ReplaceModal";
import ShareModal from "./ShareModal";
import GlobalModel from "./GlobalModal";

class FormShare extends Component {
  state = {
    shareOption: false
  };

  shareToggle = e => {
    this.setState({
      shareOption: !this.state.shareOption
    });
  };

  render() {
    const item = this.props.item;
    return (
      <tr key={item.id_string}>
        <td>{item.title}</td>
        <td>
          <i className="fa fa-clock-o" />
          <span>{item.date_created}</span>
        </td>
        <td>
          <i className="fa fa-clock-o" />
          <span>{item.date_modified}</span>
        </td>
        <td>
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
            data-toggle="tooltip"
            data-placement="top"
            title="Preview"
          >
            {" "}
            <i className="la la-eye"> </i>{" "}
          </a>
          <a
            onClick={e => this.props.OpenTabHandler(e, item.edit_url)}
            className="td-edit-btn td-btn"
            data-toggle="tooltip"
            data-placement="top"
            title="Edit"
          >
            {" "}
            <i className="la la-edit" />{" "}
          </a>
          {/* <a
            onClick={e =>
              this.props.commonPopupHandler(
                e,
                ReplaceModal,
                null,
                "Replace Form",
                "replace",
                null
              )
            }
            className="td-edit-btn td-btn"
            data-toggle="tooltip"
            data-placement="top"
            title="Replace"
          >
            {" "}
            <i className="la la-refresh"> </i>{" "}
          </a> */}

          {/* <a  onClick={(e) => this.props.togglePopup(e, 'share')} className="td-edit-btn td-btn" data-toggle="tooltip" data-placement="top" title="Share"> <i className="la la-share-alt"> </i> </a>
                <a  onClick={(e) => this.props.globashare(item.share_global_url,item.id_string)} className="td-edit-btn td-btn" data-toggle="tooltip" data-placement="top" title="globals Share"> <i className="la la-globe"> </i> </a> */}
          <span className="share-icon">
            <a
              onClick={e => this.shareToggle(e)}
              className="td-share-btn td-btn"
              data-toggle="tooltip"
              data-placement="top"
              title="Share"
            >
              {" "}
              <i className="la la-share-alt"> </i>
            </a>

            {this.state.shareOption && (
              <ul className="share-drop">
                <li>
                  <a
                    onClick={e =>
                      this.props.commonPopupHandler(
                        e,
                        ShareModal,
                        item.id_string,
                        "User",
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
                        "Project",
                        "projects",
                        item.share_project_url
                      )
                    }
                    data-tab="project-share"
                  >
                    Project
                  </a>
                </li>
                <li>
                  <a
                    onClick={e =>
                      this.props.commonPopupHandler(
                        e,
                        ShareModal,
                        item.id_string,
                        "Team",
                        "teams",
                        item.share_team_url
                      )
                    }
                    data-tab="team-share"
                  >
                    Team
                  </a>
                </li>

                <li>
                  <a
                    onClick={e =>
                      this.props.commonPopupHandler(
                        e,
                        GlobalModel,
                        item.id_string,
                        "Global Form",
                        "global",
                        item.share_global_url
                      )
                    }
                    data-tab="global-share"
                  >
                    Global
                  </a>
                </li>
              </ul>
            )}
          </span>
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
          {/* <a
            className="td-delete-btn td-btn"
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
          >
            {" "}
            <i className="la la-trash" />{" "}
          </a> */}
        </td>
      </tr>
    );
  }
}

export default FormShare;
