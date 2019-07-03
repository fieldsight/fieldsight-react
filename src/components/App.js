import React, { Component } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { RegionProvider } from "../context";
import setDefault from "../config";
import Settings from "./settings/Settings";
import MyForm from "./myForm/MyformMain";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
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
      <div id="fieldsight-new" className="fieldsight-new">
        <div id="main-container">
          <div className="container-fluid">
            <main id="main-content">
              <Router>
                <RegionProvider>
                  <Switch>
                    <Route
                      path="/project-settings"
                      render={props => <Settings {...props} />}
                    />
                    <Route
                      path="/forms"
                      render={props => <MyForm {...props} />}
                    />
                  </Switch>
                  <ToastContainer />
                </RegionProvider>
              </Router>
            </main>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
