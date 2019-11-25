import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import Logo from "../../static/images/logo.png";
import Profile from "../../static/images/profile.png";
import ListTask from "./listTask";
import Notifications from "./notifications";
import MyProfile from "./profile";

export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showTaskList: false
    };
  }

  handleTaskList = () => {
    this.setState(({ showTaskList }) => ({
      showTaskList: !showTaskList
    }));
  };

  render() {
    const { toggleClass, handleToggle } = this.props;
    const { showTaskList } = this.state;
    return (
      <header className="site-header">
        <div className="container-fluid">
          <div className="header-wrapper">
            <div className="header-left flex-between">
              <a href="#" className="fieldsight-logo">
                <img src={Logo} alt="fieldsight logo" />
              </a>
              <a
                className={`toggle-menu ${toggleClass ? "active" : ""}`}
                role="button"
                onClick={handleToggle}
              >
                <i className="la la-bars" />
              </a>
            </div>
            <div className="header-right">
              <div className="nav navbar-nav">
                <Dropdown>
                  <Dropdown.Toggle
                    variant=""
                    id="dropdown-Task"
                    className="fieldsight-btn"
                  >
                    <i className="la la-file-alt" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu-right dropdown-animation">
                    <ListTask />
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle
                    variant=""
                    id="dropdown-notification"
                    className="fieldsight-btn"
                  >
                    <i className="la la-bell" />
                    <sup className="notify">10</sup>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu-right">
                    <Notifications />
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle
                    variant=""
                    id="dropdown-user-menu"
                    className="fieldsight-btn"
                  >
                    <>
                      <figure>
                        <img
                          src={Profile}
                          className="user-image"
                          alt="User Profile"
                        />
                      </figure>
                      <div className="user-info">
                        <h6>Sam Shayesta</h6>
                      </div>
                    </>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu-right">
                    <MyProfile />
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
