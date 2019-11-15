import React from 'react';
import Modal from './Modal';

const DeleteModal = props => {
  const { onCancel, onConfirm, onToggle, message } = props;
  return (
    <Modal title="Warning" toggleModal={onToggle}>
      <div className="warning">
        <i className="la la-exclamation-triangle" />

        <p>{message}</p>
      </div>
      <div className="warning-footer text-center">
        <span className="col-4">
          <a
            className="fieldsight-btn rejected-btn"
            onClick={onCancel}
          >
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
