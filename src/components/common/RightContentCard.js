import React from "react";

const RightContentCard = ({
  title,
  addButton,
  hideButton,
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
    {/* {!hideButton && (
      <button className="fieldsight-btn pull-right " onClick={submitHandler}>
        <i className="la la-save" />
        Save Form
      </button>
    )} */}
  </div>
);

export default RightContentCard;
