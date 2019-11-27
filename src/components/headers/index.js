import React, { Component } from "react";
import { connect } from "react-redux";
import { Dropdown } from "react-bootstrap";
import {
  getMyTask,
  getOtherTask,
  getNotifications
} from "../../actions/headerNavActions";
import Logo from "../../static/images/logo.png";
import Profile from "../../static/images/profile.png";
import ListTask from "./listTask";
import NotificationHandler from "./NotificationHandler";
import MyProfile from "./profile";

const userId = window.user_id ? window.user_id : 1;
const taskCount = window.task_count ? window.task_count : 0;
const notificationCount = window.notification_count ? window.notification_count : 0;

export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showTaskList: false,
      myTasks: [],
      otherTasks: [],
      notifications: [],
      showContentLoader: false
    };
  }

  componentWillMount() {
    this.props.getMyTask();
    this.props.getOtherTask();
    this.props.getNotifications();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.headerNavData.myTasks !== this.props.headerNavData.myTasks) {
      this.setState({ myTasks: nextProps.headerNavData.myTasks });
    }
    if (
      nextProps.headerNavData.otherTasks !== this.props.headerNavData.otherTasks
    ) {
      this.setState({ otherTasks: nextProps.headerNavData.otherTasks });
    }
    if (
      nextProps.headerNavData.notifications !==
      this.props.headerNavData.notifications
    ) {
      this.setState({ notifications: nextProps.headerNavData.notifications });
    }
    if (
      nextProps.headerNavData.navLoader !== this.props.headerNavData.navLoader
    ) {
      this.setState({ showContentLoader: nextProps.headerNavData.navLoader });
    }

  }

  handleTaskList = () => {
    this.setState(({ showTaskList }) => ({
      showTaskList: !showTaskList
    }));
  };

  handleDownloadFile = file => {
    const decodeurl = decodeURI(file)
    const spliturl = decodeurl.split("/")
    const len = spliturl.length
    const fileName = spliturl[len - 1]
    const url = window.URL.createObjectURL(new Blob([file]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  }

  render() {
    const { toggleClass, handleToggle } = this.props;
    const { myTasks, otherTasks, notifications, showContentLoader } = this.state;

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
                    <sup className="notify">{taskCount}</sup>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu-right dropdown-animation">
                    <ListTask myTasks={myTasks} otherTasks={otherTasks}
                      showContentLoader={showContentLoader} handleDownloadFile={this.handleDownloadFile} />
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle
                    variant=""
                    id="dropdown-notification"
                    className="fieldsight-btn"
                  >
                    <i className="la la-bell" />
                    <sup className="notify">{notificationCount}</sup>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu-right">
                    <NotificationHandler notifications={notifications}
                      showContentLoader={showContentLoader} userId={userId}
                      handleDownloadFile={this.handleDownloadFile} />
                    <div className="dropdown-footer">
                      <a className="text-center" >
                        <span>View All</span>
                        <span>Mark all as seen</span> </a>
                    </div>
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
                    <MyProfile userId={userId} />
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
const mapStateToProps = ({ headerNavData }) => ({
  headerNavData
});

export default connect(mapStateToProps, {
  getMyTask,
  getOtherTask,
  getNotifications
})(Header);
