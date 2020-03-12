import React, { PureComponent, Fragment } from 'react';
import CustomCheckBox from '../../common/CustomCheckbox';

export default class TeamList extends PureComponent {
  render() {
    const { teams, selected, changeHandler } = this.props;
    return (
      <div
        style={{
          position: 'relative',
          height: `200px`,
        }}
      >
        {teams.length > 0 &&
          teams.map(option => {
            const filterList = selected.filter(
              i => i.id === option.id,
            );

            const isChecked =
              filterList && filterList[0] ? true : false;

            return (
              <Fragment key={option.id}>
                <CustomCheckBox
                  id={option.id}
                  name={option.name}
                  checked={isChecked}
                  changeHandler={changeHandler}
                  label={option.name}
                />
              </Fragment>
            );
          })}
      </div>
    );
  }
}
