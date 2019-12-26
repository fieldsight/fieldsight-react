import React, { Component } from 'react';
import RightContent from './rightContent';

export default class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navlink: false,
    };
  }

  handleLink = () => {
    this.setState(preState => ({
      navlink: !preState.navlink,
    }));
  };

  render() {
    const { navlink } = this.state;
    return (
      <div className="row">
        <div className="col-xl-3 col-lg-4">
          <div className="left-sidebar new-sidebar sticky-top">
            <div className="card no-boxshadow">
              <div className="card-body">
                <ul
                  className="nav nav-tabs flex-column border-tabs"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className={
                        !navlink ? 'nav-link active' : 'nav-link'
                      }
                      id="region_tab"
                      data-toggle="tab"
                      //   href="#region"
                      role="button"
                      //   aria-controls="region_type"
                      //   aria-selected={navlink}
                      onClick={this.handleLink}
                      onKeyDown={this.handleLink}
                      tabIndex="0"
                    >
                      Assign Team Admins
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={
                        navlink ? 'nav-link active' : 'nav-link'
                      }
                      id="sites_tab"
                      data-toggle="tab"
                      //   href="#sites"
                      role="tab"
                      aria-controls="sites"
                      aria-selected="true"
                      onClick={this.handleLink}
                      onKeyDown={this.handleLink}
                      tabIndex="0"
                    >
                      Assign Project Managers
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <RightContent navlink={navlink} />
      </div>
    );
  }
}
