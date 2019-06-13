import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const FeaturedPicturesCard = ({
  picture,
  editPicHandler,
  removePicHandler
}) => (
  <div className="col-lg-3 col-md-6">
    <div className="card">
      <div className="card-header sub-card-header">
        <h5>{picture.label}</h5>
        <div className="add-btn">
          <a onClick={() => editPicHandler(picture.id)} className="td-edit-btn">
            <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
              <i className="la la-edit" />
            </OverlayTrigger>
          </a>
          <a
            onClick={() => removePicHandler(picture.id)}
            className="td-delete-btn"
          >
            <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
              <i className="la la-trash-o" />
            </OverlayTrigger>
          </a>
        </div>
      </div>
      <div className="card-body">
        <div className="before-content">
          <ul>
            <li>
              <label>Type:</label> <span>{picture.type}</span>
            </li>
            {picture.selectedForm && (
              <li>
                <label>Form :</label> <span>{picture.selectedForm.name}</span>
              </li>
            )}
            {picture.selectedQuestion && (
              <li>
                <label>Question :</label>{" "}
                <span>{picture.selectedQuestion.name}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default FeaturedPicturesCard;
