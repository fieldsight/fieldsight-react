import React from "react";

const CheckBox = ({ label, ...rest }) => (
  <div className="form-group display-inline">
    <div className="custom-checkbox">
      <div className="checkbox ">
        <label>
          <input type="checkbox" {...rest} />
          <i className="helper" /> {label}
        </label>
      </div>
    </div>
  </div>
);

export default CheckBox;
