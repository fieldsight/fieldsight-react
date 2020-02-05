import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SuperAdminFormEdit from '../../superAdminEdit';
import LeftSideBar from './leftSideBar';
import Teams from './teams';
import MyForm from './myForms';
import Library from './library';
import { RegionProvider } from '../../../context';

export default class SuperAdminSetting extends Component {
  constructor(props) {
    super(props);
    this.state = { orgName: '' };
  }

  reqOrgName = name => {
    this.setState({
      orgName: name,
    });
  };

  render() {
    const {
      match: {
        url,
        params: { id },
      },
    } = this.props;
    const { orgName } = this.state;

    return (
      <RegionProvider>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item ">
              <a
                href={`/fieldsight/application/#/organization-dashboard/${id}`}
                style={{ color: '#00628E' }}
              >
                {orgName}
              </a>
            </li>

            <li className="breadcrumb-item" aria-current="page">
              Organization Settings
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="  col-xl-3 col-lg-4">
            <div className="left-sidebar new-sidebar sticky-top">
              <div className="card">
                <div className="card-header main-card-header">
                  <h5>Manage</h5>
                </div>
                <div className="card-body">
                  <LeftSideBar pathname={this.props} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="right-content">
              <div className="tab-content">
                <Switch>
                  <Route
                    exact
                    path={`${url}`}
                    render={props => (
                      <SuperAdminFormEdit
                        id={id}
                        {...props}
                        reqOrgName={this.reqOrgName}
                      />
                    )}
                  />
                  <Route
                    path={`${url}/teams`}
                    render={props => <Teams {...props} id={id} />}
                  />

                  <Route
                    path={`${url}/my-form`}
                    render={props => <MyForm {...props} id={id} />}
                  />

                  <Route
                    path={`${url}/library`}
                    render={props => <Library {...props} id={id} />}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </RegionProvider>
    );
  }
}
