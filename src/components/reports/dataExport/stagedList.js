import React, { Component } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
/* eslint-disable camelcase */

export default class StagedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showStaged: false,
      selectedData: [],
    };
  }

  handleToggleStagedClass = () => {
    this.setState(state => ({
      showStaged: !state.showStaged,
    }));
  };

  handleStageCheck = (e, stage) => {
    const {
      target: { checked, id },
    } = e;
    const { stagedArr, handleSelected } = this.props;
    this.setState(
      state => {
        const { selectedData } = state;
        if (checked) {
          if (id === 'Select All') {
            return {
              selectedData: stagedArr,
            };
          }
          return {
            selectedData: [...state.selectedData, stage],
          };
        }
        if (!checked) {
          if (id === 'Select All') {
            return {
              selectedData: [],
            };
          }
          const filterData = selectedData.filter(
            s => s.name !== stage.name && s.name !== 'Select All',
          );
          return {
            selectedData: filterData,
          };
        }
        return null;
      },
      () => {
        const { selectedData } = this.state;
        handleSelected('selectedStaged', selectedData);
      },
    );
  };

  handleSubStageCheck = (e, subData, stageData) => {
    const {
      target: { checked, id },
    } = e;
    const { stagedArr, handleSelected } = this.props;
    this.setState(
      state => {
        const { selectedData } = state;
        const inputArr = selectedData.filter(
          s => s.name === stageData.name,
        );
        const filteredArr = selectedData.filter(
          s => s.name !== stageData.name,
        );
        if (checked) {
          // debugger;

          if (inputArr[0]) {
            inputArr[0].sub_stages.push(subData);
          }
          if (inputArr.length === 0) {
            const { name } = stageData;
            inputArr.push({ name, sub_stages: [{ ...subData }] });
          }

          return {
            selectedData: [...filteredArr, ...inputArr],
          };
        }
        if (!checked) {
          const { name, sub_stages } = inputArr[0];
          const filteredSub = sub_stages.filter(
            s => s.id !== subData.id,
          );
          const checkData =
            filteredSub.length > 0
              ? [
                ...filteredArr,
                {
                  name,
                  sub_stages: filteredSub,
                },
              ]
              : [...filteredArr];
          return {
            selectedData: checkData,
          };
        }
        return null;
      },
      () => {
        // console.log('sub ko', this.state.selectedData);
        const { selectedData } = this.state;
        handleSelected('selectedStaged', selectedData);
      },
    );
  };

  render() {
    const {
      state: { showStaged, selectedData },
      props: { stagedArr },
    } = this;

    return (
      <div className="col-lg-3 col-md-6">
        <div className="form-group">
          <label className="mb-2">Staged Forms</label>
          <div className="common-select">
            <div
              className={
                showStaged
                  ? 'select-wrapper select-toggle'
                  : 'select-wrapper'
              }
              onFocus={this.handleToggleStagedClass}
              role="button"
              tabIndex="0"
              onBlur={this.handleToggleStagedClass}
            >
              <span className="select-item">Select Staged Forms</span>

              <ul>
                <div
                  style={{
                    position: 'relative',
                    height: `200px`,
                  }}
                >
                  <PerfectScrollbar>
                    {stagedArr.length > 0 &&
                      stagedArr.map(option => {
                        const filterList = selectedData.filter(i =>
                          i.name ? i.name === option.name : '',
                        );
                        const isChecked =
                          filterList && filterList[0] ? true : false;
                        const id = option.name ? option.name : '';
                        const name = option.name ? option.name : '';
                        const key =
                          option.name && option.sub_stages
                            ? option.name + option.sub_stages.length
                            : '';
                        return (
                          <li key={`option_${key}`}>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id={id}
                                name={name}
                                checked={isChecked}
                                onChange={e => {
                                  this.handleStageCheck(e, option);
                                }}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor={id}
                                style={{ paddingLeft: '2em' }}
                              >
                                {option.name}
                              </label>
                            </div>
                            {option.sub_stages &&
                              option.sub_stages.length > 0 &&
                              option.sub_stages.map(sub => {
                                const isSubChecked =
                                  filterList &&
                                    filterList[0] &&
                                    filterList[0].sub_stages &&
                                    filterList[0].sub_stages.find(
                                      s => s.id === sub.id,
                                    )
                                    ? true
                                    : false;

                                return (
                                  <div
                                    className="custom-control custom-checkbox"
                                    key={sub.id}
                                  >
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id={sub.id}
                                      name={sub.form_name}
                                      checked={isSubChecked}
                                      onChange={e => {
                                        this.handleSubStageCheck(
                                          e,
                                          sub,
                                          option,
                                        );
                                      }}
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor={sub.id}
                                      style={{ paddingLeft: '2em' }}
                                    >
                                      {sub.form_name}
                                    </label>
                                  </div>
                                );
                              })}
                          </li>
                        );
                      })}
                  </PerfectScrollbar>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
