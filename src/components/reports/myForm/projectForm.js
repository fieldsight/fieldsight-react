import React, { PureComponent } from 'react';

export default class ProjectFormTable extends PureComponent {
  render() {
    return (
      <>
        <div className="card no-boxshadow">
          <div className="card-header main-card-header sub-card-header">
            <h5>Project forms</h5>
          </div>
          <div className="card-body">
            <table
              id="project_form_table"
              className="table-bordered table project_form dataTable"
            >
              <thead>
                <tr>
                  <th> S.N</th>
                  <th>Form Name</th>
                  <th>Create Date</th>
                  <th>Updated date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>name</td>
                  <td>
                    <i className="fa fa-clock-o" />
                    <span>2019-08-14</span>
                  </td>
                  <td>
                    <i className="fa fa-clock-o" />
                    <span>2019-08-14</span>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="td-view-btn td-btn"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Preview"
                    >
                      <i className="la la-eye" />
                    </a>
                    <a
                      href=""
                      className="td-edit-btn td-btn"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Edit"
                    >
                      <i className="la la-edit" />
                    </a>
                    <a
                      href=""
                      className="td-edit-btn td-btn"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Replace"
                    >
                      <i className="la la-refresh" />
                    </a>
                    <a
                      href=""
                      className="td-edit-btn td-btn"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Clone"
                    >
                      <i className="la la-clone" />
                    </a>
                    <a
                      href=""
                      className="td-delete-btn td-btn"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Delete"
                    >
                      <i className="la la-trash" />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="card no-boxshadow">
          <div className="card-header main-card-header sub-card-header">
            <h5>Sub project</h5>
          </div>
          <div className="card-body">
            <table
              id="project_form_table"
              className="table-bordered table project_form dataTable"
            >
              <thead>
                <tr>
                  <th> S.N</th>
                  <th>Form Name</th>
                  <th>Create Date</th>
                  <th>Updated date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>name</td>
                  <td>
                    <i className="fa fa-clock-o" />
                    <span>2019-08-14</span>
                  </td>
                  <td>
                    <i className="fa fa-clock-o" />
                    <span>2019-08-14</span>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="td-view-btn td-btn"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Preview"
                    >
                      <i className="la la-eye" />
                    </a>
                    <a
                      href=""
                      className="td-edit-btn td-btn"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Edit"
                    >
                      <i className="la la-edit" />
                    </a>
                    <a
                      href=""
                      className="td-edit-btn td-btn"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Replace"
                    >
                      <i className="la la-refresh" />
                    </a>
                    <a
                      href=""
                      className="td-edit-btn td-btn"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Clone"
                    >
                      <i className="la la-clone" />
                    </a>
                    <a
                      href=""
                      className="td-delete-btn td-btn"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Delete"
                    >
                      <i className="la la-trash" />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}
