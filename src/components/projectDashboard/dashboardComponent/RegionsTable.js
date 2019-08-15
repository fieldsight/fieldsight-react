import React from "react";

class RegionsTable extends React.Component {
  render() {
    return (
      <div className="card region-table">
        <div className="card-header main-card-header sub-card-header">
          <h5>Regions</h5>
          <div className="add-btn">
            <a href="#" data-tab="scheduled-popup">
              Add new{" "}
              <span>
                <i className="la la-plus" />
              </span>
            </a>
          </div>
        </div>
        <div className="card-body">
          <table id="paging7_table" className="table table-bordered paging7_table">
              <thead>
                  <tr>
                      <th >S.N</th>
                      <th >ID</th>
                      <th >Region Name</th>
                      <th >Number of sites</th>
                      <th >Action</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>1</td>
                      <td>Bageswori</td>
                      <td><a href="#" className="pending">Bageswori</a></td>
                      <td>200</td>
                      <td>
                          <a href="#" className="td-view-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i className="la la-eye"> </i> </a>
                          <a href="#" className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="View"> <i className="la la-edit"> </i> </a>
                          <a href="#" className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i className="la la-trash-o"> </i> </a>
                      </td>
                  </tr>
                  <tr>
                      <td>2</td>
                      <td>balkumari</td>
                      <td><a href="#" className="pending">Balkumari</a></td>
                      <td>200</td>
                      <td>
                          <a href="#" className="td-view-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i className="la la-eye"> </i> </a>
                          <a href="#" className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="View"> <i className="la la-edit"> </i> </a>
                          <a href="#" className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i className="la la-trash-o"> </i> </a>
                      </td>
                  </tr>
                  <tr>
                      <td>3</td>
                      <td>barsunchet</td>
                      <td><a href="#" className="pending">Barsunchet</a></td>
                      <td>200</td>
                      <td>
                          <a href="#" className="td-view-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i className="la la-eye"> </i> </a>
                          <a href="#" className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="View"> <i className="la la-edit"> </i> </a>
                          <a href="#" className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i className="la la-trash-o"> </i> </a>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
      </div>
    );
  }
}
export default RegionsTable;
