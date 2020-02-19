import React, { PureComponent } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { getType } from '../MyReports';

const formatDate = e => {
  const date = new Date(e);
  const dateIdx = date.getDate();
  const monthIndex = date.getMonth() + 1;
  const year = date.getFullYear();
  const time = date.toLocaleTimeString();

  return (
    <>
      <p>{` ${year}- ${monthIndex}-${dateIdx}`}</p>
      <p>{time}</p>
    </>
  );
};

export default class CustomTemplate extends PureComponent {
  render() {
    const { customReports, customReporthandler, id } = this.props;
    const CustomCrude = [
      {
        id: '1',
        title: 'Edit',
        link: '',
      },
    ];

    return (
      <div className="custom-template">
        <h2 className="my-3">custom</h2>
        {customReports !== undefined &&
          customReports.length > 0 &&
          customReports.map(custom => (
            <div className="report-list" key={custom.id}>
              <div className="row">
                <div className="col-md-8">
                  <div className="report-content">
                    <Link to={`/view-report/${id}/${custom.id}`}>
                      <h4>{custom.title}</h4>
                      {/* <p>{custom.description}</p> */}
                      <div className="summary-content">
                        <p>
                          <b>Report Type</b>
                          <span>{getType(custom.type)}</span>
                        </p>
                        <p>
                          <b>no. of columns</b>
                          <span>{custom.datapoints}</span>
                        </p>
                        {custom.report_sync_settings
                          .schedule_type && (
                          <p>
                            <b>Schedule Type</b>
                            <span>
                              {
                                custom.report_sync_settings
                                  .schedule_type
                              }
                            </span>
                          </p>
                        )}
                        {custom.report_sync_settings
                          .last_synced_date && (
                          <p>
                            <b>Last Synced Date</b>
                            <span>
                              {formatDate(
                                custom.report_sync_settings
                                  .last_synced_date,
                              )}
                            </span>
                          </p>
                        )}
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="report-share-time">
                    <div className="report-item created-time">
                      <h6>Date Created</h6>
                      <>{formatDate(custom.created_at)}</>
                    </div>
                    <div className="report-item share-report">
                      <h6>Added by</h6>
                      <ul className="shared-list">
                        <li>{custom.owner_full_name}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dropdown report-option">
                <Dropdown drop="left">
                  <Dropdown.Toggle
                    variant=""
                    id="dropdown-Data"
                    className="dropdown-toggle common-button no-border is-icon"
                  >
                    <i className="material-icons">more_vert</i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                    {CustomCrude.map(item => (
                      <Dropdown.Item
                        key={custom.id}
                        onClick={() => {
                          customReporthandler(custom.id);
                        }}
                      >
                        {item.title}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          ))}
      </div>
    );
  }
}
