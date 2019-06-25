import React, { Component, Fragment } from "react";
import axios from "axios";
import IdentityForm from "./IdentityForm";
import SiteInformationTable from "./SiteInformationTable";
import FeaturedPictures from "./FeaturedPictures";
import RightContentCard from "../common/RightContentCard";
import Loader from "../common/Loader";

const urls = [
  "https://fieldsight.naxa.com.np/fieldsight/api/organization/13/my_projects/137/",
  "https://fieldsight.naxa.com.np/fieldsight/api/project/forms/137/",
  "https://fieldsight.naxa.com.np/fv3/api/project-define-site-meta/137/"
];

class SiteInformation extends Component {
  state = {
    forms: [],
    projects: [],
    siteBasicInfo: {},
    jsonQuestions: [],
    siteFeaturedImages: [],
    isLoading: false
  };

  requestHandler = async () => {
    try {
      const { siteBasicInfo, jsonQuestions, siteFeaturedImages } = this.state;

      const headers = {
        "Content-Type": "application/json"
      };

      const modifiedJsonQuestions = jsonQuestions.map(question => {
        if (question.question_type === "MCQ") {
          const options = [];
          Object.keys(question.mcq_options).map(opt => {
            options.push({ option_text: question.mcq_options[opt] });
          });
          question.mcq_options = options;
          const { optInputField, ...rest } = question;
          return rest;
        }
        return question;
      });
      await axios.post(
        urls[2],
        {
          json_questions: modifiedJsonQuestions,
          site_basic_info: siteBasicInfo,
          site_featured_images: siteFeaturedImages
        },
        { headers: headers }
      );

      this.setState({
        isLoading: false
      });
    } catch (err) {
      console.log("err", err);
    }
  };

  onSubmitHandler = () => {
    this.setState(
      {
        isLoading: true
      },
      this.requestHandler
    );
  };

  sitePicHandler = sitePic => {
    this.setState({
      siteFeaturedImages: [...sitePic]
    });
  };

  siteInfoHandler = siteInfo => {
    this.setState({
      jsonQuestions: [...siteInfo]
    });
  };

  siteIdentityHandler = siteIdentity => {
    this.setState({
      siteBasicInfo: {
        ...this.state.siteBasicInfo,
        ...siteIdentity
      }
    });
  };

  render() {
    const {
      state: {
        showModalPic,
        forms,
        projects,
        siteBasicInfo,
        jsonQuestions,
        siteFeaturedImages,
        isLoading
      },
      toggleModal,
      onSubmitHandler,
      sitePicHandler,
      siteInfoHandler,
      siteIdentityHandler
    } = this;
    return (
      <Fragment>
        <RightContentCard title="Site Identification">
          <IdentityForm
            forms={forms}
            siteBasicInfo={siteBasicInfo}
            siteIdentityHandler={siteIdentityHandler}
          />
          <SiteInformationTable
            forms={forms}
            projects={projects}
            jsonQuestions={jsonQuestions}
            siteInfoHandler={siteInfoHandler}
          />
          <FeaturedPictures
            forms={forms}
            siteFeaturedImages={siteFeaturedImages}
            sitePicHandler={sitePicHandler}
          />

          <div className="col-sm-12">
            <button
              className="fieldsight-btn pull-right"
              onClick={onSubmitHandler}
            >
              Save
            </button>
          </div>
        </RightContentCard>
        {isLoading && <Loader />}
      </Fragment>
    );
  }
}

export default SiteInformation;
