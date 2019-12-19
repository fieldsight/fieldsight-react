import React, { PureComponent } from 'react';
import CustomMultiSelect from './CustomMultiSelect';
import CustomCheckBox from './CustomCheckbox';
import CollapseFilterTable from './CollapseFilterTable';
/* eslint-disable*/

export default class ExportDataFilter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      open: false,
      siteOpen: false,
      siteSelected: [],
      applyButton: false,
    };
  }

  // changeHandlers = e => {
  //   console.log("e");
  //   // const { name, checked } = e.target;
  //   // console.log(name, checked);
  //   // this.setState(
  //   //   prevState => ({
  //   //     selected: [...preState.selected, name],
  //   //   }),
  //   //   () => console.log(this.state.selected, 'gggg'),
  //   // );
  // };

  changeHandlers = e => {
    console.log(e.target);
    const { name, checked } = e.target;
    if (checked) {
      this.setState(
        prevState => ({
          selected: {
            ...prevState.selected,
            [name]: name,
          },
        }),
        () => console.log(this.state.selected, 'selected'),
      );
    }
    if (!checked) {
      this.setState({
        selected: '',
      });
    }
  };

  siteHandler = e => {
    console.log(e, 'sdfgfhj');
    const { name, checked } = e.target;
    this.setState(
      prevState => ({
        siteSelected: {
          ...prevState.siteSelected,
          [name]: name,
        },
      }),
      () => console.log(this.state.siteSelected, 'siteSelected'),
    );
    // if (checked) {
    //   this.setState(
    //     prevState => ({
    //       siteSelected: {
    //         ...prevState.siteSelected,
    //         [name]: name,
    //       },
    //     }),
    //     () => console.log(this.state.siteSelected, 'siteSelected'),
    //   );
    // }
    // if (!checked) {
    //   this.setState({
    //     siteSelected: '',
    //   });
    // }
  };

  handleToggleClass = () => {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  };

  SiteToggleClass = () => {
    this.setState(prevState => ({
      siteOpen: !prevState.siteOpen,
    }));
  };

  handleApply = () => {
    console.log(this.state.applyButton, 'kkkkk');
    this.setState(
      prevState => ({
        applyButton: !prevState.applyButton,
      }),
      () => console.log(this.state.applyButton),
    );
  };

  render() {
    const regionDropDown = [
      { id: '1', name: 'Illiterate' },
      { id: '2', name: 'literate' },
      { id: '3', name: 'primary level (1-8)' },
    ];

    const SiteDropDown = [
      { id: '1', name: 'Illiterate' },
      { id: '2', name: 'literate' },
      { id: '3', name: 'primary level (1-8)' },
    ];
    const {
      changeHandler,
      state: { selected, open, siteOpen, applyButton },
    } = this;
    console.log(this.state.selected, 'selected');

    // debugger
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
                      <h4>Export Data</h4>
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
                          <div
                            className={`select-wrapper ${
                              open ? 'select-toggle' : ''
                            }`}
                            onClick={() => {
                              this.handleToggleClass();
                            }}
                          >
                            <span className="select-item">
                              Select info
                            </span>
                            <ul>
                              {regionDropDown.map(info => (
                                <CustomCheckBox
                                  name={info.name}
                                  checked={
                                    this.state.selected[info.name] ||
                                    ''
                                  }
                                  changeHandler={this.changeHandlers}
                                  label={info.name}
                                  className="custom-control custom-checkbox"
                                  // customInputClass="custom-control-input"
                                  // customLabelClass="custom-control-label"
                                />
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label className="mb-2">Site types</label>
                        <CustomMultiSelect
                          toggleSelectClass={siteOpen}
                          handleToggleClass={this.SiteToggleClass}
                          checkboxOption={SiteDropDown}
                          handleCheck={this.siteHandler}
                          selectedArr={this.state.selected || ''}
                          placeholderTxt="Select Site Type"
                        />
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
                        // className="common-button mt-3 is-bg"
                        onClick={() => this.handleApply}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </form>
                {applyButton && <CollapseFilterTable />}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
