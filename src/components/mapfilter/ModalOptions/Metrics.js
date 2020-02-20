import React, { Component } from 'react';
import Select from 'react-select';

class Metrics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metricsFilterType: 'size',
      metricsFilterContent: 'none',
      formOptionsSize: null,
      questionOptionsSize: null,
      formOptionsColor: null,
      questionOptionsColor: null,
    };
  }

  formOptionsChange = (formOptionsSize, e) => {
    this.setState({ [e.name]: formOptionsSize });
  };

  onFilterChange = e => {
    this.setState({ metricsFilterType: e.currentTarget.value });
  };

  onFilterContentChange = e => {
    this.setState({ metricsFilterContent: e.currentTarget.value });
  };

  render() {
    const {
      formOptionsSize,
      questionOptionsSize,
      formOptionsColor,
      questionOptionsColor,
      metricsFilterType,
      metricsFilterContent,
    } = this.state;
    const { formoptions, questionoptions } = this.props;
    return (
      <>
        <div className="map-filter-data metric-filter">
          <div className="form-group ">
            <label className="mb-2">Select filter type</label>
            <div className="custom-checkbox display-inline">
              <div className="radiobox ">
                <label>
                  <input
                    type="radio"
                    name="radioYes"
                    defaultValue="size"
                    defaultChecked
                    onChange={this.onFilterChange}
                  />
                  <i className="helper" />
                  size
                </label>
              </div>
              {/* <div className="radiobox ">
                <label>
                  <input
                    type="radio"
                    name="radioYes"
                    defaultValue="color"
                    onChange={this.onFilterChange}
                  />
                  <i className="helper" />
                  Color
                </label>
              </div> */}
            </div>
          </div>
          <div
            className="filter-data display-data size"
            id="size-data"
            style={
              metricsFilterType === 'size'
                ? { display: 'block' }
                : { display: 'none' }
            }
          >
            <div className="form-group">
              <label>Select form</label>

              <Select
                name="formOptionsSize"
                className="wide"
                value={formOptionsSize}
                onChange={this.formOptionsChange}
                options={formoptions}
              />
            </div>
            <div className="form-group">
              <label>Select Question</label>
              <Select
                name="questionOptionsSize"
                className="wide"
                value={questionOptionsSize}
                onChange={this.formOptionsChange}
                options={questionoptions}
              />
            </div>
          </div>
          <div
            className="filter-data color"
            id="color-data"
            style={
              metricsFilterType === 'color'
                ? { display: 'block' }
                : { display: 'none' }
            }
          >
            <div className="form-group">
              <label>Select form</label>
              <Select
                name="formOptionsColor"
                className="wide"
                value={formOptionsColor}
                onChange={this.formOptionsChange}
                options={formoptions}
              />
            </div>
            <div className="form-group">
              <label>Select Question</label>
              <Select
                name="questionOptionsColor"
                className="wide"
                value={questionOptionsColor}
                onChange={this.formOptionsChange}
                options={questionoptions}
              />
            </div>
            <div className="form-group">
              <select
                className="custom-select"
                value={metricsFilterContent}
                onChange={this.onFilterContentChange}
              >
                <option
                  disabled
                  defaultChecked
                  value="none"
                  defaultValue="none"
                >
                  Select Filter option
                </option>
                <option
                  value="dicrete-content"
                  defaultValue="dicrete-content"
                >
                  Dicrete
                </option>
                <option
                  value="range-content"
                  defaultValue="range-content"
                >
                  Range
                </option>
              </select>
            </div>
            <div
              className="dicrete-content filter-content"
              style={
                metricsFilterContent === 'dicrete-content'
                  ? { display: 'block' }
                  : { display: 'none' }
              }
            >
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

            <div
              className="range-content filter-content"
              style={
                metricsFilterContent === 'range-content'
                  ? { display: 'block' }
                  : { display: 'none' }
              }
            >
              <div className="classes">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group inline-form-group">
                      <label className="">Classes</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group inline-form-group">
                      <label className="">Value</label>
                      <input type="number" className="form-control" />
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
      </>
    );
  }
}

export default Metrics;
