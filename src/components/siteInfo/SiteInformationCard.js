import React, { Component } from "react";
import SelectElement from "../common/SelectElement";
import findQuestion from "../../utils/findQuestion";

const typeOptions = {
  UPLOAD: "Upload",
  CHOOSE_FROM_FORM: "Choose From Form",
  CHOOSE_FROM_GALLERY: "Choose from gallery"
};

const INITIAL_STATE = {
  showForm: false,
  type: "Upload",
  selectedForm: {},
  selectedQuestion: {},
  filteredQuestions: []
};
class SiteInformationCard extends Component {
  state = INITIAL_STATE;

  onSubmitHandler = e => {
    e.preventDefault();
    const {
      state: { selectedForm, selectedQuestion, type },
      props: { infoType }
    } = this;

    if (infoType === "photo") {
      this.props.siteIdentityHandler({
        site_picture: {
          question_type: type,
          form_id: selectedForm.id,
          question: selectedQuestion
        }
      });
    } else {
      this.props.siteIdentityHandler({
        site_location: {
          question_type: type,
          form_id: selectedForm.id,
          question: selectedQuestion
        }
      });
    }
    this.setState({
      ...INITIAL_STATE
    });
  };
  onChangeHandler = e => {
    const { CHOOSE_FROM_FORM } = typeOptions;
    const { value } = e.target;
    if (value == CHOOSE_FROM_FORM) {
      return this.setState({ type: value, showForm: true });
    }
    this.setState({
      type: value,
      showForm: false
    });
  };

  formChangeHandler = (e, type) => {
    const { value } = e.target;
    const selectedForm = this.props.forms.find(form => form.name === value);
    const filteredQuestions = findQuestion(selectedForm.json.children, type);
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
      state: { showForm, filteredQuestions, type },
      props: { title, infoType, forms },
      onChangeHandler,
      formChangeHandler,
      questionChangeHandler,
      onSubmitHandler
    } = this;

    const { UPLOAD, CHOOSE_FROM_FORM, CHOOSE_FROM_GALLERY } = typeOptions;

    return (
      <div className="card">
        <div className="card-header sub-card-header">
          <h5>{title}</h5>
        </div>
        <div className="card-body">
          <form>
            <SelectElement
              className="form-control"
              options={[UPLOAD, CHOOSE_FROM_FORM, CHOOSE_FROM_GALLERY]}
              changeHandler={onChangeHandler}
              value={type}
            />

            {showForm && forms.length <= 0 && <h1>Loading...</h1>}

            {showForm && forms.length > 0 && (
              <div>
                <SelectElement
                  className="form-control"
                  options={forms}
                  changeHandler={e => formChangeHandler(e, infoType)}
                />
                <SelectElement
                  className="form-control"
                  options={filteredQuestions}
                  changeHandler={questionChangeHandler}
                />
                <div className="form-group pull-right mr-0">
                  <button
                    type="submit"
                    className="fieldsight-btn"
                    onClick={onSubmitHandler}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default SiteInformationCard;
