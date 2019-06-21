import React, { Component } from "react";
import { HashRouter as Router } from "react-router-dom";
import Settings from "./Settings";
import "../css/bootstrap.min.css";
// import "../css/main.css"
import "../css/line-awesome.min.css";
import "../scss/style.scss";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
