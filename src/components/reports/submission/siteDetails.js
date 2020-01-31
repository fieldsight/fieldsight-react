import React, { PureComponent } from 'react';

export default class SiteDetails extends PureComponent {
  render() {
    return (
      <div className="card">
        <div className="card-header main-card-header">
          <h5>site details</h5>
        </div>
        <div className="card-body site-details">
          <figure>
            <img src="img/profile.jpg" alt="profile" />
          </figure>
          <div className="content">
            <h4>Santosh Khatri</h4>
            <p>TSC_Registration</p>
            <time>28-11-1-0-16</time>
          </div>
        </div>
      </div>
    );
  }
}
