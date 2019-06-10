import React, { Component } from "react";
import SelectElement from "../common/SelectElement";
import findQuestion from "../../utils/findQuestion";

class SiteInformationCard extends Component {
  state = {
    showForm: false,
    selectedForm: {},
    selectedQuestion: {},
    filteredQuestions: []
  };

  onChangeHandler = e => {
    const { value } = e.target;
    if (value == "choose from form") {
      return this.setState({ showForm: true });
    }
    this.setState({
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
      state: { showForm, filteredQuestions },
      props: { title, type, forms },
      onChangeHandler,
      formChangeHandler,
      questionChangeHandler
    } = this;

    return (
      <div className="card">
        <div className="card-header sub-card-header">
          <h5>{title}</h5>
        </div>
        <div className="card-body">
          <form>
            <SelectElement
              className="form-control"
              options={["Upload", "choose from form", "choose from gallery"]}
              changeHandler={onChangeHandler}
            />

            {showForm && forms.length <= 0 && <h1>Loading...</h1>}

            {showForm && forms.length > 0 && (
              <div>
                <SelectElement
                  className="form-control"
                  options={forms}
                  changeHandler={e => formChangeHandler(e, type)}
                />
                <SelectElement
                  className="form-control"
                  options={filteredQuestions}
                  changeHandler={questionChangeHandler}
                />
                <div className="form-group pull-right mr-0">
                  <button type="submit" className="fieldsight-btn">
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
