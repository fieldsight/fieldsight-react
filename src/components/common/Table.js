import React from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

const Table = ({
  tableHeader,
  tableRow,
  forms,
  page,
  removeHandler,
  editHandler,
}) => {
  return (
    <div
      className="table-responsive"
      style={{
        position: 'relative',
        ...(tableRow.length > 10 && { height: '290px' }),
      }}
    >
      <PerfectScrollbar>
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
      </PerfectScrollbar>
    </div>
  );
};

export default Table;
