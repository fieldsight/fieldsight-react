import React, { Component } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

export default class Table extends Component {
  render() {
    const {
      tableHeader,
      questions,
      page,
      removeHandler,
      editHandler
    } = this.props;
    return (
      <table className="table  table-bordered  general_table">
        <TableHeader tableHeader={tableHeader} />

        <TableRow
          tableRow={questions}
          page={page}
          removeHandler={removeHandler}
          editHandler={editHandler}
        />
      </table>
    );
  }
}
