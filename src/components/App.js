
import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";


const Navbar = () => {
  return (
    <div>
      <Link to="/about" replace>About</Link>
      <Link to="/contact" replace>Contact</Link>
    </div>
  )
}

const HomePage = () => <h1>Home Page</h1>

const AboutPage = () => (
  <div>
    <h1>About Page</h1>
    <img alt="header" src="/dist/images/header.jpg" className="app-header" />
  </div>)

const ContactPage = () => <h1>Contact Page</h1>

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App Fade">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/contact" component={ContactPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
