import React, { Component, Fragment } from "react";
import axios from "axios";
import SideNav from "./SideNav";
import Modal from "../common/Modal";
import CommonPopupForm from "./CommonPopupForm";

class ManageForms extends Component {
  state = {
    popupModal: false,
    selectedModals: null,
    heading: null,
    modalDatas: null,
    breadcrumb: {}
  };
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
      axios
        .get(`fv3/api/manage-forms/breadcrums/?project_id=${id}`)
        .then(res => {
          this.setState({
            breadcrumb: res.data
          });
        })
        .catch(err => {});
    }
  }

  OpenTabHandler = (e, url) => {
    window.open(url, "_blank");
  };

  closePopup = () => {
    this.setState({
      popupModal: false
    });
  };
  commonPopupHandler = (
    e,
    selectedModal,
    modalData,
    modalHeading,
    modalType,
    shareUrl
  ) => {
    this.setState({
      popupModal: true,
      heading: modalHeading,
      selectedModals: selectedModal,
      modalDatas: modalData,
      modalTypes: modalType,
      shareUrls: shareUrl
    });
  };
  render() {
    const { breadcrumb } = this.state;
    return (
      <Fragment>
        <nav aria-label="breadcrumb" role="navigation">
          {Object.keys(breadcrumb).length > 0 && (
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href={breadcrumb.organization_url}>
                  {breadcrumb.organization}
                </a>
              </li>
              <li className="breadcrumb-item">{breadcrumb.name}</li>
            </ol>
          )}
          {/* <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a>Forms</a>
            </li>
          </ol> */}
        </nav>
        <div className="row">
          <SideNav
            OpenTabHandler={this.OpenTabHandler}
            commonPopupHandler={this.commonPopupHandler}
            closePopup={this.closePopup}
            popupModal={this.state.popupModal}
          />
        </div>

        {/* {this.state.popupModal && (
          <Modal title="Add General Form" toggleModal={this.closePopup}>
            <CommonPopupForm />
          </Modal>
        )} */}
      </Fragment>
    );
  }
}

export default ManageForms;
