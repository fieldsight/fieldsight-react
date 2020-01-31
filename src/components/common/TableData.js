import React from 'react';
import { Link } from 'react-router-dom';
/* eslint-disable   react/prop-types */

const Td = ({ children, to }) => {
  return (
    <td>
      <Link to={to}>{children}</Link>
    </td>
  );
};

export default Td;
