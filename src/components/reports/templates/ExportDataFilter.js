import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import CustomMultiSelect from '../common/CustomMultiSelect';
import CollapseFilterTable from '../CollapseFilterTable';
import {
  errorToast,
  successToast,
} from '../../../utils/toastHandler';
import { excelExport } from '../../../actions/templateAction';

let statusLoaded = '';
class ExportDataFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      open: false,
      siteOpen: false,
      siteSelected: [],
      projectRegions: [{ id: 'all_regions', name: 'Select All' }],
      siteType: [{ id: 'all_sitetypes', name: 'Select All' }],
      showPreview: false,
      taskId: '',
      fileToDownload: '',
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
          const regions =
            responses[0].data.length > 0
              ? [...projectRegions, ...responses[0].data]
              : [];
          const sites =
            responses[1].data.length > 0
              ? [...siteType, ...responses[1].data]
              : [];
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

  componentDidUpdate(prevProps) {
    const { taskId } = this.state;
    const { templateReducer } = this.props;
    if (
      prevProps.templateReducer.exportExcel !==
      templateReducer.exportExcel
    ) {
      const resp = templateReducer.exportExcel;
      if (resp.task_status !== 'Completed') {
        setTimeout(() => {
          this.props.excelExport(taskId);
        }, 5000);
      } else if (resp.task_status === 'Failed') {
        errorToast('Error In Downloading File');
      } else {
        this.setDownloadFile(resp.file_url);
      }
    }
  }

  setDownloadFile = file => {
    this.setState({ fileToDownload: file, showPreview: true });
    statusLoaded = true;
  };

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
      .map(word => {
        return word[0].toLowerCase() + word.substr(1);
      })
      .join('_');
  };

  handleApply = () => {
    const {
      match: {
        params: { id, reportType },
      },
    } = this.props;
    const { selected, siteSelected } = this.state;
    const region = selected.filter(reg => reg.id !== 'all_regions');
    const site = siteSelected.filter(s => s.id !== 'all_sitetypes');
    const data = {
      regions: region.map(r => r.id),
      siteTypes: site.map(s => s.id),
    };
    const route = this.toUpper(reportType);

    axios
      .post(
        `/v4/api/reporting/generate-standard-reports/${id}/?report_type=${route}`,
        data,
      )
      .then(req => {
        if (req.status === 200) {
          successToast(req.data.detail);
          this.props.excelExport(req.data.task_id);
          statusLoaded = false;
          this.setState({
            selected: [],
            siteType: [],
            taskId: req.data.task_id,
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
        projectRegions,
        siteType,
        showPreview,
        siteSelected,
        fileToDownload,
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

    const {
      match: {
        params: { id, reportType },
      },
    } = this.props;
    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={`/project/${id}/report`}>Report</Link>
            </li>
            <li className="breadcrumb-item">{reportType}</li>
            <li className="breadcrumb-item">Export Data</li>
          </ol>
        </nav>
        <div className="reports mrb-30">
          <div className="card">
            <div className="card-body">
              <div className="standard-tempalte">
                <h3 className="mb-3">Project report</h3>

                <div className="report-list">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="report-content">
                        <h4>Export Data</h4>

                        {reportType === 'Site Information' && (
                          <p>
                            Export of all site information in an
                            spreadsheet
                          </p>
                        )}
                        {reportType === 'Progress Report' && (
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
                          disabled={statusLoaded === false}
                          onClick={this.handleApply}
                        >
                          {statusLoaded === false
                            ? 'Downloading'
                            : 'Apply'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {showPreview && (
                <CollapseFilterTable
                  id={id}
                  type="standard"
                  excelFileToDownload={fileToDownload}
                />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ templateReducer }) => ({
  templateReducer,
});

export default connect(mapStateToProps, {
  excelExport,
})(ExportDataFilter);
