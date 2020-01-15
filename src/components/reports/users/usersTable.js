import React, { PureComponent } from 'react';

export default class UsersList extends PureComponent {
  render() {
    const userList = [
      {
        image: 'img/pf.jpg',
        name: 'Sahil Thapa',
        User_Name: 'Sahil.thapa.org',
        Email: 'Sahil.thapa.org',
      },
      {
        image: 'img/pf.jpg',
        name: 'Sabita Thapa',
        User_Name: 'Sahil.thapa.org',
        Email: 'Sahil.thapa.org',
      },
      {
        image: 'img/pf.jpg',
        name: 'Swikriti Thapa',
        User_Name: 'Sahil.thapa.org',
        Email: 'Sahil.thapa.org',
      },
      {
        image: 'img/pf.jpg',
        name: 'samee Thapa',
        User_Name: 'Sahil.thapa.org',
        Email: 'Sahil.thapa.org',
      },
      {
        image: 'img/pf.jpg',
        name: 'richa Thapa',
        User_Name: 'Sahil.thapa.org',
        Email: 'Sahil.thapa.org',
      },
      {
        image: 'img/pf.jpg',
        name: 'bjtaa Thapa',
        User_Name: 'Sahil.thapa.org',
        Email: 'Sahil.thapa.org',
      },
      {
        image: 'img/pf.jpg',
        name: 'Sahil Thapa',
        User_Name: 'Sahil.thapa.org',
        Email: 'Sahil.thapa.org',
      },
      {
        image: 'img/pf.jpg',
        name: 'Sahil Thapa',
        User_Name: 'Sahil.thapa.org',
        Email: 'Sahil.thapa.org',
      },
    ];
    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              {/* <a tabIndex="0" role="button" onKeyDown=""> */}
              <a href="/#" target="/#">
                Home
              </a>
            </li>
            <li className="breadcrumb-item">
              <a tabIndex="0" role="button" onKeyDown="">
                Teams
              </a>
            </li>

            <li
              className="breadcrumb-item active"
              aria-current="page"
            >
              Invitation
            </li>
          </ol>
        </nav>

        <div className="card">
          <div className="card-header main-card-header sub-card-header">
            <h5>Users</h5>
            <div className="dash-btn">
              <form className="floating-form">
                <div className="form-group mr-0">
                  <input
                    type="search"
                    className="form-control"
                    required=""
                  />
                  <label htmlFor="input">Search</label>
                  <i className="la la-search" />
                </div>
              </form>
              <a href="/#" className="fieldsight-btn">
                <i className="la la-plus" />
              </a>
            </div>
          </div>
          <div className="card-body">
            <table
              id="manage_table"
              className="table  table-bordered  manage_table"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>User Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {userList.map(lists => (
                  <tr>
                    <td>
                      <a
                        href={lists.image}
                        className="pending table-profile"
                      >
                        <figure>
                          <img src={lists.image} alt="site-logo" />
                        </figure>
                        <h5>{lists.name}</h5>
                      </a>
                    </td>
                    <td>{lists.User_Name}</td>
                    <td>{lists.Email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}
