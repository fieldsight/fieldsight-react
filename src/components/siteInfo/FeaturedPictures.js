import React, { Component } from "react";
import uuid from "uuid/v4";
import FeaturedPicturesCard from "./FeaturedPicturesCard";
import FormModal from "../common/FormModal";
import InputElement from "../common/InputElement";
import SelectElement from "../common/SelectElement";
import findQuestion from "../../utils/findQuestion";

const INITIAL_STATE = {
  label: "",
  type: "Choose From Gallery",
  selectedForm: {},
  selectedQuestion: {},
  filteredQuestions: [],
  featuredPics: [],
  selectedId: null,
  editMode: false
};

const typeOptions = {
  GALLERY: "Choose From Gallery",
  FORM: "Choose From Form"
};

class FeaturedPictures extends Component {
  state = INITIAL_STATE;

  closeModal = () => {
    this.setState({
      ...INITIAL_STATE,
      featuredPics: [...this.state.featuredPics]
    });
    this.props.toggleModal("Pic");
  };

  onInputChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  onSelectChangeHandler = e => {
    console.log("selct hanlder", e.target.value);
    const { value } = e.target;
    this.setState({
      type: value
    });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const {
      state: {
        label,
        type,
        editMode,
        selectedForm,
        selectedQuestion,
        selectedId,
        featuredPics
      },
      props: { toggleModal }
    } = this;

    const { GALLERY, FORM } = typeOptions;

    const picture = {
      ...(!editMode && { id: uuid() }),
      label,
      type,
      ...(type === FORM && { selectedForm }),
      ...(type === FORM && { selectedQuestion })
    };

    if (editMode) {
      let filteredFeaturedPics = featuredPics.filter(
        pic => pic.id !== selectedId
      );

      this.setState({
        ...INITIAL_STATE,
        featuredPics: [...filteredFeaturedPics, { ...picture, id: selectedId }]
      });
    } else {
      this.setState({
        ...INITIAL_STATE,
        featuredPics: [...featuredPics, picture]
      });
    }

    toggleModal("Pic");
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

  removePicHandler = id => {
    const filteredFeaturedPics = this.state.featuredPics.filter(
      pic => pic.id !== id
    );

    this.setState({
      featuredPics: filteredFeaturedPics
    });
  };

  editPicHandler = id => {
    const selectedFeaturedPic = this.state.featuredPics.find(
      pic => pic.id === id
    );
    const { GALLERY, FORM } = typeOptions;

    const picture = {
      label: selectedFeaturedPic.label,
      type: selectedFeaturedPic.type,
      ...(selectedFeaturedPic.type === FORM && {
        selectedForm: selectedFeaturedPic.selectedForm
      }),
      ...(selectedFeaturedPic.type === FORM && {
        selectedQuestion: selectedFeaturedPic.selectedQuestion
      })
    };

    const filteredQuestions = selectedFeaturedPic.selectedForm
      ? findQuestion(selectedFeaturedPic.selectedForm.json.children)
      : this.state.filteredQuestions;

    this.props.toggleModal("Pic", () =>
      this.setState({
        selectedId: id,
        editMode: true,
        filteredQuestions,
        ...picture
      })
    );
  };

  render() {
    const {
      props: { showModalPic, toggleModal, forms },
      state: {
        label,
        type,
        selectedForm,
        selectedQuestion,
        editMode,
        filteredQuestions,
        featuredPics
      },
      closeModal,
      formChangeHandler,
      questionChangeHandler,
      onInputChangeHandler,
      onSelectChangeHandler,
      editPicHandler,
      removePicHandler,
      onSubmitHandler
    } = this;

    const { GALLERY, FORM } = typeOptions;
    return (
      <div className="card no-boxshadow">
        <div className="card-header main-card-header">
          <h5>featured pictures</h5>
          <div className="add-btn">
            <a onClick={() => toggleModal("Pic")}>
              Add new{" "}
              <span>
                <i className="la la-plus" />
              </span>
            </a>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            {featuredPics.map(pic => (
              <FeaturedPicturesCard
                key={pic.id}
                picture={pic}
                editPicHandler={editPicHandler}
                removePicHandler={removePicHandler}
              />
            ))}
          </div>
        </div>

        {showModalPic && (
          <FormModal
            title="Add Pictures"
            toggleModal={closeModal}
            submitHandler={onSubmitHandler}
          >
            <InputElement
              tag="input"
              type="text"
              required={true}
              label="Input Label"
              formType="floatingForm"
              htmlFor="input"
              name="label"
              value={label}
              changeHandler={onInputChangeHandler}
            />

            <SelectElement
              className="form-control"
              label="Type"
              options={[GALLERY, FORM]}
              value={editMode && type}
              changeHandler={onSelectChangeHandler}
            />

            {type === FORM && (
              <SelectElement
                className="form-control"
                options={forms}
                value={editMode && selectedForm.name}
                changeHandler={formChangeHandler}
              />
            )}

            {type === FORM && (
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

export default FeaturedPictures;
