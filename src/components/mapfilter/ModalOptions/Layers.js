import React, { Component } from 'react';

class Layers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
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
            <input type="text" className="form-control" required />
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
            <button type="submit" className="fieldsight-btn">
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
          <button type="submit" className="fieldsight-btn">
            apply
          </button>
        </div>
      </>
    );
  }
}

export default Layers;
