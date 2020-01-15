import React, { PureComponent } from 'react';
import { Dropdown } from 'react-bootstrap';
import CountCard from '../common/CountCard';
import { AvatarContentLoader } from '../common/Loader';

/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */

class DashboardHeader extends PureComponent {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     showContentLoader: false,
  //     logo: '',
  //   };
  // }

  openModal = () => {};

  render() {
    const {
      name,
      phone,
      country,
      additional_desc,
      logo,
      showContentLoader,
      total_sites,
      total_projects,
      total_users,
      superAdminId,
      total_teams,
    } = this.props;
    const ManageDropDown = [
      {
        title: 'Users',
        link: `/fieldsight/manage/people/organization-users/${superAdminId}/`,
      },
      {
        title: 'Settings',
        link: `/fieldsight/application/#/organization-settings/${superAdminId}`,
      },
    ];

    const countHeader = [
      {
        title: 'Total Team',
        total_sites: `${total_teams}`,
        link: `/fieldsight/application/#/organization-teams/${superAdminId}`,
        icon: 'la-users',
      },
      {
        title: 'Total Project',
        total_sites: `${total_projects}`,
        link: `/fieldsight/application/#/organization-projects/${superAdminId}`,
        icon: 'la la la la-server',
      },
      {
        title: 'Total Site',
        total_sites: `${total_sites}`,
        icon: 'la la-map-marker',
      },

      {
        title: 'Total User',
        total_sites: `${total_users}`,
        link: `/fieldsight/application/#/organization-users/${superAdminId}`,
        icon: 'la-user',
      },
    ];
    return (
      <div className="card mrb-30">
        <div className="card-header main-card-header dashboard-header">
          {showContentLoader === false ? (
            <AvatarContentLoader number={1} width="300px" size="80" />
          ) : (
            <div className="dash-pf">
              <figure
                style={{
                  backgroundImage: `url(${logo})`,
                  width: '80px',
                }}
              >
                <span />
                <figcaption>
                  <a
                    onKeyDown={() => {
                      this.openModal('Gallery');
                    }}
                    tabIndex="0"
                    role="button"
                    className="photo-preview"
                    onClick={() => {
                      this.openModal('Gallery');
                    }}
                  >
                    <i className="la la-eye" />
                  </a>
                </figcaption>
              </figure>
              <div className="dash-pf-content">
                {name && <h5>{name}</h5>}
                &nbsp;&nbsp;&nbsp;
                {phone && <span>{phone}</span>}
                &nbsp;&nbsp;&nbsp;
                {country && <span>{country}</span>}
                &nbsp;&nbsp;&nbsp;
                {additional_desc && <span>{additional_desc}</span>}
              </div>
            </div>
          )}
          <div className="dash-btn">
            <Dropdown>
              <Dropdown.Toggle
                variant=""
                id="dropdown-Manage"
                className="fieldsight-btn"
              >
                <i className="la la-cog" />

                <span>Manage</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-right">
                {ManageDropDown.map((item, i) => (
                  <Dropdown.Item
                    href={item.link}
                    key={i}
                    target="_blank"
                  >
                    {item.title}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="card-body dashboard-header-bottom">
          <div className="flex-between">
            <div className="header-count">
              {countHeader.map(manage =>
                manage.link ? (
                  <a
                    href={manage.link && manage.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={manage.title}
                  >
                    <CountCard
                      countName={manage.title}
                      countNumber={manage.total_sites}
                      icon={manage.icon}
                      noSubmissionText
                    />
                  </a>
                ) : (
                  <CountCard
                    countName={manage.title}
                    countNumber={manage.total_sites}
                    icon={manage.icon}
                    noSubmissionText
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardHeader;
