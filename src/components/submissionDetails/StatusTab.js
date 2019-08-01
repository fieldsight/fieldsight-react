import React, { Component } from "react";
import InputElement from "../common/InputElement";
import RadioElement from "../common/RadioElement";

const checkStatus = statusData => {
  if (statusData.status_display === "Pending") {
    return 0;
  } else if (statusData.status_display === "Rejected") {
    return 1;
  } else if (statusData.status_display === "Flagged") {
    return 2;
  } else if (statusData.status_display === "Approved") {
    return 3;
  }
};
class StatusTab extends Component {
  state = {
    file: "",
    comment: "",
    status: this.props.statusData.status_display
      ? checkStatus(this.props.statusData).toString()
      : "3"
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.statusData.status_display !==
      this.props.statusData.status_display
    ) {
      this.setState({
        file: "",
        comment: "",
        status: nextProps.statusData.status_display
          ? checkStatus(nextProps.statusData).toString()
          : "3"
      });
    }
  }

  onChangeHandler = (e, file) => {
    if (file) {
      return this.setState({
        file: e.target.files[0]
      });
    }
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    const {
      state: { comment, status, file },
      props: { fieldSightInstance, statusData, postSubmissionDetail }
    } = this;

    let oldStatus = checkStatus(statusData);
    const formData = new FormData();
    formData.append("image_1", file);
    formData.append("finstance", fieldSightInstance);
    formData.append("new_status", status);
    formData.append("old_status", oldStatus);
    formData.append("message", comment);

    postSubmissionDetail(formData);
  };

  render() {
    const {
      props: { statusData, hasReviewPermission },
      state: { comment, file, status },
      onChangeHandler,
      submitHandler
    } = this;
    let icon;
    if (statusData.status_display === "Rejected") {
      icon = "la-close";
    } else if (statusData.status_display === "Approved") {
      icon = "la-check";
    } else if (statusData.status_display === "Flagged") {
      icon = "la-flag";
    } else if (statusData.status_display === "Pending") {
      icon = "la-hourglass-2";
    }
    return (
      <div
        className="tab-pane fade show active"
        id="status"
        role="tabpanel"
        aria-labelledby="status_tab"
      >
        <div className="status-view">
          <a
            href="#"
            className={
              statusData.status_display &&
              statusData.status_display.toLowerCase()
            }
          >
            {statusData.status_display}
            <i className={`la ${icon}`} />
          </a>
        </div>
        {hasReviewPermission && (
          <div className="status">
            <form className="edit-form" onSubmit={submitHandler}>
              <InputElement
                tag="textarea"
                label="Comment"
                htmlFor="comment"
                name="comment"
                placeholder="Please put your comment here."
                value={comment}
                changeHandler={onChangeHandler}
              />
              <div className="form-group">
                <label>attach file</label>
                <div className="upload-form">
                  <div className="fieldsight-btn">
                    <label htmlFor="upload-btn">
                      upload <i className="la la-cloud-upload" />
                    </label>
                    <input
                      type="file"
                      id="upload-btn"
                      onChange={e => onChangeHandler(e, "file")}
                    />
                  </div>
                </div>
                <p>{file.name}</p>
              </div>
              <div className="form-group flexrow">
                <div className="custom-checkbox display-inline">
                  <RadioElement
                    label="Approve"
                    name="status"
                    value="3"
                    className="approved"
                    checked={status === "3"}
                    changeHandler={onChangeHandler}
                  />
                  <RadioElement
                    label="Flag"
                    name="status"
                    value="2"
                    className="flagged"
                    checked={status === "2"}
                    changeHandler={onChangeHandler}
                  />

                  <RadioElement
                    label="Reject"
                    name="status"
                    value="1"
                    className="rejected"
                    checked={status === "1"}
                    changeHandler={onChangeHandler}
                  />
                </div>
              </div>
              <div className="form-group pull-right">
                <button type="submit" className="fieldsight-btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default StatusTab;
