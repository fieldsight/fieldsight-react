import React from "react";
import format from "date-fns/format";

const HistoryTab = ({ submissionHistory }) => (
  <div>
    <div className="thumb-list">
      <ul>
        {submissionHistory.map((history, i) => (
          <li key={i}>
            <figure>
              <img src={history.user_profile_picture} alt="user img" />
            </figure>
            <div className="content">
              <p>
                <a href="#" className="name">
                  {history.user_full_name}
                </a>{" "}
                <span>marked this submission as</span>{" "}
                <strong
                  className={history.get_new_status_display.toLowerCase()}
                >
                  {history.get_new_status_display}
                </strong>
              </p>
              <div className="review-text">{history.comment}</div>
              <time>
                <i className="la la-clock-o" />
                {format(history.date, "MMMM DD YYYY")}
              </time>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default HistoryTab;
