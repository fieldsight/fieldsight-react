import React, { Component } from 'react';
// import DatePicker from 'react-datepicker';
import CustomMultiSelect from '../CustomMultiSelect';
// import CustomSelect from '../CustomSelect';
/* eslint-disable */

const InitialState = {
  filterData: {
    project: '',
    regions: [],
    siteType: [],
    userRole: '',
    startDate: '',
    endDate: '',
  },
};

export default class DataFilter extends Component {
  constructor(props) {
    super(props);
    this.state = InitialState;
  }

  componentWillMount() {
    if (
      this.props.filteredData &&
      Object.keys(this.props.filteredData).length > 0
    ) {
      const data = this.props.filteredData;
      this.setState(state => ({
        filterData: {
          ...state.filterData,
          regions: data.regions,
          siteType: data.site_types,
        },
      }));
    }
  }

  handleRegionFilter = (e, item) => {
    const {
      target: { checked },
    } = e;
    const {
      filterData: { regions },
    } = this.state;

    this.setState(state => {
      if (checked) {
        return {
          filterData: {
            ...state.filterData,
            regions: [...state.filterData.regions, item],
          },
        };
      }
      if (!checked) {
        const filterRegions = regions.filter(r => r.id !== item.id);
        return {
          filterData: {
            ...state.filterData,
            regions: filterRegions,
          },
        };
      }
      return null;
    });
  };

  handleSiteTypeFilter = (e, item) => {
    const {
      target: { checked },
    } = e;
    const {
      filterData: { siteType },
    } = this.state;
    this.setState(state => {
      if (checked) {
        return {
          filterData: {
            ...state.filterData,
            siteType: [...state.filterData.siteType, item],
          },
        };
      }
      if (!checked) {
        const filterSiteType = siteType.filter(s => s.id !== item.id);
        return {
          filterData: {
            ...state.filterData,
            siteType: filterSiteType,
          },
        };
      }
      return null;
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSubmitFilter(this.state.filterData);
  };

  handleClear = () => {
    this.setState({ ...InitialState });
  };

  render() {
    const {
      filterData: { regions, siteType },
    } = this.state;
    const {
      toggleSelectClass,
      handleToggleClass,
      filterArr,
      filterBySiteType,
      filterByRegions,
      applyFilter,
    } = this.props;

    return (
      <div className="data-filter filter-bottom ">
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            {/* <div className="col-xl-2 col-md-6">
              <div className="form-group inline-form-group">
                <label className="mb-2">project</label>
                <CustomSelect label="select Project" />
              </div>
            </div> */}
            {filterArr.some(f => f.code === 'regions') && (
              <div className="col-xl-2 col-md-6">
                <div className="form-group inline-form-group">
                  <label className="mb-2">region</label>
                  <CustomMultiSelect
                    toggleSelectClass={toggleSelectClass}
                    handleToggleClass={() => {
                      handleToggleClass('filterRegion');
                    }}
                    toggleType="filterRegion"
                    checkboxOption={filterByRegions}
                    handleCheck={this.handleRegionFilter}
                    selectedArr={regions}
                    placeholderTxt="Select Regions"
                  />
                </div>
              </div>
            )}
            {filterArr.some(f => f.code === 'site_types') && (
              <div className="col-xl-2 col-md-6">
                <div className="form-group inline-form-group">
                  <label className="mb-2">site type</label>
                  <CustomMultiSelect
                    toggleSelectClass={toggleSelectClass}
                    handleToggleClass={() => {
                      handleToggleClass('filterSiteType');
                    }}
                    toggleType="filterSiteType"
                    checkboxOption={filterBySiteType}
                    handleCheck={this.handleSiteTypeFilter}
                    selectedArr={siteType}
                    placeholderTxt="Select Site Types"
                  />

                  {/* <CustomSelect
                    toggleSelectClass={toggleSelectClass}
                    handleToggleClass={() => {
                      handleToggleClass('filterSiteType');
                    }}
                    toggleType="filterSiteType"
                    name={filterBySiteType.filter(
                      each => each.id === siteType.id,
                    )}
                    options={filterBySiteType}
                    value={siteType.id}
                    handleSelect={this.handleSiteTypeFilter}
                  /> */}
                </div>
              </div>
            )}
            {/* <div className="col-xl-2 col-md-6">
              <div className="form-group inline-form-group">
                <label className="mb-2">user roles</label>
                <CustomSelect label="select user roles" />
              </div>
            </div> */}
            {/* <div className="col-xl-5 col-md-6">
              <div className="form-group icon-between inline-form-group">
                <label className="">Time period</label>
                <div className="inline-flex ">
                  <div className="custom-group">
                    <DatePicker placeholderText="Start Date" />
                  </div>
                  <span className="icon-between">
                    <i className="material-icons">arrow_right_alt</i>
                  </span>
                  <div className="custom-group">
                    <DatePicker placeholderText="End Date" />
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="col-xl-2 col-md-6">
              <div className="form-group inline-form-group">
                <label className="">Site information</label>
                <CustomSelect label="select Project" />
              </div>
            </div> */}
            {/* <div className="col-xl-2 col-md-6">
              <div className="form-group inline-form-group">
                <label className="">Value</label>
                <CustomSelect label="select Region" />
              </div>
            </div> */}
            {/* <div className="col-xl-2 col-md-6">
              <div className="form-group inline-form-group">
                <label className="">Sub group</label>
                <CustomSelect label="select user roles" />
              </div>
            </div> */}
            <div className="col-md-12">
              <div className="buttons center mt-3">
                <button
                  disabled={!applyFilter}
                  type="submit"
                  className="common-button is-bg"
                >
                  Apply
                </button>
                <button
                  type="button"
                  disabled={!applyFilter}
                  className="common-button  is-clear"
                  onClick={() => {
                    this.handleClear();
                  }}
                >
                  Clear all
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
