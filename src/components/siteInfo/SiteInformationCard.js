import React, { Component, Fragment } from "react";
import SelectElement from "../common/SelectElement";
import { DotLoader } from "../common/Loader";
import findQuestion from "../../utils/findQuestion";
import isEmpty from "../../utils/isEmpty";

const typeOptions = {
  sitePictureTypes: [
    { id: "choose", name: "Upload / Choose From Gallery" },
    { id: "Form", name: "Choose From A Form" }
  ],
  siteLocationTypes: [
    { id: "choose", name: "Enter A Location/ Choose On Map" },
    { id: "Form", name: "Choose From A Form" }
  ]
};

const INITIAL_STATE = {
  showForm: false,
  type: "choose",
  selectedForm: {},
  selectedQuestion: {},
  filteredQuestions: []
};
class SiteInformationCard extends Component {
  state = INITIAL_STATE;

  componentWillReceiveProps(nextProps) {
    let selectedForm = {};
    let selectedQuestion = {};
    let type = "choose";
    let showForm = false;

    if (nextProps.siteInfo && nextProps.siteInfo.form_id) {
      selectedForm = nextProps.forms.find(form => form.id === form.id);
    }

    if (nextProps.siteInfo && !isEmpty(nextProps.siteInfo.question)) {
      selectedQuestion = nextProps.siteInfo.question;
    }

    if (nextProps.siteInfo && nextProps.siteInfo.question_type) {
      type = nextProps.siteInfo.question_type;
    }

    if (!isEmpty(selectedForm)) {
      showForm = true;
    }

    this.setState({
      selectedForm,
      selectedQuestion,
      type,
      showForm
    });
  }

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
          form_id: selectedForm.id ? selectedForm.id : 0,
          question: selectedQuestion
        }
      });
    } else {
      this.props.siteIdentityHandler({
        site_location: {
          question_type: type,
          form_id: selectedForm.id ? selectedForm.id : 0,
          question: selectedQuestion
        }
      });
    }
    this.setState({
      ...INITIAL_STATE
    });
  };

  onChangeHandler = e => {
    const { value } = e.target;
    if (value === "Form") {
      return this.setState({ type: value, showForm: true });
    }
    this.setState({
      type: value,
      showForm: false
    });
  };

  formChangeHandler = (e, type) => {
    const { value } = e.target;
    const selectedForm = this.props.forms.find(form => form.id == value);
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

  getDefaultValue = type => {
    let qvalue;
    if (type === "photo") {
      qvalue = typeOptions.sitePictureTypes.find(
        qtype => qtype.id === this.state.type
      );
    } else {
      qvalue = typeOptions.siteLocationTypes.find(
        qtype => qtype.id === this.state.type
      );
    }
    return qvalue ? qvalue.name : undefined;
  };

  render() {
    const {
      state: {
        showForm,
        filteredQuestions,
        selectedForm,
        selectedQuestion,
        type
      },
      props: { title, infoType, forms, siteInfo },
      getDefaultValue,
      onChangeHandler,
      formChangeHandler,
      questionChangeHandler,
      onSubmitHandler
    } = this;

    const { sitePictureTypes, siteLocationTypes } = typeOptions;

    return (
      <div className="card">
        <div className="card-header sub-card-header">
          <h5>{title}</h5>
        </div>
        <div className="card-body">
          <form>
            <SelectElement
              className="form-control"
              options={
                infoType === "photo" ? sitePictureTypes : siteLocationTypes
              }
              changeHandler={onChangeHandler}
              value={getDefaultValue(infoType)}
            />

            {showForm && forms.length <= 0 && <DotLoader />}

            {showForm && forms.length > 0 && (
              <Fragment>
                <SelectElement
                  className="form-control"
                  options={forms}
                  changeHandler={e => formChangeHandler(e, infoType)}
                  value={!isEmpty(selectedForm) && selectedForm.name}
                />
                <SelectElement
                  className="form-control"
                  options={filteredQuestions}
                  changeHandler={questionChangeHandler}
                  value={!isEmpty(selectedQuestion) && selectedQuestion.name}
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
              </Fragment>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default SiteInformationCard;
