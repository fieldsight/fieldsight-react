import React from "react";
import { Link } from "react-router-dom";
const Td = ({ children, to }) => {
  return (
    <td>
      <Link to={to}>{children}</Link>
    </td>
  );
};

export default Td;
