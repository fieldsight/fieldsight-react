import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DotLoader } from '../myForm/Loader';

import {
  getOrgExportList,
  createOrgExport,
  deleteOrgExport,
  downloadOrgExport,
} from '../../actions/superAdminDashboardActions';
import { errorToast, successToast } from '../../utils/toastHandler';
import ExportTable from './exportTable';
import AdvancedExportModal from './advanceExportModal';
/* eslint-disable */

class OrganizationExport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exportHistory: [],
      loader: false,
      showModal: false,
      modalLoader: false,
    };
  }

  componentWillMount() {
    const {
      match: {
        params: { orgLibId },
      },
    } = this.props;
    this.setState({ loader: true }, () => {
      this.props.getOrgExportList(orgLibId);
    });
  }

  async componentDidMount() {
    try {
      const {
        match: {
          params: { orgLibId },
        },
      } = this.props;
      setInterval(async () => {
        await this.props.getOrgExportList(orgLibId);
      }, 10000);
    } catch (e) {
      errorToast(e);
    }
  }

  componentDidUpdate(prevProps) {
    const { superAdminDashboard } = this.props;
    const { showModal } = this.state;
    if (
      prevProps.superAdminDashboard.exportOrgList !==
      superAdminDashboard.exportOrgList
    ) {
      this.setList(superAdminDashboard.exportOrgList);
    }
    if (
      prevProps.superAdminDashboard.createExportResp !==
        superAdminDashboard.createExportResp &&
      superAdminDashboard.createExportResp !== ''
    ) {
      successToast(superAdminDashboard.createExportResp);
      if (showModal) {
        this.setState({ modalLoader: false }, () => {
          this.handleToggleModal();
        });
      }
    }
    if (
      prevProps.superAdminDashboard.deleteResp !==
      superAdminDashboard.deleteResp
    ) {
      successToast(superAdminDashboard.deleteResp);
    }
  }

  setList = list => {
    this.setState({ exportHistory: list, loader: false });
  };

  handleToggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
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
        params: { orgLibId },
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
    this.props.createOrgExport(orgLibId, body);
  };

  handleDelete = id => {
    this.props.deleteOrgExport(id);
  };

  render() {
    const {
      exportHistory,
      loader,
      showModal,
      modalLoader,
    } = this.state;
    const {
      match: {
        params: { orgId },
      },
    } = this.props;
    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a
                href={`fieldsight/application/#/organization-dashboard/${orgId}`}
              >
                Organization
              </a>
            </li>
            <li
              className="breadcrumb-item active"
              aria-current="page"
            >
              Organization Excel Export
            </li>
          </ol>
        </nav>
        <div className="card">
          <div className="card-header main-card-header">
            <h5>Organization Excel Export</h5>
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
      </>
    );
  }
}

const mapStateToProps = ({ superAdminDashboard }) => ({
  superAdminDashboard,
});

export default connect(mapStateToProps, {
  getOrgExportList,
  createOrgExport,
  deleteOrgExport,
  downloadOrgExport,
})(OrganizationExport);
