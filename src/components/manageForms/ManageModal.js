import React from 'react';
import Zoom from 'react-reveal/Zoom';

/* eslint-disable  react/prop-types */

const ManageModal = props => {
  const {
    title,
    toggleModal,
    children,
    showButton,
    url,
    showText,
    classname,
    handleSubmit,
  } = props;
  return (
    <Zoom duration={500}>
      <div
        className="fieldsight-popup open"
        style={{ zIndex: 99999 }}
      >
        <div
          className={`popup-body ${
            title === 'Preview' ? 'cropbody' : ''
          } ${title === 'Warning' ? 'sm-body' : ''} ${classname}`}
        >
          <div className="card">
            <div className="card-header main-card-header  sub-card-header">
              <h5>{title}</h5>
              {showButton && (
                <div
                  className="add-btn"
                  style={{ marginRight: '15px' }}
                >
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {showText && showText}

                    <span>
                      <i className="la la-plus" />
                    </span>
                  </a>
                </div>
              )}
              <span
                className="popup-close"
                onClick={toggleModal}
                tabIndex="0"
                role="button"
                onKeyDown={toggleModal}
              >
                <i className="la la-close" />
              </span>
            </div>
            <form
              className="floating-form"
              onSubmit={e => {
                e.preventDefault();
              }}
            >
              <div className="card-body">{children}</div>
              <div className="modal-footer">
                <div className="form-group pull-right no-margin">
                  <button
                    type="button"
                    className="fieldsight-btn"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Zoom>
  );
};

export default ManageModal;
