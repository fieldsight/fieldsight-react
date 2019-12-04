import React, { Component } from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";

import General from "./General";
import Scheduled from "./Scheduled";
import Staged from "./Staged";
import GeneralSurvey from "./GeneralSurvey";

class SideNav extends Component {
  componentDidMount() {
    const {
      match: {
        url
        // param: { id }
      },
      location: { pathname },
      handleBreadCrumb
    } = this.props;

    console.log(this.props);
  }
  render() {
    const {
      match: {
        url,
        params: { id }
      },
      location: { pathname },
      handleBreadCrumb,
      showViewData,
      view_btn
    } = this.props;

    console.log(this.props);

    return (
      <>
        <div className="col-xl-3 col-lg-4">
          <div className="left-sidebar new-sidebar sticky-top">
            <div
              className="card no-boxshadow"
              style={{ minHeight: this.props.height }}
            >
              <div className="card-header main-card-header">
                <h5>View Data</h5>
              </div>
              <div className="card-body">
                <div className="manage_group">
                  <h5>Site-Specific Forms</h5>
                  <ul className="nav nav-tabs flex-column border-tabs">
                    <li className="nav-item">
                      <Link
                        to={`${url}/general`}
                        className={
                          pathname == `${url}/general`
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        General forms
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={`${url}/scheduled`}
                        className={
                          pathname == `${url}/scheduled`
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        Scheduled forms
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={`${url}/stage`}
                        className={
                          pathname == `${url}/stage`
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
                  <h5>Project-Wide Forms</h5>
                  <ul
                    className="nav nav-tabs flex-column border-tabs"
                    id="myTab"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <Link
                        to={`${url}/general-survey`}
                        className={
                          pathname == `${url}/general-survey`
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
        <div className="col-xl-9 col-lg-8">
          <div className="right-content">
            <div className="card">
              <div className="tab-content">
                <Switch>
                  <Route
                    exact
                    path={`${this.props.match.url}/general`}
                    render={props => (
                      <General
                        showViewData={showViewData}
                        data={view_btn}
                        id={id}
                        url={url}
                        handleBreadCrumb={handleBreadCrumb}
                        {...props}
                      />
                    )}
                  />

                  <Route
                    path={`${this.props.match.url}/scheduled`}
                    render={props => (
                      <Scheduled
                        showViewData={showViewData}
                        data={view_btn}
                        id={id}
                        url={url}
                        handleBreadCrumb={handleBreadCrumb}
                        {...props}
                      />
                    )}
                  />
                  <Route
                    path={`${this.props.match.url}/stage`}
                    render={props => (
                      <Staged
                        showViewData={showViewData}
                        data={view_btn}
                        id={id}
                        url={url}
                        handleBreadCrumb={handleBreadCrumb}
                        {...props}
                      />
                    )}
                  />

                  <Route
                    path={`${this.props.match.url}/general-survey`}
                    render={props => (
                      <GeneralSurvey
                        showViewData={showViewData}
                        data={view_btn}
                        id={id}
                        url={url}
                        handleBreadCrumb={handleBreadCrumb}
                        {...props}
                      />
                    )}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(SideNav);
