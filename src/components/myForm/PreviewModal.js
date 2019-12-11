import React, { PureComponent } from 'react';
import Iframe from 'react-iframe';
import PerfectScrollbar from 'react-perfect-scrollbar';
/* eslint-disable react/destructuring-assignment */

class PreviewModal extends PureComponent {
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
