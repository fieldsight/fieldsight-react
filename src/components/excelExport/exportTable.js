import React from 'react';
import Table from 'react-bootstrap/Table';
import format from 'date-fns/format';

const ExportTable = ({ exportHistory, handleDelete }) => (
  <Table responsive="xl" className="table  table-bordered  dataTable">
    <thead>
      <tr>
        <th>#</th>
        <th>FileName</th>
        <th>Date Created</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {exportHistory.length === 0 && (
        <tr>
          <td colSpan={4}>No Data Available</td>
        </tr>
      )}
      {exportHistory.length > 0 &&
        exportHistory.map((history, index) => (
          <tr key={`excel_${history.id}`}>
            <td>{index + 1}</td>
            <td>
              {history.internal_status === 1 && (
                <a href={history.file_url}>{history.filename}</a>
              )}
              {history.internal_status !== 1 && (
                <span>{history.status_title}</span>
              )}
            </td>
            <td>
              {format(history.created_on, 'MMM D YYYY, h:mm a')}
            </td>
            <td>
              <a
                role="button"
                tabIndex="0"
                onClick={() => {
                  handleDelete(history.id);
                }}
                onKeyDown={() => {
                  handleDelete(history.id);
                }}
              >
                <i className="material-icons">delete</i>
              </a>
            </td>
          </tr>
        ))}
    </tbody>
  </Table>
);

export default ExportTable;
