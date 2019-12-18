import React, { PureComponent } from 'react';

export default class FormDataFilter extends PureComponent {
  render() {
    return (
      <div className="reports mrb-30">
        <div className="card">
          <div className="card-body">
            <div className="standard-tempalte">
              <h3 className="mb-3">Template report</h3>
              <div className="report-list">
                <div className="row">
                  <div className="col-md-12">
                    <div className="report-content">
                      <h4>Form Data</h4>
                      <p>
                        Export of forms data and site information an
                        Excel File, generated with filters in region,
                        types and time range.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="dropdown report-option">
                  <button
                    type="button"
                    className="dropdown-toggle common-button no-border is-icon"
                    data-toggle="dropdown"
                  >
                    <i className="material-icons">more_vert</i>
                  </button>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#">
                      Edit
                    </a>
                    <a className="dropdown-item" href="#">
                      Add a template
                    </a>
                    <a className="dropdown-item" href="#">
                      Share
                    </a>
                    <a className="dropdown-item" href="#">
                      Delete
                    </a>
                  </div>
                </div>
              </div>
              <div className="data-filter mt-3">
                <h3 className="mb-3">Filters</h3>
                <form>
                  <div className="row">
                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label className="mb-2">Regions</label>
                        <div className="common-select">
                          <div className="select-wrapper">
                            <span className="select-item">
                              select Regions
                            </span>
                            <ul>
                              <li>
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="Illiterate"
                                    name="Illiterate"
                                    value=""
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="Illiterate"
                                  >
                                    Illiterate
                                  </label>
                                </div>
                              </li>
                              <li className="active">
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="literate"
                                    name="literate"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="literate"
                                  >
                                    literate
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="primary"
                                    name="primary"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="primary"
                                  >
                                    primary level (1-8)
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="secondary"
                                    name="secondary"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="secondary"
                                  >
                                    secondary level (9-12)
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="bachelor"
                                    name="bachelor"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="bachelor"
                                  >
                                    Bachelor’s degree
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="master"
                                    name="master"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="master"
                                  >
                                    master&apos;s level (9-12)
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className="selected-data">
                            <span>
                              Above 60
                              <small>x</small>
                            </span>
                            <span>
                              30 - 40
                              <small>x</small>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label className="mb-2">Site types</label>
                        <div className="common-select">
                          <div className="select-wrapper">
                            <span className="select-item">
                              select site types
                            </span>
                            <ul>
                              <li>
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="Illiterate"
                                    name="Illiterate"
                                    value=""
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="Illiterate"
                                  >
                                    Illiterate
                                  </label>
                                </div>
                              </li>
                              <li className="active">
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="literate"
                                    name="literate"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="literate"
                                  >
                                    literate
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="primary"
                                    name="primary"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="primary"
                                  >
                                    primary level (1-8)
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="secondary"
                                    name="secondary"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="secondary"
                                  >
                                    secondary level (9-12)
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="bachelor"
                                    name="bachelor"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="bachelor"
                                  >
                                    Bachelor’s degree
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="master"
                                    name="master"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="master"
                                  >
                                    master&apos;s level (9-12)
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group icon-between">
                        <label className="mb-2">Time period</label>
                        <div className="inline-flex ">
                          <div className="custom-group">
                            <input
                              className="custom-control"
                              placeholder="Start date"
                            />
                            <div className="custom-group-append">
                              <span className="custom-group-text">
                                <i className="material-icons">
                                  calendar_today
                                </i>
                              </span>
                            </div>
                          </div>
                          <span className="icon-between">
                            <i className="material-icons">
                              arrow_right_alt
                            </i>
                          </span>
                          <div className="custom-group">
                            <input
                              className="custom-control"
                              placeholder="Start date"
                            />
                            <div className="custom-group-append">
                              <span className="custom-group-text">
                                <i className="material-icons">
                                  calendar_today
                                </i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <button
                        disabled
                        type="submit"
                        className="common-button mt-3 is-bg"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
