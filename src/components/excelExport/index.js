import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import format from 'date-fns/format';
import { DotLoader } from '../myForm/Loader';
import Modal from '../common/Modal';
import SelectElement from '../common/SelectElement';
import CheckBox from '../common/CheckBox';
import {
  getExportList,
  createExport,
  deleteExport,
  downloadExport,
} from '../../actions/exportExcelActions';
import { errorToast, successToast } from '../../utils/toastHandler';
/* eslint-disable */

const options = [
  { id: '/', name: '/(Slash)' },
  { id: '.', name: '.(Dot)' },
];

class ExcelExport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exportHistory: [],
      loader: false,
      showModal: false,
      modalLoader: false,
      // isDelete: false,
      // isCreated: false,
      // isDownloaded: false,
      data: {
        dontSplitSelectMultiples: 'no',
        groupDelimiter: '/',
      },
    };
  }

  componentWillMount() {
    const {
      match: {
        params: { isProject, formId, id },
      },
    } = this.props;
    this.setState({ loader: true }, () => {
      this.props.getExportList(isProject, formId, id);
    });
  }

  async componentDidMount() {
    try {
      const {
        match: {
          params: { isProject, formId, id },
        },
      } = this.props;
      setInterval(async () => {
        await this.props.getExportList(isProject, formId, id);
      }, 10000);
    } catch (e) {
      errorToast(e);
    }
  }

  componentDidUpdate(prevProps) {
    const { excelExport } = this.props;
    const { showModal } = this.state;
    if (prevProps.excelExport.exportList !== excelExport.exportList) {
      this.setList(excelExport.exportList);
    }
    if (
      prevProps.excelExport.createResp !== excelExport.createResp &&
      excelExport.createResp !== ''
    ) {
      successToast(excelExport.createResp);
      if (showModal) {
        this.setState({ modalLoader: false }, () => {
          this.handleToggleModal();
        });
      }
    }
  }

  setList = list => {
    this.setState({ exportHistory: list, loader: false });
  };

  handleSelectChange = e => {
    const { value } = e.target;
    this.setState(state => ({
      data: {
        ...state.data,
        groupDelimiter: value,
      },
    }));
  };

  handleCheckBox = e => {
    const { checked } = e.target;
    this.setState(state => {
      if (checked) {
        return {
          data: {
            ...state.data,
            dontSplitSelectMultiples: 'yes',
          },
        };
      }
      if (!checked) {
        return {
          data: {
            ...state.data,
            dontSplitSelectMultiples: 'no',
          },
        };
      }
      return null;
    });
  };

  handleSubmit = type => {
    const {
      match: {
        params: { isProject, formId, id },
      },
    } = this.props;
    const { data } = this.state;
    let body = {};
    if (type === 'advanced') {
      this.setState({ modalLoader: true });
      body = {
        dont_split_select_multiples: data.dontSplitSelectMultiples,
        group_delimiter: data.groupDelimiter,
      };
    }
    this.props.createExport(isProject, formId, id, body);
  };

  handleDelete = () => {
    const {
      match: {
        params: { formId },
      },
    } = this.props;
    this.props.deleteExport(formId);
  };

  handleDownload = exportId => {
    this.props.downloadExport(exportId);
  };

  handleToggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const {
      exportHistory,
      loader,
      showModal,
      data: { groupDelimiter, dontSplitSelectMultiples },
      modalLoader,
    } = this.state;
    return (
      <div className="card">
        <div className="card-header main-card-header">
          <h5>Excel Export</h5>
        </div>
        <div className="card-body">
          <div className="col-lg-12">
            <div className="buttons flex-end">
              <button
                type="button"
                className="common-button is-border"
                onClick={() => {
                  this.handleSubmit('new');
                }}
              >
                New Export
              </button>
              <button
                type="button"
                className="common-button is-bg"
                onClick={() => {
                  this.handleToggleModal();
                }}
              >
                Advanced Export
              </button>
            </div>
          </div>
          {loader && <DotLoader />}
          {!loader && (
            <Table
              responsive="xl"
              className="table  table-bordered  dataTable"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>FileName</th>
                  <th>Date Created</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {exportHistory.length === 0 && (
                  <tr>
                    <td colSpan={4}>No Data Available</td>
                  </tr>
                )}
                {exportHistory.length > 0 &&
                  exportHistory.map((history, index) => (
                    <tr key={`excel_${history.id}`}>
                      <td>{index + 1}</td>
                      <td>
                        {history.internal_status === 1 && (
                          <a
                            role="button"
                            tabIndex="0"
                            onClick={() => {
                              this.handleDownload(history.id);
                            }}
                            onKeyDown={() => {
                              this.handleDownload(history.id);
                            }}
                          >
                            {history.filename}
                          </a>
                        )}
                        {history.internal_status !== 1 && (
                          <span>{history.status_title}</span>
                        )}
                      </td>
                      <td>
                        {format(
                          history.created_on,
                          'MMM D YYYY, h:mm a',
                        )}
                      </td>
                      <td>
                        <a
                          role="button"
                          tabIndex="0"
                          onClick={() => {
                            this.handleDelete(history.id);
                          }}
                          onKeyDown={() => {
                            this.handleDelete(history.id);
                          }}
                        >
                          <i className="material-icons">delete</i>
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}
        </div>
        {showModal && (
          <Modal
            title="Advanced Export"
            toggleModal={this.toggleModal}
          >
            <div className="row">
              <div className="col-xs-6">
                <div className="card-body">
                  <SelectElement
                    label=" Delimiter to use to separate group names from
                      field names"
                    className="form-control"
                    options={options}
                    changeHandler={this.handleSelectChange}
                    value={groupDelimiter}
                  />
                  <CheckBox
                    checked={dontSplitSelectMultiples === 'yes'}
                    label="DONT split select multiple choice answers into separate columns"
                    changeHandler={this.handleCheckBox}
                  />
                  <div className="buttons flex-end">
                    <button
                      type="button"
                      className="common-button is-border"
                      onClick={() => {
                        this.handleToggleModal();
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="common-button is-bg"
                      onClick={() => {
                        this.handleSubmit('advanced');
                      }}
                      disabled={modalLoader}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ excelExport }) => ({
  excelExport,
});

export default connect(mapStateToProps, {
  getExportList,
  createExport,
  deleteExport,
  downloadExport,
})(ExcelExport);
