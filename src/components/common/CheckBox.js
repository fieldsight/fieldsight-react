import React from "react";

const CheckBox = ({ label, ...rest }) => (
  <div>
    <label>
      <input type="checkbox" {...rest} />
      <span>{label}</span>
    </label>
  </div>
);

export default CheckBox;
