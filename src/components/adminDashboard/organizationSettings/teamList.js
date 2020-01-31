import React, { PureComponent } from 'react';

export default class TeamList extends PureComponent {
  render() {
    const { teams, selected, changeHandler } = this.props;
    return (
      <>
        <div
          style={{
            position: 'relative',
            height: `200px`,
          }}
        >
          {teams.length > 0 &&
            teams.map((option, index) => {
              const filterList = selected.filter(
                i => i.id === option.id,
              );

              const isChecked =
                filterList && filterList[0] ? true : false;

              return (
                <div
                  className="custom-control custom-checkbox"
                  key={option.id}
                >
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id={option.id}
                    name={option.name}
                    checked={isChecked}
                    onChange={e => {
                      changeHandler(e, option);
                    }}
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
              );
            })}
        </div>
      </>
    );
  }
}
