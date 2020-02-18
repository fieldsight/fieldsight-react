import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import format from 'date-fns/format';
// import CustomCheckBox from './CustomCheckbox';
import CollapseFilterTable from '../CollapseFilterTable';
import FilterByDate from '../common/filterByDate';
import FilterByData from '../common/filterByData';
import {
  errorToast,
  successToast,
} from '../../../utils/toastHandler';
import { excelExport } from '../../../actions/templateAction';

/* eslint-disable */
let statusLoaded = '';
class FormDataFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      open: false,
      siteOpen: false,
      siteSelected: [],
      projectRegions: [{ id: 'all_regions', name: 'Select All' }],
      siteType: [{ id: 'all_sitetypes', name: 'Select All' }],
      startedDate: new Date(localStorage.getItem('createdOn')),
      endedDate: new Date(),
      showPreview: false,
      taskId: '',
      fileToDownload: '',
      formName: localStorage.getItem('form'),
      projectCreatedOn: localStorage.getItem('createdOn'),
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const { projectRegions, siteType } = this.state;

    const siteTypeApi = `/fieldsight/api/site-types/${id}/`;
    const projectRegionsApi = `/fieldsight/api/project-regions/${id}/`;

    const requestSiteType = axios.get(siteTypeApi);
    const requestProjectRegions = axios.get(projectRegionsApi);

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
          this.setState({
            projectRegions: regions,
            selected: regions.map(each => {
              return { id: each.id };
            }),
            siteType: sites,
            siteSelected: sites.map(each => {
              return { id: each.id };
            }),
          });
        }),
      )
      .catch(() => {
        // react on errors.
      });

    // this.setState({
    //   startedDate: new Date(projectCreatedOn),
    // });
  }

  componentDidUpdate(prevProps) {
    const { taskId } = this.state;
    if (
      prevProps.templateReducer.exportExcel !==
      this.props.templateReducer.exportExcel
    ) {
      const resp = this.props.templateReducer.exportExcel;
      if (resp.task_status !== 'Completed') {
        const firstInterval = setTimeout(() => {
          this.props.excelExport(taskId);
        }, 5000);
        return firstInterval;
      } else if (resp.task_status === 'Failed') {
        errorToast('Error In Downloading File');
      } else {
        this.setDownloadFile(resp.file_url);
      }
    }
  }

  componentWillUnmount() {
    localStorage.removeItem('form');
    localStorage.removeItem('createdOn');
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
      .map(function(word) {
        return word[0].toLowerCase() + word.substr(1);
      })
      .join('_');
  };

  handleApply = () => {
    const {
      match: {
        params: { id, fid },
      },
    } = this.props;
    // debugger;
    const region = this.state.selected.filter(
      reg => reg.id !== 'all_regions',
    );
    const site = this.state.siteSelected.filter(
      s => s.id !== 'all_sitetypes',
    );
    const startDate = format(this.state.startedDate, ['YYYY-MM-DD']);
    const endDate = format(this.state.endedDate, ['YYYY-MM-DD']);
    const data = {
      siteTypes: site.map(s => s.id),
      regions: region.map(r => r.id),
      fs_ids: [fid],
      start_date: startDate,
      end_date: endDate,
    };

    axios
      .post(
        `/v4/api/reporting/generate-standard-reports/${id}/?report_type=form`,
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
            // showPreview: true,
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

  onChangeHandler = date => {
    const { endedDate } = this.state;
    this.setState(() => {
      if (endedDate && date > endedDate) {
        return {
          endedDate: date,
        };
      }
      return {
        startedDate: date,
      };
    });
  };

  onEndChangeHandler = date => {
    const { startedDate } = this.state;
    this.setState(() => {
      if (date < startedDate) {
        return {
          startedDate: date,
        };
      }
      return {
        endedDate: date,
      };
    });
  };

  // handleExcelExport = () => {
  //   const { taskId } = this.state;
  //   this.props.excelExport(taskId);
  // };

  render() {
    const {
      state: {
        selected,
        open,
        siteOpen,
        projectRegions,
        siteType,
        siteSelected,
        startedDate,
        endedDate,
        showPreview,
        fileToDownload,
        formName,
        projectCreatedOn,
      },
      props: {
        match: {
          params: { id, fid },
        },
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
        title: 'Add to templates',
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
      <>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={`/project/${id}/report`}>Report</Link>
            </li>
            <li className="breadcrumb-item">{formName}</li>
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
                        <p>
                          Export of forms data and site information an
                          Excel File, generated with filters in
                          region, types and time range.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <div className="dropdown report-option">
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
                  </div> */}
                </div>
                <div className="data-filter mt-3">
                  <h3 className="mb-3">Filters</h3>
                  <form>
                    <div className="row">
                      <div className="col-lg-3 col-md-6">
                        <FilterByData
                          className="form-group"
                          label="site types"
                          toggleSelectClass={siteOpen}
                          handleToggleClass={this.SiteToggleClass}
                          data={siteType}
                          changeHandler={this.siteHandler}
                          selectedArr={siteSelected}
                          placeholderTxt="Select Site Type"
                        />
                      </div>
                      <div className="col-lg-3 col-md-6">
                        <FilterByData
                          className="form-group"
                          label="Regions"
                          toggleSelectClass={open}
                          handleToggleClass={this.handleToggleClass}
                          data={projectRegions}
                          changeHandler={this.changeHandlers}
                          selectedArr={selected}
                          placeholderTxt="Select Region Type"
                        />
                      </div>

                      <div className="col-lg-6 col-md-6">
                        <FilterByDate
                          className="form-group icon-between"
                          startDate={startedDate && startedDate}
                          endDate={endedDate}
                          startDateHandler={this.onChangeHandler}
                          endDateHandler={this.onEndChangeHandler}
                          createdDate={new Date(projectCreatedOn)}
                          tillDate={new Date()}
                        />
                      </div>

                      <div className="col-md-12">
                        <button
                          disabled={statusLoaded === false}
                          type="button"
                          className="common-button mt-3 is-bg"
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
                  id={fid}
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
})(FormDataFilter);
