import React, { Component } from 'react';
import Roles from './roles';
import Activities from './activities';

export default class RightSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rolebutton: false,
      activitiesButton: true,
    };
  }

  handleActivities = () => {
    this.setState(prevState => ({
      activitiesButton: !prevState.activitiesButton,
      rolebutton: !prevState.rolebutton,
    }));
  };

  handleRoles = () => {
    this.setState(prevState => ({
      rolebutton: !prevState.rolebutton,
      activitiesButton: !prevState.activitiesButton,
    }));
  };

  render() {
    const { rolebutton, activitiesButton } = this.state;
    return (
      <div className="card">
        <div className="card-header main-card-header tab-header">
          <ul className="nav nav-tabs " id="myTab" role="tablist">
            <li className="nav-item">
              <a
                className={
                  rolebutton ? 'nav-link acive show' : 'nav-link'
                }
                id="role_tab"
                data-toggle="tab"
                tabIndex="0"
                onKeyDown={this.handleRoles}
                role="button"
                // aria-controls="role"
                // aria-selected="false"
                onClick={this.handleRoles}
              >
                Roles
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  activitiesButton
                    ? 'nav-link active show'
                    : 'nav-link'
                }
                id="activities_tab"
                data-toggle="tab"
                tabIndex="0"
                onKeyDown={this.handleActivities}
                role="button"
                // aria-controls="activities"
                // aria-selected="true"
                onClick={this.handleActivities}
              >
                Activities
              </a>
            </li>
          </ul>
        </div>
        <div className="card-body pdt-0">
          <div className="tab-content mrt-30" id="myTabContent">
            {rolebutton && <Roles rolebutton={rolebutton} />}
            {activitiesButton && (
              <Activities activitiesButton={activitiesButton} />
            )}
          </div>
        </div>
      </div>
    );
  }
}
