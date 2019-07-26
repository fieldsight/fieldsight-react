import React, { Component } from "react";

let base_url = window.base_url
  ? window.base_url
  : "https://fieldsight.naxa.com.np/";

class ProfileTab extends Component {
  render() {
    return (
      <div className="card-body">
        <div className="profile-content">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <figure>
                <img src={this.props.profile.profile_picture} alt="profile" />
              </figure>
              <div className="user-info">
                <h4>{this.props.profile.fullname}</h4>
                <span>Build Change</span>
                <p>{this.props.profile.email}</p>
                <div className="profile-social-icon">
                  <a href="#" className="skype">
                    <i className="la la-skype" />
                  </a>
                  <a href="#" className="whatsapp">
                    <i className="la la-whatsapp" />
                  </a>
                  <a href="#" className="twitter">
                    <i className="la la-twitter" />
                  </a>
                  <a href="#" className="google">
                    <i className="la la-google-plus" />
                  </a>
                </div>
                <a href={base_url+"users/profile/"+this.props.profile.id+"/"} target="_self" className="fieldsight-btn">
                  Edit Profile
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="profile-address">
                <ul>
                  {this.props.profile.username != "" ? (
                    <li>
                      <i className="la la-user" /> {this.props.profile.username}
                    </li>
                  ) : null}

                  {this.props.profile.address != "" ? (
                    <li>
                      <i className="la la-map-marker" />
                      {this.props.profile.address}
                    </li>
                  ) : null}

                  {this.props.profile.phone != "" ? (
                    <li>
                      <i className="la la-phone" /> {this.props.profile.phone}
                    </li>
                  ) : null}

                  {this.props.profile.email != "" ? (
                    <li>
                      <i className="la la-envelope" />{" "}
                      {this.props.profile.email}
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProfileTab;
