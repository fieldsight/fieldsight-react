import React, { Component } from "react";
import { HashRouter as Router } from "react-router-dom";
import setDefault from "../config";
import Settings from "./settings/Settings";
import "../css/bootstrap.min.css";
import "../css/line-awesome.min.css";
import "../scss/style.scss";

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
          <Settings />
        </Router>
      </div>
    );
  }
}
export default App;
