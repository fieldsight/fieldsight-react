import React, { Component } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import CustomSelect from '../CustomSelect';
import CustomMultiSelect from '../CustomMultiSelect';

/* eslint-disable */

export default class FormInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredQuestions: [],
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.formQuestions !== this.props.formQuestions) {
      let filteredQuestions = [];
      if (this.props.formQuestions.length > 0) {
        filteredQuestions = this.findQuestion(
          this.props.formQuestions[0].json.children,
        );
      }
      this.setState({
        filteredQuestions,
      });
    }
  }

  findQuestion = (children, type) => {
    const filteredQuestions = [];

    const filterQuestionByType = questions => {
      if (type) {
        questions.forEach(question => {
          if (question.type === type) {
            filteredQuestions.push(question);
          }

          if (
            question.type === 'group' ||
            question.type === 'repeat'
          ) {
            filterQuestionByType(question.children);
          }
        });
      } else {
        questions.forEach(question => {
          if (
            question.type === 'group' ||
            question.type === 'repeat'
          ) {
            return filterQuestionByType(question.children);
          }
          return filteredQuestions.push(question);
        });
      }
    };

    filterQuestionByType(children);

    return filteredQuestions;
  };

  handleQuestionSelect = (e, item) => {
    // console.log('selected quest', e.target, item);
  };

  render() {
    const { filteredQuestions } = this.state;
    const {
      toggleSelectClass,
      handleFormTypeCheck,
      handleToggleClass,
      formTypes,
      selectedFormType,
      formTypeArr,
      selectedForm,
      selectedQuestions,
      individualFormArr,
      selectedIndividualForm,
      handleIndividualFormSelected,
      formValue,
      selectedValueArr,
    } = this.props;
    // console.log('jsonQuestions', selectedFormType);

    return (
      <div className="acc-item">
        <div className="acc-header">
          <h5>form information</h5>
        </div>
        <div className="acc-body">
          <div className="form-list">
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="mb-2">Forms type</label>
                  <CustomSelect
                    toggleSelectClass={toggleSelectClass}
                    handleToggleClass={() => {
                      handleToggleClass('formType');
                    }}
                    toggleType="formType"
                    name={formTypes.filter(
                      each => each.id === selectedFormType.id,
                    )}
                    options={formTypes}
                    value={selectedFormType.id}
                    handleSelect={handleFormTypeCheck}
                  />
                </div>
              </div>
              <div className="col-lg-6" />
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="mb-2">Forms</label>
                  <CustomSelect
                    toggleSelectClass={toggleSelectClass}
                    handleToggleClass={() => {
                      handleToggleClass('formSelect');
                    }}
                    toggleType="formSelect"
                    options={formTypeArr}
                    name={formTypeArr.filter(
                      each => each.id === selectedForm.id,
                    )}
                    value={selectedForm.id}
                    handleSelect={this.props.handleFormSelected}
                  />
                </div>
              </div>
              <div className="col-lg-6" />
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="mb-2">Submission count</label>
                  <CustomSelect
                    toggleSelectClass={toggleSelectClass}
                    handleToggleClass={() => {
                      handleToggleClass('submissionCount');
                    }}
                    toggleType="submissionCount"
                    options={individualFormArr}
                    name={formTypeArr.filter(
                      each => each.id === selectedIndividualForm.id,
                    )}
                    value={selectedIndividualForm.id}
                    handleSelect={handleIndividualFormSelected}
                  />
                </div>
              </div>

              {/* <div className="col-lg-6">
                <button
                  type="button"
                  className="common-button is-border"
                >
                  Add
                </button>
              </div> */}

              <div className="col-lg-6">
                <div className="form-group">
                  <label className="mb-2">Questions</label>
                  {/* <div
                      style={{
                        position: 'relative',
                        height: `300px `,
                      }}
                    >
                      <PerfectScrollbar> */}
                  <CustomMultiSelect
                    toggleSelectClass={toggleSelectClass}
                    handleToggleClass={() => {
                      handleToggleClass('formQuestSelect');
                    }}
                    toggleType="formQuestSelect"
                    checkboxOption={filteredQuestions}
                    handleCheck={this.props.handleChangeFormQuest}
                    selectedArr={selectedQuestions}
                    placeholderTxt="Form Answer"
                  />
                  {/* </PerfectScrollbar>
                    </div> */}
                </div>
                {/* <button
                  role="button"
                  className="common-button is-border"
                 
                >
                  Add
                </button> */}
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="mb-2">Values</label>
                  <div className="common-select">
                    <div
                      className={
                        toggleSelectClass['formValue']
                          ? 'select-wrapper select-toggle'
                          : 'select-wrapper'
                      }
                      onClick={() => {
                        handleToggleClass('formValue');
                      }}
                    >
                      <span className="select-item">Form Values</span>
                      <ul>
                        {formValue &&
                          formValue.length > 0 &&
                          formValue.map(option => {
                            // const filterList = selectedMetrics.filter(
                            //   i =>
                            //     i.value &&
                            //     i.value.code === option.code,
                            // );
                            // const isChecked =
                            //   filterList && filterList[0]
                            //     ? true
                            //     : false;
                            return (
                              <li key={`option_${option.code}`}>
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id={option.code}
                                    name={option.code}
                                    // checked={isChecked}
                                    onChange={e => {
                                      this.props.handleChangeFormQuest(
                                        e,
                                        {},
                                        option,
                                      );
                                    }}
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor={option.code}
                                    style={{ paddingLeft: '2em' }}
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                  {/* <CustomSelect
                   toggleSelectClass={toggleSelectClass}
                   handleToggleClass={() => {
                     handleToggleClass('formValue');
                   }}
                   toggleType="formValue"
                   options={selectedFormValue}
                  //  name={formValues.filter(
                  //    each => each.id === selectedForm,
                  //  )}
                  //  value={selectedForm}
                   handleSelect={this.props.handleFormSelected}/> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
