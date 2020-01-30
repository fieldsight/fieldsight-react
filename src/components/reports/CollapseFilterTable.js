import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import uuid from 'uuid/v4';

import {
  applyActionToReport,
  getCustomReportTableData,
} from '../../actions/reportActions';
import { successToast } from '../../utils/toastHandler';
import Modal from '../common/Modal';
import Sheet from '../../static/images/sheets.png';
import Form from '../syncSchedule/form';
import {
  formatDate,
  getScheduleType,
  getDayOnWeeklySchedule,
  getReportName,
} from '../syncSchedule/index';
import Loader from '../common/Loader';

/* eslint-disable react/jsx-one-expression-per-line */
class CollapseFilterTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      openEditModal: false,
      tableData: {},
      loader: false,
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
        reportReducer: { actionResponse, customReportTable },
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
  }

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

  onExportCSV = () => {
    this.props.applyActionToReport(this.props.id, 'excel');
  };

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
    this.setState(
      state => ({
        openEditModal: !state.openEditModal,
      }),
      () => {
        // api call from here!!!!
      },
    );
  };

  viewHandler = () => {
    console.log('entered');
  };

  render() {
    const {
      openModal,
      openEditModal,
      tableData,
      loader,
    } = this.state;
    const { type } = this.props;
    const actions = [
      {
        id: 2,
        title: 'sync',
        icon: 'expand_more',
        menu: [
          {
            key: 1,
            text: 'To Google Sheets',
            link: this.onSyncHandler,
          },
        ],
      },
      {
        id: 1,
        title: 'export',
        icon: 'save_alt',
        menu: [{ key: 1, text: 'As Excel', link: this.onExportCSV }],
      },
    ];
    const previewData = this.getPivotTable();
    // debugger;

    return (
      <>
        <div className="report-table  mt-3">
          <div className="report-table-header">
            <div className="dropdown">
              <button
                type="button"
                className="common-button data-toggle is-border is-icon"
              >
                <i className="material-icons">import_export</i>
                <span>API</span>
              </button>
            </div>

            {actions.map(action => (
              <Dropdown key={action.title}>
                <Dropdown.Toggle
                  drop="right"
                  variant=""
                  id="dropdown-Data"
                  className="common-button data-toggle is-border is-icon"
                >
                  {action.title}
                  <i className="material-icons">{action.icon}</i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                  {action.menu.map(item => (
                    <Dropdown.Item
                      onClick={() => {
                        item.link();
                      }}
                      key={item.key}
                      // target="_blank"
                    >
                      {item.text}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            ))}
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
            <div>
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

              <div style={{ display: 'flex' }}>
                <label>Schedule Type</label>:<p>Weekly on sunday</p>
              </div>
              <div style={{ display: 'flex' }}>
                <label>Last Sync</label>:<p>2019-10-10</p>
              </div>
              <button type="button" onClick={this.handleEdit}>
                Edit Schedule
              </button>
            </div>
          </Modal>
        )}
        {openEditModal && (
          <Modal
            title="Edit Report"
            toggleModal={this.handleEditClose}
          >
            <Form
              projectId={this.props.id}
              handleSuccess={this.handleSuccess}
              data=""
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
  applyActionToReport,
  getCustomReportTableData,
})(CollapseFilterTable);
