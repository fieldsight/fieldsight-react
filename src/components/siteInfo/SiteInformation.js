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
import isEmpty from "../../utils/isEmpty";

const urls = [
  "fieldsight/api/organization/",
  "fieldsight/api/project/forms/",
  "fv3/api/project-define-site-meta/",
  "fv3/api/project/progress/add/"
];

class SiteInformation extends Component {
  static contextType = RegionContext;
  _isMounted = false;

  state = {
    forms: [],
    projects: [],
    siteBasicInfo: {},
    jsonQuestions: [],
    projectSettings: {},
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
          let modifiedJsonQuestions = [];
          if (results[2].data.json_questions) {
            modifiedJsonQuestions = results[2].data.json_questions.map(
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
          }

          const modifiedProjectSettings = results[2].data.project_settings.map(
            settings => {
              if (settings.source === 2) {
                if (settings.pull_integer_form_question) {
                  let splitedStr = settings.pull_integer_form_question.split(
                    "/"
                  );
                  if (splitedStr.length > 1) {
                    settings.pull_integer_form_question =
                      splitedStr[splitedStr.length - 1];
                  }
                  return { ...settings, source: settings.source + 1 };
                }
              } else {
                return { ...settings, source: settings.source + 1 };
              }
            }
          );

          this.setState({
            projects: results[0].data,
            forms: results[1].data,
            siteBasicInfo: results[2].data.site_basic_info,
            jsonQuestions: modifiedJsonQuestions,
            siteFeaturedImages: results[2].data.site_featured_images,
            projectSettings: modifiedProjectSettings[0]
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
        state: {
          siteBasicInfo,
          jsonQuestions,
          siteFeaturedImages,
          projectSettings
        },
        context: { projectId, terms }
      } = this;

      const modifiedProjectSettings = {
        ...projectSettings,
        source: projectSettings.source ? projectSettings.source - 1 : 0
      };

      const modifiedJsonQuestions = jsonQuestions.map(question => {
        if (question.question_type === "MCQ") {
          const options = [];

          if (!Array.isArray(question.mcq_options)) {
            Object.values(question.mcq_options).map(opt => {
              options.push({ option_text: opt });
            });
            question.mcq_options = options;
          }

          const { optInputField, ...rest } = question;

          return rest;
        }

        return question;
      });

      await Promise.all(
        [urls[2], urls[3]].map(
          async (url, i) =>
            await axios.post(
              `${url}${projectId}/`,
              i === 0
                ? {
                    json_questions: modifiedJsonQuestions,
                    site_basic_info: siteBasicInfo,
                    site_featured_images: siteFeaturedImages
                  }
                : modifiedProjectSettings
            )
        )
      );

      await this.setState({
        isLoading: false
      });
      successToast(
        !isEmpty(terms) ? `${terms.site} Information` : "Site Information",
        "added"
      );
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

  siteProgressHandler = progress => {
    this.setState({
      projectSettings: progress
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
        projectSettings,
        isLoading
      },
      context: { terms },
      onSubmitHandler,
      sitePicHandler,
      siteInfoHandler,
      siteIdentityHandler,
      siteProgressHandler
    } = this;
    return (
      <Fragment>
        <RightContentCard
          title={
            !isEmpty(terms)
              ? `${terms.site} Identification`
              : "Site Identification"
          }
        >
          <IdentityForm
            forms={forms}
            siteBasicInfo={siteBasicInfo}
            siteIdentityHandler={siteIdentityHandler}
            terms={terms}
            projectSettings={projectSettings}
            siteProgressHandler={siteProgressHandler}
          />
          <SiteInformationTable
            forms={forms}
            projects={projects}
            jsonQuestions={jsonQuestions}
            siteInfoHandler={siteInfoHandler}
            terms={terms}
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
