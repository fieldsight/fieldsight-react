import React, { Component } from "react";
import { AvatarContentLoader } from "../common/Loader";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

let base_url = window.base_url
  ? window.base_url
  : "https://fieldsight.naxa.com.np/";

class ProfileTab extends Component {
  render() {
    return (
      <div className="card-body">
        <div className="profile-content">
          {this.props.dLoader && (
            <AvatarContentLoader size="80" width="20%" number={1} />
          )}

          {!this.props.dLoader && (
            <div className="row">
              <div className="col-xl-4 col-lg-6">
                <figure>
                  <img src={this.props.profile.profile_picture} alt="profile" />
                </figure>
                <div className="user-info">
                  <h4>{this.props.profile.fullname}</h4>
                  <span>{this.props.profile.username}</span>
                  <a href={"mailto:" + this.props.profile.email}>
                    <p>{this.props.profile.email}</p>
                  </a>
                  <div className="profile-social-icon">
                    {this.props.profile.skype && (
                      <a href="#" className="skype">
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>{this.props.profile.skype}</Tooltip>
                          }
                        >
                          <i className="la la-skype" />
                        </OverlayTrigger>
                      </a>
                    )}

                    {this.props.profile.whatsapp && (
                      <a href="#" className="whatsapp">
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>{this.props.profile.whatsapp}</Tooltip>
                          }
                        >
                          <i className="la la-whatsapp" />
                        </OverlayTrigger>
                      </a>
                    )}

                    {this.props.profile.twitter && (
                      <a href="#" className="twitter">
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>{this.props.profile.twitter}</Tooltip>
                          }
                        >
                          <i className="la la-twitter" />
                        </OverlayTrigger>
                      </a>
                    )}

                    {this.props.profile.google_talk && (
                      <a href="#" className="google">
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>{this.props.profile.google_talk}</Tooltip>
                          }
                        >
                          <i className="la la-google-plus" />
                        </OverlayTrigger>
                      </a>
                    )}
                  </div>
                  {!this.props.profileId && (
                    <a
                      href={
                        "/users/profile-update/" + this.props.profile.id + "/"
                      }
                      target="_self"
                      className="fieldsight-btn"
                    >
                      Edit Profile
                    </a>
                  )}
                </div>
              </div>
              <div className="col-xl-4 col-lg-6">
                <div className="profile-address">
                  <ul>
                    {this.props.profile.username ? (
                      <li>
                        <i className="la la-user" />{" "}
                        {this.props.profile.username}
                      </li>
                    ) : null}

                    {this.props.profile.address ? (
                      <li>
                        <i className="la la-map-marker" />
                        {this.props.profile.address}
                      </li>
                    ) : null}

                    {this.props.profile.phone ? (
                      <li>
                        <i className="la la-phone" /> {this.props.profile.phone}
                      </li>
                    ) : null}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default ProfileTab;
