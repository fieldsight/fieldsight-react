import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  BlockContentLoader,
  TableContentLoader,
} from '../common/Loader';

// import SelectElement from '../common/SelectElement';

import { getTeam, getTranslate } from '../../actions/teamAction';
/* eslint-disable react/destructuring-assignment */

class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      masterresult: [],
      organization: [],
      loader: false,
      // count: '',
      // selectedLanguage: 'en',
    };
  }

  componentDidMount() {
    this.setState({ loader: true }, () => {
      this.props.getTeam();
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selected !== this.props.selected) {
      localStorage.setItem('selected', this.props.selected);
    }
  }

  componentWillReceiveProps(nextprops) {
    this.setState({
      results: nextprops.teams.teams,
      masterresult: nextprops.teams.teams,
      organization: nextprops.teams.organizations,
      loader: false,
    });
  }

  handleChange = async e => {
    const {
      target: { value },
    } = e;
    const { results, masterresult } = this.state;
    if (value) {
      const search = await results.filter(result => {
        return (
          result.name.toLowerCase().includes(value.toLowerCase()) ||
          (result.address !== null
            ? result.address
                .toLowerCase()
                .includes(value.toLowerCase())
            : '')
        );
      });
      this.setState({
        results: search,
      });
    } else {
      this.setState({
        results: masterresult,
      });
    }
  };

  onLanguageChangeHandler = e => {
    const { value } = e.target;
    this.props.getTranslate(value);
  };

  showMap = () => {
    this.props.history.push('/map');
  };

  render() {
    const { results, organization, loader } = this.state;

    // const { selected, orgs } = this.props;

    // const selectLanguage = [
    //   { id: 'en', name: 'Eng' },
    //   { id: 'ne', name: 'Nep' },
    // ];
    return (
      <>
        <div className="sub-regions">
          <div className="card">
            <div className="card-header main-card-header">
              <label>Organizations</label>

              <div style={{ marginLeft: '69.6rem' }}>
                <a
                  href="/fieldsight/application/#/create-organization/"
                  className="fieldsight-btn"
                >
                  <i className="la la-plus" />
                </a>
              </div>
            </div>
            {loader ? (
              <TableContentLoader row={10} column={4} />
            ) : (
              <div className="card-body">
                <div className="row">
                  {organization.map(subRegion => (
                    <div
                      className="col-xl-3 col-lg-6"
                      key={subRegion.id}
                      style={{ marginBottom: '20px' }}
                    >
                      <Link
                        to={`/organization-dashboard/${subRegion.id}`}
                      >
                        <div className="sub-regions-item ">
                          <h5>{subRegion.name}</h5>
                          <p>
                            <label>Teams :</label>
                            {subRegion.teams}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="card">
          {/* <div>
            <SelectElement
              options={selectLanguage}
              label="Select Language"
              changeHandler={this.onLanguageChangeHandler}
              value={selected}
            />
          </div> */}
          <div
            className="card-header 
          main-card-header sub-card-header"
          >
            Team List
            <div className="dash-btn">
              <form className="floating-form">
                <div className="form-group mr-0">
                  <input
                    type="search"
                    className="form-control"
                    onChange={e => this.handleChange(e)}
                    required
                  />
                  <label htmlFor="input">Search</label>
                  <i className="la la-search" />
                </div>
              </form>
              <a
                href="/fieldsight/application/#/create-team/"
                className="fieldsight-btn"
              >
                <i className="la la-plus" />
              </a>
              <Button
                className="fieldsight-btn"
                onClick={() => this.showMap()}
              >
                <i className="la la-map" />
                &nbsp; Map
              </Button>
            </div>
          </div>
          {loader ? (
            <BlockContentLoader number={10} height="30px" />
          ) : (
            <div className="card-body">
              <div style={{ position: 'relative', height: '800px' }}>
                <PerfectScrollbar>
                  <Table
                    id="manage_table"
                    className="table dataTable table-bordered manage_table"
                  >
                    <thead>
                      <tr>
                        <th>Teams</th>
                        <th>Address</th>
                        <th>Projects</th>
                        <th>Sites</th>
                        <th>Users</th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results &&
                        results.length > 0 &&
                        results.map(project => {
                          return (
                            <tr key={project.id}>
                              <td>
                                <a
                                  href={`/fieldsight/application/#/team-dashboard/${project.id}`}
                                  className="pending table-profile"
                                >
                                  <figure>
                                    <img
                                      src={project.logo}
                                      alt="site-logo"
                                    />
                                  </figure>
                                  <h5>{project.name}</h5>
                                </a>
                              </td>

                              <td>{project.address}</td>
                              <td>{project.projects}</td>
                              <td>{project.sites}</td>
                              <td>{project.users}</td>

                              <td>
                                <a
                                  href={`/fieldsight/application/#/team-dashboard/${project.id}`}
                                  className="td-view-btn td-btn"
                                >
                                  <i className="la la-eye" />
                                </a>
                                <a
                                  href={`/fieldsight/application/#/team-settings/${project.id}`}
                                  className="td-edit-btn td-btn"
                                >
                                  <i className="la la-edit" />
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </PerfectScrollbar>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ teams }) => {
  const { selected, organizations } = teams;

  return {
    teams,
    organizations,
    selected,
  };
};

export default compose(
  connect(mapStateToProps, {
    getTeam,
    getTranslate,
  }),
)(Teams);
