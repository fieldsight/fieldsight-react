import React, { PureComponent } from 'react';

export default class RightContent extends PureComponent {
  render() {
    const tableData = [
      {
        id: '1',
        name: 'Krishna B Mijar',
        address: 'Bhat-bhateni',
      },
      {
        id: '2',
        name: 'Krishna B Mijar',
        address: 'Bhat-bhateni',
      },
      {
        id: '3',
        name: 'Krishna B Mijar',
        address: 'Bhat-bhateni',
      },
      {
        id: '4',
        name: 'Krishna B Mijar',
        address: 'Bhat-bhateni',
      },
      {
        id: '5',
        name: 'Krishna B Mijar',
        address: 'Bhat-bhateni',
      },
      {
        id: '6',
        name: 'Krishna B Mijar',
        address: 'Bhat-bhateni',
      },
      {
        id: '7',
        name: 'Krishna B Mijar',
        address: 'Bhat-bhateni',
      },
    ];
    const table = [
      {
        id: '1',
        name: 'sabita thapa',
        address: 'naxal',
      },
      {
        id: '2',
        name: 'samee adhikari',
        address: 'Bhat-bhateni',
      },
      {
        id: '3',
        name: 'Reecha karki',
        address: 'Bhat-bhateni',
      },
      {
        id: '4',
        name: 'Alisha gurung',
        address: 'Bhat-bhateni',
      },
      {
        id: '5',
        name: 'Krishna B Mijar',
        address: 'Bhat-bhateni',
      },
      {
        id: '6',
        name: 'Krishna B Mijar',
        address: 'Bhat-bhateni',
      },
      {
        id: '7',
        name: 'Krishna B Mijar',
        address: 'Bhat-bhateni',
      },
    ];
    const { navlink } = this.props;
    return (
      <div className="col-xl-9 col-lg-8">
        <div className="right-content">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header main-card-header sub-card-header">
                  <h5>Select users</h5>
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
                  <div
                    className="tab-content mrt-30"
                    id="myTabContent"
                  >
                    <div
                      className="tab-pane fade"
                      id="region"
                      role="tabpanel"
                      aria-labelledby="region_tab"
                    >
                      <div className="table-responsive">
                        <table
                          id=""
                          className="table  table-bordered   dataTable"
                        >
                          <thead>
                            <tr>
                              <th>S.N</th>
                              <th>ID</th>
                              <th>Address</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>
                                <a
                                  href="/#"
                                  className="pending table-profile"
                                >
                                  <figure>
                                    <img
                                      src="img/pf.jpg"
                                      alt="site-logo"
                                    />
                                  </figure>
                                  <h5>Krishna B Mijar</h5>
                                </a>
                              </td>
                              <td>
                                <a href="/#" className="pending">
                                  Krishna B Mijar
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>1</td>
                              <td>
                                <a
                                  href="/#"
                                  className="pending table-profile"
                                >
                                  <figure>
                                    <img
                                      src="img/pf.jpg"
                                      alt="site-logo"
                                    />
                                  </figure>
                                  <h5>Krishna B Mijar</h5>
                                </a>
                              </td>
                              <td>
                                <a href="/#" className="pending">
                                  Krishna B Mijar
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>1</td>
                              <td>
                                <a
                                  href="/#"
                                  className="pending table-profile"
                                >
                                  <figure>
                                    <img
                                      src="img/pf.jpg"
                                      alt="site-logo"
                                    />
                                  </figure>
                                  <h5>Krishna B Mijar</h5>
                                </a>
                              </td>
                              <td>
                                <a href="/#" className="pending">
                                  Krishna B Mijar
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>1</td>
                              <td>
                                <a
                                  href="/#"
                                  className="pending table-profile"
                                >
                                  <figure>
                                    <img
                                      src="img/pf.jpg"
                                      alt="site-logo"
                                    />
                                  </figure>
                                  <h5>Krishna B Mijar</h5>
                                </a>
                              </td>
                              <td>
                                <a href="/#" className="pending">
                                  Krishna B Mijar
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>1</td>
                              <td>
                                <a
                                  href="/#"
                                  className="pending table-profile"
                                >
                                  <figure>
                                    <img
                                      src="img/pf.jpg"
                                      alt="site-logo"
                                    />
                                  </figure>
                                  <h5>Krishna B Mijar</h5>
                                </a>
                              </td>
                              <td>
                                <a href="/#" className="pending">
                                  Krishna B Mijar
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>1</td>
                              <td>
                                <a
                                  href="/#"
                                  className="pending table-profile"
                                >
                                  <figure>
                                    <img
                                      src="img/pf.jpg"
                                      alt="site-logo"
                                    />
                                  </figure>
                                  <h5>Krishna B Mijar</h5>
                                </a>
                              </td>
                              <td>
                                <a href="/#" className="pending">
                                  Krishna B Mijar
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>1</td>
                              <td>
                                <a
                                  href="/#"
                                  className="pending table-profile"
                                >
                                  <figure>
                                    <img
                                      src="img/pf.jpg"
                                      alt="site-logo"
                                    />
                                  </figure>
                                  <h5>Krishna B Mijar</h5>
                                </a>
                              </td>
                              <td>
                                <a href="/#" className="pending">
                                  Krishna B Mijar
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>1</td>
                              <td>
                                <a
                                  href="/#"
                                  className="pending table-profile"
                                >
                                  <figure>
                                    <img
                                      src="img/pf.jpg"
                                      alt="site-logo"
                                    />
                                  </figure>
                                  <h5>Krishna B Mijar</h5>
                                </a>
                              </td>
                              <td>
                                <a href="/#" className="pending">
                                  Krishna B Mijar
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade show active"
                      id="sites"
                      role="tabpanel"
                      aria-labelledby="sites_tab"
                    >
                      <div className="table-responsive">
                        {navlink ? (
                          <table
                            id=""
                            className="table  table-bordered   dataTable"
                          >
                            <thead>
                              <tr>
                                <th>S.N</th>
                                <th>ID</th>
                                <th>Address</th>
                              </tr>
                            </thead>
                            <tbody>
                              {tableData.map(data => (
                                <tr key={data.id}>
                                  <td>{data.id}</td>
                                  <td>
                                    <a
                                      href="/#"
                                      className="pending table-profile"
                                    >
                                      <figure>
                                        <img
                                          src="img/pf.jpg"
                                          alt="site-logo"
                                        />
                                      </figure>
                                      <h5>{data.name}</h5>
                                    </a>
                                  </td>
                                  <td>
                                    <a href="/#" className="pending">
                                      {data.address}
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <table
                            id=""
                            className="table  table-bordered   dataTable"
                          >
                            <thead>
                              <tr>
                                <th>S.N</th>
                                <th>ID</th>
                                <th>Address</th>
                              </tr>
                            </thead>
                            <tbody>
                              {table.map(data => (
                                <tr key={data.id}>
                                  <td>{data.id}</td>
                                  <td>
                                    <a
                                      href="/#"
                                      className="pending table-profile"
                                    >
                                      <figure>
                                        <img
                                          src="img/pf.jpg"
                                          alt="site-logo"
                                        />
                                      </figure>
                                      <h5>{data.name}</h5>
                                    </a>
                                  </td>
                                  <td>
                                    <a href="/#" className="pending">
                                      {data.address}
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header main-card-header sub-card-header">
                  <h5>Select Projects</h5>
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
                {/* <div className="card-body"/></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
