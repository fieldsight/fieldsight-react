import React, { Component } from "react";
import Profile from "../../static/images/profile.png";

export class Notifications extends Component {
  render() {
    return (
      <>
        <li className="dropdown-header">You have 5 notifications</li>
        <li>
          <a href="#">
            <figure>
              <img src={Profile} alt="user" />
            </figure>
            <div className="notify-info">
              <p className="">
                <b>Santosh Kshetri </b> was assigned as a Site Supervisor in{" "}
                <b>Dhan Bahadur Tamang/Dhan B. Tamang</b>
              </p>
              <time>2 min ago</time>
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
                <b>Santosh Kshetri</b> was assigned as a Site Supervisor in{" "}
                <b>Dhan Bahadur Tamang/Dhan B. Tamang</b>
              </p>
              <time>2 min ago</time>
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
                <b>Santosh Kshetri </b> was assigned as a Site Supervisor in{" "}
                <b>Dhan Bahadur Tamang/Dhan B. Tamang</b>
              </p>
              <time>2 min ago</time>
            </div>
          </a>
        </li>
        <li className="dropdown-footer">
          <a className="text-center" href="#">
            <span>View All</span>
            <span>Mark all as seen</span>
          </a>
        </li>
      </>
    );
  }
}

export default Notifications;
