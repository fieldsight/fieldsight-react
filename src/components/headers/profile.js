import React, { Component } from "react";

export class MyProfile extends Component {
  render() {
    return (
      <>
        <li>
          <a href="profile.html">My Profile</a>
        </li>
        <li>
          <a href="#"> Change password </a>
        </li>

        <li class="dropdown-footer">
          <a href="signin.html">
            {" "}
            <i class="la la-power-off"></i> Log Out
          </a>
        </li>
      </>
    );
  }
}

export default MyProfile;
