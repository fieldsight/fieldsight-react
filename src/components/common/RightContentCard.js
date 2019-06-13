import React from "react";

const RightContentCard = ({
  title,
  addButton,
  toggleModal,
  children,
  submitHandler
}) => (
  <div className="card">
    <div className="card-header main-card-header sub-card-header">
      <h5>{title}</h5>
      {addButton && (
        <div className="add-btn">
          <a onClick={toggleModal}>
            Add new{" "}
            <span>
              <i className="la la-plus" />
            </span>
          </a>
        </div>
      )}
    </div>
    <div className="card-body">{children}</div>
    <button className="btn btn-success pull-right" onClick={submitHandler}>
      <i className="la la-save" />
      Save Form
    </button>
  </div>
);

export default RightContentCard;
