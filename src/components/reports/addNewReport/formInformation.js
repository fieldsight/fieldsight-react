import React, { Component } from 'react';
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
      selectedFormValue,
      handleChangeFormQuest,
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
              <div className="col-lg-6">

              </div>
              <div className="col-lg-12">
                <div className="form-group inline-form-group">
                  <div className="custom-control custom-radio">
                    <input type="radio" className="custom-control-input" id="yes" name="yes" value="" />
                    <label className="custom-control-label" for="yes">Yes</label>
                  </div>

                  <div className="custom-control custom-radio">
                    <input type="radio" className="custom-control-input" id="no" name="yes" value="" />
                    <label className="custom-control-label" for="no">Illiterate</label>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <label className="mb-2">Questions</label>

                  <CustomMultiSelect
                    toggleSelectClass={toggleSelectClass}
                    handleToggleClass={() => {
                      handleToggleClass('formQuestSelect');
                    }}
                    toggleType="formQuestSelect"
                    checkboxOption={filteredQuestions}
                    handleCheck={handleChangeFormQuest}
                    selectedArr={selectedQuestions}
                    placeholderTxt="Form Answer"
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <label className="mb-2">Values</label>
                  <div className="common-select">
                    <div
                      className={
                        toggleSelectClass.formValue
                          ? 'select-wrapper select-toggle'
                          : 'select-wrapper'
                      }
                      role="button"
                      tabIndex="0"
                      onClick={() => {
                        handleToggleClass('formValue');
                      }}
                      onKeyDown={() => {
                        handleToggleClass('formValue');
                      }}
                    >
                      <span className="select-item">Form Values</span>
                      <ul>
                        {formValue &&
                          formValue.length > 0 &&
                          formValue.map(option => {
                            const filterList = selectedFormValue.filter(
                              i => i.code === option.code,
                            );
                            const isChecked =
                              filterList && filterList[0]
                                ? true
                                : false;
                            return (
                              <li key={`option_${option.code}`}>
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id={option.code}
                                    name={option.code}
                                    checked={isChecked}
                                    onChange={e => {
                                      handleChangeFormQuest(
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
                </div>
              </div>
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
                    name={individualFormArr.filter(
                      each =>
                        each.code === selectedIndividualForm.code,
                    )}
                    value={selectedIndividualForm.code}
                    handleSelect={handleIndividualFormSelected}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
