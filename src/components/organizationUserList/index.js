import React, { Component } from 'react';
import axios from 'axios';

export default class OrganizationUserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      masterUserList: [],
      breadCrumbs: {},
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    axios.get(`/fv3/api/users/?organization=${id}`).then(req => {
      this.setState({
        userList: req.data.users,
        masterUserList: req.data.users,
        breadCrumbs: req.data.breadcrumbs,
      });
    });
  }

  handleChange = async e => {
    const {
      target: { value },
    } = e;
    const { userList, masterUserList } = this.state;
    if (value) {
      const search = await userList.filter(user => {
        return (
          user.full_name
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          user.email.toLowerCase().includes(value.toLowerCase()) ||
          user.username.toLowerCase().includes(value.toLowerCase())
        );
      });
      this.setState({
        userList: search,
      });
    } else {
      this.setState({
        userList: masterUserList,
      });
    }
  };

  render() {
    const { breadCrumbs, userList } = this.state;
    return (
      <>
        {Object.keys(breadCrumbs).length > 0 && (
          <nav aria-label="breadcrumb" role="navigation">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href={breadCrumbs.organization_url}>
                  {breadCrumbs.organization}
                </a>
              </li>
              <li className="breadcrumb-item">{breadCrumbs.name}</li>
            </ol>
          </nav>
        )}
        <main id="main-content">
          <div className="card">
            <div className="card-header main-card-header sub-card-header">
              <h5>Organization Users</h5>
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
                    <th>email</th>
                    <th>role</th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map(user => {
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
