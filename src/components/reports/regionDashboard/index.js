import React, { PureComponent } from 'react';
import LeftSidebar from './leftSideBar';
import RightSidebar from './rightSideBar';

export default class RegionDashboard extends PureComponent {
  render() {
    return (
      <div className="row">
        <div className="col-xl-4 col-lg-4">
          <div className="left-sidebar new-sidebar sticky-top">
            <LeftSidebar />
          </div>
        </div>
        <div className="col-xl-8 col-lg-8">
          <div className="right-content">
            <RightSidebar />
          </div>
        </div>
      </div>
    );
  }
}
