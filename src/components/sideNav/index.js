import React, { Component } from "react";

const mainMenu = [
  {
    key: 0,
    name: "Dashboard",
    value: "dashboard",
    path: "/fieldsight.naxa.com.np/fieldsight/application/#/my-roles",
    icon: "la la-dashboard"
  },
  {
    key: 1,
    name: "Teams",
    value: "teams",
    path: "/fieldsight/application/#/teams",
    icon: "la la-building"
  },
  {
    key: 2,
    name: "Staff Projects",
    value: "staff_projects",
    path: "/staff/staff-project-list/",
    icon: "la la-file-text"
  },
  { key: 3, name: "Forms", value: "forms", path: "", icon: "la la-file-text" }
];

const formSubMenu = [
  { key: 0, name: "Create New", value: "create_new", path: "/forms/create/" },
  {
    key: 1,
    name: "My Forms",
    value: "my_forms",
    path: "/fieldsight/application/#/forms/myform"
  }
];

export class SideNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeMenu: "",
      showSubmenu: false
    };
  }

  handleMenuSelect = menu => {
    const { activeMenu, showSubmenu } = this.state;
    this.setState({ activeMenu: menu }, () => {
      if (activeMenu !== "forms") this.props.handleToggle;
      else {
        this.setState({ showSubmenu: !showSubmenu });
      }
    });
  };

  render() {
    const { activeMenu, showSubmenu } = this.state;
    const { handleToggle } = this.props;
    return (
      <div id="sidebar" data-toggle="affix" className="main-sidebar sticky">
        <div
          className="leftside-navigation"
          // style={{ overflow: "hidden", outline: "none" }}
        >
          <ul className="sidebar-menu" id="nav-accordion">
            {mainMenu.map(menu => (
              // if (menu.value !== "forms") {
              //   return (
              <>
                <li>
                  <a
                    className={`${activeMenu === menu.value ? "active" : ""}`}
                    href={menu.value !== "forms" && menu.path}
                    onClick={() => {
                      this.handleMenuSelect();
                    }}
                  >
                    <i className={menu.icon} />
                    <span>{menu.name}</span>
                  </a>
                </li>
                {showSubmenu && (
                  <ul className="sub" style={{ display: "none" }}>
                    {formSubMenu.map(sub => (
                      <li>
                        <a
                          className={`${
                            activeMenu === sub.value ? "active" : ""
                          }`}
                          href={sub.value !== "forms" && sub.path}
                          onClick={() => {
                            this.handleMenuSelect();
                          }}
                        >
                          <i className={sub.icon} />
                          <span>{sub.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ))}
            {/* <li>
              <a className="" href="/">
                <i className="la la-dashboard"></i>
                <span>Dashboard</span>
              </a>
            </li>

            <li className="sub-menu">
              <a href="/fieldsight/application/#/teams" className="active">
                <i className="la la-building"></i>
                <span>Teams</span>
              </a>
            </li>
            <li className="sub-menu">
              <a href="/staff/staff-project-list/">
                <i className="la la-building"></i>
                <span>Staff Projects</span>
              </a>
            </li>

            <li className="sub-menu ">
              <a href="javascript:;" className="">
                <i className="la la-file-text"></i>
                <span>Forms</span>
                <span className="dcjq-icon"></span>
              </a>

              <ul className="sub" style={{ display: "none" }}>
                <li>
                  <a href="/forms/create/">Create New</a>
                </li>

                <li>
                  <a href="/fieldsight/application/#/forms/myform">My Forms</a>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
      </div>
    );
  }
}

export default SideNav;
