import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Table, Button } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { getTeam, getTranslate } from "../../actions/teamAction";
import { FormattedMessage } from "react-intl";
import SelectElement from "../common/SelectElement";
import { useHistory } from "react-router-dom";

class Teams extends Component {
  state = {
    results: [],
    masterresult: [],
    count: "",
    selectedLanguage: "en"
  };

  componentDidMount() {
    this.props.getTeam();
  }
  componentWillReceiveProps(nextprops) {
    this.setState({
      results: nextprops.teams.teams,
      masterresult: nextprops.teams.teams,
      count: nextprops.teams.count
    });
  }

  handleChange = async e => {
    const {
      target: { value }
    } = e;
    const { results, masterresult } = this.state;
    if (value) {
      const search = await results.filter(result => {
        return (
          result.name.toLowerCase().includes(value.toLowerCase()) ||
          (result.address !== null
            ? result.address.toLowerCase().includes(value.toLowerCase())
            : "")
        );
      });
      this.setState({
        results: search
      });
    } else {
      this.setState({
        results: masterresult
      });
    }
  };

  onLanguageChangeHandler = e => {
    const { value } = e.target;
    this.props.getTranslate(value);
    // this.setState(
    //   {
    //     selectedLanguage: value
    //   },
    //   ()=>this.props
    // );
  };

  showMap = () => {
    this.props.history.push("/map");
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selected !== this.props.selected) {
      localStorage.setItem("selected", this.props.selected);
    }
  }

  render() {
    const { results } = this.state;

    const selectLanguage = [
      { id: "en", name: "Eng" },
      { id: "ne", name: "Nep" }
    ];
    const { selected } = this.props;
    return (
      <>
        <div className="card">
          <div>
            <SelectElement
              options={selectLanguage}
              label="Select Language"
              changeHandler={this.onLanguageChangeHandler}
              value={selected}
            />
          </div>
          <div className="card-header main-card-header sub-card-header">
            {/* <h5>Team List</h5>*/}
            <FormattedMessage
              id="app.team-list"
              defaultMessage="Team List"
              description="Team List"
            />
            <div className="dash-btn">
              <form className="floating-form">
                <div className="form-group mr-0">
                  <input
                    type="search"
                    className="form-control"
                    onChange={e => this.handleChange(e)}
                    required
                  />
                  <label htmlFor="input">
                    <FormattedMessage
                      id="app.teams-search"
                      defaultMessage="Search"
                    />
                  </label>
                  <i className="la la-search"></i>
                </div>
              </form>
              <a
                href={`/fieldsight/application/#/create-team/`}
                className="fieldsight-btn"
              >
                <i className="la la-plus"></i>
              </a>
              <Button className="fieldsight-btn" onClick={() => this.showMap()}>
                <i className="la la-map"></i>&nbsp; {/*Map*/}
                <FormattedMessage id="app.map" defaultMessage="Map" />
              </Button>
            </div>
          </div>

          <div className="card-body">
            <div style={{ position: "relative", height: "800px" }}>
              <PerfectScrollbar>
                <Table
                  id="manage_table"
                  className="table  dataTable table-bordered  manage_table"
                >
                  <thead>
                    <tr>
                      <th>
                        <FormattedMessage
                          id="app.teams"
                          defaultMessage="Teams"
                        />
                      </th>
                      <th>
                        <FormattedMessage
                          id="app.address"
                          defaultMessage="Address"
                        />
                      </th>
                      <th>
                        <FormattedMessage
                          id="app.projects"
                          defaultMessage="Projects"
                        />
                      </th>
                      <th>
                        <FormattedMessage
                          id="app.sites"
                          defaultMessage="Sites"
                        />
                      </th>
                      <th>
                        <FormattedMessage
                          id="app.users"
                          defaultMessage="Users"
                        />
                      </th>
                      <th>
                        <FormattedMessage
                          id="app.team-owner"
                          defaultMessage="Team Owner"
                        />
                      </th>
                      <th>
                        <FormattedMessage
                          id="app.action"
                          defaultMessage="Action"
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results &&
                      results.length > 0 &&
                      results.map((project, key) => {
                        return (
                          <tr key={key}>
                            <td>
                              <a
                                href={`/fieldsight/application/#/team-dashboard/${project.id}`}
                                className="pending table-profile"
                              >
                                <figure>
                                  <img src={project.logo} alt="site-logo" />
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
                                href={`/users/profile/${project.team_owner_id}`}
                                className="pending table-profile"
                              >
                                {project.team_owner}
                              </a>
                            </td>
                            <td>
                              <a
                                href={`/fieldsight/application/#/team-dashboard/${project.id}`}
                                className="td-view-btn td-btn"
                              >
                                <i className="la la-eye"></i>
                              </a>
                              <a
                                href={`/fieldsight/application/#/team-settings/${project.id}`}
                                className="td-edit-btn td-btn"
                              >
                                <i className="la la-edit"></i>
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
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ teams }) => {
  const { selected } = teams;
  // console.log(teams, selected, "========");

  return {
    teams,
    selected
  };
};
export default compose(
  connect(mapStateToProps, {
    getTeam,
    getTranslate
  })
)(Teams);
