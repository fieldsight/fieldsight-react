import React from "react";
import FeaturedPicturesCard from "./FeaturedPicturesCard";
import FormModal from "../common/FormModal";
import InputElement from "../common/InputElement";
import SelectElement from "../common/SelectElement";

const FeaturedPictures = ({ showModalPic, toggleModal }) => (
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
        <FeaturedPicturesCard
          title="Before"
          form="baseline survey"
          question="Question"
        />
        <FeaturedPicturesCard
          title="Before"
          form="Final inspection form"
          question="Question"
        />
      </div>
    </div>

    {showModalPic && (
      <FormModal title="Add Pictures" toggleModal={() => toggleModal("Pic")}>
        <InputElement
          tag="input"
          type="text"
          required={true}
          label="Attribute"
          formType="floatingForm"
          htmlFor="input"
        />

        <InputElement
          tag="input"
          type="text"
          required={true}
          label="Data Name"
          formType="floatingForm"
          htmlFor="input"
        />

        <SelectElement
          className="wide"
          label="Type"
          options={["Daily activity diary", "Date"]}
        />

        <SelectElement
          className="wide"
          label="Question"
          options={["Daily activity diary", "Number of family member"]}
        />
      </FormModal>
    )}
  </div>
);

export default FeaturedPictures;
