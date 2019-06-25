import React from "react";
import Zoom from "react-reveal/Zoom";

const Modal = ({ title, toggleModal, children }) => (
  <Zoom duration={500}>
    <div className="fieldsight-popup open" style={{ zIndex: 9999 }}>
      <div
        className={`popup-body sm-body ${
          title === "Preview" ? "cropbody" : ""
        }`}
      >
        <div className="card">
          <div className="card-header main-card-header  sub-card-header">
            <h5>{title}</h5>
            <span className="popup-close" onClick={toggleModal}>
              <i className="la la-close" />
            </span>
          </div>
          <div className="card-body">{children}</div>
        </div>
      </div>
    </div>
  </Zoom>
);

export default Modal;
