import React, { Component } from "react";
import { BlockContentLoader } from "../common/Loader";
import PerfectScrollbar from "react-perfect-scrollbar";
import { FormattedMessage } from "react-intl";

class Submissions extends Component {
  render() {
    return (
      <div className="">
        {this.props.submissionLoader && (
          <BlockContentLoader height="20px" number={23} />
        )}
        {!this.props.submissionLoader && (
          <div className="thumb-list mr-0">
            <ul style={{ position: "relative", height: "650px" }}>
              {this.props.submission.length === 0 && (
                <p>
                  <FormattedMessage
                    id="app.noDataAvailable"
                    defaultMessage="No Data Available"
                  />
                </p>
              )}
              <PerfectScrollbar>
                {this.props.submission.map((sub, i) => (
                  <li key={i}>
                    {/* <figure>
                <img src="" alt="profile" />
             
                </figure> */}
                    <div className="content">
                      <p>
                        <a href={sub.profile}>{sub.submitted_by}</a>
                        <FormattedMessage
                          id="app.submittedResponse"
                          defaultMessage="submitted a response for"
                        />{" "}
                        <a href={sub.form_url}>
                          <b>{sub.form_name}</b>
                        </a>{" "}
                        <FormattedMessage id="app.in" defaultMessage="in" />{" "}
                        <a href={sub.extra_object_url}>
                          <b>{sub.extra_object}</b>
                        </a>
                      </p>
                      <time>
                        <i className="la la-clock" /> {sub.date}
                      </time>
                    </div>
                  </li>
                ))}
              </PerfectScrollbar>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Submissions;
