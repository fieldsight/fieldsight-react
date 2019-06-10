import React, { Component } from "react";
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
  options: {},
  optInputField: [],
  selectedForm: {},
  selectedQuestion: {},
  filteredQuestions: [],
  selectedProject: {}
};

class SiteInformationTable extends Component {
  state = INITIAL_STATE;

  closeModal = () => {
    this.setState(INITIAL_STATE);
    this.props.toggleModal("Info");
  };

  onSubmitHandler = e => {
    const {
      state: {
        label,
        type,
        placeholder,
        helpText,
        options,
        selectedForm,
        selectedQuestion,
        selectedProject
      }
    } = this;

    e.preventDefault();
    const data = {};
    if (type === "Select One") {
      data.label = label;
      data.type = type;
      data.helpText = helpText;
      data.options = options;
    }

    if (type === "Text" || type === "Number" || type === "Date") {
      data.label = label;
      data.type = type;
      data.placeholder = placeholder;
      data.helpText = helpText;
    }

    if (
      type === "Draw Answer From A Form" ||
      type === "Form Question Answer Status"
    ) {
      data.label = label;
      data.type = type;
      data.selectedForm = selectedForm;
      data.selectedQuestion = selectedQuestion;
    }

    if (type === "Form Submission" || type === "Form Submission Count") {
      data.label = label;
      data.type = type;
      data.selectedForm = selectedForm;
    }

    if (type === "Draw From Another Project") {
      data.label = label;
      data.type = type;
      data.helpText = helpText;
      data.selectedProject = selectedProject;
    }

    console.log("data in submit", data);
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
    if (value === "Select One") {
      return this.setState({
        type: "Select One",
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

  onRemoveHandler = val => {
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
    const selectedForm = this.props.forms.find(form => form.name === value);
    const filteredQuestions = findQuestion(selectedForm.json.children);
    this.setState({
      selectedForm,
      filteredQuestions
    });
  };

  questionChangeHandler = e => {
    const { value } = e.target;
    const selectedQuestion = this.state.filteredQuestions.find(
      question => question.name === value
    );
    this.setState({ selectedQuestion });
  };

  render() {
    const {
      props: { showModalInfo, toggleModal, forms },
      state: {
        label,
        type,
        placeholder,
        helpText,
        optInputField,
        filteredQuestions
      },
      onRemoveHandler,
      onSelectChangeHandler,
      onInputChangeHandler,
      questionChangeHandler,
      formChangeHandler,
      onSubmitHandler,
      generateOptField,
      closeModal
    } = this;

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
          <Table page="siteInfo" />
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
                "Text",
                "Number",
                "Date",
                "Select One",
                "Draw From Another Project",
                "Draw Answer From A form",
                "Form Submission",
                "Form Submissions Count",
                "Form Question Answer Status"
              ]}
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
            {type === "Select One" && (
              <div className="form-group">
                <button
                  style={{ display: "inline-block", background: "blue" }}
                  onClick={generateOptField}
                >
                  Option+
                </button>
              </div>
            )}
            {type === "Select One" &&
              optInputField.length > 0 &&
              optInputField.map((el, i) => (
                <el.tag
                  key={el.val}
                  tag="input"
                  type="text"
                  label={`option${el.val}`}
                  formType="floatingForm"
                  htmlFor={`option${el.val}`}
                  removeBtn
                  removeHandler={() => onRemoveHandler(el.val)}
                  name={`option${el.val}`}
                  value={this.state.options[`option${el.val}`] || ""}
                  changeHandler={e => onInputChangeHandler(e, "option")}
                />
              ))}

            <InputElement
              tag="textarea"
              required={true}
              label="Help Text"
              formType="floatingForm"
              htmlFor="helpText"
              name={helpText}
              changeHandler={onInputChangeHandler}
            />

            {type === "Draw From Another Project" && (
              <SelectElement
                className="form-control"
                options={["Select Project"]}
                changeHandler={formChangeHandler}
              />
            )}
            {(type === "Draw Answer From A form" ||
              type === "Form Submission" ||
              type === "Form Submissions Count" ||
              type === "Form Question Answer Status") && (
              <SelectElement
                className="form-control"
                options={forms}
                changeHandler={formChangeHandler}
              />
            )}

            {(type === "Draw Answer From A form" ||
              type === "Form Question Answer Status") && (
              <SelectElement
                className="form-control"
                options={filteredQuestions}
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
