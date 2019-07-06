import React, { Component } from "react";
import SelectElement from "../common/SelectElement";
import InputElement from "../common/InputElement";
import { DotLoader } from "../common/Loader";
import findQuestion from "../../utils/findQuestion";
import isEmpty from "../../utils/isEmpty";

const typeOptions = {
  siteProgressCard: [
    { id: 1, name: "Most Advanced Approved Stage" },
    { id: 2, name: "Stages Approved / Total Stages" },
    { id: 3, name: "Pull Progress Value from a Form" },
    { id: 4, name: "Total Number of Submissions / Target Number" },
    { id: 5, name: "Number of Submissions for a Form / Target Number" },
    { id: 6, name: "Update Manually" }
  ]
};

const INITIAL_STATE = {
  showForm: false,
  showQuestion: false,
  showTargetNum: false,
  filteredQuestions: [],
  selectedForm: {},
  selectedQuestion: {},
  source: 1,
  targetNum: ""
};

class SiteProgressCard extends Component {
  state = INITIAL_STATE;

  componentWillReceiveProps(nextProps) {
    let selectedForm = {};
    let selectedQuestion = {};
    let source = 1;
    let showForm = false;
    let showQuestion = false;
    let showTargetNum = false;
    let filteredQuestions = [];

    if (nextProps.projectSettings && nextProps.projectSettings.source) {
      source = nextProps.projectSettings.source;
    }
    if (
      nextProps.projectSettings &&
      (nextProps.projectSettings.pull_integer_form ||
        nextProps.projectSettings.no_submissions_form)
    ) {
      selectedForm = nextProps.forms.find(
        form =>
          form.id ===
          (nextProps.projectSettings.pull_integer_form ||
            nextProps.projectSettings.no_submissions_form)
      );
    }

    if (!isEmpty(selectedForm)) {
      if (selectedForm.json) {
        filteredQuestions = selectedForm.json.children;
        selectedQuestion = filteredQuestions.find(
          question =>
            question.name ===
            nextProps.projectSettings.pull_integer_form_question
        );
      }
    }

    if (!isEmpty(selectedForm)) {
      showForm = true;
    }

    if (source === +"3") {
      showQuestion = true;
    }

    if (source === +"4" || source === +"5") {
      showTargetNum = true;
    }

    this.setState({
      selectedForm,
      selectedQuestion: selectedQuestion ? selectedQuestion : {},
      filteredQuestions,
      showTargetNum,
      showQuestion,
      showForm
    });
  }

  dataChangeHandler = () => {
    const {
      state: { source, selectedForm, selectedQuestion, targetNum }
    } = this;
    this.props.siteProgressHandler({
      pull_integer_form: source === "3" ? selectedForm.id : null,
      no_submissions_form: source === "5" ? selectedForm.id : null,
      no_submissions_total_count: targetNum ? +targetNum : null,
      pull_integer_form_question: selectedQuestion.name
        ? selectedQuestion.name
        : null,
      source: +source,
      id: 5,
      deployed: true
    });
  };

  onChangeHandler = e => {
    const { value } = e.target;
    if (value === "3") {
      this.setState({
        ...INITIAL_STATE,
        showForm: true,
        showQuestion: true,
        source: value
      });
    } else if (value === "4") {
      this.setState({
        ...INITIAL_STATE,
        showTargetNum: true,
        source: value
      });
    } else if (value === "5") {
      this.setState({
        ...INITIAL_STATE,
        showForm: true,
        showTargetNum: true,
        source: value
      });
    } else {
      this.setState(
        {
          ...INITIAL_STATE,
          source: value
        },
        this.dataChangeHandler
      );
    }
  };

  formChangeHandler = e => {
    const { value } = e.target;
    const selectedForm = this.props.forms.find(form => form.id == value);
    const filteredQuestions = findQuestion(selectedForm.json.children);

    this.setState(
      {
        selectedForm,
        filteredQuestions,
        selectedQuestion: {}
      },
      this.dataChangeHandler
    );
  };

  questionChangeHandler = e => {
    const { value } = e.target;
    const selectedQuestion = this.state.filteredQuestions.find(
      question => question.name === value
    );
    this.setState({ selectedQuestion }, this.dataChangeHandler);
  };

  inputChangeHandler = e => {
    this.setState({ targetNum: e.target.value }, this.dataChangeHandler);
  };

  render() {
    const { siteProgressCard } = typeOptions;
    const {
      state: {
        targetNum,
        source,
        showForm,
        showQuestion,
        showTargetNum,
        selectedForm,
        selectedQuestion,
        filteredQuestions
      },
      props: { title, forms },
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
              options={siteProgressCard}
              changeHandler={onChangeHandler}
              value={source}
            />

            {(showForm || showTargetNum) && forms.length <= 0 && <DotLoader />}

            {showForm && forms.length > 0 && (
              <SelectElement
                className="form-control"
                options={forms}
                changeHandler={formChangeHandler}
                value={!isEmpty(selectedForm) && selectedForm.id}
              />
            )}

            {showQuestion && (
              <SelectElement
                className="form-control"
                options={filteredQuestions}
                changeHandler={questionChangeHandler}
                value={!isEmpty(selectedQuestion) && selectedQuestion.name}
              />
            )}

            {showTargetNum && (
              <InputElement
                tag="input"
                type="number"
                required={true}
                label="Target"
                formType="editForm"
                htmlFor="target"
                name="target"
                value={targetNum}
                changeHandler={this.inputChangeHandler}
              />
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default SiteProgressCard;
