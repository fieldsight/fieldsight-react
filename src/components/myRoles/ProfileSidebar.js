import React, { Component } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
class ProfileSidebar extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="profile-content" onMouseMove={this.handleMouseMove}>
          <figure>
            <img src={this.props.profile.profile_picture} alt="profile" />
          </figure>
          <div className="user-info">
            <h4>{this.props.profile.fullname}</h4>
            <span>{this.props.profile.fullname}</span>
            <div className="profile-social-icon">
              <a className="skype">
                <i className="la la-skype" />
              </a>
              <a className="whatsapp">
                <i className="la la-whatsapp" />
              </a>
              <a className="twitter">
                <i className="la la-twitter" />
              </a>
              <a className="google">
                <i className="la la-google-plus" />
              </a>
            </div>
          </div>

          <div className="profile-address">
            <ul>
              <li>
                <i className="la la-user" /> {this.props.profile.username}
              </li>
              <li>
                <i className="la la-map-marker" />
                {this.props.profile.address}
              </li>
              <li>
                <i className="la la-phone" /> {this.props.profile.phone}
              </li>
              <li>
                <i className="la la-envelope" />
                {this.props.profile.email}
              </li>
            </ul>
          </div>
        </div>
        <PerfectScrollbar>
          <div className="invite">
            <h4>Invitation</h4>
            <div className="normal-list">
              <ul>
              {this.props.invitation.map((item, i) => (
                <li key={item.id}>
                  <p>
                    <a href="#">{item.by_user}</a> as <span>{item.group}</span>{" "}
                    invited to join the FieldSight.
                  </p>
                  <div className="invite-btn">
                    <a href="#" className="accept-btn">
                      <i className="la la-check" />Accept
                    </a>
                    <a href="#" className="reject-btn">
                      <i className="la la-close" />Accept
                    </a>
                  </div>
                </li>

))}
               
              </ul>
            </div>
          </div>
        </PerfectScrollbar>
      </React.Fragment>
    );
  }
}
export default ProfileSidebar;
