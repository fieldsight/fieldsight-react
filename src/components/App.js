import React, { Component } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import setDefault from "../config";
import Settings from "./settings/Settings";
import MyForm from "./myForm/MyformMain";
import SiteDashboard from "./siteDashboard/SiteDashboard";
import SiteList from "./projectSiteList/SiteList";
import SubmissionDetails from "./submissionDetails";

import store from "../store";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "../css/line-awesome.min.css";
import "../scss/style.scss";
import "../css/custom.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    setDefault();
  }

  render() {
    return (
      <Provider store={store}>
        <div id="fieldsight-new" className="fieldsight-new">
          <div id="main-container">
            <div className="container-fluid">
              <main id="main-content">
                <Router>
                  <Switch>
                    <Route
                      path="/project-settings"
                      render={props => <Settings {...props} />}
                    />
                    <Route
                      path="/forms"
                      render={props => <MyForm {...props} />}
                    />
                    <Route
                      path="/project-sitelist"
                      render={props => <SiteList {...props} />}
                    />

                    <Route
                      path="/submission-details/:submissionId"
                      render={props => <SubmissionDetails {...props} />}
                    />

                    <Route
                      path="/site-dashboard"
                      render={props => <SiteDashboard {...props} />}
                    />
                  </Switch>
                  <ToastContainer />
                </Router>
              </main>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}
export default App;
