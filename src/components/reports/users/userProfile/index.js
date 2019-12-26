import React, { PureComponent } from 'react';
import LeftSideBar from './leftSidebar';
import RightSideBar from './rightsidebar';

export default class UserProfile extends PureComponent {
  render() {
    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="/fieldsight/organization-dashboard/13/">
                Teams
              </a>
            </li>

            <li
              className="breadcrumb-item active"
              aria-current="page"
            >
              Region
            </li>
          </ol>
        </nav>

        <div className="row">
          <div className="col-xl-3 col-lg-4">
            <div className="left-sidebar new-sidebar profile-sidebar sticky-top">
              <LeftSideBar />
            </div>
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="right-content">
              <RightSideBar />
            </div>
          </div>
        </div>
      </>
    );
  }
}
