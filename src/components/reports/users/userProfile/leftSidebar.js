import React, { PureComponent } from 'react';

export default class LeftSideBar extends PureComponent {
  render() {
    return (
      <div className="card">
        <div className="card-header main-card-header">
          <h5>Profile</h5>
          <div className="dash-btn">
            <a href="/#" className="fieldsight-btn left-icon">
              <i className="la la-cog" />
              Update Profile
            </a>
          </div>
        </div>
        <div className="card-body">
          <div className="profile-content">
            <figure>
              <img src="img/pf.jpg" alt="profile" />
            </figure>
            <div className="user-info">
              <h4>FieldSight Superuser</h4>
              <span>Build Change</span>
              <div className="profile-social-icon">
                <a href="/#" className="skype">
                  <i className="la la-skype" />
                </a>
                <a href="/#" className="whatsapp">
                  <i className="la la-whatsapp" />
                </a>
                <a href="/#" className="twitter">
                  <i className="la la-twitter" />
                </a>
                <a href="/#" className="google">
                  <i className="la la-google-plus" />
                </a>
              </div>
            </div>
            <div className="profile-address">
              <ul>
                <li>
                  <i className="la la-user" />
                  fsadmin
                </li>
                <li>
                  <i className="la la-map-marker" />
                  Kathmandu,Nepal
                </li>
                <li>
                  <i className="la la-phone" />
                  9856012345
                </li>
                <li>
                  <i className="la la-envelope" />
                  fsadmin@fieldsight.org
                </li>
              </ul>
            </div>
          </div>
          <div className="invite invite-dashboard">
            <h4>Invitation</h4>
            <div className="normal-list">
              <ul>
                <li>
                  <p>
                    <a href="/#">Santosh k</a>
                    as
                    <span>Project Mangager</span>
                    invited to join the FieldSight.
                  </p>
                  <div className="invite-btn">
                    <a href="/#" className="accept-btn">
                      <i className="la la-check" />
                      Accept
                    </a>
                    <a href="/#" className="reject-btn">
                      <i className="la la-close" />
                      Accept
                    </a>
                  </div>
                </li>
                <li>
                  <p>
                    <a href="/#">Santosh k</a>
                    as
                    <span>Project Mangager</span>
                    invited to join the FieldSight.
                  </p>
                  <div className="invite-btn">
                    <a href="/#" className="accept-btn">
                      <i className="la la-check" />
                      Accept
                    </a>
                    <a href="/#" className="reject-btn">
                      <i className="la la-close" />
                      Accept
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
