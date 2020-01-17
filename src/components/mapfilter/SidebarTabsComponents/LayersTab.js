import React, { Component } from 'react';

class LayersTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { activeTab, activeLayers, changeLayersTab } = this.props;
    return (
      <div
        className={`tab-pane fade ${
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
                    defaultChecked
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
            <div className="form-group">
              <div className="checkbox">
                <label>
                  <input type="checkbox" name="radiobox" />
                  <i className="helper" />
                  Bidur Municipality
                </label>
              </div>
            </div>
            <div className="form-group">
              <div className="checkbox">
                <label>
                  <input type="checkbox" name="radiobox" />
                  <i className="helper" />
                  Balkumari
                </label>
              </div>
            </div>
            <div className="form-group">
              <div className="checkbox">
                <label>
                  <input type="checkbox" name="radiobox" />
                  <i className="helper" />
                  Bageswori
                </label>
              </div>
            </div>
            <div className="form-group">
              <div className="checkbox">
                <label>
                  <input type="checkbox" name="radiobox" />
                  <i className="helper" />
                  Buntang
                </label>
              </div>
            </div>
            <div className="form-group">
              <div className="checkbox">
                <label>
                  <input type="checkbox" name="radiobox" />
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
                    backgroundImage: "url('images/map.png')",
                  }}
                />
                <div className="content">
                  <h6>Open street map </h6>
                </div>
              </li>
              <li>
                <figure
                  style={{
                    backgroundImage: "url('images/map.png')",
                  }}
                />
                <div className="content">
                  <h6>Google street </h6>
                </div>
              </li>
              <li>
                <figure
                  style={{
                    backgroundImage: "url('images/map.png')",
                  }}
                />
                <div className="content">
                  <h6>Google Hybrid </h6>
                </div>
              </li>
              <li>
                <figure
                  style={{
                    backgroundImage: "url('images/map.png')",
                  }}
                />
                <div className="content">
                  <h6>Google satelite </h6>
                </div>
              </li>
              <li>
                <figure
                  style={{
                    backgroundImage: "url('images/map.png')",
                  }}
                />
                <div className="content">
                  <h6>google Terrain </h6>
                </div>
              </li>
              <li>
                <figure
                  style={{
                    backgroundImage: "url('images/map.png')",
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
    );
  }
}

export default LayersTab;
