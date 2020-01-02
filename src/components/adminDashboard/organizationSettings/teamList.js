import React, { PureComponent } from 'react';

export default class TeamList extends PureComponent {
  render() {
    const { teams, selected, changeHandler } = this.props;
    return (
      <ul>
        {teams.length > 0 &&
          teams.map(option => (
            <li key={`option_${option.id}`}>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id={option.id}
                  name={option.name}
                  checked={selected[option.id]}
                  onChange={changeHandler}
                  value={option.id}
                />
                <label
                  className="custom-control-label"
                  htmlFor={option.id}
                  style={{ paddingLeft: '2em' }}
                >
                  {option.name}
                </label>
              </div>
            </li>
          ))}
      </ul>
    );
  }
}
