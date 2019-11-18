import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

const sideNavRoutes = [
  { to: '/general', path: '/general', title: 'General Forms' },
  { to: '/scheduled', path: '/scheduled', title: 'Scheduled Forms' },
  { to: '/stage', path: '/stage', title: 'Stage Form' },
];

const viewByStatus = [
  {
    to: '/rejected',
    path: '/rejected',
    title: 'Rejected Submission',
  },
  { to: '/flagged', path: '/flagged', title: 'Flagged Submission' },
  { to: '/pending', path: '/pending', title: 'Pending Submission' },
  {
    to: '/approved',
    path: '/approved',
    title: 'Approved Submission',
  },
];

class ManageFormSetting extends Component {
  render() {
    const {
      location: { pathname },
      match: {
        params: { id },
      },
      show_submission,
    } = this.props;

    return (
      <>
        {!show_submission && (
          <ul className="nav nav-tabs flex-column border-tabs">
            {sideNavRoutes.map((route, i) => (
              <li className="nav-item" key={i}>
                <Link
                  to={`/site-responses/${id}${route.to}`}
                  className={
                    pathname == `/site-responses/${id}${route.path}`
                      ? 'nav-link active'
                      : 'nav-link'
                  }
                >
                  {route.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {show_submission && (
          <ul className="nav nav-tabs flex-column border-tabs">
            {viewByStatus.map((route, i) => (
              <li className="nav-item" key={i}>
                <Link
                  to={`/site-responses/${id}${route.to}`}
                  className={
                    pathname == `/site-responses/${id}${route.path}`
                      ? 'nav-link active'
                      : 'nav-link'
                  }
                >
                  {route.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default withRouter(ManageFormSetting);
