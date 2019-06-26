import React, { Component } from "react";
import uuid from "uuid/v4";
import Table from "../common/Table";
import Modal from "../common/Modal";
import InputElement from "../common/InputElement";
import SelectElement from "../common/SelectElement";
import CheckBox from "../common/CheckBox";
import findQuestion from "../../utils/findQuestion";

const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const INITIAL_STATE = {
  showModal: false,
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
  tableQuestions: [],
  publicChecked: false,
  dashboardChecked: false
};

const questionTypes = [
  { id: "Text", name: "Text" },
  { id: "Number", name: "Number" },
  { id: "Date", name: "Date" },
  { id: "MCQ", name: "Select one" },
  { id: "Link", name: "Draw from another project" },
  { id: "Form", name: "Draw answer from a form" },
  { id: "FormSubStat", name: "Form submission" },
  { id: "FormSubCountQuestion", name: "Form submissions count" },
  { id: "FormQuestionAnswerStatus", name: "Form question answer status" }
];

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.jsonQuestions) {
      this.setState({
        tableQuestions: [...nextProps.jsonQuestions]
      });
    }
  }

  closeModal = () => {
    this.setState({
      ...INITIAL_STATE,
      tableQuestions: [...this.state.tableQuestions]
    });
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

    if (value === "MCQ") {
      return this.setState({
        type: "MCQ",
        showOptions: true
      });
    }
    this.setState({
      type: value,
      showOptions: false
    });
  };

  handleCheckboxChange = (e, type) =>
    this.setState({ [`${type}Checked`]: e.target.checked });

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

    if (type === "Link") {
      this.setState({
        selectedProject: value
      });
    } else {
      const filteredQuestions = findQuestion(selectedForm.json.children);
      this.setState({
        selectedForm: value,
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
        tableQuestions,
        publicChecked,
        dashboardChecked
      }
    } = this;
    const { bind, children, ...restQuestion } = selectedQuestion;

    const question = {
      ...(!editMode && { id: uuid() }),
      ...(editMode && { id: pattern.test(selectedId) ? selectedId : uuid() }),
      question_name: label,
      question_text: label,
      question_type: type,
      ...(type === "MCQ" && { mcq_options: options }),
      ...(type === "MCQ" && { optInputField }),
      ...((type === "Form" ||
        type === "FormQuestionAnswerStatus" ||
        type === "FormSubStat" ||
        type === "FormSubCountQuestion") && { form_id: selectedForm }),
      ...((type === "Form" || type === "FormQuestionAnswerStatus") && {
        question: restQuestion
      }),
      ...(type === "Link" && {
        project_id: selectedProject
      }),
      ...((type === "Text" || type === "Number" || type === "Date") && {
        question_placeholder: placeholder
      }),
      ...((type === "Text" ||
        type === "Number" ||
        type === "Date" ||
        type === "MCQ" ||
        type === "Link") && { question_help: helpText }),
      share_to_dashboard: dashboardChecked,
      share_to_public: publicChecked
    };

    if (editMode) {
      let filteredTableQuestions = tableQuestions.filter(question =>
        question.id
          ? question.id !== selectedId
          : question.question_text !== selectedId
      );

      this.setState(
        {
          ...INITIAL_STATE,
          tableQuestions: [...filteredTableQuestions, question]
        },
        () => this.props.siteInfoHandler(this.state.tableQuestions)
      );
    } else {
      this.setState(
        {
          ...INITIAL_STATE,
          tableQuestions: [...tableQuestions, question]
        },
        () => this.props.siteInfoHandler(this.state.tableQuestions)
      );
    }
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  };

  editQuestionHandler = value => {
    const selectedTableQuestion = this.state.tableQuestions.find(
      question => question.id === value || question.question_text === value
    );

    const question = {
      label: selectedTableQuestion.question_text,
      type: selectedTableQuestion.question_type,
      ...(selectedTableQuestion.question_type === "MCQ" && {
        options: selectedTableQuestion.mcq_options
      }),
      ...(selectedTableQuestion.question_type === "MCQ" && {
        optInputField: selectedTableQuestion.optInputField
      }),
      ...((selectedTableQuestion.question_type === "Form" ||
        selectedTableQuestion.question_type === "FormQuestionAnswerStatus" ||
        selectedTableQuestion.question_type === "FormSubStat" ||
        selectedTableQuestion.question_type === "FormSubCountQuestion") && {
        selectedForm: selectedTableQuestion.form_id
      }),
      ...((selectedTableQuestion.question_type === "Form" ||
        selectedTableQuestion.question_type === "FormQuestionAnswerStatus") && {
        selectedQuestion: selectedTableQuestion.question
      }),
      ...(selectedTableQuestion.question_type === "Link" && {
        selectedProject: selectedTableQuestion.project_id
      }),
      ...((selectedTableQuestion.question_type === "Text" ||
        selectedTableQuestion.question_type === "Number" ||
        selectedTableQuestion.question_type === "Date") && {
        placeholder: selectedTableQuestion.question_placeholder
      }),
      ...((selectedTableQuestion.question_type === "Text" ||
        selectedTableQuestion.question_type === "Number" ||
        selectedTableQuestion.question_type === "Date" ||
        selectedTableQuestion.question_type === "MCQ" ||
        selectedTableQuestion.question_type === "Link") && {
        helpText: selectedTableQuestion.question_help
      }),
      ...(selectedTableQuestion.share_to_dashboard && {
        dashboardChecked: selectedTableQuestion.share_to_dashboard
      }),
      ...(selectedTableQuestion.share_to_public && {
        publicChecked: selectedTableQuestion.share_to_public
      })
    };

    const filteredQuestions = selectedTableQuestion.form_id
      ? findQuestion(
          this.props.forms.find(
            form => form.id === +selectedTableQuestion.form_id
          ).json.children
        )
      : this.state.filteredQuestions;

    this.setState({
      showModal: true,
      selectedId: value,
      editMode: true,
      filteredQuestions,
      ...question
    });
  };

  removeQuestionHandler = value => {
    const filteredTableQuestions = this.state.tableQuestions.filter(question =>
      question.id ? question.id !== value : question.question_text !== value
    );

    this.setState(
      {
        tableQuestions: filteredTableQuestions
      },
      () => this.props.siteInfoHandler(this.state.tableQuestions)
    );
  };
  render() {
    const {
      props: { forms, projects, jsonQuestions },
      state: {
        label,
        type,
        placeholder,
        helpText,
        editMode,
        selectedForm,
        selectedQuestion,
        optInputField,
        filteredQuestions,
        tableQuestions,
        showModal
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
      closeModal,
      toggleModal
    } = this;

    return (
      <div className="card no-boxshadow">
        <div className="card-header main-card-header">
          <h5>Site information</h5>
          <div className="add-btn">
            <a onClick={toggleModal}>
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
            tableRow={tableQuestions}
            page="siteInfo"
            removeHandler={removeQuestionHandler}
            editHandler={editQuestionHandler}
            forms={forms}
          />
        </div>
        {showModal && (
          <Modal title="Add Information" toggleModal={closeModal}>
            <form className="floating-form" onSubmit={onSubmitHandler}>
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
                options={questionTypes}
                value={editMode && type}
                changeHandler={onSelectChangeHandler}
              />
              {(type === "Text" || type === "Number" || type === "Date") && (
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

              {type === "MCQ" &&
                optInputField &&
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
              {type === "MCQ" && (
                <div className="form-group">
                  <button className="fieldsight-btn" onClick={generateOptField}>
                    Option+
                  </button>
                </div>
              )}

              <CheckBox
                checked={this.state.dashboardChecked}
                label="Share To Dashboard"
                onChange={e => this.handleCheckboxChange(e, "dashboard")}
              />

              <CheckBox
                checked={this.state.publicChecked}
                label="Share To Public"
                onChange={e => this.handleCheckboxChange(e, "public")}
              />

              {(type === "Text" ||
                type === "Number" ||
                type === "Date" ||
                type === "MCQ" ||
                type === "Link") && (
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

              {type === "Link" && (
                <SelectElement
                  className="form-control"
                  options={projects}
                  value={editMode && selectedProject}
                  changeHandler={formChangeHandler}
                />
              )}
              {(type === "Form" ||
                type === "FormSubStat" ||
                type === "FormSubCountQuestion" ||
                type === "FormQuestionAnswerStatus") && (
                <SelectElement
                  className="form-control"
                  options={forms}
                  value={editMode && selectedForm}
                  changeHandler={formChangeHandler}
                />
              )}

              {(type === "Form" || type === "FormQuestionAnswerStatus") && (
                <SelectElement
                  className="form-control"
                  options={filteredQuestions}
                  value={editMode && selectedQuestion.name}
                  changeHandler={questionChangeHandler}
                />
              )}

              <div className="form-group pull-right no-margin">
                <button type="submit" className="fieldsight-btn">
                  Save
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    );
  }
}

export default SiteInformationTable;
