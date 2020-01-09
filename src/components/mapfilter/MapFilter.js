import React, { Component, createRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import { Accordion, Card, Button } from 'react-bootstrap';
import MapComponent from './MapComponent';
import MapLeftTools from './MapLeftTools';
import ModalSettings from './ModalSettings';

class MapFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // width: 0,
      height: 0,
      zoom: 8,
      activeTab: 'filters',
      activeLayers: 'main_layers',
      searchDropdown: false,
      modalSetting: false,
    };
  }

  updateDimensions() {
    const height =
      window.innerWidth >= 992 ? window.innerHeight : 400;
    this.setState({ height: height - 32 });
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener(
      'resize',
      this.updateDimensions.bind(this),
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      'resize',
      this.updateDimensions.bind(this),
    );
  }

  scaleClick = () => {
    const leafletdrawIcon = document.getElementsByClassName(
      'js-start',
    )[0];
    document.getElementsByClassName(
      'js-interaction',
    )[0].style.display = 'block';

    document.getElementsByClassName('js-toggle')[0].style.display =
      'none';

    leafletdrawIcon.click();
    leafletdrawIcon.style.display = 'none';
  };

  exportClick = () => {
    document.getElementsByClassName(
      'leaflet-control-easyPrint-button-export',
    )[0].style.display = 'none';
    const exportLeafletIcon = document.getElementsByClassName(
      'A4Landscape',
    )[0];
    exportLeafletIcon.click();
  };

  zoomInClick = () => {
    // this.map.zoomIn();
    this.setState(prevState => ({
      zoom: prevState.zoom + 1,
    }));
  };

  zoomOutClick = () => {
    this.setState(prevState => ({
      zoom: prevState.zoom - 1,
    }));
  };

  handleTabChange = tab => {
    // console.log('handleTabCHange Clicked');
    this.setState({ activeTab: tab });
  };

  changeLayersTab = tab => {
    this.setState({ activeLayers: tab });
  };

  searchDropdownClick = () => {
    // this.setState({ searchDropdown: !this.state.searchDropdown });
    this.setState(prevState => ({
      searchDropdown: !prevState.searchDropdown,
    }));
  };

  openModalSetting = () => {
    this.setState(prevState => ({
      modalSetting: !prevState.modalSetting,
    }));
  };

  refreshClick = () => {
    // console.log('log');
  };

  // siteInfoDropdown = e => {};

  render() {
    const {
      activeTab,
      activeLayers,
      searchDropdown,
      modalSetting,
    } = this.state;
    const { height, zoom } = this.state;
    return (
      <div className="card">
        <div className="card-body map-wrapper">
          <div id="map" style={{ height }} className="map">
            <MapComponent zoom={zoom} height={height} />
          </div>
          <div className="map-sidebar left-map-sidebar">
            <Scrollbars
              style={{
                position: 'relative',
                overflow: 'hidden',
                width: 'auto',
                height: '100%',
              }}
            >
              <div className="sidebar-wrapper">
                <form>
                  <div className="form-group search">
                    <div className="input-group">
                      <input
                        type="search"
                        className="form-control"
                        placeholder="Search By site Name"
                      />
                      <span
                        className={`input-group-append ${
                          searchDropdown ? 'open' : ''
                        }`}
                        onClick={this.searchDropdownClick}
                        onKeyPress={this.searchDropdownClick}
                        role="link"
                        tabIndex={-1}
                      >
                        <span className="input-group-text">
                          <i className="la la-angle-down" />
                        </span>
                        <ul>
                          <li>
                            <a>Search by Location</a>
                          </li>
                          <li>
                            <a>search by Address</a>
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
                      aria-label="Setting"
                      data-tab="site-info-popup"
                      onClick={this.openModalSetting}
                      onKeyPress={this.handleKeyPress}
                      role="tab"
                      tabIndex={0}
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
                        className={`nav-link ${
                          activeTab === 'filters' ? 'active show' : ''
                        }`}
                        id="sidebar-filter_tab"
                        data-toggle="tab"
                        // href="#sidebar-filter"
                        role="tab"
                        tabIndex={0}
                        aria-controls="sidebar-filter"
                        // aria-selected={`${
                        //   activeTab === 'fiters' ? 'true' : 'false'
                        // }`}
                        aria-selected="true"
                        aria-hidden="true"
                        onClick={() => {
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
                        id="sidebar-metric_tab"
                        data-toggle="tab"
                        // href="#sidebar-metric"
                        role="tab"
                        tabIndex={0}
                        aria-controls="sidebar-metric"
                        // aria-selected={`${
                        //   activeTab === 'metrics' ? 'true' : 'false'
                        // }`}
                        aria-selected="true"
                        aria-hidden="true"
                        onClick={() => {
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
                        id="sidebar-layer_tab"
                        data-toggle="tab"
                        // href="#sidebar-layer"
                        role="tab"
                        tabIndex={0}
                        aria-controls="sidebar-layer"
                        // aria-selected={`${
                        //   activeTab === 'layers' ? true : false
                        // }`}
                        aria-selected="true"
                        aria-hidden="true"
                        onClick={() => {
                          this.handleTabChange('layers');
                        }}
                      >
                        Layers
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="filterTabContent">
                    <div
                      className={`tab-pane fade ${
                        activeTab === 'filters' ? 'show active' : ''
                      }`}
                      id="sidebar-filter"
                      role="tabpanel"
                      aria-labelledby="sidebar-filter_tab"
                    >
                      <Accordion
                        id="accordion"
                        className="map-accordion"
                      >
                        <Card>
                          <Card.Header
                            onClick={e => {
                              this.toggleAccordion(e);
                            }}
                          >
                            <Accordion.Toggle
                              as={Card.Link}
                              className="card-link btn-link"
                              // variant="link"
                              eventKey="0"
                            >
                              Project
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="0">
                            <Card.Body>
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
                                        FieldSight Housing
                                        Demonstration Project
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
                                        FieldSight Housing
                                        Demonstration Project
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
                                        FieldSight Housing
                                        Demonstration Project
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
                                        FieldSight Housing
                                        Demonstration Project
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
                                        FieldSight Housing
                                        Demonstration Project
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                        <Card>
                          {/* <div className="card"> */}
                          <Card.Header>
                            <Accordion.Toggle
                              as={Card.Link}
                              className="card-link btn-link"
                              // variant="link"
                              eventKey="1"
                            >
                              Progress
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="1">
                            <Card.Body>
                              {/* <div className="card-body"> */}
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
                              {/* </div> */}
                              {/* </div> */}
                              {/* </div> */}
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                        <Card>
                          {/* <div className="card"> */}
                          <Card.Header>
                            <Accordion.Toggle
                              as={Card.Link}
                              className="card-link btn-link"
                              // variant="link"
                              eventKey="2"
                            >
                              Form Status
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="2">
                            <Card.Body>
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
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                        <Card>
                          <Card.Header>
                            <Accordion.Toggle
                              as={Card.Link}
                              className="card-link btn-link"
                              // variant="link"
                              eventKey="3"
                            >
                              Site Type
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="3">
                            <Card.Body>
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
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                        <Card>
                          <Card.Header>
                            <Accordion.Toggle
                              as={Card.Link}
                              className="card-link btn-link"
                              // variant="link"
                              eventKey="4"
                            >
                              Region
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="4">
                            <Card.Body>
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
                                        Bidur Municipality
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
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="sidebar-metric"
                      role="tabpanel"
                      aria-labelledby="sidebar-metric_tab"
                    />
                    <div
                      className={`tab-pane fade ${
                        activeTab === 'layers' ? 'show active' : ''
                      }`}
                      id="sidebar-layer"
                      role="tabpanel"
                      aria-labelledby="sidebar-layer_tab"
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
                                  onClick={() => {
                                    this.changeLayersTab(
                                      'main_layers',
                                    );
                                  }}
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
                                  onClick={() => {
                                    this.changeLayersTab(
                                      'base_layers',
                                    );
                                  }}
                                />
                                <i className="helper" />
                                Base Layers
                              </label>
                            </div>
                          </div>
                        </div>
                        <div
                          className="layers-list display-list"
                          id="layers-list"
                          style={
                            activeLayers === 'main_layers'
                              ? { display: 'block' }
                              : { display: 'none' }
                          }
                        >
                          <div className="form-group">
                            <div className="checkbox">
                              <label>
                                <input
                                  type="checkbox"
                                  name="radiobox"
                                />
                                <i className="helper" />
                                Bidur Municipality
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
                          style={
                            activeLayers === 'base_layers'
                              ? { display: 'block' }
                              : { display: 'none' }
                          }
                        >
                          <ul>
                            <li>
                              <figure
                                style={{
                                  backgroundImage:
                                    "url('images/map.png')",
                                }}
                              />
                              <div className="content">
                                <h6>Open street map </h6>
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
                                <h6>Google street </h6>
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
                                <h6>Google Hybrid </h6>
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
                                <h6>Google satelite </h6>
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
                                <h6>google Terrain </h6>
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
                                <h6>google Terrain </h6>
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
                      // role="button"
                      className="fieldsight-btn border-btn"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      // role="button"
                      className="fieldsight-btn bg-btn"
                    >
                      apply
                    </button>
                  </div>
                </form>
              </div>
            </Scrollbars>
          </div>
          <MapLeftTools
            scaleClick={this.scaleClick}
            zoomInClick={this.zoomInClick}
            zoomOutClick={this.zoomOutClick}
            exportClick={this.exportClick}
          />
          <ModalSettings
            openModalSetting={this.openModalSetting}
            modalSetting={modalSetting}
          />
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
                  <div className="tab-content" id="choose-forms">
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
                          <label htmlFor="input">Search</label>
                          <i className="la la-search" />
                        </div>
                        <div className="form-group">
                          <div className="radiobox">
                            <label>
                              <input type="radio" name="radiobox" />
                              <i className="helper" />
                              Skills for Tourism Assessment Form -
                              Test
                            </label>
                          </div>
                          <div className="select-form-info">
                            <span className="form-owner">
                              Arun Bhandari
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
                              <input type="radio" name="radiobox" />
                              <i className="helper" />
                              Certificado de Comercializacioón 9
                            </label>
                          </div>
                          <div className="select-form-info">
                            <span className="form-owner">
                              Santosh kshetri Bhandari
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
                              <input type="radio" name="radiobox" />
                              <i className="helper" />
                              Skills for Tourism Assessment Form -
                              Test
                            </label>
                          </div>
                          <div className="select-form-info">
                            <span className="form-owner">
                              Arun Bhandari
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
                              <input type="radio" name="radiobox" />
                              <i className="helper" />
                              Certificado de Comercializacioón 9
                            </label>
                          </div>
                          <div className="select-form-info">
                            <span className="form-owner">
                              Santosh kshetri Bhandari
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
                              <input type="radio" name="radiobox" />
                              <i className="helper" />
                              Certificado de Comercializacioón 9
                            </label>
                          </div>
                          <div className="select-form-info">
                            <span className="form-owner">
                              Santosh kshetri Bhandari
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
                          <label htmlFor="input">Search</label>
                          <i className="la la-search" />
                        </div>
                        <div className="form-group">
                          <div className="radiobox">
                            <label>
                              <input type="radio" name="radiobox" />
                              <i className="helper" />
                              Skills for Tourism Assessment Form -
                              Test
                            </label>
                          </div>
                          <div className="select-form-info">
                            <span className="form-owner">
                              Arun Bhandari
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
                              <input type="radio" name="radiobox" />
                              <i className="helper" />
                              Certificado de Comercializacioón 9
                            </label>
                          </div>
                          <div className="select-form-info">
                            <span className="form-owner">
                              Santosh kshetri Bhandari
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
                              <input type="radio" name="radiobox" />
                              <i className="helper" />
                              Skills for Tourism Assessment Form -
                              Test
                            </label>
                          </div>
                          <div className="select-form-info">
                            <span className="form-owner">
                              Arun Bhandari
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
                              <input type="radio" name="radiobox" />
                              <i className="helper" />
                              Certificado de Comercializacioón 9
                            </label>
                          </div>
                          <div className="select-form-info">
                            <span className="form-owner">
                              Santosh kshetri Bhandari
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
                              <input type="radio" name="radiobox" />
                              <i className="helper" />
                              Certificado de Comercializacioón 9
                            </label>
                          </div>
                          <div className="select-form-info">
                            <span className="form-owner">
                              Santosh kshetri Bhandari
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
                      <h6>Line color</h6>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group inline-form-group">
                            <label htmlFor="input">line color</label>
                            <input
                              type="text"
                              className="form-control jscolor"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group inline-form-group">
                            <label>line opacity</label>
                            <input
                              type="nubmer"
                              className="form-control "
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group inline-form-group">
                            <label>line thickness</label>
                            <input
                              type="number"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group inline-form-group">
                            <label> Dash line</label>
                            <input
                              type="number"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="fill-color">
                      <h6>Fill color</h6>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group inline-form-group">
                            <label htmlFor="input">fill color</label>
                            <input
                              type="text"
                              className="form-control jscolor"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group inline-form-group">
                            <label>fill opacity</label>
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
                        <label htmlFor="input">Search</label>
                        <i className="la la-search" />
                      </div>
                      <div className="form-group">
                        <div className="radiobox">
                          <label>
                            <input type="radio" name="radiobox" />
                            <i className="helper" />
                            Skills for Tourism Assessment Form - Test
                          </label>
                        </div>
                        <div className="select-form-info">
                          <span className="form-owner">
                            Arun Bhandari
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
                            <input type="radio" name="radiobox" />
                            <i className="helper" />
                            Certificado de Comercializacioón 9
                          </label>
                        </div>
                        <div className="select-form-info">
                          <span className="form-owner">
                            Santosh kshetri Bhandari
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
                            <input type="radio" name="radiobox" />
                            <i className="helper" />
                            Skills for Tourism Assessment Form - Test
                          </label>
                        </div>
                        <div className="select-form-info">
                          <span className="form-owner">
                            Arun Bhandari
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
                            <input type="radio" name="radiobox" />
                            <i className="helper" />
                            Certificado de Comercializacioón 9
                          </label>
                        </div>
                        <div className="select-form-info">
                          <span className="form-owner">
                            Santosh kshetri Bhandari
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
                            <input type="radio" name="radiobox" />
                            <i className="helper" />
                            Certificado de Comercializacioón 9
                          </label>
                        </div>
                        <div className="select-form-info">
                          <span className="form-owner">
                            Santosh kshetri Bhandari
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
    );
  }
}

export default MapFilter;
