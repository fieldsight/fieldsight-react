import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import { OverlayTrigger, Tooltip, Dropdown } from 'react-bootstrap';

import { getCustomReportTableData } from '../../actions/reportActions';
import { successToast } from '../../utils/toastHandler';
import Modal from '../common/Modal';
import Sheet from '../../static/images/sheets.png';
import Form from '../syncSchedule/form';
import {
  getScheduleType,
  getDayOnWeeklySchedule,
  getReportName,
} from '../syncSchedule/index';
import Loader from '../common/Loader';

/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable camelcase */
class CollapseFilterTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      openEditModal: false,
      tableData: {},
      loader: false,
      data: {},
    };
  }

  componentDidMount() {
    const { id, type } = this.props;
    if (!type) {
      this.setState(
        {
          loader: true,
        },
        () => {
          this.props.getCustomReportTableData(id);
        },
      );
    }
  }

  componentDidUpdate(prevProps) {
    const {
      props: {
        reportReducer: {
          actionResponse,
          customReportTable,
          report_sync_settings,
        },
      },
    } = this;
    if (actionResponse !== prevProps.reportReducer.actionResponse) {
      successToast(actionResponse.detail);
    }
    if (
      prevProps.reportReducer.customReportTable !== customReportTable
    ) {
      this.setTableData(customReportTable);
    }
    if (
      prevProps.reportReducer.report_sync_settings !==
        report_sync_settings &&
      report_sync_settings &&
      Object.keys(report_sync_settings).length > 0
    ) {
      this.setSyncReportData(report_sync_settings);
    }
  }

  setSyncReportData = data => {
    this.setState({
      data: {
        ...data,
        report_id: data.id,
      },
    });
  };

  setTableData = data => {
    this.setState(
      {
        tableData: data,
        loader: false,
      },
      () => {
        this.getPivotTable();
      },
    );
  };

  getPivotTable = () => {
    const { tableData } = this.state;
    const objArr = tableData && Object.entries(tableData);
    const headers = [];
    const cols = [];
    objArr.map(obj => {
      const regex = /_/gi;
      headers.push(obj[0].replace(regex, ' '));
      cols.push(obj[1]);
      return null;
    });
    const rowData = cols && cols.length > 0 && this.transpose(cols);
    return { headers, rowData };
  };

  transpose = a => {
    return Object.keys(a[0]).map(function(c) {
      return a.map(function(r) {
        return r[c];
      });
    });
  };

  // onExportCSV = () => {
  //   this.props.applyActionToReport(this.props.id, 'excel');
  // };

  onSyncHandler = () => {
    this.setState(state => ({
      openModal: !state.openModal,
    }));
  };

  handleToggle = () => {
    this.setState(state => ({
      openModal: !state.openModal,
    }));
  };

  handleEdit = () => {
    this.setState(state => ({
      openEditModal: !state.openEditModal,
    }));
  };

  handleEditClose = () => {
    this.setState(state => ({
      openEditModal: !state.openEditModal,
    }));
  };

  handleSuccess = data => {
    const { id, getReportDataById } = this.props;
    this.setState(
      state => ({
        openEditModal: !state.openEditModal,
        openModal: !state.openModal,
      }),
      () => {
        getReportDataById(id);
      },
    );
  };

  viewHandler = () => {
    // console.log('entered');
  };

  render() {
    const {
      openModal,
      openEditModal,
      tableData,
      loader,
    } = this.state;
    const {
      type,
      reportReducer: { report_sync_settings },
    } = this.props;
    const actionSync = {
      id: 1,
      title: 'sync',
      hasDropdown: true,
      icon: 'sync',
      menu: [
        {
          key: 1.1,
          text: 'To Google Sheets',
          link: this.onSyncHandler,
        },
      ],
    };

    const actionExport = {
      id: 2,
      title: 'export',
      hasDropdown: true,
      icon: 'save_alt',
      menu: [
        {
          key: 2.1,
          text: 'As Excel',
          link: this.props.excelFileToDownload,
          action: this.props.handleExcelExport,
        },
      ],
    };

    const previewData = this.getPivotTable();

    return (
      <>
        <div className="report-table  mt-3">
          <div className="report-table-header">
            {/* {!type && (
              <div className="dropdown">
                <button
                  type="button"
                  className="common-button data-toggle is-border is-icon"
                >
                  <i className="material-icons">import_export</i>
                  <span>API</span>
                </button>
              </div>
            )} */}
            {!type && (
              <Dropdown>
                <Dropdown.Toggle
                  drop="right"
                  variant=""
                  id="dropdown-Data"
                  className="common-button data-toggle is-border is-icon"
                >
                  <i className="material-icons">{actionSync.icon}</i>
                  {actionSync.title}
                  {actionSync.hasDropdown && (
                    <i className="material-icons">expand_more</i>
                  )}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                  {actionSync.menu.map(item => (
                    <Dropdown.Item
                      onClick={() => {
                        item.link();
                      }}
                      key={item.key}
                    >
                      {item.text}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}

            <Dropdown>
              <Dropdown.Toggle
                drop="right"
                variant=""
                id="dropdown-Data"
                className="common-button data-toggle is-border is-icon"
              >
                <i className="material-icons">{actionExport.icon}</i>
                {actionExport.title}
                {actionExport.hasDropdown && (
                  <i className="material-icons">expand_more</i>
                )}
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                {actionExport.menu.map(item => (
                  <Fragment key={item.key}>
                    {item.link && (
                      <Dropdown.Item href={item.link}>
                        {item.text}
                      </Dropdown.Item>
                    )}
                    {item.action && (
                      <Dropdown.Item
                        onClick={item.action}
                        onKeyDown={item.action}
                      >
                        {item.text}
                      </Dropdown.Item>
                    )}
                  </Fragment>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {!type && (
            <div className="table-responsive my-2">
              {loader && <Loader />}
              {!loader &&
                tableData &&
                Object.keys(tableData).length > 0 && (
                  <table className="table ">
                    <thead>
                      <tr>
                        {previewData &&
                          previewData.headers.length > 0 &&
                          previewData.headers.map(header => (
                            <th key={uuid()}>{header}</th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      {previewData &&
                        previewData.rowData.length > 0 &&
                        previewData.rowData.map(row => (
                          <tr key={uuid()}>
                            {row.map(value => (
                              <td key={uuid()}> {value}</td>
                            ))}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
            </div>
          )}
          {/* <div className="report-table-footer">
            <div className="table-data-counter">
              <span>
                <b>152</b>
                rows
              </span>
              ,
              <span>
                <b>27</b>
                rows
              </span>
            </div>
            <div className="table-data-counter">
              <span>
                <b>4104</b>
                cells
              </span>
            </div>
            <div className="table-data-counter">
              <span>
                <b>3 MB</b>
                est.size
              </span>
            </div>
          </div> */}
        </div>
        {openModal && (
          <Modal
            title="Report Sync to Google Sheet"
            toggleModal={this.handleToggle}
          >
            <>
              <div style={{ display: 'flex' }}>
                {report_sync_settings.spreadsheet_id !== null ? (
                  <a
                    role="button"
                    onKeyDown={this.viewHandler}
                    tabIndex="0"
                    className="td-delete-btn"
                    onClick={() => this.viewHandler}
                  >
                    <img
                      src={Sheet}
                      style={{ height: '20px' }}
                      alt="sheet"
                    />
                    View Report
                  </a>
                ) : (
                  <p>No sheet created</p>
                )}
                {report_sync_settings.schedule_type === 'Manual' && (
                  <span>
                    <a
                      // role="button"
                      // tabIndex="0"
                      // onKeyDown={() => {
                      //   this.props.reqSync(
                      //     report_sync_settings.report_id,
                      //   );
                      // }}
                      // onClick={() => {
                      //   this.props.reqSync(
                      //     report_sync_settings.report_id,
                      //   );
                      // }}
                      className="pending td-edit-btn td-btn"
                    >
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Sync Now</Tooltip>}
                      >
                        <i className="la la-refresh ml-2" />
                      </OverlayTrigger>
                    </a>
                  </span>
                )}
              </div>

              <div style={{ display: 'flex' }}>
                <label>Schedule Type</label>:
                <p>
                  {report_sync_settings.schedule_type === 'Weekly'
                    ? `${
                        report_sync_settings.schedule_type
                      } on ${getDayOnWeeklySchedule(
                        report_sync_settings.day,
                      )}`
                    : report_sync_settings.schedule_type === 'Monthly'
                    ? report_sync_settings.day === 0
                      ? ` ${report_sync_settings.schedule_type} on last day`
                      : ` ${report_sync_settings.schedule_type} on day ${report_sync_settings.day}`
                    : report_sync_settings.schedule_type}{' '}
                </p>
              </div>
              {report_sync_settings.last_synced_date && (
                <div style={{ display: 'flex' }}>
                  <label>Last Sync</label>:
                  <p>{report_sync_settings.last_synced_date}</p>
                </div>
              )}
              <button type="button" onClick={this.handleEdit}>
                Edit Schedule
              </button>
            </>
          </Modal>
        )}
        {openEditModal && (
          <Modal
            title="Edit Report"
            toggleModal={this.handleEditClose}
          >
            <Form
              projectId={this.props.projectId}
              reportId={this.props.id}
              handleSuccess={this.handleSuccess}
              data={this.state.data}
              getScheduleType={getScheduleType}
              getReportName={getReportName}
              // onCancel={this.handleToggleFlag}
            />
          </Modal>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ reportReducer }) => ({
  reportReducer,
});

export default connect(mapStateToProps, {
  getCustomReportTableData,
})(CollapseFilterTable);
