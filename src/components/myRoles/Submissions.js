import React, { Component } from "react";

class Submissions extends Component {
  render() {
    return (
      <div className="">
        <div className="thumb-list mr-0">
          <ul>
            {this.props.submission.map((sub, i) => (
              <li key={i}>
                <div className="content">
                  <h6>{sub.submitted_by} submitted a response for <a href={sub.form_url}><b>{sub.form_name}</b></a> in <a href={sub.extra_object_url}><b>{sub.extra_object}</b></a></h6>
                  <time>
                    <i className="la la-clock" /> {sub.date}
                  </time>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Submissions;
