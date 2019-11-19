import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
/* eslint-disable camelcase */

const sideNavRoutes = [
  {
    key: 0,
    to: '/general',
    path: '/general',
    title: 'General Forms',
  },
  {
    key: 1,
    to: '/scheduled',
    path: '/scheduled',
    title: 'Scheduled Forms',
  },
  { key: 2, to: '/stage', path: '/stage', title: 'Staged Forms' },
];
const site_specific_forms = [
  {
    key: 0,
    to: '/general-survey',
    path: '/general-survey',
    title: 'General Forms',
  },
];

const viewByStatus = [
  {
    key: 0,
    to: '/rejected',
    path: '/rejected',
    title: 'Rejected Submissions',
  },
  {
    key: 1,
    to: '/flagged',
    path: '/flagged',
    title: 'Flagged Submissions',
  },
  {
    key: 2,
    to: '/pending',
    path: '/pending',
    title: 'Pending Submissions',
  },
  {
    key: 3,
    to: '/approved',
    path: '/approved',
    title: 'Approved Submissions',
  },
];

class ManageFormSetting extends PureComponent {
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
          <>
            <div className="manage_group">
              <h5>Site Specific Forms</h5>
              <ul className="nav nav-tabs flex-column border-tabs">
                {sideNavRoutes.map(route => (
                  <li className="nav-item" key={route.key}>
                    <Link
                      to={`/project-responses/${id}${route.to}`}
                      className={
                        pathname ===
                        `/project-responses/${id}${route.path}`
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                    >
                      {route.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="manage_group mrt-15">
              <h5>Project wide Forms</h5>
              <ul className="nav nav-tabs flex-column border-tabs">
                {site_specific_forms.map(route => (
                  <li className="nav-item" key={route.key}>
                    <Link
                      to={`/project-responses/${id}${route.to}`}
                      className={
                        pathname ===
                        `/project-responses/${id}${route.path}`
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                    >
                      {route.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        {!!show_submission && (
          <ul className="nav nav-tabs flex-column border-tabs">
            {viewByStatus.map(route => (
              <li className="nav-item" key={route.key}>
                <Link
                  to={`/project-responses/${id}${route.to}`}
                  className={
                    pathname ===
                    `/project-responses/${id}${route.path}`
                      ? 'nav-link active'
                      : 'nav-link'
                  }
                >
                  {route.title}
                </Link>
                <h5>{route.heading}</h5>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}
ManageFormSetting.propTypes = {
  location: PropTypes.objectOf.isRequired,
  match: PropTypes.objectOf.isRequired,
  show_submission: PropTypes.bool.isRequired,
};

export default withRouter(ManageFormSetting);
