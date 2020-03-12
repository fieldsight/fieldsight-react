import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DotLoader } from '../myForm/Loader';

import {
  getExportList,
  createExport,
  deleteExport,
  downloadExport,
} from '../../actions/exportExcelActions';
import { errorToast, successToast } from '../../utils/toastHandler';
import ExportTable from './ExportTable';
import AdvancedExportModal from './AdvanceExportModal';
/* eslint-disable */

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
        params: { isProject, formId, id, version },
      },
    } = this.props;
    this.setState({ loader: true }, () => {
      this.props.getExportList(isProject, formId, id, version);
    });
  }

  async componentDidMount() {
    try {
      const {
        match: {
          params: { isProject, formId, id, version },
        },
      } = this.props;
      setInterval(async () => {
        await this.props.getExportList(
          isProject,
          formId,
          id,
          version,
        );
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

    if (prevProps.excelExport.deleteResp !== excelExport.deleteResp) {
      successToast(excelExport.deleteResp);
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

  handleAdvanceSubmit = ({
    dontSplitSelectMultiples,
    groupDelimiter,
  }) => {
    this.setState(
      state => ({
        modalLoader: true,
        data: {
          ...state.data,
          dont_split_select_multiples: dontSplitSelectMultiples,
          group_delimiter: groupDelimiter,
        },
      }),
      () => {
        this.handleSubmit('advanced');
      },
    );
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

  handleDelete = id => {
    this.props.deleteExport(id);
  };

  handleToggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const {
      exportHistory,
      loader,
      showModal,
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
            <ExportTable
              exportHistory={exportHistory}
              handleDelete={this.handleDelete}
            />
          )}
        </div>
        {showModal && (
          <AdvancedExportModal
            handleToggleModal={this.handleToggleModal}
            handleAdvanceSubmit={this.handleAdvanceSubmit}
            modalLoader={modalLoader}
          />
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
