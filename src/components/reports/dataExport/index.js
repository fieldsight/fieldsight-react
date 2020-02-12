import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import {
  getReportList,
  getFormType,
  getProjectBreadcrumb,
  getRegionList,
  getTypeList,
  generateDataExport,
} from '../../../actions/templateAction';
import GeneralList from './generalList';
import ScheduledList from './scheduledList';
import SurveyList from './surveyList';
import StagedList from './stagedList';
import FilterByData from '../common/filterByData';
import FilterByDate from '../common/filterByDate';
import {
  successToast,
  errorToast,
} from '../../../utils/toastHandler';

class DataExport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      generalArr: [{ id: 'all_general_forms', title: 'Select All' }],
      scheduledArr: [
        { id: 'all_scheduled_forms', title: 'Select All' },
      ],
      surveyArr: [{ id: 'all_survey_forms', title: 'Select All' }],
      stagedArr: [{ id: 'all_staged_forms', name: 'Select All' }],
      projectRegions: [{ id: 'all_regions', name: 'Select All' }],
      siteType: [{ id: 'all_sitetypes', name: 'Select All' }],
      toggleSelectClass: {
        filterRegion: false,
        filterSiteType: false,
      },
      selectedArr: {
        regions: [],
        types: [],
        startDate: '',
        endDate: new Date(),
      },
    };
  }

  componentWillMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.props.getProjectBreadcrumb(id);
    this.props.getFormType(id, 'general');
    this.props.getFormType(id, 'scheduled');
    this.props.getFormType(id, 'survey');
    this.props.getFormType(id, 'stage');
    this.props.getRegionList(id);
    this.props.getTypeList(id);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.templateReducer.breadcrumb !==
      this.props.templateReducer.breadcrumb
    ) {
      this.setStartDate(this.props.templateReducer.breadcrumb);
    }
    if (
      prevProps.templateReducer.formLoader !==
      this.props.templateReducer.formLoader
    ) {
      this.setGeneralArr(this.props.templateReducer.generalData);
    }
    if (
      prevProps.templateReducer.scheduledLoader !==
      this.props.templateReducer.scheduledLoader
    ) {
      this.setScheduledArr(this.props.templateReducer.scheduledData);
    }
    if (
      prevProps.templateReducer.surveyLoader !==
      this.props.templateReducer.surveyLoader
    ) {
      this.setSurveyArr(this.props.templateReducer.surveyData);
    }
    if (
      prevProps.templateReducer.stagedLoader !==
      this.props.templateReducer.stagedLoader
    ) {
      this.setStagedArr(this.props.templateReducer.stagedData);
    }
    if (
      prevProps.templateReducer.regions !==
      this.props.templateReducer.regions
    ) {
      this.setRegionArr(this.props.templateReducer.regions);
    }
    if (
      prevProps.templateReducer.types !==
      this.props.templateReducer.types
    ) {
      this.setTypeArr(this.props.templateReducer.types);
    }
    if (
      prevProps.templateReducer.dataExportResponse !==
      this.props.templateReducer.dataExportResponse
    ) {
      const {
        match: {
          params: { id },
        },
      } = this.props;
      successToast(this.props.templateReducer.dataExportResponse);
      this.props.history.push(`/project/${id}/report`);
    }
  }

  setStartDate = data => {
    this.setState(state => ({
      selectedArr: {
        ...state.selectedArr,
        startDate: new Date(data.created_date),
      },
    }));
  };

  setGeneralArr = data => {
    this.setState(state => ({
      generalArr: [...state.generalArr, ...data],
    }));
  };

  setScheduledArr = data => {
    this.setState(state => ({
      scheduledArr: [...state.scheduledArr, ...data],
    }));
  };

  setSurveyArr = data => {
    this.setState(state => ({
      surveyArr: [...state.surveyArr, ...data],
    }));
  };

  setStagedArr = data => {
    this.setState(state => ({
      stagedArr: [...state.stagedArr, ...data],
    }));
  };

  setRegionArr = data => {
    this.setState(state => ({
      projectRegions: [...state.projectRegions, ...data],
    }));
  };

  setTypeArr = data => {
    this.setState(state => ({
      siteType: [...state.siteType, ...data],
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

  handleRegionFilter = (e, item) => {
    const {
      target: { checked, id },
    } = e;
    const {
      projectRegions,
      selectedArr: { regions },
    } = this.state;

    this.setState(state => {
      if (checked) {
        if (id === 'all_regions') {
          return {
            selectedArr: {
              ...state.selectedArr,
              regions: projectRegions,
            },
          };
        }
        return {
          selectedArr: {
            ...state.selectedArr,
            regions: [...state.selectedArr.regions, item],
          },
        };
      }
      if (!checked) {
        if (id === 'all_regions') {
          return {
            selectedArr: {
              ...state.selectedArr,
              regions: [],
            },
          };
        }
        const filterRegions = regions.filter(
          r => r.id !== item.id && r.id !== 'all_regions',
        );
        return {
          selectedArr: {
            ...state.selectedArr,
            regions: filterRegions,
          },
        };
      }
      return null;
    });
  };

  handleSiteTypeFilter = (e, item) => {
    const {
      target: { checked, id },
    } = e;
    const {
      siteType,
      selectedArr: { types },
    } = this.state;
    this.setState(state => {
      if (checked) {
        if (id === 'all_sitetypes') {
          return {
            selectedArr: {
              ...state.selectedArr,
              types: siteType,
            },
          };
        }
        return {
          selectedArr: {
            ...state.selectedArr,
            types: [...state.selectedArr.types, item],
          },
        };
      }
      if (!checked) {
        if (id === 'all_sitetypes') {
          return {
            selectedArr: {
              ...state.selectedArr,
              types: [],
            },
          };
        }
        const filterSiteType = types.filter(
          s => s.id !== item.id && s.id !== 'all_sitetypes',
        );
        return {
          selectedArr: {
            ...state.selectedArr,
            siteType: filterSiteType,
          },
        };
      }
      return null;
    });
  };

  handleStartDateChange = e => {
    const {
      selectedArr: { endDate },
    } = this.state;
    this.setState(state => {
      if (endDate && e > endDate) {
        return {
          selectedArr: {
            ...state.selectedArr,
            endDate: e,
          },
        };
      }
      return {
        selectedArr: {
          ...state.selectedArr,
          startDate: e,
        },
      };
    });
  };

  handleEndDateChange = e => {
    const {
      selectedArr: { startDate },
    } = this.state;
    this.setState(state => {
      if (e < startDate) {
        return {
          selectedArr: {
            ...state.selectedArr,
            startDate: e,
          },
        };
      }
      return {
        selectedArr: {
          ...state.selectedArr,
          endDate: e,
        },
      };
    });
  };

  handleSelected = (arr, data) => {
    this.setState(state => ({
      selectedArr: {
        ...state.selectedArr,
        [arr]: data,
      },
    }));
  };

  handleGenerate = e => {
    e.preventDefault();
    const {
      props: {
        match: {
          params: { id },
        },
      },
      state: { selectedArr },
    } = this;
    const fsIds = [];
    if (selectedArr.selectedGeneral) {
      const gId = selectedArr.selectedGeneral.map(g => g.id);
      fsIds.push(gId);
    }
    if (selectedArr.selectedScheduled) {
      const gId = selectedArr.selectedScheduled.map(g => g.id);
      fsIds.push(gId);
    }
    if (selectedArr.selectedSurvey) {
      const gId = selectedArr.selectedSurvey.map(g => g.id);
      fsIds.push(gId);
    }
    if (selectedArr.selectedStaged) {
      const gId = selectedArr.selectedStaged.flatMap(s => {
        let subIds = [];
        if (s.sub_stages.length > 0) {
          subIds = s.sub_stages.flatMap(sub => sub.id);
        }
        return subIds;
      });
      fsIds.push(gId);
    }
    const region = selectedArr.regions.filter(
      reg => reg.id !== 'all_regions',
    );
    const site = selectedArr.types.filter(
      s => s.id !== 'all_sitetypes',
    );
    if (fsIds.length === 0) {
      errorToast('Select atleast one form to generate data export.');
    } else {
      const body = {
        fs_ids: fsIds.flat(),
        filterRegion: region.map(r => r.id),
        siteTypes: site.map(s => s.id),
        startdate: format(selectedArr.startDate, 'YYYY/MM/DD'),
        enddate: format(selectedArr.endDate, 'YYYY/MM/DD'),
      };
      this.props.generateDataExport(id, body);
    }
  };

  render() {
    const {
      match: {
        params: { id },
      },
      templateReducer: {
        breadcrumb,
        formLoader,
        scheduledLoader,
        stagedLoader,
        surveyLoader,
      },
    } = this.props;
    const {
      generalArr,
      scheduledArr,
      surveyArr,
      stagedArr,
      projectRegions,
      siteType,
      toggleSelectClass,
      selectedArr: { regions, types, startDate, endDate },
    } = this.state;
    // const start Object.keys(breadcrumb).length > 0 ?
    return (
      <>
        {Object.keys(breadcrumb).length > 0 && (
          <nav aria-label="breadcrumb" role="navigation">
            <ol className="breadcrumb">
              <li className="breadcrumb-item ">
                <a
                  href={breadcrumb.name_url}
                  style={{ color: '#00628E' }}
                >
                  {breadcrumb.name}
                </a>
              </li>
              <li className="breadcrumb-item">
                <Link to={`/project/${id}/report`}>Report</Link>
              </li>
              <li className="breadcrumb-item">Data Export</li>
            </ol>
          </nav>
        )}
        <div className="reports mrb-30">
          <div className="card">
            <div className="card-body">
              <div className="standard-tempalte">
                <h3 className="mb-3">Project report</h3>
                <div className="report-list">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="report-content">
                        <h4>Data Export</h4>
                        <p>
                          Export of forms data and site information an
                          Excel File, generated with filters in
                          region, types and time range.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="data-filter mt-3">
                  <h3 className="mb-3">Filters</h3>
                  <form
                    onSubmit={e => {
                      this.handleGenerate(e);
                    }}
                  >
                    <div className="row">
                      {formLoader && (
                        <GeneralList
                          generalArr={generalArr}
                          handleSelected={this.handleSelected}
                        />
                      )}
                      {scheduledLoader && (
                        <ScheduledList
                          scheduledArr={scheduledArr}
                          handleSelected={this.handleSelected}
                        />
                      )}
                      {surveyLoader && (
                        <SurveyList
                          surveyArr={surveyArr}
                          handleSelected={this.handleSelected}
                        />
                      )}
                      {stagedLoader && (
                        <StagedList
                          stagedArr={stagedArr}
                          handleSelected={this.handleSelected}
                        />
                      )}
                      <div className="col-lg-3 col-md-6">
                        <FilterByData
                          className="form-group inline-form-group"
                          label="region"
                          toggleSelectClass={toggleSelectClass}
                          handleToggleClass={() => {
                            this.handleToggleClass('filterRegion');
                          }}
                          toggleType="filterRegion"
                          data={projectRegions}
                          changeHandler={this.handleRegionFilter}
                          selectedArr={regions}
                          placeholderTxt="Select Regions"
                        />
                      </div>
                      <div className="col-lg-3 col-md-6">
                        <FilterByData
                          className="form-group inline-form-group"
                          label="site type"
                          toggleSelectClass={toggleSelectClass}
                          handleToggleClass={() => {
                            this.handleToggleClass('filterSiteType');
                          }}
                          toggleType="filterSiteType"
                          data={siteType}
                          changeHandler={this.handleSiteTypeFilter}
                          selectedArr={types}
                          placeholderTxt="Select Site Types"
                        />
                      </div>
                      {/* <div className="col-lg-3 col-md-6"> */}
                      <FilterByDate
                        className="form-group icon-between inline-form-group"
                        startDate={startDate}
                        endDate={endDate}
                        // createdDate={createdDate}
                        tillDate={new Date()}
                        startDateHandler={this.handleStartDateChange}
                        endDateHandler={this.handleEndDateChange}
                      />
                      {/* </div> */}
                      <div className="col-md-12">
                        <div className="buttons center mt-3">
                          <button
                            // disabled={!applyFilter}
                            type="submit"
                            className="common-button is-bg"
                          >
                            Generate
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ templateReducer }) => ({
  templateReducer,
});
export default connect(mapStateToProps, {
  getProjectBreadcrumb,
  getReportList,
  getFormType,
  getRegionList,
  getTypeList,
  generateDataExport,
})(DataExport);
