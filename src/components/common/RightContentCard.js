import React from 'react';

const RightContentCard = ({
  title,
  addButton,
  // hideButton,
  toggleModal,
  children,
  buttonName,
  editflag,
}) => (
  <div className="card">
    <div className="card-header main-card-header">
      <h5>{title}</h5>
      {addButton && (
        <div className="add-btn">
          <a
            onClick={toggleModal}
            tabIndex="0"
            role="button"
            onKeyDown={toggleModal}
          >
            <span>
              {editflag && <i className="la la-edit" />}
              {buttonName}
              {!editflag && <i className="la la-plus" />}
            </span>
          </a>
        </div>
      )}
    </div>
    <div className="card-body">{children}</div>
  </div>
);

export default RightContentCard;
