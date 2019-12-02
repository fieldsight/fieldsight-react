import React, { Component } from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import "react-perfect-scrollbar/dist/css/styles.css";
import MyFormContent from "./MyFormContent";
import ProjectFormContent from "./ProjectFormContent";

// import MyformTable from '../components/MyForm/MyformTable';
// import UserSelectForm from '../components/MyForm/UserSelectForm';

class SideBar extends Component {
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
                      to={`${url}/myform`}
                      className={
                        this.props.location.pathname == `${url}/myform`
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      My Forms
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={`${url}/projectform`}
                      className={
                        this.props.location.pathname == `${url}/projectform`
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      Project Forms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Switch>
          <Route
            exact
            path={`${path}/myform`}
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
            path={`${path}/projectform`}
            render={props => (
              <ProjectFormContent
                {...props}
                title="ProjectFormContent"
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
