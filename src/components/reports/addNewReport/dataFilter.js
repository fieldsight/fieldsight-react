import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import CustomSelect from '../CustomSelect';

const InitialState = {
  filterData: {
    project: '',
    regions: '',
    siteType: '',
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

  // componentDidUpdate(prevProps) {
  //   if (prevProps.filteredData !== this.props.filteredData) {
  //     console.log('in filter', this.props.filteredData);
  //       this.setState({
  //         filterData: this.props.filteredData,
  //       });
  //   }
  // }

  handleRegionFilter = (e, item) => {
    this.setState(state => ({
      filterData: {
        ...state.filterData,
        regions: item,
      },
    }));
  };

  handleSiteTypeFilter = (e, item) => {
    this.setState(state => ({
      filterData: {
        ...state.filterData,
        siteType: item,
      },
    }));
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
    // console.log('filter====', applyFilter);

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
                  <CustomSelect
                    toggleSelectClass={toggleSelectClass}
                    handleToggleClass={() => {
                      handleToggleClass('filterRegion');
                    }}
                    toggleType="filterRegion"
                    name={filterByRegions.filter(
                      each => each.id === regions.id,
                    )}
                    options={filterByRegions}
                    value={regions.id}
                    handleSelect={this.handleRegionFilter}
                  />
                </div>
              </div>
            )}
            {filterArr.some(f => f.code === 'site_types') && (
              <div className="col-xl-2 col-md-6">
                <div className="form-group inline-form-group">
                  <label className="mb-2">site type</label>
                  <CustomSelect
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
                  />
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
