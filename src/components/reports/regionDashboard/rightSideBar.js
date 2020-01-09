import React, { PureComponent } from 'react';

export default class RightSidebar extends PureComponent {
  render() {
    const regions = [
      {
        id: '1',
        name: 'Bageswori',
        noOfSites: '200',
      },
      {
        id: '2',
        name: 'Bageswori',
        noOfSites: '200',
      },
      {
        id: '3',
        name: 'Bageswori',
        noOfSites: '200',
      },
      {
        id: '4',
        name: 'Bageswori',
        noOfSites: '200',
      },
      {
        id: '5',
        name: 'Bageswori',
        noOfSites: '200',
      },
      {
        id: '6',
        name: 'Bageswori',
        noOfSites: '200',
      },
      {
        id: '7',
        name: 'Bageswori',
        noOfSites: '200',
      },
    ];
    return (
      <div className="card">
        <div className="card-header main-card-header">
          <h5>Projects</h5>
        </div>
        <div className="card-body">
          <table
            id="paging7_table"
            className="table table-bordered paging7_table"
          >
            <thead>
              <tr>
                <th>S.N</th>
                <th>ID</th>
                <th>Region Name</th>
                <th>Number of sites</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {regions.map(region => (
                <tr>
                  <td>{region.id}</td>
                  <td>{region.name}</td>
                  <td>
                    <a href="#" className="pending">
                      {region.id}
                    </a>
                  </td>
                  <td>{region.noOfSites}</td>
                  <td>
                    <a
                      href="#"
                      className="td-view-btn"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Edit"
                    >
                      <i className="la la-eye" />
                    </a>
                    <a
                      href="#"
                      className="td-edit-btn"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="View"
                    >
                      <i className="la la-edit" />
                    </a>
                    <a
                      href="#"
                      className="td-delete-btn"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Delete"
                    >
                      <i className="la la-trash-o" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
