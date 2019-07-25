import React, { Component } from "react";

class Submissions extends Component {
  render() {
    return (
      <div className="">
        <div className="thumb-list mr-0">
          <ul>
            {this.props.submission.map((sub, i) => (
              <li key={i}>
                {/* <figure>
                <img src="" alt="profile" />
             
                </figure> */}
                <div className="content">
                  <p><a href={sub.profile}>{sub.submitted_by}</a> submitted a response for <a href={sub.form_url}><b>{sub.form_name}</b></a> in <a href={sub.extra_object_url}><b>{sub.extra_object}</b></a></p>
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
