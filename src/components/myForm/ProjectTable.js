import React, { Component } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import axios from "axios";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import PreviewModal from "./PreviewModal";
import { DotLoader } from "./Loader";
import { successToast, errorToast } from "./toastHandler";

const url = "fv3/api/myprojectforms/";

class ProjecTable extends Component {
  _isMounted = false;
  state = {
    project_list: [],
    list: [],
    dLoader: true
  };

  cloneHandler = (e, clone_url, id, form_id) => {
    axios
      .post(clone_url, { id_string: id, project: form_id })
      .then(res => {
        successToast("Form", "cloned");
      })
      .catch(err => console.log("err", err));
  };

  componentDidMount() {
    this._isMounted = true;
    axios
      .get(`${url}`)

      .then(res => {
        if (this._isMounted) {
          if (res.status === 200) {
            
            this.setState({
              project_list: res.data,
              dLoader: false
            });
          }
        }
      })
      .catch(err => {
        this.setState({
          dLoader: false
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.project_list.length === 0 && !this.state.dLoader && (
          <div className="card-header main-card-header sub-card-header bg-header">
            <h5>No Form Data Available</h5>
          </div>
        )}
        {this.state.project_list.map((item, i) => (
          <div key={i}>
            <div className="card-header main-card-header sub-card-header bg-header">
              <h5>{item.name}</h5>
            </div>
            <div
              className="card-body"
              style={{ position: "relative", height: "300px" }}
            >
              <PerfectScrollbar>
                <table
                  id="project_form_table"
                  className="table-bordered table project_form dataTable"
                >
                  <thead>
                    <tr>
                      <th> S.N</th>
                      <th>Form Name</th>
                      <th>Create Date</th>
                      <th>Updated date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.forms.map((items, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td style={{ width: "30%" }}>{items.title}</td>
                        <td>
                          <i className="fa fa-clock-o" />
                          <span>{items.date_created}</span>
                        </td>
                        <td>
                          <i className="fa fa-clock-o" />
                          <span>{items.date_modified}</span>
                        </td>
                        <td>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-disabled">Preview</Tooltip>
                            }
                          >
                            <a
                              onClick={e =>
                                this.props.commonPopupHandler(
                                  e,
                                  PreviewModal,
                                  items.preview_url,
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
                            overlay={
                              <Tooltip id="tooltip-disabled">Edit</Tooltip>
                            }
                          >
                            <a
                              onClick={e =>
                                this.props.OpenTabHandler(e, items.edit_url)
                              }
                              className="td-edit-btn td-btn"
                            >
                              {" "}
                              <i className="la la-edit" />{" "}
                            </a>
                          </OverlayTrigger>
                          {/* <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-disabled">Replace</Tooltip>
                            }
                          >
                            <a
                              className="td-edit-btn td-btn"
                            >
                              {" "}
                              <i className="la la-refresh"> </i>{" "}
                            </a>
                          </OverlayTrigger> */}
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-disabled">download</Tooltip>
                            }
                          >
                            <a className="td-edit-btn td-btn">
                              {" "}
                              <i className="la la-download"> </i>{" "}
                            </a>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-disabled">
                                Make a copy
                              </Tooltip>
                            }
                          >
                            <a
                              onClick={e =>
                                this.cloneHandler(
                                  e,
                                  items.clone_form_url,
                                  items.id_string,
                                  item.id
                                )
                              }
                              className="td-edit-btn td-btn"
                            >
                              {" "}
                              <i className="la la-clone"> </i>{" "}
                            </a>
                          </OverlayTrigger>
                          {/* <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-disabled">Delete!</Tooltip>
                            }
                          >
                            <a className="td-delete-btn td-btn">
                              {" "}
                              <i className="la la-trash" />{" "}
                            </a>
                          </OverlayTrigger> */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </PerfectScrollbar>
            </div>
          </div>
        ))}
        {this.state.dLoader && <DotLoader />}
      </React.Fragment>
    );
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
}

export default ProjecTable;
