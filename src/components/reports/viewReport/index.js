import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import {
  getReportData,
  getToFilterData,
} from '../../../actions/reportActions';
import RightContentCard from '../../common/RightContentCard';
import Modal from '../../common/Modal';
import ExportTable from './exportTable';
import { DotLoader } from '../../myForm/Loader';
import CollapseFilterTable from '../CollapseFilterTable';
import DataFilter from '../common/dataFilter';
import {
  errorToast,
  successToast,
} from '../../../utils/toastHandler';
import { getDayOnWeeklySchedule } from '../../syncSchedule';
/* eslint-disable */

class ReportDashboard extends Component {
  intervalID;

  constructor(props) {
    super(props);
    this.state = {
      exportData: [],
      viewBtn: false,
      loader: false,
      filteredList: {},
      toFilterList: {
        filterByRegions: [],
        filterBySiteType: [],
        filterByUserRoles: [],
      },
      toggleSelectClass: {
        filterRegion: false,
        filterSiteType: false,
        filterUserRole: false,
      },
      filterDataLoaded: false,
    };
  }

  componentWillMount() {
    const {
      props: {
        match: {
          params: { pid, id },
        },
      },
    } = this;
    this.props.getReportData(id);
    this.props.getToFilterData(pid);
  }

  componentDidMount() {
    const {
      props: {
        match: {
          params: { id },
        },
      },
    } = this;
    axios.get(`/v4/api/reporting/export/logs/?id=${id}`).then(req => {
      this.setState({
        exportData: req.data.results,
        loader: true,
      });
    });
    this.intervalID = setInterval(this.getData.bind(this), 10000);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.reportReducer.regions !==
      this.props.reportReducer.regions
    ) {
      this.loadRegionFilter(this.props.reportReducer.regions);
    }
    if (
      prevProps.reportReducer.siteTypes !==
      this.props.reportReducer.siteTypes
    ) {
      this.loadSiteFilter(this.props.reportReducer.siteTypes);
    }
    if (
      prevProps.reportReducer.userRoles !==
      this.props.reportReducer.userRoles
    ) {
      this.loadUserRoleFilter(this.props.reportReducer.userRoles);
    }
    if (
      prevProps.reportReducer.reportData.filter !==
      this.props.reportReducer.reportData.filter
    ) {
      this.loadSelectedFilter(
        this.props.reportReducer.reportData.filter,
      );
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  loadSelectedFilter = list => {
    this.setState({
      filteredList: list,
      filterDataLoaded: true,
    });
  };

  loadRegionFilter = regions => {
    this.setState(state => ({
      toFilterList: {
        ...state.toFilterList,
        filterByRegions: [
          ...state.toFilterList.filterByRegions,
          ...regions,
        ],
      },
      filterDataLoaded: true,
    }));
  };

  loadSiteFilter = sites => {
    this.setState(state => ({
      toFilterList: {
        ...state.toFilterList,
        filterBySiteType: [
          ...state.toFilterList.filterBySiteType,
          ...sites,
        ],
        filterDataLoaded: true,
      },
    }));
  };

  loadUserRoleFilter = userRole => {
    this.setState(state => ({
      toFilterList: {
        ...state.toFilterList,
        filterByUserRoles: [
          ...state.toFilterList.filterByUserRoles,
          ...userRole,
        ],
        filterDataLoaded: true,
      },
    }));
  };

  handleToggleClass = toggleFor => {
    this.setState(state => ({
      toggleSelectClass: {
        ...state.toggleSelectClass,
        [toggleFor]: !state.toggleSelectClass[toggleFor],
      },
    }));
  };

  handleSubmitFilter = data => {
    const {
      props: {
        reportReducer: {
          reportData: { attributes, title, description, type },
        },
      },
    } = this;
    const { regions, siteType, userRoles, startDate, endDate } = data;

    const modifyFilter = {
      regions:
        type < 3 ? regions.filter(r => r.id !== 'all_regions') : [],
      site_types:
        type < 3
          ? siteType.filter(r => r.id !== 'all_sitetypes')
          : [],
      user_roles:
        type === 4
          ? userRoles.filter(u => u.id !== 'all_userroles')
          : [],
      start_date: type === 5 ? startDate : '',
      end_date: type === 5 ? endDate : '',
    };
    const body = {
      type,
      description,
      title,
      attributes,
      filter: JSON.stringify(modifyFilter),
    };
    this.requestUpdateForm(body);
  };

  requestUpdateForm = body => {
    const {
      props: {
        match: {
          params: { id },
        },
      },
    } = this;

    axios
      .put(`/v4/api/reporting/report/${id}/`, body)
      .then(res => {
        if (res.data) {
          successToast('Report', 'updated');
          this.props.getReportData(id);
        }
      })
      .catch(err => {
        const errors = err.response;
        errorToast(errors);
      });
  };

  getData = () => {
    const {
      props: {
        match: {
          params: { id },
        },
      },
      state: { viewBtn },
    } = this;
    if (viewBtn) {
      axios
        .get(`/v4/api/reporting/export/logs/?id=${id}`)
        .then(req => {
          this.setState({
            exportData: req.data.results,
          });
        });
    }
  };

  handleView = () => {
    this.setState(state => ({
      viewBtn: !state.viewBtn,
    }));
  };

  handleCloseModal = () => {
    this.setState(state => ({
      viewBtn: !state.viewBtn,
    }));
  };

  handleEdit = (id, reportId) => {
    this.props.history.push({
      pathname: `/project/${id}/edit-report/${reportId}`,
      state: { fromRow: true },
    });
  };

  render() {
    const {
      props: {
        match: {
          params: { id, pid },
        },
        reportReducer: {
          reportData: {
            attributes,
            title,
            description,
            type,
            created_at,
          },
          report_sync_settings,
          regions,
          siteTypes,
          userRoles,
          projectCreatedOn,
        },
      },
      state: {
        exportData,
        viewBtn,
        loader,
        toggleSelectClass,
        toFilterList: {
          filterByRegions,
          filterBySiteType,
          filterByUserRoles,
        },
        filteredList,
        filterDataLoaded,
      },
    } = this;

    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a
                href={`/fieldsight/application/#/project-dashboard/${pid}/report`}
              >
                Report
              </a>
            </li>
            <li className="breadcrumb-item">View Report</li>
          </ol>
        </nav>
        <RightContentCard
          title={title}
          addButton
          toggleModal={() => this.handleEdit(pid, id)}
          buttonName=" Edit "
          editflag
        >
          <div className="floating-form">
            <div className="view-report">
              <p>
                <b>No of datapoints</b>
                <span>{attributes && attributes.length}</span>
              </p>
              <p>
                <b>created date</b>
                <time>{format(created_at, ['MMMM Do YYYY'])}</time>
              </p>
              {report_sync_settings &&
                Object.keys(report_sync_settings).length > 0 && (
                  <>
                    <p>
                      <b>sync scheduled type</b>
                      <span>
                        {report_sync_settings.schedule_type ===
                        'Weekly'
                          ? `${
                              report_sync_settings.schedule_type
                            } on ${getDayOnWeeklySchedule(
                              report_sync_settings.day,
                            )}`
                          : report_sync_settings.schedule_type ===
                            'Monthly'
                          ? report_sync_settings.day === 0
                            ? ` ${report_sync_settings.schedule_type} on last day`
                            : ` ${report_sync_settings.schedule_type} on day ${report_sync_settings.day}`
                          : report_sync_settings.schedule_type}
                      </span>
                    </p>
                    {report_sync_settings.last_synced_date && (
                      <p>
                        <b>sync date</b>
                        <time>
                          {format(
                            report_sync_settings.last_synced_date,
                            ['MMMM Do YYYY'],
                          )}
                        </time>
                      </p>
                    )}
                    {report_sync_settings.spreadsheet_id && (
                      <p>
                        <b>sheet link</b>
                        <span>
                          <i className="material-icons">sim_card</i>
                        </span>
                      </p>
                    )}
                  </>
                )}
            </div>
            <div className="description">
              <p>{description}</p>
            </div>
            {filterDataLoaded && (
              <DataFilter
                toggleSelectClass={toggleSelectClass}
                handleToggleClass={this.handleToggleClass}
                filterBySiteType={filterBySiteType}
                filterByRegions={filterByRegions}
                applyFilter
                handleSubmitFilter={this.handleSubmitFilter}
                filteredData={filteredList}
                siteTypes={siteTypes}
                regions={regions}
                userRoles={userRoles}
                filterByUserRoles={filterByUserRoles}
                selectedReportType={type}
                projectCreatedOn={projectCreatedOn}
              />
            )}

            <CollapseFilterTable id={id} projectId={pid} />

            <div className="form-group pull-right no-margin">
              <button
                type="button"
                className="fieldsight-btn"
                onClick={() => this.handleView()}
              >
                Previous Exports
              </button>
            </div>
          </div>
        </RightContentCard>
        {viewBtn && (
          <Modal
            title="Export Table"
            toggleModal={this.handleCloseModal}
          >
            {loader ? (
              <ExportTable exportData={exportData} />
            ) : (
              <DotLoader />
            )}
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
  getReportData,
  getToFilterData,
})(ReportDashboard);
