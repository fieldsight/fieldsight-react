import React from "react";
import Modal from "./Modal";

const DeleteModal = props => {
  const { onCancel, onConfirm, onToggle } = props;
  return (
    <Modal
      //   title={"Are you sure you want to delete " + name && name + " ?"}
      toggleModal={onToggle}
    >
      <div className="warning">
        <h3 style={{ color: "red" }}>Warning</h3>
        <p>Are you sure to delete this data?</p>
      </div>
      <div className="warning-footer text-center">
        <span className="col-4">
          <a className="fieldsight-btn rejected-btn" onClick={onCancel}>
            cancel
          </a>
        </span>
        <span className="col-4">
          <a className="fieldsight-btn" onClick={onConfirm}>
            confirm
          </a>
        </span>
      </div>
    </Modal>
  );
};

export default DeleteModal;
