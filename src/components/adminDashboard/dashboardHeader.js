import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
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
    const ManageDropDown = [
      {
        title: 'User',
        link: '#',
      },
      {
        title: 'site',
        link: '#',
      },
      {
        title: 'Progress',
        link: '#',
      },
    ];
    const DataDropDown = [
      {
        title: 'Generate Report',
        link: '#',
      },
      {
        title: 'View Data',
        link: '#',
      },
    ];

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
    } = this.props;

    const countHeader = [
      {
        title: 'Total Site',
        total_sites: `${this.props.total_sites}`,
        link: '#',
      },
      {
        title: 'Total Project',
        total_sites: `${this.props.total_projects}`,
        link: '#',
      },
      {
        title: 'Total User',
        total_sites: `${this.props.total_users}`,
        link: '#',
      },
      {
        title: 'Total Teams',
        total_sites: `${this.props.total_teams}`,
        link: '#',
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
                id="dropdown-Data"
                className="fieldsight-btn"
              >
                <i className="la la-paste" />

                <span>Data</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-right">
                {DataDropDown.map((item, i) => (
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
              {countHeader.map(manage => (
                <a
                  href={manage.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={manage.title}
                >
                  <CountCard
                    countName={manage.title}
                    countNumber={manage.total_sites}
                    icon="la-user"
                    noSubmissionText
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardHeader;
