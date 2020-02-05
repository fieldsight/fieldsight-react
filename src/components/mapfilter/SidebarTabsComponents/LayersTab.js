import React, { PureComponent } from 'react';

export default class LayersTab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      activeTab,
      activeLayers,
      changeLayersTab,
      handleBaseLayer,
      selectedBaseLayer,
      geolayersList,
      geolayersOnChange,
    } = this.props;
    return (
      <div
        className={`fade ${
          activeTab === 'layers' ? 'show active' : ''
        }`}
        id="sidebar-layer"
        // role="tabpanel"
        // aria-labelledby="sidebar-layer_tab"
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
                    onClick={() => {
                      changeLayersTab('main_layers');
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
                    defaultChecked
                    onClick={() => {
                      changeLayersTab('base_layers');
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
            {geolayersList &&
              geolayersList.map((data, key) => {
                return (
                  <div key={data.id} className="form-group">
                    <div className="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          name={`geo_layer${data.id}`}
                          onChange={geolayersOnChange}
                          data-value={data.geo_layer}
                        />
                        <i className="helper" />
                        {data.title}
                      </label>
                    </div>
                  </div>
                );
              })}
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
              <li
                className={`${
                  selectedBaseLayer === 'openstreet' ? 'selected' : ''
                }`}
                role="presentation"
                onKeyPress={() => {
                  handleBaseLayer('openstreet');
                }}
                onClick={() => {
                  handleBaseLayer('openstreet');
                }}
              >
                <figure>
                  <img alt="1openstreet" src="/static/images/1.png" />
                </figure>
                <div className="content">
                  <h6>Open street map </h6>
                </div>
              </li>
              <li
                className={`${
                  selectedBaseLayer === 'googlestreet'
                    ? 'selected'
                    : ''
                }`}
                role="presentation"
                onKeyPress={() => {
                  handleBaseLayer('googlestreet');
                }}
                onClick={() => {
                  handleBaseLayer('googlestreet');
                }}
              >
                <figure>
                  <img
                    alt="googlestreet"
                    src="/static/images/3googlestreet.png"
                  />
                </figure>
                <div className="content">
                  <h6>Google street </h6>
                </div>
              </li>
              <li
                className={`${
                  selectedBaseLayer === 'googlehybrid'
                    ? 'selected'
                    : ''
                }`}
                role="presentation"
                onKeyPress={() => {
                  handleBaseLayer('googlehybrid');
                }}
                onClick={() => {
                  handleBaseLayer('googlehybrid');
                }}
              >
                <figure>
                  <img
                    alt="googlehybrid"
                    src="/static/images/5googlehybrid.png"
                  />
                </figure>
                <div className="content">
                  <h6>Google Hybrid </h6>
                </div>
              </li>
              <li
                className={`${
                  selectedBaseLayer === 'googlesatellite'
                    ? 'selected'
                    : ''
                }`}
                role="presentation"
                onKeyPress={() => {
                  handleBaseLayer('googlesatellite');
                }}
                onClick={() => {
                  handleBaseLayer('googlesatellite');
                }}
              >
                <figure>
                  <img
                    alt="googlesateliite"
                    src="/static/images/4googlesatellite.png"
                  />
                </figure>
                <div className="content">
                  <h6>Google Satelite </h6>
                </div>
              </li>
              <li
                className={`${
                  selectedBaseLayer === 'googleterrain'
                    ? 'selected'
                    : ''
                }`}
                role="presentation"
                onKeyPress={() => {
                  handleBaseLayer('googleterrain');
                }}
                onClick={() => {
                  handleBaseLayer('googleterrain');
                }}
              >
                <figure>
                  <img
                    alt="googleterrain"
                    src="/static/images/2.png"
                  />
                </figure>
                <div className="content">
                  <h6>Google Terrain </h6>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
