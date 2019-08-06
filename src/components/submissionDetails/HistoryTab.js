import React, { Fragment } from "react";
import format from "date-fns/format";
import PerfectScrollbar from "react-perfect-scrollbar";

const HistoryTab = ({ submissionHistory, getSubmissionDetail }) => {
  return (
    <div style={{ position: "relative", height: window.innerHeight }}>
      <PerfectScrollbar>
        <div className="thumb-list">
          <ul>
            {submissionHistory.length > 0 ? (
              submissionHistory.map((history, i) => (
                <li key={i}>
                  <figure>
                    <img src={history.user_profile_picture} alt="user img" />
                  </figure>
                  <div className="content">
                    <p>
                      <a href="#" className="name">
                        {history.user_full_name}
                      </a>{" "}
                      {history.get_new_status_display === "New Submission" ? (
                        <span>
                          submitted a{" "}
                          <strong
                            onClick={() => getSubmissionDetail(history.url)}
                          >
                            New version
                          </strong>{" "}
                          of this form
                        </span>
                      ) : (
                        <Fragment>
                          <span>marked this submission as </span>
                          <strong
                            className={history.get_new_status_display.toLowerCase()}
                          >
                            {history.get_new_status_display}
                          </strong>
                        </Fragment>
                      )}
                    </p>
                    <div className="review-text">{history.comment}</div>
                    {history.media_img && (
                      <figure>
                        <img src={history.media_img} alt="media img" />
                      </figure>
                    )}
                    <time>
                      <i className="la la-clock-o" />
                      {format(history.date, "MMMM Do YYYY, h:mm:ss a")}
                    </time>
                  </div>
                </li>
              ))
            ) : (
              <p> No History Available </p>
            )}
          </ul>
        </div>
      </PerfectScrollbar>
    </div>
  );
};

export default HistoryTab;
