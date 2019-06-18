import React, { Component } from "react";
import axios from "axios";
import IdentityForm from "./IdentityForm";
import SiteInformationTable from "./SiteInformationTable";
import FeaturedPictures from "./FeaturedPictures";
import RightContentCard from "../common/RightContentCard";
import InputElement from "../common/InputElement";

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
    siteFeaturedImages: []
  };

  onSubmitHandler = () => {
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
    axios
      .post(
        urls[2],
        {
          json_questions: modifiedJsonQuestions,
          site_basic_info: siteBasicInfo,
          site_featured_images: siteFeaturedImages
        },
        { headers: headers }
      )
      .then(res => console.log("response", res))
      .catch(err => console.log("err", err));
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

  componentDidMount() {
    Promise.all(urls.map(url => axios.get(url)))
      .then(results => {
        const modifiedJsonQuestions = results[2].data.json_questions.map(
          question => {
            if (question.question_type === "MCQ") {
              let optInputField = [],
                options = {};
              if (Array.isArray(question.mcq_options)) {
                question.mcq_options.map((opt, i) => {
                  options[`option${i}`] = opt.option_text;
                  optInputField.push({ tag: InputElement, val: i });
                });
              }
              question.mcq_options = options;
              question.optInputField = optInputField;
              return question;
            }
            return question;
          }
        );
        this.setState({
          projects: results[0].data,
          forms: results[1].data,
          siteBasicInfo: results[2].data.site_basic_info,
          jsonQuestions: modifiedJsonQuestions,
          siteFeaturedImages: results[2].data.site_featured_images
        });
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  render() {
    const {
      state: {
        showModalPic,
        forms,
        projects,
        siteBasicInfo,
        jsonQuestions,
        siteFeaturedImages
      },
      toggleModal,
      onSubmitHandler,
      sitePicHandler,
      siteInfoHandler,
      siteIdentityHandler
    } = this;
    return (
      <RightContentCard
        title="Site Identification"
        submitHandler={onSubmitHandler}
      >
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
      </RightContentCard>
    );
  }
}

export default SiteInformation;
