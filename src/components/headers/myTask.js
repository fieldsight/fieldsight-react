import React, { Component } from "react";
import Profile from "../../static/images/profile.png";
import NotificationHandler from "./NotificationHandler";

const user_id = window.user_id ? window.user_id : 1;

class MyTask extends Component {
  render() {
    const { data } = this.props;
    return (
      <div
        className="tab-pane active"
        id="role"
        role="tabpanel"
        aria-labelledby="role_tab"
      >
        <ul>
          <li>
            <a href="#">
              <figure>
                <img src={Profile} alt="user" />
              </figure>
              <div className="notify-info">
                <p className="">
                  Site Progress Xls Report Image
                  <b>STFC - Nuwakot</b>
                  has been started
                </p>
                <time>Added on November, 22, 2019, 10:32 am</time>
                <div className="download-file">
                  <b>download file</b>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <figure>
                <img src={Profile} alt="user" />
              </figure>
              <div className="notify-info">
                <p className="">
                  Site Progress Xls Report Image <b>STFC - Nuwakot</b>
                  has been started
                </p>
                <time>Added on November, 22, 2019, 10:32 am</time>
                <div className="download-file">
                  <b>download file</b>
                </div>
              </div>
            </a>
          </li>
          <li className="dropdown-footer">
            <a className="text-center" href="#">
              <span>View All</span>
              <span>Mark all as seen</span>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default MyTask;
