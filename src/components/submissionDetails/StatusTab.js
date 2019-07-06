import React from "react";

const StatusTab = ({ statusData }) => (
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
          statusData.status_display && statusData.status_display.toLowerCase()
        }
      >
        {statusData.status_display}
        <i className="la la-hourglass-2" />
        <i className="la la-check" />
        <i className="la  la-close" />
        <i className=" la la-thumbs-up" />
      </a>
    </div>
    <div className="status">
      <form
        className="edit-form"
        method="post"
        action=""
        encType="multipart/form-data"
      >
        <div className="form-group">
          <label>comment</label>
          <textarea
            className="form-control"
            placeholder="Please put your comment here."
          />
        </div>
        <div className="form-group">
          <label>attach file</label>
          <div className="upload-form">
            <input type="file" name="userprofile_picture" id="filePhoto" />
            <div className="fieldsight-btn">
              <label htmlFor="upload-btn">
                upload <i className="la la-cloud-upload" />
              </label>
              <input type="file" id="upload-btn" multiple />
            </div>
          </div>
        </div>
        <div className="form-group flexrow">
          <div className="custom-checkbox display-inline">
            <div className="radiobox approved">
              <label>
                <input type="radio" name="radioYes" />
                <i className="helper" />
                Approve
              </label>
            </div>
            <div className="radiobox flagged">
              <label>
                <input type="radio" name="radioYes" />
                <i className="helper" />
                Flag
              </label>
            </div>
            <div className="radiobox rejected">
              <label>
                <input type="radio" name="radioYes" />
                <i className="helper" />
                Reject
              </label>
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

export default StatusTab;
