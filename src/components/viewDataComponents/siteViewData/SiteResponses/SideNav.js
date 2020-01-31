import React, { PureComponent } from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import General from './General';
import Scheduled from './Scheduled';
import Staged from './Staged';

class SideNav extends PureComponent {
  render() {
    const {
      match: {
        url,
        params: { id },
      },
      location: { pathname },
      handleBreadCrumb,
    } = this.props;

    return (
      <>
        <div className="col-xl-3 col-lg-4">
          <div className="left-sidebar new-sidebar sticky-top">
            <div
              className="card no-boxshadow"
              // style={{ minHeight: this.props.height }}
            >
              <div className="card-header main-card-header">
                <h5>
                  {' '}
                  <FormattedMessage
                    id="app.view-data"
                    defaultMessage="View Data"
                  />
                </h5>
              </div>
              <div className="card-body">
                <div className="manage_group">
                  <ul className="nav nav-tabs flex-column border-tabs">
                    <li className="nav-item">
                      <Link
                        to={`${url}/general`}
                        className={
                          pathname === `${url}/general`
                            ? 'nav-link active'
                            : 'nav-link'
                        }
                      >
                        <FormattedMessage
                          id="app.general-forms"
                          defaultMessage="General forms"
                        />
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={`${url}/scheduled`}
                        className={
                          pathname === `${url}/scheduled`
                            ? 'nav-link active'
                            : 'nav-link'
                        }
                      >
                        <FormattedMessage
                          id="app.scheduled-form"
                          defaultMessage="Scheduled forms"
                        />
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={`${url}/stage`}
                        className={
                          pathname === `${url}/stage`
                            ? 'nav-link active'
                            : 'nav-link'
                        }
                      >
                        <FormattedMessage
                          id="app.staged-form"
                          defaultMessage="Staged forms"
                        />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-lg-8">
          <div className="right-content">
            <div className="card">
              <div className="tab-content">
                <Switch>
                  <Route
                    exact
                    path={`${url}/general`}
                    render={props => (
                      <General
                        id={id}
                        url={url}
                        handleBreadCrumb={handleBreadCrumb}
                        {...props}
                      />
                    )}
                  />

                  <Route
                    path={`${url}/scheduled`}
                    render={props => (
                      <Scheduled
                        id={id}
                        url={url}
                        handleBreadCrumb={handleBreadCrumb}
                        {...props}
                      />
                    )}
                  />
                  <Route
                    path={`${url}/stage`}
                    render={props => (
                      <Staged
                        id={id}
                        url={url}
                        handleBreadCrumb={handleBreadCrumb}
                        {...props}
                      />
                    )}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(SideNav);
