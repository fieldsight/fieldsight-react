import React, { Component } from "react";
import Iframe from "react-iframe";
import PerfectScrollbar from "react-perfect-scrollbar";

class PreviewModal extends Component {
  state = {};

  render() {
    return (
      <div className="thumb-list userlist">
        <PerfectScrollbar>
          <Iframe
            url={this.props.previewUrl}
            height="450px"
            id="myId"
            className="myClassname"
            display="initial"
          />
        </PerfectScrollbar>
      </div>
    );
  }
}

export default PreviewModal;
