import React, { Component } from 'react';
import FilterByData from '../common/FilterByData';

export default class GeneralList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGeneral: false,
      selectedGeneral: [],
    };
  }

  handleGeneralForm = (e, item) => {
    const {
      target: { checked, id },
    } = e;
    const { generalArr, handleSelected } = this.props;
    this.setState(
      state => {
        const { selectedGeneral } = state;
        if (checked) {
          if (id === 'all_general_forms') {
            return {
              selectedGeneral: generalArr,
            };
          }
          return {
            selectedGeneral: [...state.selectedGeneral, item],
          };
        }
        if (!checked) {
          if (id === 'all_general_forms') {
            return {
              selectedGeneral: [],
            };
          }
          const filterGeneral = selectedGeneral.filter(
            s => s.id !== item.id && s.id !== 'all_general_forms',
          );
          return {
            selectedGeneral: filterGeneral,
          };
        }
        return null;
      },
      () => {
        const { selectedGeneral } = this.state;
        handleSelected('selectedGeneral', selectedGeneral);
      },
    );
  };

  handleToggleGeneralClass = () => {
    this.setState(state => ({
      showGeneral: !state.showGeneral,
    }));
  };

  render() {
    const {
      state: { showGeneral, selectedGeneral },
      props: { generalArr },
    } = this;
    return (
      <div className="col-lg-3 col-md-6">
        <FilterByData
          className="form-group"
          label="General Forms"
          toggleSelectClass={showGeneral}
          handleToggleClass={this.handleToggleGeneralClass}
          data={generalArr}
          changeHandler={this.handleGeneralForm}
          selectedArr={selectedGeneral}
          placeholderTxt="Select General Forms"
        />
      </div>
    );
  }
}
