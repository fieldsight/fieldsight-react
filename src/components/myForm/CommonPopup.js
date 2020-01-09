import React, { PureComponent } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Zoom from 'react-reveal/Zoom';
/* eslint-disable react/prop-types  */

class CommonPopup extends PureComponent {
  render() {
    const { heading, closePopup, children } = this.props;
    return (
      <Zoom duration={500}>
        <div className="fieldsight-popup open">
          <div className="popup-body">
            <div className="card">
              <div className="card-header main-card-header">
                <h5>{heading}</h5>
                <span
                  className="popup-close"
                  tabIndex="0"
                  role="button"
                  onKeyDown={closePopup}
                  onClick={closePopup}
                >
                  <i className="la la-close" />
                </span>
              </div>
              <div className="card-body">{children}</div>
            </div>
          </div>
        </div>
      </Zoom>
    );
  }
}

export default CommonPopup;
