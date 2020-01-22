import React, { PureComponent } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import format from 'date-fns/format';
// import CustomCheckBox from './CustomCheckbox';
import CustomMultiSelect from './common/CustomMultiSelect';
import FilterByDate from './common/filterByDate';
import FilterByData from './common/filterByData';
import CollapseFilterTable from './CollapseFilterTable';
import { errorToast, successToast } from '../../utils/toastHandler';

/* eslint-disable */

const CustomInput = (value, onclick) => (
  <div className="custom-group-append">
    <span className="custom-group-text">
      <i className="material-icons">calendar_today</i>
      <button className="example-custom-input" onClick={onClick}>
        {value}
      </button>
      {/* <input
        // onChange={onChange}
        placeholder="gfdghj"
        value={value}
        // isSecure={isSecure}
        // id={id}
        onClick={onClick}
      /> */}
    </span>
  </div>
);

const Input = ({
  onChange,
  placeholder,
  value,
  isSecure,
  id,
  onClick,
}) => (
  <div
  // style={{ position: 'relative' }}
  >
    <i
      onClick={onClick}
      className="material-icons"
      value={value}
      // style={{
      //   position: 'absolute',
      //   top: '0.3rem',
      //   left: '5px',
      //   fontSize: '1rem',
      // }}
    >
      calendar_today
    </i>

    <input
      onClick={onClick}
      className="dateInput"
      value={value}
      type="text"
      // style={{ paddingLeft: '33px' }}
    />
  </div>
);

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
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const siteType = `/fieldsight/api/site-types/${id}/`;
    const projectRegions = `/fieldsight/api/project-regions/${id}/`;

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
    const { checked, name } = e.target;

    const idName = 'id';
    this.setState(prevState => {
      if (checked) {
        return {
          selected: [...prevState.selected, { [idName]: info.id }],
        };
      }
      if (!checked) {
        // console.log(preveState.selected, 'preveState.selected');
        return {
          selected: prevState.selected.filter(
            region => region.id !== info.id,
          ),
        };
      }
    });
  };

  siteHandler = (e, info) => {
    const { checked, name } = e.target;
    const idName = 'id';
    this.setState(prevState => {
      if (checked) {
        return {
          siteSelected: [
            ...prevState.siteSelected,
            { [idName]: info.id },
          ],
        };
      }
      if (!checked) {
        return {
          siteSelected: prevState.siteSelected.filter(
            region => region.id !== info.id,
          ),
        };
      }
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

  // handleApply = () => {
  //   this.setState(prevState => ({
  //     applyButton: !prevState.applyButton,
  //   }));
  // };

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
    } = this.props;
    const region = this.state.selected.map(reg => reg.id);
    const site = this.state.siteSelected.map(reg => reg.id);
    const startDate = format(this.state.startedDate, ['YYYY-MM-DD']);
    const endDate = format(this.state.endedDate, ['YYYY-MM-DD']);
    const data = {
      siteTypes: region,
      regions: site,
      fs_ids: [this.props.location.state.fromDashboard],
      start_date: startDate,
      end_date: endDate,
    };

    // const route = this.toUpper(
    //   this.props.location.state.fromDashboard,
    // );

    axios
      .post(
        `/v4/api/reporting/generate-standard-reports/${id}/?report_type=form`,
        data,
      )
      .then(req => {
        if (req.status === 200) {
          successToast(req.data.detail);
          this.setState({
            selected: [],
            siteType: [],
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
    const {
      match: {
        params: { id },
      },
    } = this.props;
    // const report_type = 'gfhj';
    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={`/project-dashboard/${id}`}>
                Project Dashboard
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
                        <p>
                          Export of forms data and site information an
                          Excel File, generated with filters in
                          region, types and time range.
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
                        <FilterByData
                          className="form-group"
                          label="site types"
                          toggleSelectClass={siteOpen}
                          handleToggleClass={this.SiteToggleClass}
                          data={siteType}
                          changeHandler={this.siteHandler}
                          selectedArr={this.state.siteSelected}
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
                          selectedArr={this.state.selected}
                          placeholderTxt="Select Region Type"
                        />
                      </div>

                      <div className="col-lg-6 col-md-6">
                        <FilterByDate
                          className="form-group icon-between"
                          startDate={this.state.startedDate}
                          endDate={this.state.endedDate}
                          startDateHandler={this.onChangeHandler}
                          endDateHandler={this.onEndChangeHandler}
                        />
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
                  {applyButton && <CollapseFilterTable />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
