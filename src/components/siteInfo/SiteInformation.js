import React, { Component, Fragment } from "react";
import axios from "axios";
import IdentityForm from "./IdentityForm";
import SiteInformationTable from "./SiteInformationTable";
import FeaturedPictures from "./FeaturedPictures";
import RightContentCard from "../common/RightContentCard";
import InputElement from "../common/InputElement";
import Loader from "../common/Loader";
import { errorToast, successToast } from "../../utils/toastHandler";
import { RegionContext } from "../../context";
const urls = [
  "fieldsight/api/organization/",
  "fieldsight/api/project/forms/",
  "fv3/api/project-define-site-meta/"
];

class SiteInformation extends Component {
  static contextType = RegionContext;
  _isMounted = false;

  state = {
    forms: [],
    projects: [],
    siteBasicInfo: {},
    jsonQuestions: [],
    siteFeaturedImages: [],
    isLoading: false
  };

  componentDidMount() {
    this._isMounted = true;
    const { projectId, organizationId } = this.context;
    Promise.all(
      urls.map((url, i) => {
        return i === 0
          ? axios.get(`${url}${organizationId}/my_projects/${projectId}/`)
          : axios.get(`${url}${projectId}/`);
      })
    )
      .then(results => {
        if (this._isMounted) {
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
        }
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  requestHandler = async () => {
    try {
      const {
        state: { siteBasicInfo, jsonQuestions, siteFeaturedImages },
        context: { projectId }
      } = this;

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
        `${urls[2]}${projectId}/`,
        {
          json_questions: modifiedJsonQuestions,
          site_basic_info: siteBasicInfo,
          site_featured_images: siteFeaturedImages
        },
        { headers: headers }
      );

      await this.setState({
        isLoading: false
      });
      successToast("Site", "added");
    } catch (err) {
      this.setState(
        {
          isLoading: false
        },
        errorToast
      );
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
        forms,
        projects,
        siteBasicInfo,
        jsonQuestions,
        siteFeaturedImages,
        isLoading
      },

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

  componentWillUnmount() {
    this._isMounted = false;
  }
}

export default SiteInformation;
