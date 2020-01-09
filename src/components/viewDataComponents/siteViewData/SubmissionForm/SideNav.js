import React, { PureComponent } from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import ApprovedTable from './Approved';
import PendingTable from './Pending';
import RejectedTable from './Rejected';
import FlaggedTable from './Flagged';

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
                        to={`${url}/rejected`}
                        className={
                          pathname === `${url}/rejected`
                            ? 'nav-link active'
                            : 'nav-link'
                        }
                      >
                        <FormattedMessage
                          id="app.rejected-submissions"
                          defaultMessage="Rejected Submissions"
                        />
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={`${url}/flagged`}
                        className={
                          pathname === `${url}/flagged`
                            ? 'nav-link active'
                            : 'nav-link'
                        }
                      >
                        <FormattedMessage
                          id="app.flagged-submissions"
                          defaultMessage="Flagged Submissions"
                        />
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={`${url}/pending`}
                        className={
                          pathname === `${url}/pending`
                            ? 'nav-link active'
                            : 'nav-link'
                        }
                      >
                        <FormattedMessage
                          id="app.pending-submissions"
                          defaultMessage="Pending Submissions"
                        />
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={`${url}/approved`}
                        className={
                          pathname === `${url}/approved`
                            ? 'nav-link active'
                            : 'nav-link'
                        }
                      >
                        <FormattedMessage
                          id="app.approved-submissions"
                          defaultMessage="Approved Submissions"
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
                    path={`${url}/approved`}
                    render={props => (
                      <ApprovedTable
                        id={id}
                        handleBreadCrumb={handleBreadCrumb}
                        url={url}
                        {...props}
                      />
                    )}
                  />

                  <Route
                    path={`${url}/flagged`}
                    render={props => (
                      <FlaggedTable
                        id={id}
                        handleBreadCrumb={handleBreadCrumb}
                        url={url}
                        {...props}
                      />
                    )}
                  />
                  <Route
                    path={`${url}/pending`}
                    render={props => (
                      <PendingTable
                        id={id}
                        handleBreadCrumb={handleBreadCrumb}
                        url={url}
                        {...props}
                      />
                    )}
                  />

                  <Route
                    path={`${url}/rejected`}
                    render={props => (
                      <RejectedTable
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
