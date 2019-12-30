import React, { Component } from 'react';
import CustomSelect from '../CustomSelect';
import CustomMultiSelect from '../CustomMultiSelect';
/* eslint-disable */

export default class FormInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonQuestions: [],
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.formQuestions !== this.props.formQuestions) {
      const questions = this.props.formQuestions.map(
        formQuestions => {
          if (formQuestions.json) {
            formQuestions.json.children = this.groupQuestion(
              formQuestions.json.children,
            );
          }

          return formQuestions;
        },
      );
      this.setState({
        jsonQuestions: [
          // {
          //   id: 0,
          //   name: '--Select Form--',
          //   json: { children: [] },
          // },
          ...questions,
        ],
      });
    }
  }

  groupQuestion = formQuestionsChildren => {
    const groupQuestionName = question => {
      if (question.type === 'group' || question.type === 'repeat') {
        question.children = question.children.map(childQuestion => {
          childQuestion.name = `${question.name}/${childQuestion.name}`;
          if (
            childQuestion.type === 'group' ||
            childQuestion.type === 'repeat'
          ) {
            groupQuestionName(childQuestion);
          }
          return childQuestion;
        });
      }

      return question;
    };
    return formQuestionsChildren.map(question => {
      return groupQuestionName(question);
    });
  };

  render() {
    const { jsonQuestions } = this.state;
    const {
      toggleSelectClass,
      handleFormTypeCheck,
      handleToggleClass,
      formTypes,
      selectedFormType,
      formTypeArr,
      selectedForm,
      formQuestions,
      individualFormArr,
      selectedIndividualForm,
      handleIndividualFormSelected,
    } = this.props;
    // console.log('jsonQuestions', this.state.jsonQuestions);

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
                  {/* <CustomSelect label="select forms type" /> */}
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
                <div className="form-group">
                  <label className="mb-2">Values</label>
                  <CustomSelect
                   toggleSelectClass={toggleSelectClass}
                   handleToggleClass={() => {
                     handleToggleClass('formValue');
                   }}
                   toggleType="formValue"
                   options={formValues}
                   name={formValues.filter(
                     each => each.id === selectedForm,
                   )}
                   value={selectedForm}
                   handleSelect={this.props.handleFormSelected}/>
                </div>
              </div> */}
              <div className="col-lg-6">
                <button
                  type="button"
                  className="common-button is-border"
                >
                  Add
                </button>
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
                    checkboxOption={jsonQuestions}
                    handleCheck={() => {}}
                    selectedArr={[]}
                    placeholderTxt="Form Answer"
                  />
                </div>
                <button
                  role="button"
                  className="common-button is-border"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
