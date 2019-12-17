import React, { Component } from 'react';
/* eslint-disable */

export default class AddNewReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isform: 'true',
    };
  }

  render() {
    const {
      state: { isform },
    } = this;
    return (
      <div className="reports mrb-30">
        <div className="card">
          <div className="card-body">
            <div className="report-generator">
              <h3 className="mb-3">New report</h3>
              <div className="filter-all-header">
                <form className="floating-form">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control report-name"
                      required=""
                    />
                    <label for="input">Report Name</label>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      required=""
                    />
                    <label for="input">description</label>
                  </div>
                  <div className="report-type">
                    <div className="row">
                      <div className="col-lg-3 col-md-4">
                        <div className="form-group inline-form-group">
                          <label className="">Report type</label>
                          <div className="common-select">
                            <div className="select-wrapper">
                              <span className="select-item">
                                User
                              </span>
                              <ul>
                                <li>
                                  <div className="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id="region-1"
                                      name="region-1"
                                      value=""
                                    />
                                    <label
                                      className="custom-control-label"
                                      for="region-1"
                                    >
                                      region-1
                                    </label>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-9 col-md-8">
                        <button
                          className="common-button is-disable is-icon pull-right is-bg"
                          role="button"
                        >
                          <i className="material-icons">
                            filter_list
                          </i>
                          <span>collapse all</span>
                          <i className="material-icons arrow-icon">
                            expand_more
                          </i>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="report-accordion">
                <div className="row ">
                  <div className="col-lg-7 col-md-7">
                    <div className="acc-item">
                      <div className="acc-header active">
                        <h5>metrics</h5>
                      </div>
                      <div className="acc-body">
                        <div className="fs-row no-gutters">
                          <div className="fs-5 fs-col">
                            <div className="custom-group">
                              <div className="custom-group-append">
                                <span className="custom-group-text">
                                  <i className="material-icons">
                                    search
                                  </i>
                                </span>
                              </div>
                              <input
                                className="custom-control"
                                placeholder="Quick search ..."
                              />
                            </div>
                            <ul className="metric-list">
                              <li>No. of Approved Submissions</li>
                              <li className="active">
                                No. of Rejected Submissions
                              </li>
                              <li>
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="metric-list-1"
                                    name="metric-list-1"
                                    value=""
                                  />
                                  <label
                                    className="custom-control-label"
                                    for="metric-list-1"
                                  >
                                    region-1
                                  </label>
                                </div>
                              </li>
                              <li>No. of Approved Submissions</li>
                              <li>No. of Rejected Submissions</li>
                            </ul>
                          </div>
                          <div className="fs-7 fs-col">
                            <ul className="role-list">
                              <h6>User role</h6>
                              <li>
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="selected-1"
                                    name="selected-1"
                                    value=""
                                  />
                                  <label
                                    className="custom-control-label"
                                    for="selected-1"
                                  >
                                    metric-1
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="acc-item">
                      <div className="acc-header">
                        <h5>site information</h5>
                      </div>
                      <div className="acc-body">
                        <div className="form-list">
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="mb-2">
                                  site information
                                </label>
                                <div className="common-select">
                                  <div className="select-wrapper">
                                    <span className="select-item">
                                      form answer
                                    </span>
                                    <ul>
                                      <li>
                                        <div className="custom-control custom-checkbox">
                                          <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="site-1"
                                            name="site-1"
                                            value=""
                                          />
                                          <label
                                            className="custom-control-label"
                                            for="site-1"
                                          >
                                            site-1
                                          </label>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="mb-2">values</label>
                                <div className="common-select">
                                  <div className="select-wrapper">
                                    <span className="select-item">
                                      maximum
                                    </span>
                                    <ul>
                                      <li>
                                        <div className="custom-control custom-checkbox">
                                          <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="values-1"
                                            name="values-1"
                                            value=""
                                          />
                                          <label
                                            className="custom-control-label"
                                            for="values-1"
                                          >
                                            values-1
                                          </label>
                                        </div>
                                      </li>
                                      <li className="active">
                                        <div className="custom-control custom-checkbox">
                                          <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="values-2"
                                            name="values-2"
                                          />
                                          <label
                                            class="custom-control-label"
                                            for="values-2"
                                          >
                                            values-2
                                          </label>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="mb-2">Forms</label>
                        <div className="common-select">
                          <div className="select-wrapper">
                            <span className="select-item">
                              select forms{' '}
                            </span>
                            <ul>
                              <li>Form-1</li>
                              <li className="active">form-2</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
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
