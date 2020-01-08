import React, { Component, createRef } from "react";
import { Scrollbars } from "react-custom-scrollbars";


import MapComponent from "./MapComponent";
import { Accordion, Card, Button } from "react-bootstrap";
import MapLeftTools from "./MapLeftTools";
import ModalSettings from "./ModalSettings";
class MapFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      zoom: 8,
      activeTab: "filters",
      activeLayers: "main_layers",
      searchDropdown: false,
      modalSetting: false
    };
  }

  updateDimensions() {
    const height = window.innerWidth >= 992 ? window.innerHeight : 400;
    this.setState({ height: height - 32 });
  }
  componentWillMount() {
    this.updateDimensions();
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  scaleClick = () => {
    const leafletdraw_icon = document.getElementsByClassName("js-start")[0];
    const leafletdraw_container = (document.getElementsByClassName(
      "js-interaction"
    )[0].style.display = "block");

    document.getElementsByClassName("js-toggle")[0].style.display = "none";

    leafletdraw_icon.click();
    leafletdraw_icon.style.display = "none";
  };

  exportClick = () => {
    const leafletdraw_container = (document.getElementsByClassName(
      "leaflet-control-easyPrint-button-export"
    )[0].style.display = "none");
    const exportleaflet_icon = document.getElementsByClassName(
      "A4Landscape"
    )[0];
    exportleaflet_icon.click();
  };

  zoomInClick = () => {
    // this.map.zoomIn();
    this.setState(prevState => ({
      zoom: prevState.zoom + 1
    }));
  };
  zoomOutClick = () => {
    this.setState(prevState => ({
      zoom: prevState.zoom - 1
    }));
  };

  handleTabChange = tab => {
    this.setState({ activeTab: tab });
  };
  changeLayersTab = tab => {
    this.setState({ activeLayers: tab });
  };
  searchDropdownClick = () => {
    this.setState({ searchDropdown: !this.state.searchDropdown });
  };

  openModalSetting = () => {
    this.setState({ modalSetting: !this.state.modalSetting });
  };

  refreshClick = () => {
    console.log("log");
  };
  siteInfoDropdown = e => {};

  render() {
    
    const {
      activeTab,
      activeLayers,
      searchDropdown,
      modalSetting
    } = this.state;
    return (
      <div className="card">
        <div className="card-body map-wrapper">
          <div id="map" style={{ height: this.state.height }} className="map">
            <MapComponent zoom={this.state.zoom} height={this.state.height} />
          </div>
          <div className="map-sidebar left-map-sidebar">
            <Scrollbars
              style={{
                position: "relative",
                overflow: "hidden",
                width: "auto",
                height: "100%"
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
                          searchDropdown ? "open" : ""
                        }`}
                        onClick={this.searchDropdownClick}
                      >
                        <span className="input-group-text">
                          <i className="la la-angle-down"></i>
                        </span>
                        <ul>
                          <li>
                            <a href="#">Search by Location</a>
                          </li>
                          <li>
                            <a href="#">search by Address</a>
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
                      onClick={this.openModalSetting}
                    ></i>
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
                          activeTab === "filters" ? "active show" : ""
                        }`}
                        id="sidebar-filter_tab"
                        data-toggle="tab"
                        // href="#sidebar-filter"
                        role="tab"
                        aria-controls="sidebar-filter"
                        aria-selected={`${
                          activeTab === "fiters" ? "true" : "false"
                        }`}
                        onClick={() => {
                          this.handleTabChange("filters");
                        }}
                      >
                        Filters
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={`nav-link ${
                          activeTab === "metrics" ? "active show" : ""
                        }`}
                        id="sidebar-metric_tab"
                        data-toggle="tab"
                        // href="#sidebar-metric"
                        role="tab"
                        aria-controls="sidebar-metric"
                        aria-selected={`${
                          activeTab === "metrics" ? "true" : "false"
                        }`}
                        onClick={() => {
                          this.handleTabChange("metrics");
                        }}
                      >
                        metrics
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={`nav-link ${
                          activeTab === "layers" ? "active show" : ""
                        }`}
                        id="sidebar-layer_tab"
                        data-toggle="tab"
                        // href="#sidebar-layer"
                        role="tab"
                        aria-controls="sidebar-layer"
                        aria-selected={`${
                          activeTab === "layers" ? "true" : "false"
                        }`}
                        onClick={() => {
                          this.handleTabChange("layers");
                        }}
                      >
                        Layers
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="filterTabContent">
                    <div
                      className={`tab-pane fade ${
                        activeTab === "filters" ? "show active" : ""
                      }`}
                      id="sidebar-filter"
                      role="tabpanel"
                      aria-labelledby="sidebar-filter_tab"
                    >
                      <Accordion id="accordion" className="map-accordion">
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
                                        <i className="helper"></i>
                                        FieldSight Housing Demonstration Project
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
                                        <i className="helper"></i>
                                        FieldSight Housing Demonstration Project
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
                                        <i className="helper"></i>
                                        FieldSight Housing Demonstration Project
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
                                        <i className="helper"></i>
                                        FieldSight Housing Demonstration Project
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
                                        <i className="helper"></i>
                                        FieldSight Housing Demonstration Project
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
                                      <input type="checkbox" name="radiobox" />
                                      <i className="helper"></i>
                                      0%
                                    </label>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <div className="checkbox">
                                    <label>
                                      <input type="checkbox" name="radiobox" />
                                      <i className="helper"></i>
                                      1-20%
                                    </label>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <div className="checkbox">
                                    <label>
                                      <input type="checkbox" name="radiobox" />
                                      <i className="helper"></i>
                                      21-40%
                                    </label>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <div className="checkbox">
                                    <label>
                                      <input type="checkbox" name="radiobox" />
                                      <i className="helper"></i>
                                      41%-60%
                                    </label>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <div className="checkbox">
                                    <label>
                                      <input type="checkbox" name="radiobox" />
                                      <i className="helper"></i>
                                      61%-80%
                                    </label>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <div className="checkbox">
                                    <label>
                                      <input type="checkbox" name="radiobox" />
                                      <i className="helper"></i>
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
                                      <input type="radio" name="radioYes" />
                                      <i className="helper"></i>Approved
                                    </label>
                                  </div>
                                  <div className="radiobox pending">
                                    <label>
                                      <input type="radio" name="radioYes" />
                                      <i className="helper"></i>Pending
                                    </label>
                                  </div>
                                  <div className="radiobox flagged">
                                    <label>
                                      <input type="radio" name="radioYes" />
                                      <i className="helper"></i>Flagged
                                    </label>
                                  </div>
                                  <div className="radiobox rejected">
                                    <label>
                                      <input type="radio" name="radioYes" />
                                      <i className="helper"></i>Rejected
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
                                      <input type="checkbox" name="radiobox" />
                                      <i className="helper"></i>
                                      Colony
                                    </label>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <div className="checkbox">
                                    <label>
                                      <input type="checkbox" name="radiobox" />
                                      <i className="helper"></i>
                                      Pipaltar
                                    </label>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <div className="checkbox">
                                    <label>
                                      <input type="checkbox" name="radiobox" />
                                      <i className="helper"></i>
                                      Sattale
                                    </label>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <div className="checkbox">
                                    <label>
                                      <input type="checkbox" name="radiobox" />
                                      <i className="helper"></i>
                                      Barsuchet
                                    </label>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <div className="checkbox">
                                    <label>
                                      <input type="checkbox" name="radiobox" />
                                      <i className="helper"></i>
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
                                        <i className="helper"></i>
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
                                        <i className="helper"></i>
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
                                        <i className="helper"></i>
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
                                        <i className="helper"></i>
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
                                        <i className="helper"></i>
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
                    ></div>
                    <div
                      className={`tab-pane fade ${
                        activeTab === "layers" ? "show active" : ""
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
                                    this.changeLayersTab("main_layers");
                                  }}
                                />
                                <i className="helper"></i>Layers
                              </label>
                            </div>
                            <div className="radiobox ">
                              <label>
                                <input
                                  type="radio"
                                  name="radioYes"
                                  defaultValue="baselayers"
                                  onClick={() => {
                                    this.changeLayersTab("base_layers");
                                  }}
                                />
                                <i className="helper"></i>Base Layers
                              </label>
                            </div>
                          </div>
                        </div>
                        <div
                          className="layers-list display-list"
                          id="layers-list"
                          style={
                            activeLayers == "main_layers"
                              ? { display: "block" }
                              : { display: "none" }
                          }
                        >
                          <div className="form-group">
                            <div className="checkbox">
                              <label>
                                <input type="checkbox" name="radiobox" />
                                <i className="helper"></i>
                                Bidur Municipality
                              </label>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="checkbox">
                              <label>
                                <input type="checkbox" name="radiobox" />
                                <i className="helper"></i>
                                Balkumari
                              </label>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="checkbox">
                              <label>
                                <input type="checkbox" name="radiobox" />
                                <i className="helper"></i>
                                Bageswori
                              </label>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="checkbox">
                              <label>
                                <input type="checkbox" name="radiobox" />
                                <i className="helper"></i>
                                Buntang
                              </label>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="checkbox">
                              <label>
                                <input type="checkbox" name="radiobox" />
                                <i className="helper"></i>
                                Charghare
                              </label>
                            </div>
                          </div>
                        </div>
                        <div
                          className="thumb-list mr-0 layers-list"
                          id="base-layers"
                          style={
                            activeLayers == "base_layers"
                              ? { display: "block" }
                              : { display: "none" }
                          }
                        >
                          <ul>
                            <li>
                              <figure
                                style={{
                                  backgroundImage: "url('images/map.png')"
                                }}
                              ></figure>
                              <div className="content">
                                <h6>Open street map </h6>
                              </div>
                            </li>
                            <li>
                              <figure
                                style={{
                                  backgroundImage: "url('images/map.png')"
                                }}
                              ></figure>
                              <div className="content">
                                <h6>Google street </h6>
                              </div>
                            </li>
                            <li>
                              <figure
                                style={{
                                  backgroundImage: "url('images/map.png')"
                                }}
                              ></figure>
                              <div className="content">
                                <h6>Google Hybrid </h6>
                              </div>
                            </li>
                            <li>
                              <figure
                                style={{
                                  backgroundImage: "url('images/map.png')"
                                }}
                              ></figure>
                              <div className="content">
                                <h6>Google satelite </h6>
                              </div>
                            </li>
                            <li>
                              <figure
                                style={{
                                  backgroundImage: "url('images/map.png')"
                                }}
                              ></figure>
                              <div className="content">
                                <h6>google Terrain </h6>
                              </div>
                            </li>
                            <li>
                              <figure
                                style={{
                                  backgroundImage: "url('images/map.png')"
                                }}
                              ></figure>
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
                      role="button"
                      className="fieldsight-btn border-btn"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      role="button"
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
          <ModalSettings openModalSetting={this.openModalSetting} modalSetting={modalSetting} />
          <div className="fieldsight-popup dark" id="share-popup" tabIndex="-1">
            <div className="popup-body md-body">
              <div className="card">
                <div className="card-header main-card-header">
                  <h5>share map</h5>
                  <span className="popup-close">
                    <i className="la la-close"></i>
                  </span>
                </div>
                <div className="card-body">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
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
                          <i className="la la-search"></i>
                        </div>
                        <div className="form-group">
                          <div className="radiobox">
                            <label>
                              <input type="radio" name="radiobox" />
                              <i className="helper"></i>Skills for Tourism
                              Assessment Form - Test
                            </label>
                          </div>
                          <div className="select-form-info">
                            <span className="form-owner">Arun Bhandari</span>
                            <time>
                              <i className="la la-clock-o"></i>2019-07-30
                            </time>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="radiobox ">
                            <label>
                              <input type="radio" name="radiobox" />
                              <i className="helper"></i>Certificado de
                              Comercializacioón 9
                            </label>
                          </div>
                          <div className="select-form-info">
                            <span className="form-owner">
                              Santosh kshetri Bhandari
                            </span>
                            <time>
                              <i className="la la-clock-o"></i>2019-07-30
                            </time>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="radiobox ">
                            <label>
                              <input type="radio" name="radiobox" />
                              <i className="helper"></i>Skills for Tourism
                              Assessment Form - Test
                            </label>
                          </div>
                          <div className="select-form-info">
                            <span className="form-owner">Arun Bhandari</span>
                            <time>
                              <i className="la la-clock-o"></i>2019-07-30
                            </time>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="radiobox ">
                            <label>
                              <input type="radio" name="radiobox" />
                              <i className="helper"></i>Certificado de
                              Comercializacioón 9
                            </label>
                          </div>
                          <div className="select-form-info">
                            <span className="form-owner">
                              Santosh kshetri Bhandari
                            </span>
                            <time>
                              <i className="la la-clock-o"></i>2019-07-30
                            </time>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="radiobox ">
                            <label>
                              <input type="radio" name="radiobox" />
                              <i className="helper"></i>Certificado de
                              Comercializacioón 9
                            </label>
                          </div>
                          <div className="select-form-info">
                            <span className="form-owner">
                              Santosh kshetri Bhandari
                            </span>
                            <time>
                              <i className="la la-clock-o"></i>2019-07-30
                            </time>
                          </div>
                        </div>
                        <div className="form-group pull-right no-margin">
                          <button type="submit" className="fieldsight-btn">
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
                          <i className="la la-search"></i>
                        </div>
                        <div className="form-group">
                          <div className="radiobox">
                            <label>
                              <input type="radio" name="radiobox" />
                              <i className="helper"></i>Skills for Tourism
                              Assessment Form - Test
                            </label>
                          </div>
                          <div className="select-form-info">
                            <span className="form-owner">Arun Bhandari</span>
                            <time>
                              <i className="la la-clock-o"></i>2019-07-30
                            </time>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="radiobox ">
                            <label>
                              <input type="radio" name="radiobox" />
                              <i className="helper"></i>Certificado de
                              Comercializacioón 9
                            </label>
                          </div>
                          <div className="select-form-info">
                            <span className="form-owner">
                              Santosh kshetri Bhandari
                            </span>
                            <time>
                              <i className="la la-clock-o"></i>2019-07-30
                            </time>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="radiobox ">
                            <label>
                              <input type="radio" name="radiobox" />
                              <i className="helper"></i>Skills for Tourism
                              Assessment Form - Test
                            </label>
                          </div>
                          <div className="select-form-info">
                            <span className="form-owner">Arun Bhandari</span>
                            <time>
                              <i className="la la-clock-o"></i>2019-07-30
                            </time>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="radiobox ">
                            <label>
                              <input type="radio" name="radiobox" />
                              <i className="helper"></i>Certificado de
                              Comercializacioón 9
                            </label>
                          </div>
                          <div className="select-form-info">
                            <span className="form-owner">
                              Santosh kshetri Bhandari
                            </span>
                            <time>
                              <i className="la la-clock-o"></i>2019-07-30
                            </time>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="radiobox ">
                            <label>
                              <input type="radio" name="radiobox" />
                              <i className="helper"></i>Certificado de
                              Comercializacioón 9
                            </label>
                          </div>
                          <div className="select-form-info">
                            <span className="form-owner">
                              Santosh kshetri Bhandari
                            </span>
                            <time>
                              <i className="la la-clock-o"></i>2019-07-30
                            </time>
                          </div>
                        </div>
                        <div className="form-group pull-right no-margin">
                          <button type="submit" className="fieldsight-btn">
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
          <div className="fieldsight-popup" id="map-style" tabIndex="-1">
            <div className="popup-body md-body">
              <div className="card">
                <div className="card-header main-card-header">
                  <h5>Map style</h5>
                  <span className="popup-close">
                    <i className="la la-close"></i>
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
                            <input type="nubmer" className="form-control " />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group inline-form-group">
                            <label>line thickness</label>
                            <input type="number" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group inline-form-group">
                            <label> Dash line</label>
                            <input type="number" className="form-control" />
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
                            <input type="nubmer" className="form-control " />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group pull-right no-margin">
                      <button type="submit" className="fieldsight-btn">
                        Apply
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="fieldsight-popup dark" id="map-list" tabIndex="-1">
            <div className="popup-body md-body">
              <div className="card">
                <div className="card-header main-card-header">
                  <h5>map</h5>
                  <span className="popup-close">
                    <i className="la la-close"></i>
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
                        <i className="la la-search"></i>
                      </div>
                      <div className="form-group">
                        <div className="radiobox">
                          <label>
                            <input type="radio" name="radiobox" />
                            <i className="helper"></i>Skills for Tourism
                            Assessment Form - Test
                          </label>
                        </div>
                        <div className="select-form-info">
                          <span className="form-owner">Arun Bhandari</span>
                          <time>
                            <i className="la la-clock-o"></i>2019-07-30
                          </time>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="radiobox ">
                          <label>
                            <input type="radio" name="radiobox" />
                            <i className="helper"></i>Certificado de
                            Comercializacioón 9
                          </label>
                        </div>
                        <div className="select-form-info">
                          <span className="form-owner">
                            Santosh kshetri Bhandari
                          </span>
                          <time>
                            <i className="la la-clock-o"></i>2019-07-30
                          </time>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="radiobox ">
                          <label>
                            <input type="radio" name="radiobox" />
                            <i className="helper"></i>Skills for Tourism
                            Assessment Form - Test
                          </label>
                        </div>
                        <div className="select-form-info">
                          <span className="form-owner">Arun Bhandari</span>
                          <time>
                            <i className="la la-clock-o"></i>2019-07-30
                          </time>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="radiobox ">
                          <label>
                            <input type="radio" name="radiobox" />
                            <i className="helper"></i>Certificado de
                            Comercializacioón 9
                          </label>
                        </div>
                        <div className="select-form-info">
                          <span className="form-owner">
                            Santosh kshetri Bhandari
                          </span>
                          <time>
                            <i className="la la-clock-o"></i>2019-07-30
                          </time>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="radiobox ">
                          <label>
                            <input type="radio" name="radiobox" />
                            <i className="helper"></i>Certificado de
                            Comercializacioón 9
                          </label>
                        </div>
                        <div className="select-form-info">
                          <span className="form-owner">
                            Santosh kshetri Bhandari
                          </span>
                          <time>
                            <i className="la la-clock-o"></i>2019-07-30
                          </time>
                        </div>
                      </div>
                      <div className="form-group pull-right no-margin">
                        <button type="submit" className="fieldsight-btn">
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
