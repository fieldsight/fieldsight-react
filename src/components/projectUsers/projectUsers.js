import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getProjectUser } from '../../actions/projectUserActions';
/* eslint-disable react/prop-types  */
/* eslint-disable react/no-array-index-key  */
/* eslint-disable jsx-a11y/label-has-associated-control  */

class ProjectUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      breadcrumbs: [],
      masteruser: [],
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      // getProjectUser,
    } = this.props;
    getProjectUser(id);
  }

  componentWillReceiveProps(nextprops) {
    this.setState({
      users: nextprops.projectUser.users,
      masteruser: nextprops.projectUser.users,
      breadcrumbs: nextprops.projectUser.breadcrumbs,
    });
  }

  handleChange = async e => {
    const {
      target: { value },
    } = e;
    const { users, masteruser } = this.state;
    if (value) {
      const search = await users.filter(user => {
        return (
          user.full_name
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          user.email.toLowerCase().includes(value.toLowerCase()) ||
          user.username.toLowerCase().includes(value.toLowerCase())
        );
      });
      this.setState({
        users: search,
      });
    } else {
      this.setState({
        users: masteruser,
      });
    }
  };

  render() {
    const { users, breadcrumbs } = this.state;

    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          {/* { */}
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href={breadcrumbs.project_url}>
                {breadcrumbs.project}
              </a>
            </li>
            <li className="breadcrumb-item">{breadcrumbs.name}</li>
          </ol>
          {/* } */}
        </nav>
        <main id="main-content">
          <div className="card">
            <div className="card-header main-card-header sub-card-header">
              <h5>Project Users</h5>
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
              </div>
            </div>
            <div className="card-body">
              <table
                id="manage_table"
                className="table dataTable table-bordered  manage_table"
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => {
                    return (
                      <tr key={user.id}>
                        <td>
                          <a
                            href={`/users/profile/${user.id}`}
                            className="pending table-profile"
                          >
                            <figure>
                              <img
                                src={user.profile_picture}
                                alt="site-logo"
                              />
                            </figure>
                            <h5>{user.full_name}</h5>
                          </a>
                        </td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        {user.role.length > 0 ? (
                          user.role[0] ? (
                            <td>{user.role[0]}</td>
                          ) : (
                            <td>
                              {`${user.role[0]}/${user.role[1]}`}
                            </td>
                          )
                        ) : (
                          <td>{}</td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </>
    );
  }
}

const mapStateToProps = ({ projectUser }) => {
  return {
    projectUser,
  };
};
export default compose(
  connect(mapStateToProps, {
    getProjectUser,
  }),
)(ProjectUser);
