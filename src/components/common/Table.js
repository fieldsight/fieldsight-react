import React, { Component } from "react";
import { Table as BootstrapTable } from "react-bootstrap";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

export default class Table extends Component {
  render() {
    const {
      tableHeader,
      tableRow,
      forms,
      page,
      removeHandler,
      editHandler
    } = this.props;
    return (
      <div className="table-responsive">
        <BootstrapTable
          responsive="xl"
          className="table table-bordered dataTable"
        >
          <TableHeader tableHeader={tableHeader} />

          <TableRow
            tableRow={tableRow}
            page={page}
            forms={forms}
            removeHandler={removeHandler}
            editHandler={editHandler}
          />
        </BootstrapTable>
      </div>
    );
  }
}
