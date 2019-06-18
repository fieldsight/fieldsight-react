import React, { Component } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

export default class Table extends Component {
  render() {
    const {
      tableHeader,
      questions,
      forms,
      page,
      removeHandler,
      editHandler
    } = this.props;
    return (
      <div className="table-responsive">
        <table className="table  table-bordered  data-table general_table">
          <TableHeader tableHeader={tableHeader} />

          <TableRow
            tableRow={questions}
            page={page}
            forms={forms}
            removeHandler={removeHandler}
            editHandler={editHandler}
          />
        </table>
      </div>
    );
  }
}
