import React, { Component } from 'react';
import Select from 'react-select';

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterType: 'site-data',
      selectedOption: null,
      formOptions: null,
      questionOptions: null,
    };
  }

  onSiteChanged = e => {
    // alert(e.currentTarget.value);
    this.setState({ filterType: e.currentTarget.value });
  };

  siteInfoChange = selectedOption => {
    this.setState({ selectedOption });
  };

  formOptionsChange = formOptions => {
    this.setState({ formOptions });
  };

  questionOptionsChange = questionOptions => {
    this.setState({ questionOptions });
  };

  render() {
    const { siteoptions, formoptions, questionoptions } = this.props;
    const {
      filterType,
      selectedOption,
      formOptions,
      questionOptions,
    } = this.state;
    return (
      <div
        className="tab-pane fade show active"
        id="map-filter"
        role="tabpanel"
        aria-labelledby="map-filter_tab"
      >
        <div className="map-filter-data">
          <div className="form-group ">
            <label className="mb-2">Select filter type</label>
            <div className="custom-checkbox display-inline">
              <div className="radiobox ">
                <label>
                  <input
                    type="radio"
                    name="radio"
                    defaultValue="site-data"
                    defaultChecked
                    onChange={this.onSiteChanged}
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
                    onChange={this.onSiteChanged}
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
            style={
              filterType === 'site-data'
                ? { display: 'block' }
                : { display: 'none' }
            }
          >
            <div className="form-group">
              <label>Select site information</label>
              <Select
                name="siteinfo"
                className="wide"
                value={selectedOption}
                onChange={this.siteInfoChange}
                options={siteoptions}
              />
              {/* <select className="wide">
                                <option>Trying form another project</option>
                                <option>Enter birth date</option>
                              </select> */}
            </div>
          </div>
          <div
            className="filter-data form-data"
            style={
              filterType === 'form-data'
                ? { display: 'block' }
                : { display: 'none' }
            }
            id="form-data"
          >
            <div className="form-group">
              <label>Select form</label>
              <Select
                name="forminfo"
                className="wide"
                value={formOptions}
                onChange={this.formOptionsChange}
                options={formoptions}
              />
              {/* <select className="wide">
                <option>Form 1</option>
                <option>Form 2</option>
              </select> */}
            </div>
            <div className="form-group">
              <label>Select Question</label>
              <Select
                name="questioninfo"
                className="wide"
                value={questionOptions}
                onChange={this.questionOptionsChange}
                options={questionoptions}
              />
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
              <span className="filter-type">site Information</span>
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
              <span className="site-info">Enter birth date</span>
              <span className="filter-type">Form data</span>
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
              <span className="site-info">Enter Address</span>
              <span className="filter-type">site Information</span>
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
    );
  }
}

export default Filters;
