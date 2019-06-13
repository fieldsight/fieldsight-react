import React from "react";

const TableHeader = ({ tableHeader }) => {
  return (
    <thead>
      <tr>
        {tableHeader.map((header, i) => (
          <th key={i}>{header}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
