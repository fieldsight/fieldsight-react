import React, { Component } from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import "react-perfect-scrollbar/dist/css/styles.css";
import MyFormContent from "./MyFormContent";
import ProjectFormContent from "./ProjectFormContent";

// import MyformTable from '../components/MyForm/MyformTable';
// import UserSelectForm from '../components/MyForm/UserSelectForm';

class SideBar extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="col-xl-3 col-lg-4">
          <div className="left-sidebar new-sidebar sticky-top">
            <div
              className="card no-boxshadow"
              style={{ minHeight: this.props.height }}
            >
              <div className="card-header main-card-header sub-card-header">
                <h5>Forms</h5>
              </div>
              <div className="card-body">
                <ul
                  className="nav nav-tabs flex-column border-tabs"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item">
                    <Link
                      to="/"
                      className={
                        this.props.location.pathname == "/"
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      My Form
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/projectform"
                      className={
                        this.props.location.pathname == "/projectform"
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      Project Form
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                                            <a className="nav-link " id="site_info_tab" data-toggle="tab" href="#site_info" role="tab" aria-controls="site_info" aria-selected="false">team Form</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link " id="region_manage_tab" data-toggle="tab" href="#region_manage" role="tab" aria-controls="region_manage" aria-selected="true">GLoabal form</a>
                                        </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <MyFormContent
                {...props}
                title="MyFormContent"
                OpenTabHandler={this.props.OpenTabHandler}
                commonPopupHandler={this.props.commonPopupHandler}
              />
            )}
          />

          <Route
            exact
            path="/projectform"
            render={props => (
              <ProjectFormContent
                {...props}
                title="MyFormContent"
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

export default withRouter(SideBar);
