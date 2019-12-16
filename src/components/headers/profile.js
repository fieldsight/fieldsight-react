import React, { Component } from "react";

export class MyProfile extends Component {
  render() {
    const { userId } = this.props
    return (
      <>
        <li>
          <a href={`/fieldsight/application/#/profile/${userId}`}>My Profile</a>
        </li>
        <li>
          <a href="/fieldsight/application/#/change-password"> Change password </a>
        </li>

        <li className="dropdown-footer">
          <a>
            <i className="la la-power-off" /> Log Out
          </a>
        </li>
      </>
    );
  }
}

export default MyProfile;
