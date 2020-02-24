import React, { Component } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import expandIcon from '../../../static/images/expand.png';
import collapseIcon from '../../../static/images/collapse.png';
/* eslint-disable camelcase */

export default class ModifiedDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showStaged: false,
      expandtab: 'staged',
    };
  }

  handleToggleStagedClass = () => {
    this.setState(state => ({
      showStaged: !state.showStaged,
    }));
  };

  handleExpandCollapse = output => {
    if (this.state.expandtab === output) {
      this.setState({ expandtab: '' });
    } else {
      this.setState({ expandtab: output });
    }
  };

  //   handleStageCheck = (e, stage) => {
  //     const {
  //       target: { checked, id },
  //     } = e;
  //     const { stagedArr, handleSelected } = this.props;
  //     this.setState(
  //       state => {
  //         const { selectedData } = state;
  //         if (checked) {
  //           if (id === 'Select All') {
  //             return {
  //               selectedData: stagedArr,
  //             };
  //           }
  //           return {
  //             selectedData: [...state.selectedData, stage],
  //           };
  //         }
  //         if (!checked) {
  //           if (id === 'Select All') {
  //             return {
  //               selectedData: [],
  //             };
  //           }
  //           const filterData = selectedData.filter(
  //             s => s.name !== stage.name && s.name !== 'Select All',
  //           );
  //           return {
  //             selectedData: filterData,
  //           };
  //         }
  //         return null;
  //       },
  //       () => {
  //         const { selectedData } = this.state;
  //         handleSelected('selectedStaged', selectedData);
  //       },
  //     );
  //   };

  //   handleSubStageCheck = (e, subData, stageData) => {
  //     const {
  //       target: { checked, id },
  //     } = e;
  //     const { stagedArr, handleSelected } = this.props;
  //     this.setState(
  //       state => {
  //         const { selectedData } = state;
  //         const inputArr = selectedData.filter(
  //           s => s.name === stageData.name,
  //         );
  //         const filteredArr = selectedData.filter(
  //           s => s.name !== stageData.name,
  //         );
  //         if (checked) {
  //           // debugger;

  //           if (inputArr[0]) {
  //             inputArr[0].forms.push(subData);
  //           }
  //           if (inputArr.length === 0) {
  //             const { name } = stageData;
  //             inputArr.push({ name, forms: [{ ...subData }] });
  //           }

  //           return {
  //             selectedData: [...filteredArr, ...inputArr],
  //           };
  //         }
  //         if (!checked) {
  //           const { name, forms } = inputArr[0];
  //           const filteredSub = forms.filter(s => s.id !== subData.id);
  //           const checkData =
  //             filteredSub.length > 0
  //               ? [
  //                   ...filteredArr,
  //                   {
  //                     name,
  //                     forms: filteredSub,
  //                   },
  //                 ]
  //               : [...filteredArr];
  //           return {
  //             selectedData: checkData,
  //           };
  //         }
  //         return null;
  //       },
  //       () => {
  //         // console.log('sub ko', this.state.selectedData);
  //         const { selectedData } = this.state;
  //         handleSelected('selectedStaged', selectedData);
  //       },
  //     );
  //   };

  render() {
    const {
      state: { showStaged, selectedData, expandtab },
      props: { stagedArr, selectedForm },
    } = this;

    return (
      <div className="col-lg-6 col-md-6">
        <div className="form-group">
          {/* <label className="mb-2">Staged Forms</label> */}
          <div className="common-select">
            <div
              className={
                showStaged
                  ? 'select-wrapper select-toggle'
                  : 'select-wrapper'
              }
              // onFocus={this.handleToggleStagedClass}
              role="button"
              tabIndex="0"
              // onBlur={this.handleToggleStagedClass}
            >
              <span
                role="tab"
                tabIndex="0"
                onClick={this.handleToggleStagedClass}
                onKeyUp={this.handleToggleStagedClass}
                className="select-item"
              >
                {selectedForm}
              </span>

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
                        const key =
                          option.name && option.forms
                            ? option.name + option.forms.length
                            : '';
                        return (
                          <li key={`option_${key}`}>
                            <a
                              tabIndex="0"
                              role="button"
                              // onKeyDown={() => {
                              //   this.handleExpandCollapse(
                              //     option.name,
                              //   );
                              // }}
                              // onClick={() => {
                              //   this.handleExpandCollapse(
                              //     option.name,
                              //   );
                              // }}
                            >
                              <div
                                className="custom-control custom-checkbox"
                                onKeyDown={() => {
                                  this.handleExpandCollapse(
                                    option.name,
                                  );
                                }}
                                onClick={() => {
                                  this.handleExpandCollapse(
                                    option.name,
                                  );
                                }}
                                role="button"
                                tabIndex="0"
                                // onKeyDown={() => {
                                //   this.props.handleSelectedForm(
                                //     'dadadad',
                                //   );
                                // }}
                                // onClick={() => {
                                //   this.props.handleSelectedForm(
                                //     'dadadad',
                                //   );
                                // }}
                              >
                                {/* <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id={id}
                                  name={name}
                                  checked={isChecked}
                                  onChange={e => {
                                    this.handleStageCheck(e, option);
                                  }}
                                /> */}
                                <label
                                  //   className="custom-control-label"
                                  className="important"
                                  htmlFor={`option_${key}`}
                                  style={{ paddingLeft: '2em' }}
                                >
                                  {option.name}
                                </label>
                                <img
                                  className="expandcollapseimg"
                                  src={
                                    expandtab === option.name
                                      ? collapseIcon
                                      : expandIcon
                                  }
                                  alt="expand"
                                />
                              </div>
                            </a>
                            <ul
                              className="nested form"
                              style={{
                                display: `${
                                  expandtab === option.name
                                    ? 'block'
                                    : 'none'
                                }`,
                              }}
                            >
                              {option.forms &&
                                option.forms.length > 0 &&
                                option.forms.map(sub => {
                                  return (
                                    <li key={sub.id}>
                                      {/* <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id={sub.id}
                                          name={sub.title}
                                          checked={isSubChecked}
                                          onChange={e => {
                                            this.handleSubStageCheck(
                                              e,
                                              sub,
                                              option,
                                            );
                                          }}
                                        /> */}
                                      {option.forms &&
                                      option.forms[0].sub_stages &&
                                      option.forms[0].sub_stages
                                        .length > 0 ? (
                                        // eslint-disable-next-line react/jsx-indent
                                        <div
                                          tabIndex="0"
                                          role="button"
                                          // onKeyDown={() => {
                                          //   this.props.handleSelectedForm(
                                          //     sub.title,
                                          //   );
                                          // }}
                                          // onClick={() => {
                                          //   this.props.handleSelectedForm(
                                          //     sub.title,
                                          //   );
                                          // }}
                                          className="custom-control custom-checkbox"
                                        >
                                          <label
                                            // className="custom-control-label"
                                            className="important"
                                            htmlFor={sub.id}
                                            style={{
                                              paddingLeft: '2em',
                                            }}
                                          >
                                            {sub.name}
                                          </label>
                                        </div>
                                      ) : (
                                        <div
                                          tabIndex="0"
                                          role="button"
                                          onKeyDown={() => {
                                            this.props.handleSelectedForm(
                                              sub.title,
                                              sub.id,
                                            );
                                            this.handleToggleStagedClass();
                                          }}
                                          onClick={() => {
                                            this.props.handleSelectedForm(
                                              sub.title,
                                              sub.id,
                                            );
                                            this.handleToggleStagedClass();
                                          }}
                                          className="custom-control custom-checkbox"
                                        >
                                          <label
                                            // className="custom-control-label"

                                            className="important"
                                            htmlFor={sub.id}
                                            style={{
                                              paddingLeft: '2em',
                                            }}
                                          >
                                            {sub.title}
                                          </label>
                                        </div>
                                      )}

                                      {option.forms[0] &&
                                        option.forms[0].sub_stages &&
                                        option.forms[0].sub_stages
                                          .length > 0 && (
                                          <ul className="nested form">
                                            {/* {option.forms[0] &&
                                          option.forms[0]
                                            .sub_stages &&
                                          option.forms[0]
                                            .sub_stages.length >
                                            0 &&
                                          console.log(
                                            option.forms[0]
                                              .sub_stages,
                                            'nexte',
                                          )} */}
                                            {option.forms[0] &&
                                              option.forms[0]
                                                .sub_stages &&
                                              option.forms[0]
                                                .sub_stages.length >
                                                0 &&
                                              option.forms[0].sub_stages.map(
                                                subs => {
                                                  return (
                                                    <li key={subs.id}>
                                                      <div className="important custom-control custom-checkbox">
                                                        <label
                                                          onKeyDown={() => {
                                                            this.props.handleSelectedForm(
                                                              subs.title,
                                                              sub.id,
                                                            );
                                                            this.handleToggleStagedClass();
                                                          }}
                                                          onClick={() => {
                                                            this.props.handleSelectedForm(
                                                              subs.title,
                                                              sub.id,
                                                            );
                                                            this.handleToggleStagedClass();
                                                          }}
                                                          htmlFor={
                                                            subs.id
                                                          }
                                                          style={{
                                                            paddingLeft:
                                                              '2em',
                                                          }}
                                                        >
                                                          {subs.title}
                                                        </label>
                                                      </div>
                                                    </li>
                                                  );
                                                },
                                              )}
                                          </ul>
                                        )}
                                    </li>
                                  );
                                })}
                            </ul>
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
