import React from "react";

const CheckBox = ({ label, ...rest }) => (
      <div className="checkbox ">
        <label>
          <input type="checkbox" {...rest} />
          <i className="helper" /> {label}
        </label>
      </div>
);

export default CheckBox;
