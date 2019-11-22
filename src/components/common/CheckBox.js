import React from 'react';
import { FormattedMessage } from 'react-intl';

const CheckBox = ({
  name,
  checked,
  className,
  changeHandler,
  label,
  translation,
  ...rest
}) => (
  <div className={`checkbox ${className}`}>
    {console.log(label, '3333')}
    <label>
      <input
        type="checkbox"
        {...rest}
        name={name}
        checked={checked}
        onChange={changeHandler}
      />
      <i className="helper" />{' '}
      {translation == true ? (
        <FormattedMessage id={label} defaultMessage={label} />
      ) : (
        label
      )}
    </label>
  </div>
);

export default CheckBox;
