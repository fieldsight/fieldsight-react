import React, { PureComponent } from 'react';
import { Dropdown } from 'react-bootstrap';
import { AvatarContentLoader } from '../../common/Loader';
import CountCard from '../../common/CountCard';
/* eslint-disable camelcase */

class DashboardHeader extends PureComponent {
  render() {
    const {
      name,
      address,
      logo,
      totalSites,
      totalUser,
      totalProjects,
      totalSubmissions,
      id,
      showContentLoader,
      openModal,
      identifier,
    } = this.props;

    const ManageDropdown = [
      {
        key: 0,
        title: 'users',
        link: `/fieldsight/manage/people/organization/${id}/`,
        id: 'app.users',
      },
      {
        key: 1,
        title: 'projects',
        link: `/fieldsight/application/#/team-projects/${id}`,
        id: 'app.projects',
      },
      {
        key: 2,
        title: `settings`,
        link: `/fieldsight/application/#/team-settings/${id}`,
        id: 'app.setting',
      },
    ];

    return (
      <div className="card mrb-30">
        <div className="card-header main-card-header dashboard-header">
          {showContentLoader ? (
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
                    tabIndex="0"
                    role="button"
                    onKeyDown={() => openModal('Gallery')}
                    className="photo-preview"
                    onClick={() => openModal('Gallery')}
                  >
                    <i className="la la-eye" />
                  </a>
                </figcaption>
              </figure>
              <div className="dash-pf-content">
                {name && <h5>{name}</h5>}
                {address && <span>{address}</span>}
                {/* {region && <span>{region} </span>} */}
                <div className="type-info">
                  {identifier && (
                    <div className="flex">
                      <label>
                        <strong>Identifier :</strong>
                      </label>
                      &nbsp;
                      <span>{identifier}</span>
                    </div>
                  )}
                </div>
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
                {ManageDropdown.map(item => (
                  <Dropdown.Item
                    href={item.link}
                    key={item.key}
                    target="_blank"
                  >
                    {item.title}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="card-body">
          <div className="header-count">
            <a>
              <CountCard
                countName=""
                countNumber={totalSubmissions}
                icon="la-copy"
                // noSubmissionText={true}
              />
            </a>
            <a
              href={`/fieldsight/application/#/team-users/${id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CountCard
                countName="user"
                countNumber={totalUser}
                icon="la-user"
                noSubmissionText
              />
            </a>
            <a
              href={`/fieldsight/application/#/team-projects/${id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CountCard
                countName="project"
                countNumber={totalProjects}
                icon="la la la-server"
                noSubmissionText
              />
            </a>
            <a>
              <CountCard
                countName="site"
                countNumber={totalSites}
                icon="la-map-marker"
                noSubmissionText
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default DashboardHeader;
