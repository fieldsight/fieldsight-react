import React, { Component } from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import "react-perfect-scrollbar/dist/css/styles.css";
import GeneralForms from "./GeneralForms";
import ScheduleForms from "./ScheduleForms";
import StageForms from "./StageForms";

class SideNav extends Component {
  render() {
    const {
      match: { path, url }
    } = this.props;

    return (
      <React.Fragment>
        <div className="col-xl-3 col-lg-4">
          <div className="left-sidebar new-sidebar sticky-top">
            <div
              className="card no-boxshadow"
              style={{ minHeight: this.props.height }}
            >
              <div className="card-header main-card-header">
                <h5>Manage Forms</h5>
              </div>
              <div className="card-body">
                <div className="manage_group">
                  <h5>Site Specific Forms</h5>
                  <ul
                    className="nav nav-tabs flex-column border-tabs"
                    id="myTab"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <Link
                        to={`${url}/generalform`}
                        className={
                          this.props.location.pathname == `${url}/generalform`
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        General forms
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={`${url}/scheduleform`}
                        className={
                          this.props.location.pathname == `${url}/scheduleform`
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        Scheduled forms
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={`${url}/stageform`}
                        className={
                          this.props.location.pathname == `${url}/stageform`
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        Staged forms
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="manage_group mrt-15">
                  <h5>Project wide Forms</h5>
                  <ul
                    className="nav nav-tabs flex-column border-tabs"
                    id="myTab"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <Link
                        to={`${url}/wide/generalform`}
                        className={
                          this.props.location.pathname ==
                          `${url}/wide/generalform`
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        General forms
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Switch>
          <Route
            exact
            path={`${path}/generalform`}
            render={props => (
              <GeneralForms
                {...props}
                title="GeneralForms"
                OpenTabHandler={this.props.OpenTabHandler}
                commonPopupHandler={this.props.commonPopupHandler}
                closePopup={this.props.closePopup}
                popupModal={this.props.popupModal}
              />
            )}
          />

          <Route
            exact
            path={`${path}/scheduleform`}
            render={props => (
              <ScheduleForms
                {...props}
                title="ScheduleForms"
                OpenTabHandler={this.props.OpenTabHandler}
                commonPopupHandler={this.props.commonPopupHandler}
              />
            )}
          />

          <Route
            exact
            path={`${path}/stageform`}
            render={props => (
              <StageForms
                {...props}
                title="StageForms"
                OpenTabHandler={this.props.OpenTabHandler}
                commonPopupHandler={this.props.commonPopupHandler}
              />
            )}
          />

          <Route
            exact
            path={`${path}/wide/generalform`}
            render={props => (
              <GeneralForms
                {...props}
                title="GeneralForms"
                OpenTabHandler={this.props.OpenTabHandler}
                commonPopupHandler={this.props.commonPopupHandler}
              />
            )}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(SideNav);
