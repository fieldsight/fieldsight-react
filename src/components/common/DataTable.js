import React, { Component } from "react";
import { Table as BootstrapTable } from "react-bootstrap";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
export default class DataTable extends Component {
  render() {
    const {
      page,
      tableHeader,
      tableRow,
      editHandler,
      removeHandler
    } = this.props;
    return (
      <div className="card-body ">
        <div className="dataTables_wrapper">
          <div className="Datatable-top">
            <div className="dataTables_length" id="manage_table_length">
              <label>
                Show{" "}
                <select
                  name="manage_table_length"
                  aria-controls="manage_table"
                  className=""
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                entries
              </label>
            </div>
            <div id="manage_table_filter" className="dataTables_filter">
              <label>
                Search:
                <input
                  type="search"
                  className=""
                  placeholder=""
                  aria-controls="manage_table"
                />
              </label>
            </div>
          </div>

          <BootstrapTable
            responsive="xl"
            className="table  table-bordered  dataTable "
          >
            {/* <TableHeader tableHeader={tableHeader} />
            <TableRow
              page={page}
              tableRow={tableRow}
              removeHandler={removeHandler}
              editHandler={editHandler}
            /> */}
          </BootstrapTable>
          <div className="table-footer">
            <div className="showing-rows">
              <p>
                Showing <span>1</span> to <span>6</span>of <span>8</span>{" "}
                entries.
              </p>
            </div>
            <div className="table-pagination">
              <ul>
                <li className="page-item">
                  <a href="#">
                    <i className="la la-long-arrow-left" />
                  </a>
                </li>
                <li className="page-item current">
                  <a href="#">2</a>
                </li>
                <li className="page-item ">
                  <a href="#">3</a>
                </li>
                <li className="page-item ">
                  <a href="#">4</a>
                </li>
                <li className="page-item ">
                  <a href="#">
                    <i className="la la-long-arrow-right" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
