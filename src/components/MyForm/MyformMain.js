import React, { Component } from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import SideBar from "./SideBar";
import CommonPopup from "./CommonPopup";
import PreviewModal from "./PreviewModal";
import ReplaceModal from "./ReplaceModal";
import ShareModal from "./ShareModal";
import GlobalModel from "./GlobalModal";
import { thisExpression } from "@babel/types";


class MyFormMain extends Component {
  state = {
    popupModal: false,
    selectedModals: null,
    heading: null,
    modalDatas: null,
    
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
    // console.log(modalType)

    this.setState({
      popupModal: true,
      heading: modalHeading,
      selectedModals: selectedModal,
      modalDatas: modalData,
      modalTypes: modalType,
      shareUrls: shareUrl,
      
     
    });
  };

  render() {
    return (
      <div id="fieldsight-new" className="fieldsight-new">
        <div id="main-container" className="minified">
          <div className="container-fluid">
            <nav aria-label="breadcrumb" role="navigation">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/fieldsight/organization-dashboard/13/">Teams</a>
                </li>

                <li className="breadcrumb-item active" aria-current="page">
                  Invitation
                </li>
              </ol>
            </nav>
            <main id="main-content">
              <div className="row">
                {/* sidebar content */}
                <SideBar
                  OpenTabHandler={this.OpenTabHandler}
                  commonPopupHandler={this.commonPopupHandler}
                  height={this.props.height}
                />
                {/* sidebar content */}
              </div>
            </main>
          </div>
        </div>

        {/* popup content */}

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
            /> 
           
          </CommonPopup>
        )}

        {/* popup content */}
      </div>
    );
  }
}

export default MyFormMain;
