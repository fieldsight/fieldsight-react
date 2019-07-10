import React, { Component } from "react";
import InputElement from "../common/InputElement";
// import { connect } from 'react-redux';
// import {postSubmissionDetail} from '../../actions/submissionDetailActions'
class StatusTab extends Component {
  state = {
    comment: "",
    file: "",
    status: "3"
  };

  checkStatus = statusData => {
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
      props: { fieldSightInstance, statusData, postSubmissionDetail },
      checkStatus
    } = this;

    let oldStatus = checkStatus(statusData);
    const formData = new FormData();
    formData.append("image_1", file);
    formData.append("finstance", fieldSightInstance);
    formData.append("new_status", status);
    formData.append("old_status", oldStatus);
    formData.append("message", comment);

    // const data = {
    //   // method: "POST",
    //   body: formData
    //   // headers: {
    //   //   "Content-Type": "multipart/form-data",
    //   //   Authorization: "91a844e62e86b6e336b8fb440340cbeaabf601fe"
    //   // }
    // };
    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    postSubmissionDetail(formData);
  };

  render() {
    const {
      props: { statusData },
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
        <div className="status">
          <form className="edit-form" onSubmit={submitHandler}>
            {/* <div className="form-group">
              <label>comment</label>
              <textarea
                className="form-control"
                placeholder="Please put your comment here."
              />
            </div> */}

            <InputElement
              tag="textarea"
              required={true}
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
                {/* <input type="file" name="userprofile_picture" id="filePhoto" /> */}
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
                <div className="radiobox approved">
                  {/* <label> */}
                  {/* <input type="radio" name="radioYes" /> */}
                  <InputElement
                    tag="input"
                    type="radio"
                    label="Approved"
                    htmlFor="Approved"
                    name="status"
                    value="3"
                    checked={status === "3"}
                    changeHandler={onChangeHandler}
                  />
                  {/* <i className="helper" /> */}
                  Approve
                  {/* </label> */}
                </div>
                <div className="radiobox flagged">
                  {/* <label> */}
                  <InputElement
                    tag="input"
                    type="radio"
                    label="Flag"
                    htmlFor="Flag"
                    name="status"
                    value="2"
                    checked={status === "2"}
                    changeHandler={onChangeHandler}
                  />
                  {/* <i className="helper" /> */}
                  Flag
                  {/* </label>  */}
                </div>
                <div className="radiobox rejected">
                  {/* <label> */}
                  <InputElement
                    tag="input"
                    type="radio"
                    label="Reject"
                    htmlFor="Reject"
                    name="status"
                    value="1"
                    checked={status === "1"}
                    changeHandler={onChangeHandler}
                  />
                  <i className="helper" />
                  Reject
                  {/* </label> */}
                </div>
              </div>
            </div>
            <div className="form-group pull-right">
              <button type="submit" className="fieldsight-btn">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default StatusTab;
