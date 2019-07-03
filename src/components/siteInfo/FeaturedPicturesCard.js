import React, { Component } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

class FeaturedPicturesCard extends Component {
  renderName = id => {
    return this.props.forms.find(form => form.id === +id).name;
  };
  render() {
    const {
      props: { picture, editPicHandler, removePicHandler },
      renderName
    } = this;
    return (
      <div className="col-lg-6 col-md-6">
        <div className="card">
          <div className="card-header sub-card-header">
            <h5>{picture.question_name}</h5>
            <div className="add-btn">
              <a
                onClick={() =>
                  editPicHandler(picture.id || picture.question_name)
                }
                className="td-edit-btn"
              >
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Edit</Tooltip>}
                >
                  <i className="la la-edit" />
                </OverlayTrigger>
              </a>
              <a
                onClick={() =>
                  removePicHandler(picture.id || picture.question_name)
                }
                className="td-delete-btn"
              >
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Delete</Tooltip>}
                >
                  <i className="la la-trash-o" />
                </OverlayTrigger>
              </a>
            </div>
          </div>
          <div className="card-body">
            <div className="before-content">
              <ul>
                <li>
                  <label>Type:</label> <span>{picture.question_type}</span>
                </li>
                {picture.form_id && (
                  <li>
                    <label>Form :</label>{" "}
                    <span>{renderName(picture.form_id)}</span>
                  </li>
                )}
                {picture.question && (
                  <li>
                    <label>Question :</label>{" "}
                    <span>{picture.question.name}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FeaturedPicturesCard;
