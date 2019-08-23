import React, { Component } from "react";

class DashboardCounter extends Component {
  render() {
    return (
      <div className="dashboard-counter mrt-30">
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <div className="count-card">
              <div className="count-icon pending">
                <i className="la la-copy " />
              </div>
              <div className="count-content">
                <h4>50</h4>
                <h6>Pending submissions</h6>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="count-card ">
              <div className="count-icon approved">
                <i className="la la-thumbs-up " />
              </div>
              <div className="count-content">
                <h4>50</h4>
                <h6>approved submissions</h6>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="count-card ">
              <div className="count-icon flagged">
                <i className="la la-flag-o " />
              </div>
              <div className="count-content">
                <h4>50</h4>
                <h6>flagged submissions</h6>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="count-card">
              <div className="count-icon rejected">
                <i className="la la-close " />
              </div>
              <div className="count-content">
                <h4>50</h4>
                <h6>rejected submissions</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DashboardCounter;
