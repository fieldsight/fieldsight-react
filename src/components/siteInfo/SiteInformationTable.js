import React, { Component } from "react";
import uuid from "uuid/v4";
import Table from "../common/Table";
import FormModal from "../common/FormModal";
import InputElement from "../common/InputElement";
import SelectElement from "../common/SelectElement";
import findQuestion from "../../utils/findQuestion";

const INITIAL_STATE = {
  label: "",
  type: "Text",
  placeholder: "",
  helpText: "",
  showOptions: false,
  editMode: false,
  options: {},
  optInputField: [],
  selectedId: null,
  selectedForm: {},
  selectedQuestion: {},
  filteredQuestions: [],
  selectedProject: {},
  tableQuestions: []
};

const typeOptions = {
  TEXT: "Text",
  NUMBER: "Number",
  DATE: "Date",
  SELECT_ONE: "Select One",
  DRAW_FROM_ANOTHER_PROJECT: "Draw From Another Project",
  DRAW_ANSWER_FROM_A_FORM: "Draw Answer From A Form",
  FORM_SUBMISSION: "Form Submission",
  FORM_SUBMISSIONS_COUNT: "Form Submissions Count",
  FORM_QUESTION_ANSWER_STATUS: "Form Question Answer Status"
};

const tableHeader = {
  siteInformationTable: [
    "Attribute",
    "Type",
    "Form",
    "Question",
    "Project",
    "Action"
  ]
};

class SiteInformationTable extends Component {
  state = INITIAL_STATE;

  closeModal = () => {
    this.setState({
      ...INITIAL_STATE,
      tableQuestions: [...this.state.tableQuestions]
    });
    this.props.toggleModal("Info");
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const {
      state: {
        label,
        type,
        placeholder,
        helpText,
        options,
        optInputField,
        editMode,
        selectedForm,
        selectedQuestion,
        selectedProject,
        selectedId,
        tableQuestions
      },
      props: { toggleModal, siteInfoHandler }
    } = this;

    const {
      TEXT,
      NUMBER,
      DATE,
      SELECT_ONE,
      DRAW_FROM_ANOTHER_PROJECT,
      DRAW_ANSWER_FROM_A_FORM,
      FORM_SUBMISSION,
      FORM_SUBMISSIONS_COUNT,
      FORM_QUESTION_ANSWER_STATUS
    } = typeOptions;

    const question = {
      ...(!editMode && { id: uuid() }),
      label,
      type,
      ...(type === SELECT_ONE && { options }),
      ...(type === SELECT_ONE && { optInputField }),
      ...((type === DRAW_ANSWER_FROM_A_FORM ||
        type === FORM_QUESTION_ANSWER_STATUS ||
        type === FORM_SUBMISSION ||
        type === FORM_SUBMISSIONS_COUNT) && { selectedForm }),
      ...((type === DRAW_ANSWER_FROM_A_FORM ||
        type === FORM_QUESTION_ANSWER_STATUS) && { selectedQuestion }),
      ...(type === DRAW_FROM_ANOTHER_PROJECT && { selectedProject }),
      ...((type === TEXT || type === NUMBER || type === DATE) && {
        placeholder
      }),
      ...((type === TEXT ||
        type === NUMBER ||
        type === DATE ||
        type === SELECT_ONE ||
        type === DRAW_FROM_ANOTHER_PROJECT) && { helpText })
    };

    if (editMode) {
      let filteredTableQuestions = tableQuestions.filter(
        question => question.id !== selectedId
      );

      this.setState({
        ...INITIAL_STATE,
        tableQuestions: [
          ...filteredTableQuestions,
          { ...question, id: selectedId }
        ]
      });
    } else {
      this.setState({
        ...INITIAL_STATE,
        tableQuestions: [...tableQuestions, question]
      });
    }

    toggleModal("Info");
    siteInfoHandler;
  };

  generateOptField = () => {
    const maxVal = Math.max(
      ...this.state.optInputField.map(field => field.val),
      0
    );

    const optInputField = [
      ...this.state.optInputField,
      { tag: InputElement, val: maxVal + 1 }
    ];

    this.setState({
      optInputField
    });
  };

  onSelectChangeHandler = e => {
    const { value } = e.target;
    const { SELECT_ONE } = typeOptions;
    if (value === SELECT_ONE) {
      return this.setState({
        type: SELECT_ONE,
        showOptions: true
      });
    }
    this.setState({
      type: value,
      showOptions: false
    });
  };

  onInputChangeHandler = (e, option) => {
    const { name, value } = e.target;
    if (option) {
      return this.setState({
        options: {
          ...this.state.options,
          [name]: value
        }
      });
    }
    this.setState({
      [name]: value
    });
  };

  removeInputHandler = val => {
    const filteredOptInputField = this.state.optInputField.filter(
      (field, i) => field.val !== val
    );
    const filteredOptions = { ...this.state.options };
    delete filteredOptions[`option${val}`];
    this.setState({
      optInputField: filteredOptInputField,
      options: filteredOptions
    });
  };

  formChangeHandler = e => {
    const { value } = e.target;
    const { type } = this.state;
    const { DRAW_FROM_ANOTHER_PROJECT } = typeOptions;
    if (type === DRAW_FROM_ANOTHER_PROJECT) {
      const selectedProject = this.props.projects.find(
        project => project.name === value
      );
      this.setState({
        selectedProject
      });
    } else {
      const selectedForm = this.props.forms.find(form => form.name === value);
      const filteredQuestions = findQuestion(selectedForm.json.children);
      this.setState({
        selectedForm,
        filteredQuestions
      });
    }
  };

  questionChangeHandler = e => {
    const { value } = e.target;
    const selectedQuestion = this.state.filteredQuestions.find(
      question => question.name === value
    );
    this.setState({ selectedQuestion });
  };

  editQuestionHandler = id => {
    const selectedTableQuestion = this.state.tableQuestions.find(
      question => question.id === id
    );
    const {
      TEXT,
      NUMBER,
      DATE,
      SELECT_ONE,
      DRAW_FROM_ANOTHER_PROJECT,
      DRAW_ANSWER_FROM_A_FORM,
      FORM_SUBMISSION,
      FORM_SUBMISSIONS_COUNT,
      FORM_QUESTION_ANSWER_STATUS
    } = typeOptions;

    const question = {
      label: selectedTableQuestion.label,
      type: selectedTableQuestion.type,
      ...(selectedTableQuestion.type === SELECT_ONE && {
        options: selectedTableQuestion.options
      }),
      ...(selectedTableQuestion.type === SELECT_ONE && {
        optInputField: selectedTableQuestion.optInputField
      }),
      ...((selectedTableQuestion.type === DRAW_ANSWER_FROM_A_FORM ||
        selectedTableQuestion.type === FORM_QUESTION_ANSWER_STATUS ||
        selectedTableQuestion.type === FORM_SUBMISSION ||
        selectedTableQuestion.type === FORM_SUBMISSIONS_COUNT) && {
        selectedForm: selectedTableQuestion.selectedForm
      }),
      ...((selectedTableQuestion.type === DRAW_ANSWER_FROM_A_FORM ||
        selectedTableQuestion.type === FORM_QUESTION_ANSWER_STATUS) && {
        selectedQuestion: selectedTableQuestion.selectedQuestion
      }),
      ...(selectedTableQuestion.type === DRAW_FROM_ANOTHER_PROJECT && {
        selectedProject: selectedTableQuestion.selectedProject
      }),
      ...((selectedTableQuestion.type === TEXT ||
        selectedTableQuestion.type === NUMBER ||
        selectedTableQuestion.type === DATE) && {
        placeholder: selectedTableQuestion.placeholder
      }),
      ...((selectedTableQuestion.type === TEXT ||
        selectedTableQuestion.type === NUMBER ||
        selectedTableQuestion.type === DATE ||
        selectedTableQuestion.type === SELECT_ONE ||
        selectedTableQuestion.type === DRAW_FROM_ANOTHER_PROJECT) && {
        helpText: selectedTableQuestion.helpText
      })
    };

    const filteredQuestions = selectedTableQuestion.selectedForm
      ? findQuestion(selectedTableQuestion.selectedForm.json.children)
      : this.state.filteredQuestions;

    this.props.toggleModal("Info", () =>
      this.setState({
        selectedId: id,
        editMode: true,
        filteredQuestions,
        ...question
      })
    );
  };

  removeQuestionHandler = id => {
    const filteredTableQuestions = this.state.tableQuestions.filter(
      question => question.id !== id
    );

    this.setState({
      tableQuestions: filteredTableQuestions
    });
  };
  render() {
    const {
      props: { showModalInfo, toggleModal, forms, projects },
      state: {
        label,
        type,
        placeholder,
        helpText,
        editMode,
        optInputField,
        filteredQuestions,
        tableQuestions
      },
      removeInputHandler,
      onSelectChangeHandler,
      onInputChangeHandler,
      questionChangeHandler,
      formChangeHandler,
      onSubmitHandler,
      removeQuestionHandler,
      editQuestionHandler,
      generateOptField,
      closeModal
    } = this;

    const {
      TEXT,
      NUMBER,
      DATE,
      SELECT_ONE,
      DRAW_FROM_ANOTHER_PROJECT,
      DRAW_ANSWER_FROM_A_FORM,
      FORM_SUBMISSION,
      FORM_SUBMISSIONS_COUNT,
      FORM_QUESTION_ANSWER_STATUS
    } = typeOptions;

    return (
      <div className="card no-boxshadow">
        <div className="card-header main-card-header">
          <h5>Site information</h5>
          <div className="add-btn">
            <a onClick={() => toggleModal("Info")}>
              Add new{" "}
              <span>
                <i className="la la-plus" />
              </span>
            </a>
          </div>
        </div>
        <div className="card-body">
          <Table
            tableHeader={tableHeader.siteInformationTable}
            questions={tableQuestions}
            page="siteInfo"
            removeHandler={removeQuestionHandler}
            editHandler={editQuestionHandler}
          />
        </div>
        {showModalInfo && (
          <FormModal
            title="Add Information"
            toggleModal={closeModal}
            submitHandler={onSubmitHandler}
          >
            <InputElement
              tag="input"
              type="text"
              required={true}
              label="Input Label"
              formType="floatingForm"
              htmlFor="label"
              value={label}
              name="label"
              changeHandler={onInputChangeHandler}
            />
            <SelectElement
              className="form-control"
              label="Type"
              options={[
                TEXT,
                NUMBER,
                DATE,
                SELECT_ONE,
                DRAW_FROM_ANOTHER_PROJECT,
                DRAW_ANSWER_FROM_A_FORM,
                FORM_SUBMISSION,
                FORM_SUBMISSIONS_COUNT,
                FORM_QUESTION_ANSWER_STATUS
              ]}
              value={editMode && type}
              changeHandler={onSelectChangeHandler}
            />
            {(type === TEXT || type === NUMBER || type === DATE) && (
              <InputElement
                tag="input"
                type="text"
                required={true}
                label="Placeholder"
                formType="floatingForm"
                htmlFor="placeholder"
                name="placeholder"
                value={placeholder}
                changeHandler={onInputChangeHandler}
              />
            )}
            {type === SELECT_ONE && (
              <div className="form-group">
                <button className="fieldsight-btn" onClick={generateOptField}>
                  Option+
                </button>
              </div>
            )}
            {type === SELECT_ONE &&
              optInputField.length > 0 &&
              optInputField.map((el, i) => (
                <el.tag
                  key={el.val}
                  tag="input"
                  type="text"
                  label={`option${el.val}`}
                  formType="floatingForm"
                  htmlFor={`option${el.val}`}
                  required={true}
                  removeBtn
                  removeHandler={() => removeInputHandler(el.val)}
                  name={`option${el.val}`}
                  value={this.state.options[`option${el.val}`] || ""}
                  changeHandler={e => onInputChangeHandler(e, "option")}
                />
              ))}

            {(type === TEXT ||
              type === NUMBER ||
              type === DATE ||
              type === SELECT_ONE ||
              type === DRAW_FROM_ANOTHER_PROJECT) && (
              <InputElement
                tag="textarea"
                required={true}
                label="Help Text"
                formType="floatingForm"
                htmlFor="helpText"
                name="helpText"
                value={helpText}
                changeHandler={onInputChangeHandler}
              />
            )}

            {type === DRAW_FROM_ANOTHER_PROJECT && (
              <SelectElement
                className="form-control"
                options={projects}
                value={editMode && selectedProject.name}
                changeHandler={formChangeHandler}
              />
            )}
            {(type === DRAW_ANSWER_FROM_A_FORM ||
              type === FORM_SUBMISSION ||
              type === FORM_SUBMISSIONS_COUNT ||
              type === FORM_QUESTION_ANSWER_STATUS) && (
              <SelectElement
                className="form-control"
                options={forms}
                value={editMode && selectedForm.name}
                changeHandler={formChangeHandler}
              />
            )}

            {(type === DRAW_ANSWER_FROM_A_FORM ||
              type === FORM_QUESTION_ANSWER_STATUS) && (
              <SelectElement
                className="form-control"
                options={filteredQuestions}
                value={editMode && selectedQuestion.name}
                changeHandler={questionChangeHandler}
              />
            )}
          </FormModal>
        )}
      </div>
    );
  }
}

export default SiteInformationTable;
