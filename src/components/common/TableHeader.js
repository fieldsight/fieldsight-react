import React from 'react';
import { FormattedMessage } from 'react-intl';

/* eslint-disable react/no-array-index-key */

const TableHeader = ({ tableHeader }) => {
  return (
    <thead>
      <tr>
        {tableHeader.map((header, i) => (
          <th key={i} style={{ width: '20%' }}>
            {header === ('app.type' || 'app.action' || 'app.id') ? (
              <FormattedMessage id={header} defaultMessage={header} />
            ) : (
              { header }
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
