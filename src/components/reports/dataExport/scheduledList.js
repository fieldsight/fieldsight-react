import React, { Component } from 'react';
import FilterByData from '../common/filterByData';

export default class ScheduledList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScheduled: false,
      selectedScheduled: [],
    };
  }

  handleScheduledForm = (e, item) => {
    const {
      target: { checked, id },
    } = e;
    const { scheduledArr, handleSelected } = this.props;
    this.setState(
      state => {
        const { selectedScheduled } = state;
        if (checked) {
          if (id === 'all_scheduled_forms') {
            return {
              selectedScheduled: scheduledArr,
            };
          }
          return {
            selectedScheduled: [...state.selectedScheduled, item],
          };
        }
        if (!checked) {
          if (id === 'all_scheduled_forms') {
            return {
              selectedScheduled: [],
            };
          }
          const filterScheduled = selectedScheduled.filter(
            s => s.id !== item.id && s.id !== 'all_scheduled_forms',
          );
          return {
            selectedScheduled: filterScheduled,
          };
        }
        return null;
      },
      () => {
        const { selectedScheduled } = this.state;
        handleSelected('selectedScheduled', selectedScheduled);
      },
    );
  };

  handleToggleScheduledClass = () => {
    this.setState(state => ({
      showScheduled: !state.showScheduled,
    }));
  };

  render() {
    const {
      state: { showScheduled, selectedScheduled },
      props: { scheduledArr },
    } = this;
    return (
      <div className="col-lg-3 col-md-6">
        <FilterByData
          className="form-group"
          label="Scheduled Forms"
          toggleSelectClass={showScheduled}
          handleToggleClass={this.handleToggleScheduledClass}
          data={scheduledArr}
          changeHandler={this.handleScheduledForm}
          selectedArr={selectedScheduled}
          placeholderTxt="Select Scheduled Forms"
        />
      </div>
    );
  }
}
