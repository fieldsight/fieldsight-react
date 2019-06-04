
import React, { Component } from 'react';
import { HashRouter as Router } from "react-router-dom";
import Settings from './Settings'
// import "font-awesome/css/font-awesome.min.css"
import "../css/line-awesome.min.css"
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
