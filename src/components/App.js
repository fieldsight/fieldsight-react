import React, { Component } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { RegionProvider } from "../context";
import setDefault from "../config";
import Settings from "./settings/Settings";
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
      <div className="App Fade">
        <Router>
          <RegionProvider>
            <Switch>
              <Route
                path="/project-settings"
                render={props => <Settings {...props} />}
              />
            </Switch>
            <ToastContainer />
          </RegionProvider>
        </Router>
      </div>
    );
  }
}
export default App;
