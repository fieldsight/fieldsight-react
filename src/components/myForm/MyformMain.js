import React, { Component, Fragment } from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import SideBar from "./SideBar";
import CommonPopup from "./CommonPopup";
import PreviewModal from "./PreviewModal";
import ReplaceModal from "./ReplaceModal";
import ShareModal from "./ShareModal";
import GlobalModel from "./GlobalModal";

class MyFormMain extends Component {
  state = {
    popupModal: false,
    selectedModals: null,
    heading: null,
    modalDatas: null
  };

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
    return (
      <Fragment>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a>Forms</a>
            </li>
          </ol>
        </nav>
        <div className="row">
          <SideBar
            OpenTabHandler={this.OpenTabHandler}
            commonPopupHandler={this.commonPopupHandler}
            height={this.props.height}
          />
        </div>

        {this.state.popupModal && (
          <CommonPopup
            closePopup={this.closePopup}
            heading={this.state.heading}
          >
            <this.state.selectedModals
              previewUrl={this.state.modalDatas}
              modalTypes={this.state.modalTypes}
              modalDatas={this.state.modalDatas}
              shareUrls={this.state.shareUrls}
              closePopup={this.closePopup}
            />
          </CommonPopup>
        )}
      </Fragment>
    );
  }
}

export default MyFormMain;
