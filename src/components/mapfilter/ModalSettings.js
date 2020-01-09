/* eslint-disable max-len */
import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select-2/dist/css/react-select-2.css';

class ModalSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'filters',
    };
  }

  handleTabChange = tab => {
    // console.log('handleTabCHange Clicked');
    this.setState({ activeTab: tab });
  };

  render() {
    const { openModalSetting, modalSetting } = this.props;
    const { activeTab } = this.state;
    const options = [
      { value: 'one', label: 'Trying form another project' },
      { value: 'two', label: 'Enter birth date' },
    ];
    return (
      <div
        className={`fieldsight-popup ${modalSetting ? 'open' : ''}`}
        id="site-info-popup"
      >
        <div className="popup-body">
          <div className="card">
            <div className="card-header main-card-header">
              <h5>Manage filters & Metrics</h5>
              <span
                className="popup-close"
                onClick={openModalSetting}
                onKeyPress={this.handleKeyPress}
                role="button"
                tabIndex={0}
              >
                <i className="la la-close" />
              </span>
            </div>
            <div className="card-body">
              <form className="floating-form">
                <ul
                  className="nav nav-tabs flex-between"
                  id="mapTab"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        activeTab === 'filters' ? 'active show' : ''
                      }`}
                      id="map-filter_tab"
                      data-toggle="tab"
                      role="tab"
                      tabIndex={0}
                      aria-controls="map-filter"
                      aria-selected="true"
                      onClick={() => {
                        this.handleTabChange('filters');
                      }}
                      onKeyPress={() => {
                        this.handleTabChange('filters');
                      }}
                    >
                      Filters
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        activeTab === 'metrics' ? 'active show' : ''
                      }`}
                      id="map-metric_tab"
                      data-toggle="tab"
                      role="tab"
                      tabIndex={0}
                      aria-controls="map-metric"
                      aria-selected="true"
                      onClick={() => {
                        this.handleTabChange('metrics');
                      }}
                      onKeyPress={() => {
                        this.handleTabChange('metrics');
                      }}
                    >
                      metrics
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        activeTab === 'layers' ? 'active show' : ''
                      }`}
                      id="map-layer_tab"
                      data-toggle="tab"
                      role="tab"
                      tabIndex={0}
                      aria-controls="map-layer"
                      aria-selected="true"
                      onClick={() => {
                        this.handleTabChange('layers');
                      }}
                      onKeyPress={() => {
                        this.handleTabChange('layers');
                      }}
                    >
                      Layers
                    </a>
                  </li>
                </ul>
                <div
                  className="tab-content mrt-15"
                  id="mapTabContent"
                >
                  <div
                    className={`tab-pane fade ${
                      activeTab === 'filters' ? 'show active' : ''
                    }`}
                    id="map-filter"
                    role="tabpanel"
                    aria-labelledby="map-filter_tab"
                  >
                    <div className="map-filter-data">
                      <div className="form-group ">
                        <label className="mb-2">
                          Select filter type
                        </label>
                        <div className="custom-checkbox display-inline">
                          <div className="radiobox ">
                            <label>
                              <input
                                type="radio"
                                name="radio"
                                defaultValue="site-data"
                                defaultChecked
                              />
                              <i className="helper" />
                              site information
                            </label>
                          </div>
                          <div className="radiobox ">
                            <label>
                              <input
                                type="radio"
                                name="radio"
                                defaultValue="form-data"
                              />
                              <i className="helper" />
                              Form Data
                            </label>
                          </div>
                        </div>
                      </div>
                      <div
                        className="filter-data site-data"
                        id="site-data"
                      >
                        <div className="form-group">
                          <label>Select site information</label>
                          <Select
                            name="siteinfo"
                            className="wide"
                            value="one"
                            options={options}
                            onChange={this.logChange}
                          />
                          {/* <select className="wide">
                                <option>Trying form another project</option>
                                <option>Enter birth date</option>
                              </select> */}
                        </div>
                      </div>
                      <div
                        className="filter-data form-data"
                        id="form-data"
                      >
                        <div className="form-group">
                          <label>Select form</label>
                          <select className="wide">
                            <option>Form 1</option>
                            <option>Form 2</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Select Question</label>
                          <select className="wide">
                            <option>Question 1</option>
                            <option>Question 2</option>
                          </select>
                        </div>
                      </div>
                      <div className="buttons flex-end">
                        <a
                          // href="#"
                          className=" fieldsight-btn bg-btn"
                        >
                          Add
                        </a>
                      </div>
                      <ul className="filter-list mrt-30 mrb-30">
                        <li>
                          <span className="site-info">
                            Trying form another project
                          </span>
                          <span className="filter-type">
                            site Information
                          </span>
                          <a
                            // href="#"
                            className="action"
                            data-toggle="tooltip"
                            title="Remove"
                          >
                            <i className="la la-trash" />
                          </a>
                        </li>
                        <li>
                          <span className="site-info">
                            Enter birth date
                          </span>
                          <span className="filter-type">
                            Form data
                          </span>
                          <a
                            // href="#"
                            className="action"
                            data-toggle="tooltip"
                            title="Remove"
                          >
                            <i className="la la-trash" />
                          </a>
                        </li>
                        <li>
                          <span className="site-info">
                            Enter Address
                          </span>
                          <span className="filter-type">
                            site Information
                          </span>
                          <a
                            // href="#"
                            className="action"
                            data-toggle="tooltip"
                            title="Remove"
                          >
                            <i className="la la-trash" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="buttons flex-end">
                      <a className="fieldsight-btn bg-btn">Apply</a>
                    </div>
                  </div>
                  <div
                    className={`tab-pane fade ${
                      activeTab === 'metrics' ? 'show active' : ''
                    }`}
                    id="map-metric"
                    role="tabpanel"
                    aria-labelledby="map-metric_tab"
                  >
                    <div className="map-filter-data metric-filter">
                      <div className="form-group ">
                        <label className="mb-2">
                          Select filter type
                        </label>
                        <div className="custom-checkbox display-inline">
                          <div className="radiobox ">
                            <label>
                              <input
                                type="radio"
                                name="radioYes"
                                defaultValue="size"
                                defaultChecked
                              />
                              <i className="helper" />
                              size
                            </label>
                          </div>
                          <div className="radiobox ">
                            <label>
                              <input
                                type="radio"
                                name="radioYes"
                                defaultValue="color"
                              />
                              <i className="helper" />
                              Color
                            </label>
                          </div>
                        </div>
                      </div>
                      <div
                        className="filter-data display-data size"
                        id="size-data"
                      >
                        <div className="form-group">
                          <label>Select form</label>
                          <select className="wide">
                            <option>Form 1</option>
                            <option>Form 2</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Select Question</label>
                          <select className="wide">
                            <option>Question 1</option>
                            <option>Question 2</option>
                          </select>
                        </div>
                      </div>
                      <div
                        className="filter-data color"
                        id="color-data"
                      >
                        <div className="form-group">
                          <label>Select form</label>
                          <select className="wide">
                            <option>Form 1</option>
                            <option>Form 2</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Select Question</label>
                          <select className="wide">
                            <option>Question 1</option>
                            <option>Question 2</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <select className="custom-select">
                            <option defaultValue="dicrete-content">
                              Dicrete
                            </option>
                            <option defaultValue="range-content">
                              Range
                            </option>
                          </select>
                        </div>
                        <div className="dicrete-content filter-content">
                          <ul className="filter-list mrt-15 mrb-30">
                            <div className="filter-list-title flex-between ">
                              <h6>Discrete</h6>
                              <div className="form-group ">
                                <div className="custom-checkbox display-inline">
                                  <div className="checkbox ">
                                    <label>
                                      <input
                                        type="checkbox"
                                        name="all"
                                        defaultValue=""
                                      />
                                      <i className="helper" />
                                      Select all
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              id="fieldsight-new"
                              className="fieldsight-new"
                            >
                              <div
                                id="main-container"
                                className="minified"
                              >
                                <div className="container-fluid">
                                  <main id="main-content">
                                    <div className="card">
                                      <div className="card-body map-wrapper">
                                        <div
                                          id="map"
                                          className="map"
                                        />
                                        <div className="map-sidebar left-map-sidebar">
                                          <div className="sidebar-wrapper">
                                            <form>
                                              <div className="form-group search">
                                                <div className="input-group">
                                                  <input
                                                    type="search"
                                                    className="form-control"
                                                    placeholder="Search By site Name"
                                                  />
                                                  <span className="input-group-append">
                                                    <span className="input-group-text">
                                                      <i className="la la-angle-down" />
                                                    </span>
                                                    <ul>
                                                      <li>
                                                        <a>
                                                          {/* href="#"   */}
                                                          Search by
                                                          loacation
                                                        </a>
                                                      </li>
                                                      <li>
                                                        <a>
                                                          search by
                                                          address
                                                        </a>
                                                      </li>
                                                    </ul>
                                                  </span>
                                                </div>
                                              </div>
                                            </form>
                                            <div className="sidebar-title flex-between">
                                              <h4>Map</h4>
                                              <span className="filters flex-end">
                                                <i
                                                  className="la la-cogs setting"
                                                  data-toggle="tooltip"
                                                  title="Setting"
                                                  data-tab="site-info-popup"
                                                />
                                              </span>
                                            </div>
                                            <form className="map-widget mrt-15">
                                              <ul
                                                className="nav nav-tabs flex-between"
                                                id="filterTab"
                                                role="tablist"
                                              >
                                                <li className="nav-item">
                                                  <a
                                                    className="nav-link active"
                                                    id="sidebar-filter_tab"
                                                    data-toggle="tab"
                                                    href="#sidebar-filter"
                                                    role="tab"
                                                    aria-controls="sidebar-filter"
                                                    aria-selected="true"
                                                  >
                                                    Filters
                                                  </a>
                                                </li>
                                                <li className="nav-item">
                                                  <a
                                                    className="nav-link "
                                                    id="sidebar-metric_tab"
                                                    data-toggle="tab"
                                                    href="#sidebar-metric"
                                                    role="tab"
                                                    aria-controls="sidebar-metric"
                                                    aria-selected="false"
                                                  >
                                                    metrics
                                                  </a>
                                                </li>
                                                <li className="nav-item">
                                                  <a
                                                    className="nav-link"
                                                    id="sidebar-layer_tab"
                                                    data-toggle="tab"
                                                    href="#sidebar-layer"
                                                    role="tab"
                                                    aria-controls="sidebar-layer"
                                                    aria-selected="true"
                                                  >
                                                    Layers
                                                  </a>
                                                </li>
                                              </ul>
                                              <div
                                                className="tab-content"
                                                id="filterTabContent"
                                              >
                                                <div
                                                  className="tab-pane fade show active"
                                                  id="sidebar-filter"
                                                  role="tabpanel"
                                                  aria-labelledby="sidebar-filter_tab"
                                                >
                                                  <div
                                                    id="accordion"
                                                    className="accordion map-accordion"
                                                  >
                                                    <div className="card">
                                                      <div className="card-header">
                                                        <a
                                                          className="card-link btn-link"
                                                          data-toggle="collapse"
                                                          href="#collapseOne"
                                                        >
                                                          Project
                                                        </a>
                                                      </div>
                                                      <div
                                                        id="collapseOne"
                                                        className="collapse "
                                                        data-parent="#accordion"
                                                      >
                                                        <div className="card-body">
                                                          <div className="sidebar-list">
                                                            <div className="form-group">
                                                              <div className="checkbox">
                                                                <label>
                                                                  <input
                                                                    type="checkbox"
                                                                    name="radiobox"
                                                                  />
                                                                  <i className="helper" />
                                                                  FieldSight
                                                                  Housing
                                                                  Demonstration
                                                                  Project
                                                                </label>
                                                              </div>
                                                            </div>
                                                            <div className="form-group">
                                                              <div className="checkbox">
                                                                <label>
                                                                  <input
                                                                    type="checkbox"
                                                                    name="radiobox"
                                                                  />
                                                                  <i className="helper" />
                                                                  FieldSight
                                                                  Housing
                                                                  Demonstration
                                                                  Project
                                                                </label>
                                                              </div>
                                                            </div>
                                                            <div className="form-group">
                                                              <div className="checkbox">
                                                                <label>
                                                                  <input
                                                                    type="checkbox"
                                                                    name="radiobox"
                                                                  />
                                                                  <i className="helper" />
                                                                  FieldSight
                                                                  Housing
                                                                  Demonstration
                                                                  Project
                                                                </label>
                                                              </div>
                                                            </div>
                                                            <div className="form-group">
                                                              <div className="checkbox">
                                                                <label>
                                                                  <input
                                                                    type="checkbox"
                                                                    name="radiobox"
                                                                  />
                                                                  <i className="helper" />
                                                                  FieldSight
                                                                  Housing
                                                                  Demonstration
                                                                  Project
                                                                </label>
                                                              </div>
                                                            </div>
                                                            <div className="form-group">
                                                              <div className="checkbox">
                                                                <label>
                                                                  <input
                                                                    type="checkbox"
                                                                    name="radiobox"
                                                                  />
                                                                  <i className="helper" />
                                                                  FieldSight
                                                                  Housing
                                                                  Demonstration
                                                                  Project
                                                                </label>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>

                                                    <div className="card">
                                                      <div className="card-header">
                                                        <a
                                                          className="collapsed card-link btn-link"
                                                          data-toggle="collapse"
                                                          href="#collapseTwo"
                                                        >
                                                          Progress
                                                        </a>
                                                      </div>
                                                      <div
                                                        id="collapseTwo"
                                                        className="collapse"
                                                        data-parent="#accordion"
                                                      >
                                                        <div className="card-body">
                                                          <div className="sidebar-list">
                                                            <div className="form-group">
                                                              <div className="checkbox">
                                                                <label>
                                                                  <input
                                                                    type="checkbox"
                                                                    name="radiobox"
                                                                  />
                                                                  <i className="helper" />
                                                                  0%
                                                                </label>
                                                              </div>
                                                            </div>
                                                            <div className="form-group">
                                                              <div className="checkbox">
                                                                <label>
                                                                  <input
                                                                    type="checkbox"
                                                                    name="radiobox"
                                                                  />
                                                                  <i className="helper" />
                                                                  1-20%
                                                                </label>
                                                              </div>
                                                            </div>
                                                            <div className="form-group">
                                                              <div className="checkbox">
                                                                <label>
                                                                  <input
                                                                    type="checkbox"
                                                                    name="radiobox"
                                                                  />
                                                                  <i className="helper" />
                                                                  21-40%
                                                                </label>
                                                              </div>
                                                            </div>
                                                            <div className="form-group">
                                                              <div className="checkbox">
                                                                <label>
                                                                  <input
                                                                    type="checkbox"
                                                                    name="radiobox"
                                                                  />
                                                                  <i className="helper" />
                                                                  41%-60%
                                                                </label>
                                                              </div>
                                                            </div>
                                                            <div className="form-group">
                                                              <div className="checkbox">
                                                                <label>
                                                                  <input
                                                                    type="checkbox"
                                                                    name="radiobox"
                                                                  />
                                                                  <i className="helper" />
                                                                  61%-80%
                                                                </label>
                                                              </div>
                                                            </div>
                                                            <div className="form-group">
                                                              <div className="checkbox">
                                                                <label>
                                                                  <input
                                                                    type="checkbox"
                                                                    name="radiobox"
                                                                  />
                                                                  <i className="helper" />
                                                                  81%-100%
                                                                </label>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>

                                                    <div className="card">
                                                      <div className="card-header">
                                                        <a
                                                          className="collapsed card-link btn-link"
                                                          data-toggle="collapse"
                                                          href="#collapseThree"
                                                        >
                                                          Form status
                                                        </a>
                                                      </div>
                                                      <div
                                                        id="collapseThree"
                                                        className="collapse"
                                                        data-parent="#accordion"
                                                      >
                                                        <div className="card-body">
                                                          <div className="form-group flexrow checkbox-group">
                                                            <div className="custom-checkbox display-inline">
                                                              <div className="radiobox approved">
                                                                <label>
                                                                  <input
                                                                    type="radio"
                                                                    name="radioYes"
                                                                  />
                                                                  <i className="helper" />
                                                                  Approved
                                                                </label>
                                                              </div>
                                                              <div className="radiobox pending">
                                                                <label>
                                                                  <input
                                                                    type="radio"
                                                                    name="radioYes"
                                                                  />
                                                                  <i className="helper" />
                                                                  Pending
                                                                </label>
                                                              </div>
                                                              <div className="radiobox flagged">
                                                                <label>
                                                                  <input
                                                                    type="radio"
                                                                    name="radioYes"
                                                                  />
                                                                  <i className="helper" />
                                                                  Flagged
                                                                </label>
                                                              </div>
                                                              <div className="radiobox rejected">
                                                                <label>
                                                                  <input
                                                                    type="radio"
                                                                    name="radioYes"
                                                                  />
                                                                  <i className="helper" />
                                                                  Rejected
                                                                </label>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div className="card">
                                                      <div className="card-header">
                                                        <a
                                                          className="collapsed card-link btn-link"
                                                          data-toggle="collapse"
                                                          href="#collapseFour"
                                                        >
                                                          Site Type
                                                        </a>
                                                      </div>
                                                      <div
                                                        id="collapseFour"
                                                        className="collapse"
                                                        data-parent="#accordion"
                                                      >
                                                        <div className="card-body">
                                                          <div className="sidebar-list">
                                                            <div className="form-group">
                                                              <div className="checkbox">
                                                                <label>
                                                                  <input
                                                                    type="checkbox"
                                                                    name="radiobox"
                                                                  />
                                                                  <i className="helper" />
                                                                  Colony
                                                                </label>
                                                              </div>
                                                            </div>
                                                            <div className="form-group">
                                                              <div className="checkbox">
                                                                <label>
                                                                  <input
                                                                    type="checkbox"
                                                                    name="radiobox"
                                                                  />
                                                                  <i className="helper" />
                                                                  Pipaltar
                                                                </label>
                                                              </div>
                                                            </div>
                                                            <div className="form-group">
                                                              <div className="checkbox">
                                                                <label>
                                                                  <input
                                                                    type="checkbox"
                                                                    name="radiobox"
                                                                  />
                                                                  <i className="helper" />
                                                                  Sattale
                                                                </label>
                                                              </div>
                                                            </div>
                                                            <div className="form-group">
                                                              <div className="checkbox">
                                                                <label>
                                                                  <input
                                                                    type="checkbox"
                                                                    name="radiobox"
                                                                  />
                                                                  <i className="helper" />
                                                                  Barsuchet
                                                                </label>
                                                              </div>
                                                            </div>
                                                            <div className="form-group">
                                                              <div className="checkbox">
                                                                <label>
                                                                  <input
                                                                    type="checkbox"
                                                                    name="radiobox"
                                                                  />
                                                                  <i className="helper" />
                                                                  Locantrik
                                                                </label>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div className="card">
                                                      <div className="card-header">
                                                        <a
                                                          className="card-link btn-link"
                                                          data-toggle="collapse"
                                                          href="#collapseFive"
                                                        >
                                                          Region
                                                        </a>
                                                      </div>
                                                      <div
                                                        id="collapseFive"
                                                        className="collapse "
                                                        data-parent="#accordion"
                                                      >
                                                        <div className="card-body">
                                                          <div className="sidebar-list">
                                                            <div className="form-group">
                                                              <div className="checkbox">
                                                                <label>
                                                                  <input
                                                                    type="checkbox"
                                                                    name="radiobox"
                                                                  />
                                                                  <i className="helper" />
                                                                  Bidur
                                                                  Municipality
                                                                </label>
                                                              </div>
                                                            </div>
                                                            <div className="form-group">
                                                              <div className="checkbox">
                                                                <label>
                                                                  <input
                                                                    type="checkbox"
                                                                    name="radiobox"
                                                                  />
                                                                  <i className="helper" />
                                                                  Balkumari
                                                                </label>
                                                              </div>
                                                            </div>
                                                            <div className="form-group">
                                                              <div className="checkbox">
                                                                <label>
                                                                  <input
                                                                    type="checkbox"
                                                                    name="radiobox"
                                                                  />
                                                                  <i className="helper" />
                                                                  Bageswori
                                                                </label>
                                                              </div>
                                                            </div>
                                                            <div className="form-group">
                                                              <div className="checkbox">
                                                                <label>
                                                                  <input
                                                                    type="checkbox"
                                                                    name="radiobox"
                                                                  />
                                                                  <i className="helper" />
                                                                  Buntang
                                                                </label>
                                                              </div>
                                                            </div>
                                                            <div className="form-group">
                                                              <div className="checkbox">
                                                                <label>
                                                                  <input
                                                                    type="checkbox"
                                                                    name="radiobox"
                                                                  />
                                                                  <i className="helper" />
                                                                  Charghare
                                                                </label>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div
                                                  className="tab-pane fade"
                                                  id="sidebar-metric"
                                                  role="tabpanel"
                                                  aria-labelledby="sidebar-metric_tab"
                                                />
                                                <div
                                                  className={`tab-pane fade ${
                                                    activeTab ===
                                                    'layers'
                                                      ? 'show active'
                                                      : ''
                                                  }`}
                                                  id="sidebar-layer"
                                                  aria-labelledby="sidebar-layer_tab"
                                                  role="tab"
                                                  tabIndex={0}
                                                  onClick={() => {
                                                    this.handleTabChange(
                                                      'filters',
                                                    );
                                                  }}
                                                  onKeyPress={() => {
                                                    this.handleTabChange(
                                                      'filters',
                                                    );
                                                  }}
                                                >
                                                  <div className="layer-content mrt-15">
                                                    <div className="form-group ">
                                                      <div className="custom-checkbox display-inline">
                                                        <div className="radiobox ">
                                                          <label>
                                                            <input
                                                              type="radio"
                                                              name="radioYes"
                                                              defaultValue="layers"
                                                              defaultChecked
                                                            />
                                                            <i className="helper" />
                                                            Layers
                                                          </label>
                                                        </div>
                                                        <div className="radiobox ">
                                                          <label>
                                                            <input
                                                              type="radio"
                                                              name="radioYes"
                                                              defaultValue="baselayers"
                                                            />
                                                            <i className="helper" />
                                                            Base
                                                            Layers
                                                          </label>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div
                                                      className="layers-list display-list"
                                                      id="layers-list"
                                                    >
                                                      <div className="form-group">
                                                        <div className="checkbox">
                                                          <label>
                                                            <input
                                                              type="checkbox"
                                                              name="radiobox"
                                                            />
                                                            <i className="helper" />
                                                            Bidur
                                                            Municipality
                                                          </label>
                                                        </div>
                                                      </div>
                                                      <div className="form-group">
                                                        <div className="checkbox">
                                                          <label>
                                                            <input
                                                              type="checkbox"
                                                              name="radiobox"
                                                            />
                                                            <i className="helper" />
                                                            Balkumari
                                                          </label>
                                                        </div>
                                                      </div>
                                                      <div className="form-group">
                                                        <div className="checkbox">
                                                          <label>
                                                            <input
                                                              type="checkbox"
                                                              name="radiobox"
                                                            />
                                                            <i className="helper" />
                                                            Bageswori
                                                          </label>
                                                        </div>
                                                      </div>
                                                      <div className="form-group">
                                                        <div className="checkbox">
                                                          <label>
                                                            <input
                                                              type="checkbox"
                                                              name="radiobox"
                                                            />
                                                            <i className="helper" />
                                                            Buntang
                                                          </label>
                                                        </div>
                                                      </div>
                                                      <div className="form-group">
                                                        <div className="checkbox">
                                                          <label>
                                                            <input
                                                              type="checkbox"
                                                              name="radiobox"
                                                            />
                                                            <i className="helper" />
                                                            Charghare
                                                          </label>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div
                                                      className="thumb-list mr-0 layers-list"
                                                      id="base-layers"
                                                    >
                                                      <ul>
                                                        <li>
                                                          <figure
                                                            style={{
                                                              backgroundImage:
                                                                "url('img/map.png')",
                                                            }}
                                                          />
                                                          <div className="content">
                                                            <h6>
                                                              Open
                                                              street
                                                              map
                                                            </h6>
                                                          </div>
                                                        </li>
                                                        <li>
                                                          <figure
                                                            style={{
                                                              backgroundImage:
                                                                "url('img/map.png')",
                                                            }}
                                                          />
                                                          <div className="content">
                                                            <h6>
                                                              Google
                                                              street
                                                            </h6>
                                                          </div>
                                                        </li>
                                                        <li>
                                                          <figure
                                                            style={{
                                                              backgroundImage:
                                                                "url('img/map.png')",
                                                            }}
                                                          />
                                                          <div className="content">
                                                            <h6>
                                                              Google
                                                              Hybrid
                                                            </h6>
                                                          </div>
                                                        </li>
                                                        <li>
                                                          <figure
                                                            style={{
                                                              backgroundImage:
                                                                "url('img/map.png')",
                                                            }}
                                                          />
                                                          <div className="content">
                                                            <h6>
                                                              Google
                                                              satelite
                                                            </h6>
                                                          </div>
                                                        </li>
                                                        <li>
                                                          <figure
                                                            style={{
                                                              backgroundImage:
                                                                "url('img/map.png')",
                                                            }}
                                                          />
                                                          <div className="content">
                                                            <h6>
                                                              google
                                                              Terrain
                                                            </h6>
                                                          </div>
                                                        </li>
                                                        <li>
                                                          <figure
                                                            style={{
                                                              backgroundImage:
                                                                "url('images/map.png')",
                                                            }}
                                                          />
                                                          <div className="content">
                                                            <h6>
                                                              google
                                                              Terrain
                                                            </h6>
                                                          </div>
                                                        </li>
                                                      </ul>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="buttons flex-between">
                                                <button
                                                  type="button"
                                                  className="fieldsight-btn border-btn"
                                                >
                                                  Cancel
                                                </button>
                                                <button
                                                  type="button"
                                                  className="fieldsight-btn bg-btn"
                                                >
                                                  apply
                                                </button>
                                              </div>
                                            </form>
                                          </div>
                                        </div>

                                        <div className="map-tool top">
                                          <a
                                            // href="#"
                                            data-toggle="tooltip"
                                            title="Zoom In"
                                            data-placement="right"
                                          >
                                            <i className="la la-plus" />
                                          </a>
                                          <a
                                            // href="#"
                                            data-toggle="tooltip"
                                            title="Zoom Out"
                                            data-placement="right"
                                          >
                                            <i className="la la-minus" />
                                          </a>
                                          <a
                                            // href="#"
                                            data-toggle="tooltip"
                                            title="Drag"
                                            data-placement="right"
                                          >
                                            <i className="la la-hand-paper" />
                                          </a>
                                          <a
                                            // href="#"
                                            data-toggle="tooltip"
                                            title="Refresh"
                                            data-placement="right"
                                          >
                                            <i className="la la-sync" />
                                          </a>
                                        </div>
                                        <div className="map-tool bottom">
                                          <a
                                            // href="#"
                                            data-toggle="tooltip"
                                            title="Measurement"
                                            data-placement="right"
                                          >
                                            <i className="la la-server" />
                                          </a>
                                          <a
                                            // href="#"
                                            data-toggle="tooltip"
                                            title="Export"
                                            data-placement="right"
                                          >
                                            <i className="la la-file-export" />
                                          </a>
                                          <a
                                            // href="#"
                                            data-toggle="tooltip"
                                            title="Share"
                                            data-placement="right"
                                            data-tab="share-popup"
                                          >
                                            <i className="la la-share-alt" />
                                          </a>
                                          <a>
                                            <i className="la la-save" />
                                            <ul>
                                              <li>save</li>
                                              <li data-tab="map-list">
                                                save list
                                              </li>
                                            </ul>
                                          </a>
                                        </div>
                                        <div
                                          className="fieldsight-popup"
                                          id="site-info-popup"
                                        >
                                          <div className="popup-body">
                                            <div className="card">
                                              <div className="card-header main-card-header">
                                                <h5>
                                                  manage filters &
                                                  Metrics
                                                </h5>
                                                <span className="popup-close">
                                                  <i className="la la-close" />
                                                </span>
                                              </div>
                                              <div className="card-body">
                                                <form className="floating-form">
                                                  <ul
                                                    className="nav nav-tabs flex-between"
                                                    id="mapTab"
                                                    role="tablist"
                                                  >
                                                    <li className="nav-item">
                                                      <a
                                                        className="nav-link active"
                                                        id="map-filter_tab"
                                                        data-toggle="tab"
                                                        href="#map-filter"
                                                        role="tab"
                                                        aria-controls="map-filter"
                                                        aria-selected="true"
                                                      >
                                                        Filters
                                                      </a>
                                                    </li>
                                                    <li className="nav-item">
                                                      <a
                                                        className="nav-link "
                                                        id="map-metric_tab"
                                                        data-toggle="tab"
                                                        href="#map-metric"
                                                        role="tab"
                                                        aria-controls="map-metric"
                                                        aria-selected="false"
                                                      >
                                                        metrics
                                                      </a>
                                                    </li>
                                                    <li className="nav-item">
                                                      <a
                                                        className="nav-link"
                                                        id="map-layer_tab"
                                                        data-toggle="tab"
                                                        href="#map-layer"
                                                        role="tab"
                                                        aria-controls="map-layer"
                                                        aria-selected="true"
                                                      >
                                                        Layers
                                                      </a>
                                                    </li>
                                                  </ul>
                                                  <div
                                                    className="tab-content mrt-15"
                                                    id="mapTabContent"
                                                  >
                                                    <div
                                                      className="tab-pane fade show active"
                                                      id="map-filter"
                                                      role="tabpanel"
                                                      aria-labelledby="map-filter_tab"
                                                    >
                                                      <div className="map-filter-data">
                                                        <div className="form-group ">
                                                          <label className="mb-2">
                                                            Select
                                                            filter
                                                            type
                                                          </label>
                                                          <div className="custom-checkbox display-inline">
                                                            <div className="radiobox ">
                                                              <label>
                                                                <input
                                                                  type="radio"
                                                                  name="radio"
                                                                  defaultValue="site-data"
                                                                  defaultChecked
                                                                />
                                                                <i className="helper" />
                                                                site
                                                                information
                                                              </label>
                                                            </div>
                                                            <div className="radiobox ">
                                                              <label>
                                                                <input
                                                                  type="radio"
                                                                  name="radio"
                                                                  defaultValue="form-data"
                                                                />
                                                                <i className="helper" />
                                                                Form
                                                                Data
                                                              </label>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div
                                                          className="filter-data site-data"
                                                          id="site-data"
                                                        >
                                                          <div className="form-group">
                                                            <label>
                                                              Select
                                                              site
                                                              information
                                                            </label>
                                                            <select className="wide">
                                                              <option>
                                                                Trying
                                                                form
                                                                another
                                                                project
                                                              </option>
                                                              <option>
                                                                Enter
                                                                birth
                                                                date
                                                              </option>
                                                            </select>
                                                          </div>
                                                        </div>
                                                        <div
                                                          className="filter-data form-data"
                                                          id="form-data"
                                                        >
                                                          <div className="form-group">
                                                            <label>
                                                              Select
                                                              form
                                                            </label>
                                                            <select className="wide">
                                                              <option>
                                                                Form 1
                                                              </option>
                                                              <option>
                                                                Form 2
                                                              </option>
                                                            </select>
                                                          </div>
                                                          <div className="form-group">
                                                            <label>
                                                              Select
                                                              Question
                                                            </label>
                                                            <select className="wide">
                                                              <option>
                                                                Question
                                                                1
                                                              </option>
                                                              <option>
                                                                Question
                                                                2
                                                              </option>
                                                            </select>
                                                          </div>
                                                        </div>
                                                        <div className="buttons flex-end">
                                                          <a
                                                            // href="#"
                                                            className=" fieldsight-btn bg-btn"
                                                          >
                                                            Add
                                                          </a>
                                                        </div>
                                                        <ul className="filter-list mrt-30 mrb-30">
                                                          <li>
                                                            <span className="site-info">
                                                              Trying
                                                              form
                                                              another
                                                              project
                                                            </span>
                                                            <span className="filter-type">
                                                              site
                                                              Information
                                                            </span>
                                                            <a
                                                              // href="#"
                                                              className="action"
                                                              data-toggle="tooltip"
                                                              title="Remove"
                                                            >
                                                              <i className="la la-trash" />
                                                            </a>
                                                          </li>
                                                          <li>
                                                            <span className="site-info">
                                                              Enter
                                                              birth
                                                              date
                                                            </span>
                                                            <span className="filter-type">
                                                              Form
                                                              data
                                                            </span>
                                                            <a
                                                              // href="#"
                                                              className="action"
                                                              data-toggle="tooltip"
                                                              title="Remove"
                                                            >
                                                              <i className="la la-trash" />
                                                            </a>
                                                          </li>
                                                          <li>
                                                            <span className="site-info">
                                                              Enter
                                                              Address
                                                            </span>
                                                            <span className="filter-type">
                                                              site
                                                              Information
                                                            </span>
                                                            <a
                                                              // href="#"
                                                              className="action"
                                                              data-toggle="tooltip"
                                                              title="Remove"
                                                            >
                                                              <i className="la la-trash" />
                                                            </a>
                                                          </li>
                                                        </ul>
                                                      </div>
                                                      <div className="buttons flex-end">
                                                        <a
                                                          // href="#"
                                                          className=" fieldsight-btn bg-btn"
                                                        >
                                                          Apply
                                                        </a>
                                                      </div>
                                                    </div>
                                                    <div
                                                      className="tab-pane fade"
                                                      id="map-metric"
                                                      role="tabpanel"
                                                      aria-labelledby="map-metric_tab"
                                                    >
                                                      <div className="map-filter-data metric-filter">
                                                        <div className="form-group ">
                                                          <label className="mb-2">
                                                            Select
                                                            filter
                                                            type
                                                          </label>
                                                          <div className="custom-checkbox display-inline">
                                                            <div className="radiobox ">
                                                              <label>
                                                                <input
                                                                  type="radio"
                                                                  name="radioYes"
                                                                  defaultValue="size"
                                                                  defaultChecked
                                                                />
                                                                <i className="helper" />
                                                                size
                                                              </label>
                                                            </div>
                                                            <div className="radiobox ">
                                                              <label>
                                                                <input
                                                                  type="radio"
                                                                  name="radioYes"
                                                                  defaultValue="color"
                                                                />
                                                                <i className="helper" />
                                                                Color
                                                              </label>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div
                                                          className="filter-data display-data size"
                                                          id="size-data"
                                                        >
                                                          <div className="form-group">
                                                            <label>
                                                              Select
                                                              form
                                                            </label>
                                                            <select className="wide">
                                                              <option>
                                                                Form 1
                                                              </option>
                                                              <option>
                                                                Form 2
                                                              </option>
                                                            </select>
                                                          </div>
                                                          <div className="form-group">
                                                            <label>
                                                              Select
                                                              Question
                                                            </label>
                                                            <select className="wide">
                                                              <option>
                                                                Question
                                                                1
                                                              </option>
                                                              <option>
                                                                Question
                                                                2
                                                              </option>
                                                            </select>
                                                          </div>
                                                        </div>
                                                        <div
                                                          className="filter-data color"
                                                          id="color-data"
                                                        >
                                                          <div className="form-group">
                                                            <label>
                                                              Select
                                                              form
                                                            </label>
                                                            <select className="wide">
                                                              <option>
                                                                Form 1
                                                              </option>
                                                              <option>
                                                                Form 2
                                                              </option>
                                                            </select>
                                                          </div>
                                                          <div className="form-group">
                                                            <label>
                                                              Select
                                                              Question
                                                            </label>
                                                            <select className="wide">
                                                              <option>
                                                                Question
                                                                1
                                                              </option>
                                                              <option>
                                                                Question
                                                                2
                                                              </option>
                                                            </select>
                                                          </div>
                                                          <div className="form-group">
                                                            <select className="custom-select">
                                                              <option defaultValue="dicrete-content">
                                                                Dicrete
                                                              </option>
                                                              <option defaultValue="range-content">
                                                                Range
                                                              </option>
                                                            </select>
                                                          </div>
                                                          <div className="dicrete-content filter-content">
                                                            <ul className="filter-list mrt-15 mrb-30">
                                                              <div className="filter-list-title flex-between ">
                                                                <h6>
                                                                  Discrete
                                                                </h6>
                                                                <div className="form-group ">
                                                                  <div className="custom-checkbox display-inline">
                                                                    <div className="checkbox ">
                                                                      <label>
                                                                        <input
                                                                          type="checkbox"
                                                                          name="all"
                                                                          defaultValue=""
                                                                        />
                                                                        <i className="helper" />
                                                                        Select
                                                                        all
                                                                      </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>

                                                              <li>
                                                                <div className="form-group ">
                                                                  <div className="custom-checkbox display-inline">
                                                                    <div className="checkbox ">
                                                                      <label>
                                                                        <input
                                                                          type="checkbox"
                                                                          name="layer1"
                                                                          defaultValue=""
                                                                        />
                                                                        <i className="helper" />
                                                                        Layer
                                                                        1
                                                                      </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <span className="layer-style">
                                                                  <input
                                                                    name="favcolor"
                                                                    defaultValue="#00628E"
                                                                    className="layer-shape jscolor"
                                                                  />
                                                                  layer
                                                                  style
                                                                </span>
                                                                <a
                                                                  // href="#"
                                                                  className="action"
                                                                  data-toggle="tooltip"
                                                                  title="Remove"
                                                                >
                                                                  <i className="la la-trash" />
                                                                </a>
                                                              </li>
                                                              <li>
                                                                <div className="form-group ">
                                                                  <div className="custom-checkbox display-inline">
                                                                    <div className="checkbox ">
                                                                      <label>
                                                                        <input
                                                                          type="checkbox"
                                                                          name="layer1"
                                                                          defaultValue=""
                                                                        />
                                                                        <i className="helper" />
                                                                        Layer
                                                                        2
                                                                      </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <span className="layer-style">
                                                                  <input
                                                                    name="favcolor"
                                                                    defaultValue="#28a745"
                                                                    className="layer-shape  jscolor"
                                                                  />
                                                                  layer
                                                                  style
                                                                </span>
                                                                <a
                                                                  // href="#"
                                                                  className="action"
                                                                  data-toggle="tooltip"
                                                                  title="Remove"
                                                                >
                                                                  <i className="la la-trash" />
                                                                </a>
                                                              </li>
                                                              <li>
                                                                <div className="form-group ">
                                                                  <div className="custom-checkbox display-inline">
                                                                    <div className="checkbox ">
                                                                      <label>
                                                                        <input
                                                                          type="checkbox"
                                                                          name="layer3"
                                                                          defaultValue=""
                                                                        />
                                                                        <i className="helper" />
                                                                        Layer
                                                                        3
                                                                      </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <span className="layer-style">
                                                                  {' '}
                                                                  <input
                                                                    name="favcolor"
                                                                    defaultValue="#e94235"
                                                                    className="layer-shape  jscolor"
                                                                  />
                                                                  layer
                                                                  style
                                                                </span>
                                                                <a
                                                                  // href="#"
                                                                  className="action"
                                                                  data-toggle="tooltip"
                                                                  title="Remove"
                                                                >
                                                                  <i className="la la-trash" />
                                                                </a>
                                                              </li>
                                                            </ul>
                                                          </div>

                                                          <div className="range-content filter-content">
                                                            <div className="classes">
                                                              <div className="row">
                                                                <div className="col-md-6">
                                                                  <div className="form-group inline-form-group">
                                                                    <label className="">
                                                                      Classes
                                                                    </label>
                                                                    <input
                                                                      type="text"
                                                                      className="form-control"
                                                                    />
                                                                  </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                  <div className="form-group inline-form-group">
                                                                    <label className="">
                                                                      Value
                                                                    </label>
                                                                    <input
                                                                      type="number"
                                                                      className="form-control"
                                                                    />
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                            <ul className="filter-list mrt-15 mrb-30">
                                                              <div className="filter-list-title flex-between ">
                                                                <h6>
                                                                  Range
                                                                </h6>
                                                                <div className="form-group ">
                                                                  <div className="custom-checkbox display-inline">
                                                                    <div className="checkbox ">
                                                                      <label>
                                                                        <input
                                                                          type="checkbox"
                                                                          name="all"
                                                                          defaultValue=""
                                                                        />
                                                                        <i className="helper" />
                                                                        Select
                                                                        all
                                                                      </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>

                                                              <li>
                                                                <div className="form-group ">
                                                                  <div className="custom-checkbox display-inline">
                                                                    <div className="checkbox ">
                                                                      <label>
                                                                        <input
                                                                          type="checkbox"
                                                                          name="layer1"
                                                                          defaultValue=""
                                                                        />
                                                                        <i className="helper" />
                                                                        Layer
                                                                        1
                                                                      </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <span className="layer-style">
                                                                  <input
                                                                    name="favcolor"
                                                                    defaultValue="#00628E"
                                                                    className="layer-shape jscolor"
                                                                  />
                                                                  layer
                                                                  style
                                                                </span>
                                                                <a
                                                                  // href="#"
                                                                  className="action"
                                                                  data-toggle="tooltip"
                                                                  title="Remove"
                                                                >
                                                                  <i className="la la-trash" />
                                                                </a>
                                                              </li>
                                                              <li>
                                                                <div className="form-group ">
                                                                  <div className="custom-checkbox display-inline">
                                                                    <div className="checkbox ">
                                                                      <label>
                                                                        <input
                                                                          type="checkbox"
                                                                          name="layer1"
                                                                          defaultValue=""
                                                                        />
                                                                        <i className="helper" />
                                                                        Layer
                                                                        2
                                                                      </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <span className="layer-style">
                                                                  <input
                                                                    name="favcolor"
                                                                    defaultValue="#28a745"
                                                                    className="layer-shape  jscolor"
                                                                  />
                                                                  layer
                                                                  style
                                                                </span>
                                                                <a
                                                                  // href="#"
                                                                  className="action"
                                                                  data-toggle="tooltip"
                                                                  title="Remove"
                                                                >
                                                                  <i className="la la-trash" />
                                                                </a>
                                                              </li>
                                                              <li>
                                                                <div className="form-group ">
                                                                  <div className="custom-checkbox display-inline">
                                                                    <div className="checkbox ">
                                                                      <label>
                                                                        <input
                                                                          type="checkbox"
                                                                          name="layer3"
                                                                          defaultValue=""
                                                                        />
                                                                        <i className="helper" />
                                                                        Layer
                                                                        3
                                                                      </label>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <span className="layer-style">
                                                                  {' '}
                                                                  <input
                                                                    name="favcolor"
                                                                    defaultValue="#e94235"
                                                                    className="layer-shape  jscolor"
                                                                  />
                                                                  layer
                                                                  style
                                                                </span>
                                                                <a
                                                                  // href="#"
                                                                  className="action"
                                                                  data-toggle="tooltip"
                                                                  title="Remove"
                                                                >
                                                                  <i className="la la-trash" />
                                                                </a>
                                                              </li>
                                                            </ul>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div
                                                      className="tab-pane fade"
                                                      id="map-layer"
                                                      role="tabpanel"
                                                      aria-labelledby="map-layer_tab"
                                                    >
                                                      <div className="add-btn flex-start layer-add">
                                                        <a
                                                          // href="#"
                                                          data-tab="scheduled-popup"
                                                        >
                                                          {' '}
                                                          Add new
                                                          <span>
                                                            <i className="la la-plus" />
                                                          </span>
                                                        </a>
                                                      </div>
                                                      <div className="layer-form mrt-30">
                                                        <h6>
                                                          Add layer
                                                        </h6>
                                                        <div className="form-group">
                                                          <input
                                                            type="text"
                                                            className="form-control"
                                                            required
                                                          />
                                                          <label htmlFor="input">
                                                            Layer Name
                                                          </label>
                                                        </div>
                                                        <div className="form-group">
                                                          <label>
                                                            upload
                                                            type
                                                          </label>
                                                          <select className="wide">
                                                            <option>
                                                              CSV
                                                            </option>
                                                            <option>
                                                              Geojson
                                                            </option>
                                                            <option>
                                                              Kml
                                                            </option>
                                                            <option>
                                                              Shapefile
                                                            </option>
                                                          </select>
                                                        </div>
                                                        <div className="form-group">
                                                          <label className="mb-2">
                                                            upload
                                                            file
                                                          </label>
                                                          <div className="custom-file">
                                                            <input
                                                              type="file"
                                                              className="custom-file-input"
                                                              id="customFile"
                                                            />
                                                            <label
                                                              className="custom-file-label"
                                                              htmlFor="customFile"
                                                            >
                                                              Choose
                                                              file
                                                            </label>
                                                          </div>
                                                        </div>

                                                        <div className="form-group">
                                                          <label>
                                                            Latitude
                                                          </label>
                                                          <select className="wide">
                                                            <option>
                                                              27.77
                                                            </option>
                                                            <option>
                                                              27.77
                                                            </option>
                                                            <option>
                                                              27.77
                                                            </option>
                                                            <option>
                                                              27.77
                                                            </option>
                                                          </select>
                                                        </div>
                                                        <div className="form-group">
                                                          <label>
                                                            Longitude
                                                          </label>
                                                          <select className="wide">
                                                            <option>
                                                              27.77
                                                            </option>
                                                            <option>
                                                              27.77
                                                            </option>
                                                            <option>
                                                              27.77
                                                            </option>
                                                            <option>
                                                              27.77
                                                            </option>
                                                          </select>
                                                        </div>
                                                        <div className="form-group pull-right no-margin">
                                                          <button
                                                            type="submit"
                                                            className="fieldsight-btn"
                                                          >
                                                            Save
                                                          </button>
                                                        </div>
                                                      </div>
                                                      <ul className="filter-list mrt-15 mrb-30">
                                                        <h6>
                                                          Available
                                                          layers
                                                        </h6>
                                                        <li>
                                                          <div className="form-group ">
                                                            <div className="custom-checkbox display-inline">
                                                              <div className="checkbox ">
                                                                <label>
                                                                  <input
                                                                    type="checkbox"
                                                                    name="layer1"
                                                                    defaultValue=""
                                                                  />
                                                                  <i className="helper" />
                                                                  Layer
                                                                  1
                                                                </label>
                                                              </div>
                                                            </div>
                                                          </div>
                                                          <span className="layer-style">
                                                            <small data-tab="map-style" />
                                                            Layer
                                                            style
                                                          </span>
                                                          <a
                                                            className="action"
                                                            data-toggle="tooltip"
                                                            title="Remove"
                                                          >
                                                            <i className="la la-trash" />
                                                          </a>
                                                        </li>
                                                        <li>
                                                          <div className="form-group ">
                                                            <div className="custom-checkbox display-inline">
                                                              <div className="checkbox ">
                                                                <label>
                                                                  <input
                                                                    type="checkbox"
                                                                    name="layer1"
                                                                    defaultValue=""
                                                                  />
                                                                  <i className="helper" />
                                                                  Layer
                                                                  2
                                                                </label>
                                                              </div>
                                                            </div>
                                                          </div>
                                                          <span className="layer-style">
                                                            <small data-tab="map-style" />
                                                            layer
                                                            style
                                                          </span>
                                                          <a
                                                            // href="#"
                                                            className="action"
                                                            data-toggle="tooltip"
                                                            title="Remove"
                                                          >
                                                            <i className="la la-trash" />
                                                          </a>
                                                        </li>
                                                        <li>
                                                          <div className="form-group ">
                                                            <div className="custom-checkbox display-inline">
                                                              <div className="checkbox ">
                                                                <label>
                                                                  <input
                                                                    type="checkbox"
                                                                    name="layer3"
                                                                    defaultValue=""
                                                                  />
                                                                  <i className="helper" />
                                                                  Layer
                                                                  3
                                                                </label>
                                                              </div>
                                                            </div>
                                                          </div>
                                                          <span className="layer-style">
                                                            <small data-tab="map-style" />
                                                            layer
                                                            style
                                                          </span>
                                                          <a
                                                            // href="#"
                                                            className="action"
                                                            data-toggle="tooltip"
                                                            title="Remove"
                                                          >
                                                            <i className="la la-trash" />
                                                          </a>
                                                        </li>
                                                      </ul>

                                                      <div className="form-group pull-right no-margin">
                                                        <button
                                                          type="submit"
                                                          className="fieldsight-btn"
                                                        >
                                                          apply
                                                        </button>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </form>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          className="fieldsight-popup dark"
                                          id="share-popup"
                                          tabIndex="-1"
                                        >
                                          <div className="popup-body md-body">
                                            <div className="card">
                                              <div className="card-header main-card-header">
                                                <h5>share map</h5>
                                                <span className="popup-close">
                                                  <i className="la la-close" />
                                                </span>
                                              </div>
                                              <div className="card-body">
                                                <ul
                                                  className="nav nav-tabs"
                                                  id="myTab"
                                                  role="tablist"
                                                >
                                                  <li className="nav-item">
                                                    <a
                                                      className="nav-link"
                                                      id="general_tab"
                                                      data-toggle="tab"
                                                      href="#my-forms"
                                                      role="tab"
                                                      aria-controls="my-forms"
                                                      aria-selected="false"
                                                    >
                                                      share with
                                                    </a>
                                                  </li>
                                                  <li className="nav-item">
                                                    <a
                                                      className="nav-link active"
                                                      id="shared-forms_tab"
                                                      data-toggle="tab"
                                                      href="#shared-forms"
                                                      role="tab"
                                                      aria-controls="shared-forms"
                                                      aria-selected="true"
                                                    >
                                                      shared map
                                                    </a>
                                                  </li>
                                                </ul>
                                                <div
                                                  className="tab-content"
                                                  id="choose-forms"
                                                >
                                                  <div
                                                    className="tab-pane fade show active"
                                                    id="my-forms"
                                                    role="tabpanel"
                                                    aria-labelledby="my-forms_tab"
                                                  >
                                                    <form className="floating-form">
                                                      <div className="form-group">
                                                        <input
                                                          type="search"
                                                          className="form-control"
                                                          required=""
                                                        />
                                                        <label htmlFor="input">
                                                          Search
                                                        </label>
                                                        <i className="la la-search" />
                                                      </div>
                                                      <div className="form-group">
                                                        <div className="radiobox">
                                                          <label>
                                                            <input
                                                              type="radio"
                                                              name="radiobox"
                                                            />
                                                            <i className="helper" />
                                                            Skills for
                                                            Tourism
                                                            Assessment
                                                            Form -
                                                            Test
                                                          </label>
                                                        </div>
                                                        <div className="select-form-info">
                                                          <span className="form-owner">
                                                            Arun
                                                            Bhandari
                                                          </span>
                                                          <time>
                                                            <i className="la la-clock-o" />
                                                            2019-07-30
                                                          </time>
                                                        </div>
                                                      </div>
                                                      <div className="form-group">
                                                        <div className="radiobox ">
                                                          <label>
                                                            <input
                                                              type="radio"
                                                              name="radiobox"
                                                            />
                                                            <i className="helper" />
                                                            Certificado
                                                            de
                                                            Comercializacioón
                                                            9
                                                          </label>
                                                        </div>
                                                        <div className="select-form-info">
                                                          <span className="form-owner">
                                                            Santosh
                                                            kshetri
                                                            Bhandari
                                                          </span>
                                                          <time>
                                                            <i className="la la-clock-o" />
                                                            2019-07-30
                                                          </time>
                                                        </div>
                                                      </div>
                                                      <div className="form-group">
                                                        <div className="radiobox ">
                                                          <label>
                                                            <input
                                                              type="radio"
                                                              name="radiobox"
                                                            />
                                                            <i className="helper" />
                                                            Skills for
                                                            Tourism
                                                            Assessment
                                                            Form -
                                                            Test
                                                          </label>
                                                        </div>
                                                        <div className="select-form-info">
                                                          <span className="form-owner">
                                                            Arun
                                                            Bhandari
                                                          </span>
                                                          <time>
                                                            <i className="la la-clock-o" />
                                                            2019-07-30
                                                          </time>
                                                        </div>
                                                      </div>
                                                      <div className="form-group">
                                                        <div className="radiobox ">
                                                          <label>
                                                            <input
                                                              type="radio"
                                                              name="radiobox"
                                                            />
                                                            <i className="helper" />
                                                            Certificado
                                                            de
                                                            Comercializacioón
                                                            9
                                                          </label>
                                                        </div>
                                                        <div className="select-form-info">
                                                          <span className="form-owner">
                                                            Santosh
                                                            kshetri
                                                            Bhandari
                                                          </span>
                                                          <time>
                                                            <i className="la la-clock-o" />
                                                            2019-07-30
                                                          </time>
                                                        </div>
                                                      </div>
                                                      <div className="form-group">
                                                        <div className="radiobox ">
                                                          <label>
                                                            <input
                                                              type="radio"
                                                              name="radiobox"
                                                            />
                                                            <i className="helper" />
                                                            Certificado
                                                            de
                                                            Comercializacioón
                                                            9
                                                          </label>
                                                        </div>
                                                        <div className="select-form-info">
                                                          <span className="form-owner">
                                                            Santosh
                                                            kshetri
                                                            Bhandari
                                                          </span>
                                                          <time>
                                                            <i className="la la-clock-o" />
                                                            2019-07-30
                                                          </time>
                                                        </div>
                                                      </div>
                                                      <div className="form-group pull-right no-margin">
                                                        <button
                                                          type="submit"
                                                          className="fieldsight-btn"
                                                        >
                                                          share
                                                        </button>
                                                      </div>
                                                    </form>
                                                  </div>
                                                  <div
                                                    className="tab-pane fade"
                                                    id="shared-forms"
                                                    role="tabpanel"
                                                    aria-labelledby="shared-forms_tab"
                                                  >
                                                    <form className="floating-form">
                                                      <div className="form-group">
                                                        <input
                                                          type="search"
                                                          className="form-control"
                                                          required=""
                                                        />
                                                        <label htmlFor="input">
                                                          Search
                                                        </label>
                                                        <i className="la la-search" />
                                                      </div>
                                                      <div className="form-group">
                                                        <div className="radiobox">
                                                          <label>
                                                            <input
                                                              type="radio"
                                                              name="radiobox"
                                                            />
                                                            <i className="helper" />
                                                            Skills for
                                                            Tourism
                                                            Assessment
                                                            Form -
                                                            Test
                                                          </label>
                                                        </div>
                                                        <div className="select-form-info">
                                                          <span className="form-owner">
                                                            Arun
                                                            Bhandari
                                                          </span>
                                                          <time>
                                                            <i className="la la-clock-o" />
                                                            2019-07-30
                                                          </time>
                                                        </div>
                                                      </div>
                                                      <div className="form-group">
                                                        <div className="radiobox ">
                                                          <label>
                                                            <input
                                                              type="radio"
                                                              name="radiobox"
                                                            />
                                                            <i className="helper" />
                                                            Certificado
                                                            de
                                                            Comercializacioón
                                                            9
                                                          </label>
                                                        </div>
                                                        <div className="select-form-info">
                                                          <span className="form-owner">
                                                            Santosh
                                                            kshetri
                                                            Bhandari
                                                          </span>
                                                          <time>
                                                            <i className="la la-clock-o" />
                                                            2019-07-30
                                                          </time>
                                                        </div>
                                                      </div>
                                                      <div className="form-group">
                                                        <div className="radiobox ">
                                                          <label>
                                                            <input
                                                              type="radio"
                                                              name="radiobox"
                                                            />
                                                            <i className="helper" />
                                                            Skills for
                                                            Tourism
                                                            Assessment
                                                            Form -
                                                            Test
                                                          </label>
                                                        </div>
                                                        <div className="select-form-info">
                                                          <span className="form-owner">
                                                            Arun
                                                            Bhandari
                                                          </span>
                                                          <time>
                                                            <i className="la la-clock-o" />
                                                            2019-07-30
                                                          </time>
                                                        </div>
                                                      </div>
                                                      <div className="form-group">
                                                        <div className="radiobox ">
                                                          <label>
                                                            <input
                                                              type="radio"
                                                              name="radiobox"
                                                            />
                                                            <i className="helper" />
                                                            Certificado
                                                            de
                                                            Comercializacioón
                                                            9
                                                          </label>
                                                        </div>
                                                        <div className="select-form-info">
                                                          <span className="form-owner">
                                                            Santosh
                                                            kshetri
                                                            Bhandari
                                                          </span>
                                                          <time>
                                                            <i className="la la-clock-o" />
                                                            2019-07-30
                                                          </time>
                                                        </div>
                                                      </div>
                                                      <div className="form-group">
                                                        <div className="radiobox ">
                                                          <label>
                                                            <input
                                                              type="radio"
                                                              name="radiobox"
                                                            />
                                                            <i className="helper" />
                                                            Certificado
                                                            de
                                                            Comercializacioón
                                                            9
                                                          </label>
                                                        </div>
                                                        <div className="select-form-info">
                                                          <span className="form-owner">
                                                            Santosh
                                                            kshetri
                                                            Bhandari
                                                          </span>
                                                          <time>
                                                            <i className="la la-clock-o" />
                                                            2019-07-30
                                                          </time>
                                                        </div>
                                                      </div>
                                                      <div className="form-group pull-right no-margin">
                                                        <button
                                                          type="submit"
                                                          className="fieldsight-btn"
                                                        >
                                                          share
                                                        </button>
                                                      </div>
                                                    </form>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          className="fieldsight-popup"
                                          id="map-style"
                                          tabIndex="-1"
                                        >
                                          <div className="popup-body md-body">
                                            <div className="card">
                                              <div className="card-header main-card-header">
                                                <h5>Map style</h5>
                                                <span className="popup-close">
                                                  <i className="la la-close" />
                                                </span>
                                              </div>
                                              <div className="card-body">
                                                <form className="floating-form">
                                                  <div className="line-color">
                                                    <h6>
                                                      Line color
                                                    </h6>
                                                    <div className="row">
                                                      <div className="col-md-6">
                                                        <div className="form-group inline-form-group">
                                                          <label htmlFor="input">
                                                            line color
                                                          </label>
                                                          <input
                                                            type="text"
                                                            className="form-control jscolor"
                                                          />
                                                        </div>
                                                      </div>
                                                      <div className="col-md-6">
                                                        <div className="form-group inline-form-group">
                                                          <label>
                                                            line
                                                            opacity
                                                          </label>
                                                          <input
                                                            type="nubmer"
                                                            className="form-control "
                                                          />
                                                        </div>
                                                      </div>
                                                      <div className="col-md-6">
                                                        <div className="form-group inline-form-group">
                                                          <label>
                                                            line
                                                            thickness
                                                          </label>
                                                          <input
                                                            type="number"
                                                            className="form-control"
                                                          />
                                                        </div>
                                                      </div>
                                                      <div className="col-md-6">
                                                        <div className="form-group inline-form-group">
                                                          <label>
                                                            {' '}
                                                            Dash line
                                                          </label>
                                                          <input
                                                            type="number"
                                                            className="form-control"
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>

                                                  <div className="fill-color">
                                                    <h6>
                                                      Fill color
                                                    </h6>
                                                    <div className="row">
                                                      <div className="col-md-6">
                                                        <div className="form-group inline-form-group">
                                                          <label htmlFor="input">
                                                            fill color
                                                          </label>
                                                          <input
                                                            type="text"
                                                            className="form-control jscolor"
                                                          />
                                                        </div>
                                                      </div>
                                                      <div className="col-md-6">
                                                        <div className="form-group inline-form-group">
                                                          <label>
                                                            fill
                                                            opacity
                                                          </label>
                                                          <input
                                                            type="nubmer"
                                                            className="form-control "
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>

                                                  <div className="form-group pull-right no-margin">
                                                    <button
                                                      type="submit"
                                                      className="fieldsight-btn"
                                                    >
                                                      Apply
                                                    </button>
                                                  </div>
                                                </form>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          className="fieldsight-popup dark"
                                          id="map-list"
                                          tabIndex="-1"
                                        >
                                          <div className="popup-body md-body">
                                            <div className="card">
                                              <div className="card-header main-card-header">
                                                <h5>map</h5>
                                                <span className="popup-close">
                                                  <i className="la la-close" />
                                                </span>
                                              </div>
                                              <div className="card-body">
                                                <div className="tab-content">
                                                  <form className="floating-form">
                                                    <div className="form-group">
                                                      <input
                                                        type="search"
                                                        className="form-control"
                                                        required=""
                                                      />
                                                      <label htmlFor="input">
                                                        Search
                                                      </label>
                                                      <i className="la la-search" />
                                                    </div>
                                                    <div className="form-group">
                                                      <div className="radiobox">
                                                        <label>
                                                          <input
                                                            type="radio"
                                                            name="radiobox"
                                                          />
                                                          <i className="helper" />
                                                          Skills for
                                                          Tourism
                                                          Assessment
                                                          Form - Test
                                                        </label>
                                                      </div>
                                                      <div className="select-form-info">
                                                        <span className="form-owner">
                                                          Arun
                                                          Bhandari
                                                        </span>
                                                        <time>
                                                          <i className="la la-clock-o" />
                                                          2019-07-30
                                                        </time>
                                                      </div>
                                                    </div>
                                                    <div className="form-group">
                                                      <div className="radiobox ">
                                                        <label>
                                                          <input
                                                            type="radio"
                                                            name="radiobox"
                                                          />
                                                          <i className="helper" />
                                                          Certificado
                                                          de
                                                          Comercializacioón
                                                          9
                                                        </label>
                                                      </div>
                                                      <div className="select-form-info">
                                                        <span className="form-owner">
                                                          Santosh
                                                          kshetri
                                                          Bhandari
                                                        </span>
                                                        <time>
                                                          <i className="la la-clock-o" />
                                                          2019-07-30
                                                        </time>
                                                      </div>
                                                    </div>
                                                    <div className="form-group">
                                                      <div className="radiobox ">
                                                        <label>
                                                          <input
                                                            type="radio"
                                                            name="radiobox"
                                                          />
                                                          <i className="helper" />
                                                          Skills for
                                                          Tourism
                                                          Assessment
                                                          Form - Test
                                                        </label>
                                                      </div>
                                                      <div className="select-form-info">
                                                        <span className="form-owner">
                                                          Arun
                                                          Bhandari
                                                        </span>
                                                        <time>
                                                          <i className="la la-clock-o" />
                                                          2019-07-30
                                                        </time>
                                                      </div>
                                                    </div>
                                                    <div className="form-group">
                                                      <div className="radiobox ">
                                                        <label>
                                                          <input
                                                            type="radio"
                                                            name="radiobox"
                                                          />
                                                          <i className="helper" />
                                                          Certificado
                                                          de
                                                          Comercializacioón
                                                          9
                                                        </label>
                                                      </div>
                                                      <div className="select-form-info">
                                                        <span className="form-owner">
                                                          Santosh
                                                          kshetri
                                                          Bhandari
                                                        </span>
                                                        <time>
                                                          <i className="la la-clock-o" />
                                                          2019-07-30
                                                        </time>
                                                      </div>
                                                    </div>
                                                    <div className="form-group">
                                                      <div className="radiobox ">
                                                        <label>
                                                          <input
                                                            type="radio"
                                                            name="radiobox"
                                                          />
                                                          <i className="helper" />
                                                          Certificado
                                                          de
                                                          Comercializacioón
                                                          9
                                                        </label>
                                                      </div>
                                                      <div className="select-form-info">
                                                        <span className="form-owner">
                                                          Santosh
                                                          kshetri
                                                          Bhandari
                                                        </span>
                                                        <time>
                                                          <i className="la la-clock-o" />
                                                          2019-07-30
                                                        </time>
                                                      </div>
                                                    </div>
                                                    <div className="form-group pull-right no-margin">
                                                      <button
                                                        type="submit"
                                                        className="fieldsight-btn"
                                                      >
                                                        share
                                                      </button>
                                                    </div>
                                                  </form>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </main>
                                </div>
                              </div>
                            </div>
                            <li>
                              <div className="form-group ">
                                <div className="custom-checkbox display-inline">
                                  <div className="checkbox ">
                                    <label>
                                      <input
                                        type="checkbox"
                                        name="layer1"
                                        defaultValue=""
                                      />
                                      <i className="helper" />
                                      Layer 1
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <span className="layer-style">
                                <input
                                  name="favcolor"
                                  defaultValue="#00628E"
                                  className="layer-shape jscolor"
                                />
                                layer style
                              </span>
                              <a
                                // href="#"
                                className="action"
                                data-toggle="tooltip"
                                title="Remove"
                              >
                                <i className="la la-trash" />
                              </a>
                            </li>
                            <li>
                              <div className="form-group ">
                                <div className="custom-checkbox display-inline">
                                  <div className="checkbox ">
                                    <label>
                                      <input
                                        type="checkbox"
                                        name="layer1"
                                        defaultValue=""
                                      />
                                      <i className="helper" />
                                      Layer 2
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <span className="layer-style">
                                <input
                                  name="favcolor"
                                  defaultValue="#28a745"
                                  className="layer-shape  jscolor"
                                />
                                layer style
                              </span>
                              <a
                                // href="#"
                                className="action"
                                data-toggle="tooltip"
                                title="Remove"
                              >
                                <i className="la la-trash" />
                              </a>
                            </li>
                            <li>
                              <div className="form-group ">
                                <div className="custom-checkbox display-inline">
                                  <div className="checkbox ">
                                    <label>
                                      <input
                                        type="checkbox"
                                        name="layer3"
                                        defaultValue=""
                                      />
                                      <i className="helper" />
                                      Layer 3
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <span className="layer-style">
                                {' '}
                                <input
                                  name="favcolor"
                                  defaultValue="#e94235"
                                  className="layer-shape  jscolor"
                                />
                                layer style
                              </span>
                              <a
                                // href="#"
                                className="action"
                                data-toggle="tooltip"
                                title="Remove"
                              >
                                <i className="la la-trash" />
                              </a>
                            </li>
                          </ul>
                        </div>

                        <div className="range-content filter-content">
                          <div className="classes">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group inline-form-group">
                                  <label className="">Classes</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group inline-form-group">
                                  <label className="">Value</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <ul className="filter-list mrt-15 mrb-30">
                            <div className="filter-list-title flex-between ">
                              <h6>Range</h6>
                              <div className="form-group ">
                                <div className="custom-checkbox display-inline">
                                  <div className="checkbox ">
                                    <label>
                                      <input
                                        type="checkbox"
                                        name="all"
                                        defaultValue=""
                                      />
                                      <i className="helper" />
                                      Select all
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <li>
                              <div className="form-group ">
                                <div className="custom-checkbox display-inline">
                                  <div className="checkbox ">
                                    <label>
                                      <input
                                        type="checkbox"
                                        name="layer1"
                                        defaultValue=""
                                      />
                                      <i className="helper" />
                                      Layer 1
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <span className="layer-style">
                                <input
                                  name="favcolor"
                                  defaultValue="#00628E"
                                  className="layer-shape jscolor"
                                />
                                layer style
                              </span>
                              <a
                                // href="#"
                                className="action"
                                data-toggle="tooltip"
                                title="Remove"
                              >
                                <i className="la la-trash" />
                              </a>
                            </li>
                            <li>
                              <div className="form-group ">
                                <div className="custom-checkbox display-inline">
                                  <div className="checkbox ">
                                    <label>
                                      <input
                                        type="checkbox"
                                        name="layer1"
                                        defaultValue=""
                                      />
                                      <i className="helper" />
                                      Layer 2
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <span className="layer-style">
                                <input
                                  name="favcolor"
                                  defaultValue="#28a745"
                                  className="layer-shape  jscolor"
                                />
                                layer style
                              </span>
                              <a
                                // href="#"
                                className="action"
                                data-toggle="tooltip"
                                title="Remove"
                              >
                                <i className="la la-trash" />
                              </a>
                            </li>
                            <li>
                              <div className="form-group ">
                                <div className="custom-checkbox display-inline">
                                  <div className="checkbox ">
                                    <label>
                                      <input
                                        type="checkbox"
                                        name="layer3"
                                        defaultValue=""
                                      />
                                      <i className="helper" />
                                      Layer 3
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <span className="layer-style">
                                {' '}
                                <input
                                  name="favcolor"
                                  defaultValue="#e94235"
                                  className="layer-shape  jscolor"
                                />
                                layer style
                              </span>
                              <a
                                // href="#"
                                className="action"
                                data-toggle="tooltip"
                                title="Remove"
                              >
                                <i className="la la-trash" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`tab-pane fade ${
                      activeTab === 'layers' ? 'show active' : ''
                    }`}
                    id="map-layer"
                    role="tabpanel"
                    aria-labelledby="map-layer_tab"
                  >
                    <div className="add-btn flex-start layer-add">
                      <a
                        // href="#"
                        data-tab="scheduled-popup"
                      >
                        {' '}
                        Add new
                        <span>
                          <i className="la la-plus" />
                        </span>
                      </a>
                    </div>
                    <div className="layer-form mrt-30">
                      <h6>Add layer</h6>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          required
                        />
                        <label htmlFor="input">Layer Name</label>
                      </div>
                      <div className="form-group">
                        <label>upload type</label>
                        <select className="wide">
                          <option>CSV</option>
                          <option>Geojson</option>
                          <option>Kml</option>
                          <option>Shapefile</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="mb-2">upload file</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="customFile"
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFile"
                          >
                            Choose file
                          </label>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Latitude</label>
                        <select className="wide">
                          <option>27.77</option>
                          <option>27.77</option>
                          <option>27.77</option>
                          <option>27.77</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Longitude</label>
                        <select className="wide">
                          <option>27.77</option>
                          <option>27.77</option>
                          <option>27.77</option>
                          <option>27.77</option>
                        </select>
                      </div>
                      <div className="form-group pull-right no-margin">
                        <button
                          type="submit"
                          className="fieldsight-btn"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                    <ul className="filter-list mrt-15 mrb-30">
                      <h6>Available layers</h6>
                      <li>
                        <div className="form-group ">
                          <div className="custom-checkbox display-inline">
                            <div className="checkbox ">
                              <label>
                                <input
                                  type="checkbox"
                                  name="layer1"
                                  defaultValue=""
                                />
                                <i className="helper" />
                                Layer 1
                              </label>
                            </div>
                          </div>
                        </div>
                        <span className="layer-style">
                          <small data-tab="map-style" />
                          Layer style
                        </span>
                        <a
                          // href="#"
                          className="action"
                          data-toggle="tooltip"
                          title="Remove"
                        >
                          <i className="la la-trash" />
                        </a>
                      </li>
                      <li>
                        <div className="form-group ">
                          <div className="custom-checkbox display-inline">
                            <div className="checkbox ">
                              <label>
                                <input
                                  type="checkbox"
                                  name="layer1"
                                  defaultValue=""
                                />
                                <i className="helper" />
                                Layer 2
                              </label>
                            </div>
                          </div>
                        </div>
                        <span className="layer-style">
                          <small data-tab="map-style" />
                          layer style
                        </span>
                        <a
                          // href="#"
                          className="action"
                          data-toggle="tooltip"
                          title="Remove"
                        >
                          <i className="la la-trash" />
                        </a>
                      </li>
                      <li>
                        <div className="form-group ">
                          <div className="custom-checkbox display-inline">
                            <div className="checkbox ">
                              <label>
                                <input
                                  type="checkbox"
                                  name="layer3"
                                  defaultValue=""
                                />
                                <i className="helper" />
                                Layer 3
                              </label>
                            </div>
                          </div>
                        </div>
                        <span className="layer-style">
                          <small data-tab="map-style" />
                          layer style
                        </span>
                        <a
                          // href="#"
                          className="action"
                          data-toggle="tooltip"
                          title="Remove"
                        >
                          <i className="la la-trash" />
                        </a>
                      </li>
                    </ul>

                    <div className="form-group pull-right no-margin">
                      <button
                        type="submit"
                        className="fieldsight-btn"
                      >
                        apply
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalSettings;
