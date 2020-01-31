import React, { PureComponent } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import MyForm from './myForm';
import ProjectFormTable from './projectForm';
import TeamForm from './teamForm';
import GlobalFormTable from './globalForm';

export default class SideNav extends PureComponent {
  render() {
    const {
      props: {
        match: { path, url },
        location: { pathname },
      },
    } = this.props;

    return (
      <>
        <div className="col-xl-3 col-lg-4">
          <div className="left-sidebar new-sidebar sticky-top">
            <div className="card no-boxshadow">
              <div className="card-header main-card-header sub-card-header">
                <h5>Forms</h5>
              </div>
              <div className="card-body">
                <ul
                  className="nav nav-tabs flex-column border-tabs"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item">
                    <Link
                      to={`${url}/my-form`}
                      className={
                        pathname === `${url}/my-form`
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                    >
                      My Forms
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={`${url}/project-form`}
                      className={
                        pathname === `${url}/project-form`
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                    >
                      Project Forms
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={`${url}/team-form`}
                      className={
                        pathname === `${url}/team-form`
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                    >
                      Team Forms
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={`${url}/global-form`}
                      className={
                        pathname === `${url}/global-form`
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                    >
                      Global Forms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-lg-8">
          <div className="right-content">
            <Switch>
              <Route
                exact
                path={`${path}/my-form`}
                render={props => <MyForm {...props} />}
              />
              <Route
                exact
                path={`${path}/project-form`}
                render={props => <ProjectFormTable {...props} />}
              />
              <Route
                exact
                path={`${path}/team-form`}
                render={props => <TeamForm {...props} />}
              />
              <Route
                exact
                path={`${path}/global-form`}
                render={props => <GlobalFormTable {...props} />}
              />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}
