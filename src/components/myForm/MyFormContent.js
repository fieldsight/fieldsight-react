import React, { Component } from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import MyformTable from "./MyformTable";
import SharedTable from "./SharedTable";

//const base_url = "https://fieldsight.naxa.com.np";

class MyFormContent extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="col-xl-9 col-lg-8">
          <div className="right-content">
            <div className="tab-content">
              <div className="tab-pane fade show active">
                <div className="card no-boxshadow">
                  <div className="card-header main-card-header sub-card-header">
                    <h5>My Forms</h5>
                    <div className="add-btn">
                      <a
                        href={base_url + "/forms/create/"}
                        target="_blank"
                        data-tab="site-popup"
                      >
                        Create New{" "}
                        <span>
                          <i className="la la-plus" />
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className="card-body">
                    <MyformTable
                      OpenTabHandler={this.props.OpenTabHandler}
                      commonPopupHandler={this.props.commonPopupHandler}
                    />
                  </div>
                </div>

                <div className="card no-boxshadow mrt-30">
                  <div className="card-header main-card-header sub-card-header">
                    <h5>Forms Shared With Me</h5>
                  </div>
                  <div className="card-body">
                    <SharedTable
                      OpenTabHandler={this.props.OpenTabHandler}
                      commonPopupHandler={this.props.commonPopupHandler}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MyFormContent;
