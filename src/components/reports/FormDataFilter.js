import React, { PureComponent } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { Dropdown } from 'react-bootstrap';
import CustomMultiSelect from './CustomMultiSelect';
import CustomCheckBox from './CustomCheckbox';

// const CustomInput = () => {
//   <div className="custom-group-append">
//     <span className="custom-group-text">
//       <i className="material-icons">calendar_today</i>
//     </span>
//   </div>;
// };
export default class FormDataFilter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      open: false,
      siteOpen: false,
      siteSelected: [],
      applyButton: false,
      projectRegions: [],
      siteType: [],
      startedDate: '',
      endedDate: '',
    };
  }

  componentDidMount() {
    const siteType = `/fieldsight/api/site-types/1/`;
    const projectRegions = `/fieldsight/api/project-regions/1/`;

    const requestSiteType = axios.get(siteType);
    const requestProjectRegions = axios.get(projectRegions);

    axios
      .all([requestProjectRegions, requestSiteType])
      .then(
        axios.spread((...responses) => {
          this.setState({
            siteType: responses[1].data,
            projectRegions: responses[0].data,
          });
        }),
      )
      .catch(errors => {
        // react on errors.
      });
  }

  changeHandlers = (e, info) => {
    const { id, checked, value } = e.target;

    if (checked && info === 'region') {
      this.setState(prevState => ({
        selected: [...prevState.selected, JSON.parse(value)],
      }));
    }
    if (!checked) {
      this.setState(preveState => ({
        selected: preveState.selected.filter(
          region => region !== JSON.parse(value),
        ),
      }));
    }
  };

  siteHandler = (e, info) => {
    const {
      target: { id, checked, value },
    } = e;

    const { siteType, siteSelected } = this.state;
    if (checked && info === 'site') {
      this.setState(prevState => ({
        siteSelected: [...prevState.siteSelected, JSON.parse(value)],
      }));
    }
    if (!checked) {
      this.setState(preState => ({
        siteSelected: preState.siteSelected.filter(
          site => site !== JSON.parse(value),
        ),
      }));
    }
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
    this.setState(prevState => ({
      applyButton: !prevState.applyButton,
    }));
  };

  onChangeHandler = date => {
    this.setState({
      startedDate: date,
    });
  };

  onEndChangeHandler = date => {
    this.setState({
      endedDate: date,
    });
  };

  render() {
    const {
      changeHandler,
      state: {
        selected,
        open,
        siteOpen,
        applyButton,
        projectRegions,
        siteType,
        siteSelected,
      },
    } = this;
    const DataCrude = [
      {
        id: '1',
        title: 'Edit',
        link: '#',
      },
      {
        id: '2',
        title: 'Add a template',
        link: '#',
      },
      {
        id: '3',
        title: 'Share',
        link: '#',
      },
      {
        id: '4',
        title: 'Delete',
        link: '#',
      },
    ];

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
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <button
                          type="button"
                          onClick={this.props.handleForm}
                        >
                          back
                        </button>
                      </div>
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
                  <Dropdown drop="left">
                    <Dropdown.Toggle
                      variant=""
                      id="dropdown-Data"
                      className="dropdown-toggle common-button no-border is-icon"
                    >
                      <i className="material-icons">more_vert</i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                      {DataCrude.map(item => (
                        <Dropdown.Item
                          href={item.link}
                          key={item.id}
                          target="_blank"
                        >
                          {item.title}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div className="data-filter mt-3">
                <h3 className="mb-3">Filters</h3>
                <form>
                  <div className="row">
                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label className="mb-2">Site types</label>
                        <CustomMultiSelect
                          toggleSelectClass={siteOpen}
                          handleToggleClass={this.SiteToggleClass}
                          checkboxOption={siteType}
                          handleCheck={e => {
                            this.siteHandler(e, 'site');
                          }}
                          selectedArr={this.state.siteSelected}
                          placeholderTxt="Select Site Type"
                          site="site"
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="form-group">
                        <label className="mb-2">Regions</label>
                        <CustomMultiSelect
                          toggleSelectClass={open}
                          handleToggleClass={this.handleToggleClass}
                          checkboxOption={projectRegions}
                          handleCheck={e => {
                            this.changeHandlers(e, 'region');
                          }}
                          selectedArr={this.state.selected}
                          placeholderTxt="Select Region Type"
                          site="regions"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="form-group icon-between">
                        <label className="mb-2">Time period</label>
                        <div className="inline-flex ">
                          <div className="custom-group">
                            <DatePicker
                              placeholderText="Start Date"
                              name="startedDate"
                              selected={this.state.startedDate}
                              onChange={this.onChangeHandler}
                              dateFormat="yyyy-MM-dd"
                              className="form-control"
                              // customInput={
                              //   <i className="material-icons">
                              //     calendar_today
                              //   </i>
                              // }
                            >
                              <i className="material-icons">
                                calendar_today
                              </i>
                            </DatePicker>
                          </div>
                          <span className="icon-between">
                            <i className="material-icons">
                              arrow_right_alt
                            </i>
                          </span>
                          <div className="custom-group">
                            <DatePicker
                              placeholderText="End Date"
                              name="endedDate"
                              selected={this.state.endedDate}
                              onChange={this.onEndChangeHandler}
                              className="form-control"
                              dateFormat="yyyy-MM-dd"
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
                        // disabled
                        type="button"
                        className="common-button mt-3 is-bg"
                        onClick={this.handleApply}
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
