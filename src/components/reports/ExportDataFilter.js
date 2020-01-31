import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import CustomMultiSelect from './common/CustomMultiSelect';
import CollapseFilterTable from './CollapseFilterTable';
import { errorToast, successToast } from '../../utils/toastHandler';

export default class ExportDataFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      open: false,
      siteOpen: false,
      siteSelected: [],
      applyButton: false,
      projectRegions: [{ id: 'all_regions', name: 'Select All' }],
      siteType: [{ id: 'all_sitetypes', name: 'Select All' }],
      showPreview: false,
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const { projectRegions, siteType } = this.state;
    const siteTypesApi = `/fieldsight/api/site-types/${id}/`;
    const projectRegionApi = `/fieldsight/api/project-regions/${id}/`;

    const requestSiteType = axios.get(siteTypesApi);
    const requestProjectRegions = axios.get(projectRegionApi);

    axios
      .all([requestProjectRegions, requestSiteType])
      .then(
        axios.spread((...responses) => {
          const regions = [...projectRegions, ...responses[0].data];
          const sites = [...siteType, ...responses[1].data];
          this.setState(() => ({
            projectRegions: regions,
            selected: regions.map(each => {
              return { id: each.id };
            }),
            siteType: sites,
            siteSelected: sites.map(each => {
              return { id: each.id };
            }),
          }));
        }),
      )
      .catch();
  }

  changeHandlers = (e, info) => {
    const { checked } = e.target;
    const { id } = info;
    const { projectRegions } = this.state;
    this.setState(prevState => {
      if (checked) {
        if (id === 'all_regions') {
          const allId = projectRegions.map(each => {
            return { id: each.id };
          });
          return {
            selected: allId,
          };
        }
        return {
          selected: [...prevState.selected, { id }],
        };
      }
      if (!checked) {
        if (id === 'all_regions') {
          return {
            selected: [],
          };
        }
        return {
          selected: prevState.selected.filter(
            region => region.id !== id && region.id !== 'all_regions',
          ),
        };
      }
      return null;
    });
  };

  siteHandler = (e, info) => {
    const { checked } = e.target;
    const { id } = info;
    const { siteType } = this.state;

    this.setState(prevState => {
      if (checked) {
        if (id === 'all_sitetypes') {
          const allId = siteType.map(each => {
            return { id: each.id };
          });
          return {
            siteSelected: allId,
          };
        }
        return {
          siteSelected: [...prevState.siteSelected, { id }],
        };
      }
      if (!checked) {
        if (id === 'all_sitetypes') {
          return {
            siteSelected: [],
          };
        }
        return {
          siteSelected: prevState.siteSelected.filter(
            site => site.id !== id && site.id !== 'all_sitetypes',
          ),
        };
      }
      return null;
    });
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

  toUpper = str => {
    return str
      .toLowerCase()
      .split(' ')
      .map(function(word) {
        return word[0].toLowerCase() + word.substr(1);
      })
      .join('_');
  };

  handleApply = () => {
    const {
      match: {
        params: { id },
      },
      location: {
        state: { fromDashboard },
      },
    } = this.props;
    const region = this.state.selected.map(reg => reg.id);
    const site = this.state.siteSelected.map(reg => reg.id);
    const data = {
      siteTypes: region,
      regions: site,
    };

    const route = this.toUpper(fromDashboard);

    axios
      .post(
        `/v4/api/reporting/generate-standard-reports/${id}/?report_type=${route}`,
        data,
      )
      .then(req => {
        if (req.status === 200) {
          successToast(req.data.detail);
          this.setState({
            selected: [],
            siteType: [],
            showPreview: true,
          });
        }
      })
      .catch(err => {
        const error = err.response.data;
        Object.entries(error).map(([key, value]) => {
          return errorToast(`${value}`);
        });
      });
  };

  render() {
    const {
      state: {
        selected,
        open,
        siteOpen,
        applyButton,
        projectRegions,
        siteType,
        showPreview,
        siteSelected,
      },
    } = this;
    // console.log('in export', projectRegions, selected);
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

    const {
      match: {
        params: { id },
      },
      location: {
        state: { fromDashboard, projectCreatedOn },
      },
    } = this.props;

    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={`/project-dashboard/${id}/report`}>
                Report
              </Link>
            </li>
            <li className="breadcrumb-item">Export Data</li>
          </ol>
        </nav>
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

                        {fromDashboard === 'Site Information' && (
                          <p>
                            Export of all site information in an
                            spreadsheet
                          </p>
                        )}
                        {fromDashboard === 'Progress Report' && (
                          <p>
                            Export of key progress indicators like
                            submission count,status and site visits
                            generated from Staged Forms.
                          </p>
                        )}
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
                            handleCheck={this.siteHandler}
                            selectedArr={siteSelected}
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
                            handleCheck={this.changeHandlers}
                            selectedArr={selected}
                            placeholderTxt="Select Region Type"
                            site="regions"
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <button
                          type="button"
                          className="common-button mt-3 is-bg"
                          onClick={this.handleApply}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </form>
                  {applyButton && <CollapseFilterTable />}
                </div>
              </div>
              {showPreview && (
                <CollapseFilterTable id={id} type="standard" />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
