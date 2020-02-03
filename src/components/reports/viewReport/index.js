import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
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
        filterByRegions: [{ id: 'all_regions', name: 'Select All' }],
        filterBySiteType: [
          { id: 'all_sitetypes', name: 'Select All' },
        ],
        filterByUserRoles: [
          { id: 'all_userroles', name: 'Select All' },
        ],
      },
      toggleSelectClass: {
        filterRegion: false,
        filterSiteType: false,
        filterUserRole: false,
      },
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
    });
  };

  loadRegionFilter = regions => {
    this.setState(
      state => ({
        toFilterList: {
          ...state.toFilterList,
          filterByRegions: [
            ...state.toFilterList.filterByRegions,
            ...regions,
          ],
        },
      }),
      () => {
        console.log(
          'update region',
          this.state.toFilterList.filterByRegions,
        );
      },
    );
  };

  loadSiteFilter = sites => {
    this.setState(state => ({
      toFilterList: {
        ...state.toFilterList,
        filterBySiteType: [
          ...state.toFilterList.filterBySiteType,
          ...sites,
        ],
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
      data: { regions, siteType, userRoles, startDate, endDate },
    } = this;

    const modifyFilter = {
      regions: regions.filter(r => r.id !== 'all_regions'),
      site_types: siteType.filter(r => r.id !== 'all_sitetypes'),
      user_roles: userRoles.filter(u => u.id !== 'all_userroles'),
      start_date: startDate,
      end_date: endDate,
    };
    console.log('filter clicked', data);
    const body = {
      type,
      description,
      title,
      attributes,
      filter: JSON.stringify(modifyFilter),
    };
    // this.requestUpdateForm(reportId, body);
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
          reportData: { attributes, title, description, type },
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
      },
    } = this;

    console.log('viewreport', this.props.reportReducer);
    // const showFilter = this.props.reportReducer
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
            <div className="form-group">
              <span style={{ color: 'grey' }}>{description}</span>
            </div>
            <div className="form-group">
              <span style={{ color: 'grey' }}>Number of Columns</span>
              :
              <span style={{ color: 'grey' }}>
                {attributes && attributes.length}
              </span>
            </div>
            {/* {Object.keys(projectCreatedOn).length > 0 && (
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
            )} */}
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
