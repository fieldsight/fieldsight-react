import React from "react";

const TableHeader = ({ tableHeader }) => {
  return (
    <thead>
      <tr>
        {tableHeader.map((header, i) => (
          <th key={i} style={{ width: "20%" }}>
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
