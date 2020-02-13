import React, { PureComponent } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Dropdown } from 'react-bootstrap';
import { format } from 'date-fns';
import { BlockContentLoader } from '../../common/Loader';

/* eslint-disable */

export default class FormTemplate extends PureComponent {
  render() {
    const {
      id,
      general,
      generalhandle,
      formLoader,
      generalData,
      generalLinkhandle,
      projectCreatedOn,
      scheduledhandle,
      scheduled,
      scheduledLoader,
      scheduledData,
      surveyhandle,
      survey,
      surveyLoader,
      surveyData,
      stagedhandle,
      staged,
      stagedLoader,
      stagedData,
      showSubStage,
      showSub,
    } = this.props;
    const DataCrude = [
      {
        id: '1',
        title: 'Edit',
        link: '#',
      },
      {
        id: '3',
        title: 'Share',
        link: '#',
      },
      {
        id: '4',
        title: 'Delete',
        link: '#',
      },
    ];

    return (
      <div className="report-list">
        <div className="row">
          <div className="col-md-8">
            <div className="report-content">
              <a
                href={`/fieldsight/application/#/data-export/${id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4>Form Data</h4>
              </a>
              <p>
                Export of forms data and site information an Excel
                File, generated with filters in region, types and time
                range.
              </p>
              <ul className="form-data">
                <li>
                  <a
                    tabIndex="0"
                    role="button"
                    onKeyDown={() => {
                      generalhandle('general');
                    }}
                    onClick={() => {
                      generalhandle('general');
                    }}
                  >
                    General Forms
                  </a>
                  <div
                    className="form-data-list"
                    style={
                      general === true
                        ? {
                            display: 'block',
                            position: 'relative',
                            height: `200px `,
                          }
                        : { display: 'none' }
                    }
                  >
                    <PerfectScrollbar>
                      {!formLoader ? (
                        <BlockContentLoader
                          number={5}
                          height="10px"
                        />
                      ) : generalData && generalData.length > 0 ? (
                        generalData.map(genInfo => (
                          <p key={genInfo.id}>
                            <span
                              tabIndex="0"
                              role="button"
                              onKeyDown={() => {
                                generalLinkhandle(
                                  genInfo.id,
                                  genInfo.title,
                                  projectCreatedOn,
                                );
                              }}
                              onClick={() => {
                                generalLinkhandle(
                                  genInfo.id,
                                  genInfo.title,
                                  projectCreatedOn,
                                );
                              }}
                            >
                              <p>{genInfo.title}</p>
                              <div className="summary-content">
                                {genInfo.schedule_type && (
                                  <p>
                                    <b>Schedule Type</b>
                                    <span>
                                      {genInfo.schedule_type}
                                    </span>
                                  </p>
                                )}
                                {genInfo.last_synced_date && (
                                  <p>
                                    <b>Last Synced Date</b>
                                    <span>
                                      {format(
                                        genInfo.last_synced_date,
                                        'YYYY-MM-DD',
                                      )}
                                    </span>
                                  </p>
                                )}
                              </div>
                            </span>
                          </p>
                        ))
                      ) : (
                        <p>No data</p>
                      )}
                    </PerfectScrollbar>
                  </div>
                </li>
                <li>
                  <a
                    tabIndex="0"
                    role="button"
                    onKeyDown={() => {
                      scheduledhandle('scheduled');
                    }}
                    onClick={() => {
                      scheduledhandle('scheduled');
                    }}
                  >
                    Scheduled Forms
                  </a>
                  <div
                    className="form-data-list"
                    style={
                      scheduled === true
                        ? {
                            display: 'block',
                            position: 'relative',
                            height: `200px `,
                          }
                        : { display: 'none' }
                    }
                  >
                    <PerfectScrollbar>
                      {!scheduledLoader ? (
                        <BlockContentLoader
                          number={5}
                          height="10px"
                        />
                      ) : scheduledData &&
                        scheduledData.length > 0 ? (
                        scheduledData.map(scheinfo => (
                          <p key={scheinfo.id}>
                            <span
                              tabIndex="0"
                              role="button"
                              onKeyDown={() => {
                                generalLinkhandle(
                                  scheinfo.id,
                                  scheinfo.title,
                                  projectCreatedOn,
                                );
                              }}
                              onClick={() => {
                                generalLinkhandle(
                                  scheinfo.id,
                                  scheinfo.title,
                                  projectCreatedOn,
                                );
                              }}
                            >
                              <p>{scheinfo.title}</p>
                              <div className="summary-content">
                                {scheinfo.schedule_type && (
                                  <p>
                                    <b>Schedule Type</b>
                                    <span>
                                      {scheinfo.schedule_type}
                                    </span>
                                  </p>
                                )}
                                {scheinfo.last_synced_date && (
                                  <p>
                                    <b>Last Synced Date</b>
                                    <span>
                                      {format(
                                        scheinfo.last_synced_date,
                                        'YYYY-MM-DD',
                                      )}
                                    </span>
                                  </p>
                                )}
                              </div>
                            </span>
                          </p>
                        ))
                      ) : (
                        <p>No Data</p>
                      )}
                    </PerfectScrollbar>
                  </div>
                </li>
                <li>
                  <a
                    tabIndex="0"
                    role="button"
                    onKeyDown={() => {
                      surveyhandle('survey');
                    }}
                    onClick={() => {
                      surveyhandle('survey');
                    }}
                  >
                    Survey Forms
                  </a>
                  <div
                    className="form-data-list"
                    style={
                      survey === true
                        ? {
                            display: 'block',
                            position: 'relative',
                            height: `200px `,
                          }
                        : { display: 'none' }
                    }
                  >
                    <PerfectScrollbar>
                      {!surveyLoader ? (
                        <BlockContentLoader
                          number={5}
                          height="10px"
                        />
                      ) : surveyData && surveyData.length > 0 ? (
                        surveyData.map(surData => (
                          <p key={surData.id}>
                            <span
                              tabIndex="0"
                              role="button"
                              onKeyDown={() => {
                                generalLinkhandle(
                                  surData.id,
                                  surData.title,
                                  projectCreatedOn,
                                );
                              }}
                              onClick={() => {
                                generalLinkhandle(
                                  surData.id,
                                  surData.title,
                                  projectCreatedOn,
                                );
                              }}
                            >
                              <p>{surData.title}</p>
                              <div className="summary-content">
                                {surData.schedule_type && (
                                  <p>
                                    <b>Schedule Type</b>
                                    <span>
                                      {surData.schedule_type}
                                    </span>
                                  </p>
                                )}
                                {surData.last_synced_date && (
                                  <p>
                                    <b>Last Synced Date</b>
                                    <span>
                                      {format(
                                        surData.last_synced_date,
                                        'YYYY-MM-DD',
                                      )}
                                    </span>
                                  </p>
                                )}
                              </div>
                            </span>
                          </p>
                        ))
                      ) : (
                        <p>No data</p>
                      )}
                    </PerfectScrollbar>
                  </div>
                </li>
                <li>
                  <a
                    tabIndex="0"
                    role="button"
                    onKeyDown={() => {
                      stagedhandle('stage');
                    }}
                    onClick={() => {
                      stagedhandle('stage');
                    }}
                  >
                    Staged Forms
                  </a>
                  <div
                    className="form-data-list"
                    style={
                      staged === true
                        ? {
                            display: 'block',
                            position: 'relative',
                            height: `200px `,
                          }
                        : { display: 'none' }
                    }
                  >
                    <PerfectScrollbar>
                      {!stagedLoader ? (
                        <BlockContentLoader
                          number={5}
                          height="10px"
                        />
                      ) : stagedData && stagedData.length > 0 ? (
                        stagedData.map(satData => (
                          <p
                            className="dropdown"
                            key={satData.name}
                            onClick={() => {
                              showSubStage(satData.name);
                            }}
                          >
                            {satData.name}

                            <ul
                              className="form-data-list"
                              style={
                                showSub === satData.name &&
                                satData.sub_stages.length > 0
                                  ? {
                                      display: 'block',
                                      position: 'relative',
                                      height: `200px `,
                                    }
                                  : { display: 'none' }
                              }
                            >
                              {satData.sub_stages.map(sub => (
                                <li key={sub.id}>
                                  <span
                                    tabIndex="0"
                                    role="button"
                                    onKeyDown={() => {
                                      generalLinkhandle(
                                        sub.id,
                                        sub.form_name,
                                        projectCreatedOn,
                                      );
                                    }}
                                    onClick={() => {
                                      generalLinkhandle(
                                        sub.id,
                                        sub.form_name,
                                        projectCreatedOn,
                                      );
                                    }}
                                  >
                                    <p>{sub.form_name}</p>
                                    <div className="summary-content">
                                      {sub.schedule_type && (
                                        <p>
                                          <b>Schedule Type</b>
                                          <span>
                                            {sub.schedule_type}
                                          </span>
                                        </p>
                                      )}
                                      {sub.last_synced_date && (
                                        <p>
                                          <b>Last Synced Date</b>
                                          <span>
                                            {format(
                                              sub.last_synced_date,
                                              'YYYY-MM-DD',
                                            )}
                                          </span>
                                        </p>
                                      )}
                                    </div>
                                    {/* {sub.form_name} */}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </p>
                        ))
                      ) : (
                        <p>No data</p>
                      )}
                    </PerfectScrollbar>
                  </div>
                </li>
              </ul>
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
              {DataCrude.map(item => (
                <Dropdown.Item
                  href={item.link}
                  key={item.id}
                  target="_blank"
                >
                  {item.title}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    );
  }
}
