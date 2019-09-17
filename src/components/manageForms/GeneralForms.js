import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import axios from "axios";

import { DotLoader } from "../myForm/Loader";
import isEmpty from "../../utils/isEmpty";
import Modal from "../common/Modal";
import RightContentCard from "../common/RightContentCard";
import CommonPopupForm from "./CommonPopupForm";
import { errorToast, successToast } from "../../utils/toastHandler";
import EditFormGuide from "./EditFormGuide";

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

class GeneralForms extends Component {
  state = {
    data: [],
    loader: false,
    urlId: this.props.match.params ? this.props.match.params.id : "",
    deployStatus: false,
    editGuide: false,
    guideData: {}
  };

  requestGeneralForm(id) {
    axios
      .get(`fv3/api/manage-forms/general/?project_id=${id}`)
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(err => {});
  }
  componentDidMount() {
    const {
      match: {
        url,
        params: { id }
      }
    } = this.props;
    const splitArr = url.split("/");
    const isProjectForm = splitArr.includes("project");

    if (isProjectForm) {
      this.requestGeneralForm(id);
    }
  }
  changeDeployStatus = (id, isDeploy) => {
    const { urlId } = this.state;
    axios
      .post(
        `fv3/api/manage-forms/deploy/?project_id=${urlId}&type=general&id=${id}`,
        { is_deployed: !isDeploy }
      )
      .then(res => {
        this.setState(
          state => {
            const newData = this.state.data;
            newData.map(each => {
              const arrItem = { ...each };
              if (each.id == id) {
                each.is_deployed = !isDeploy;
              }
              return arrItem;
            });
            return { data: newData };
          },
          () => {
            successToast("Form", "updated");
          }
        );
      })
      .catch(err => {});
  };
  deleteItem = (id, isDeploy) => {
    const { urlId } = this.state;
    axios
      .post(
        `fv3/api/manage-forms/delete/?project_id=${urlId}&type=general&id=${id}`,
        { is_deployed: isDeploy }
      )
      .then(res => {
        this.setState(
          {
            data: this.state.data.filter(each => each.id != id)
          },
          () => {
            successToast("Form", "deleted");
          }
        );
      })
      .catch(err => {});
  };
  handleEditGuide = data => {
    this.setState({
      editGuide: !this.state.editGuide,
      guideData: data ? data : {}
    });
  };
  handleUpdateGuide = data => {
    console.log("data chk", data);
  };
  render() {
    const { loader, data, editGuide, guideData } = this.state;

    return (
      <RightContentCard
        title="General Forms"
        addButton={true}
        toggleModal={this.props.commonPopupHandler}
        showText={true}
      >
        <div className="card-body">
          {loader && <DotLoader />}
          {!loader && (
            <Table responsive="xl" className="table  table-bordered  dataTable">
              <thead>
                <tr>
                  <th>form title</th>
                  <th>Responses</th>
                  <th>Form Guide</th>
                  <th>assigned date</th>
                  <th>Default status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {!loader && data.length === 0 && (
                  <tr>
                    <td>
                      <p>No Form Data Available</p>
                    </td>
                  </tr>
                )}
                {!loader &&
                  data.map((item, i) => (
                    <tr key={i}>
                      <td>{item.xf.title}</td>
                      <td>{item.responses_count}</td>
                      <td>
                        {item.em && (
                          <a onClick={() => this.handleEditGuide(item.em)}>
                            <i className="la la-book" />
                            {item.em.title}
                          </a>
                        )}
                      </td>
                      <td>
                        <time>
                          <i className="la la-clock-o"></i>{" "}
                          {formatDate(new Date(item.date_created))}
                        </time>
                      </td>
                      <td>
                        <a
                          href="#"
                          className={getClass(item.default_submission_status)}
                        >
                          {getStatus(item.default_submission_status)}
                        </a>
                      </td>
                      <td>
                        {!!item.is_deployed && (
                          <a
                            className="badge badge-danger"
                            onClick={() =>
                              this.changeDeployStatus(item.id, item.is_deployed)
                            }
                          >
                            Undeployed
                            <i className="la la-close"> </i>
                          </a>
                        )}
                        {!item.is_deployed && (
                          <div>
                            <span>
                              <a
                                className="badge badge-success"
                                onClick={() =>
                                  this.changeDeployStatus(
                                    item.id,
                                    item.is_deployed
                                  )
                                }
                              >
                                Deploy
                              </a>
                            </span>
                            <span>
                              <a
                                className="badge badge-danger"
                                onClick={() =>
                                  this.deleteItem(item.id, item.is_deployed)
                                }
                              >
                                Delete
                                <i className="la la-close"> </i>
                              </a>
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}
        </div>
        {this.props.popupModal && (
          <Modal title="Add General Form" toggleModal={this.props.closePopup}>
            <CommonPopupForm />
          </Modal>
        )}
        {editGuide && (
          <Modal title="Form Guide" toggleModal={this.handleEditGuide}>
            <EditFormGuide
              data={guideData}
              handleCancel={this.handleEditGuide}
              handleUpdateGuide={this.handleUpdateGuide}
            />
          </Modal>
        )}
      </RightContentCard>
    );
  }
}
export default GeneralForms;
