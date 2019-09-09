import React, { Component, Fragment } from "react";
import axios from "axios";
import IdentityForm from "./IdentityForm";
import SiteInformationTable from "./SiteInformationTable";
import FeaturedPictures from "./FeaturedPictures";
import RightContentCard from "../common/RightContentCard";
import InputElement from "../common/InputElement";
import Modal from "../common/Modal";
import Loader from "../common/Loader";
import { errorToast, successToast } from "../../utils/toastHandler";
import { RegionContext } from "../../context";
import isEmpty from "../../utils/isEmpty";
import findQuestionWithGroup from "../../utils/findQuestionWithGroup";

const urls = [
  "fieldsight/api/organization/",
  "fieldsight/api/project/forms/",
  "fv3/api/project-define-site-meta/"
];

const progressUrl = "fv3/api/project/progress/add/";

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
    isLoading: false,
    showConfirmation: false
  };

  groupQuestion = formQuestionsChildren => {
    const groupQuestionName = question => {
      if (question.type === "group" || question.type === "repeat") {
        question.children = question.children.map(childQuestion => {
          childQuestion.name = `${question.name}/${childQuestion.name}`;
          if (
            childQuestion.type === "group" ||
            childQuestion.type === "repeat"
          ) {
            groupQuestionName(childQuestion);
          }
          return childQuestion;
        });
      }

      return question;
    };
    return formQuestionsChildren.map(question => {
      return groupQuestionName(question);
    });
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
          let modifiedForm = [];

          if (results[1].data) {
            modifiedForm = results[1].data.map(formQuestions => {
              if (formQuestions.json) {
                formQuestions.json.children = this.groupQuestion(
                  formQuestions.json.children
                );
              }

              return formQuestions;
            });
          }

          if (results[2].data.json_questions.length > 0) {
            modifiedJsonQuestions = results[2].data.json_questions.map(
              question => {
                if (question.question_type === "MCQ") {
                  let optInputField = [],
                    options = {};
                  if (Array.isArray(question.mcq_options)) {
                    question.mcq_options.map((opt, i) => {
                      options[`option${i + 1}`] = opt.option_text;
                      optInputField.push({ tag: InputElement, val: i + 1 });
                    });
                  }
                  question.mcq_options = options;
                  question.optInputField = optInputField;
                  return question;
                } else if (question.question_type === "Link") {
                  if (question.metas) {
                    const metaAttribute = question.metas[question.project_id];
                    question.metas = metaAttribute;
                  }
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
                  // let splitedStr = settings.pull_integer_form_question.split(
                  //   "/"
                  // );
                  // if (splitedStr.length > 1) {
                  //   settings.pull_integer_form_question =
                  //     splitedStr[splitedStr.length - 1];
                  // }
                  return { ...settings, source: settings.source.toString() };
                }
              } else {
                return {
                  ...settings,
                  source: settings.source.toString()
                };
              }
            }
          );

          this.setState({
            projects: [
              { id: 0, name: "--Select Project--", site_meta_attributes: [] },
              ...results[0].data
            ],
            forms: [
              { id: 0, name: "--Select Form--", json: { children: [] } },
              ...modifiedForm
            ],
            siteBasicInfo: results[2].data.site_basic_info,
            jsonQuestions: modifiedJsonQuestions,
            siteFeaturedImages: results[2].data.site_featured_images,
            projectSettings:
              modifiedProjectSettings.length > 0
                ? modifiedProjectSettings[0]
                : {}
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
        ...(projectSettings.source && { source: +projectSettings.source })
      };

      const modifiedJsonQuestions = jsonQuestions.map(question => {
        if (question.question_type === "MCQ") {
          const options = [];

          if (!Array.isArray(question.mcq_options)) {
            Object.values(question.mcq_options).map(opt => {
              options.push({ option_text: opt });
            });
          }

          const { optInputField, ...rest } = question;
          rest.mcq_options = options;
          return rest;
        } else if (question.question_type === "Link") {
          if (question.metas) {
            const metaAttribute = question.metas;
            const metaObj = {
              [question.project_id]: metaAttribute
            };
            const { checked, ...rest } = question;
            rest.metas = metaObj;
            return rest;
          }

          return question;
        }

        return question;
      });

      await Promise.all(
        [urls[2], progressUrl].map(
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
    this.setState({
      showConfirmation: true
    });
  };

  cancelHandler = () => {
    this.setState({
      showConfirmation: false
    });
  };

  confirmHandler = () => {
    this.setState(
      {
        isLoading: true,
        showConfirmation: false
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
        isLoading,
        showConfirmation
      },
      context: { terms },
      onSubmitHandler,
      sitePicHandler,
      siteInfoHandler,
      siteIdentityHandler,
      siteProgressHandler,
      cancelHandler,
      confirmHandler
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

          <FeaturedPictures
            forms={forms}
            siteFeaturedImages={siteFeaturedImages}
            sitePicHandler={sitePicHandler}
          />

          <SiteInformationTable
            forms={forms}
            projects={projects}
            jsonQuestions={jsonQuestions}
            siteInfoHandler={siteInfoHandler}
            terms={terms}
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
        {showConfirmation && (
          <Modal title="Warning" toggleModal={cancelHandler}>
            <div className="warning">
              <p>Are you sure you want to save the changes?</p>
              <p>Please Note </p>
              <ul style={{ textAlign: "left" }}>
                <li>
                  {" "}
                  Changing site information will change data in all the sites.
                </li>
                <li>
                  Site pictures, featured images, locations, progress values and
                  site information will be changed to the new preferences.
                </li>
                <li>
                  Any information deleted will not be recovered later unless the
                  same information is created again.
                </li>
                <li>
                  Changes may take some time to reflect in the sites depending
                  upon the total number of sites in the project and
                  calculations/form answers if pulled in the information.
                </li>
              </ul>
            </div>
            <div className="warning-footer text-center">
              <a
                className="fieldsight-btn rejected-btn"
                onClick={cancelHandler}
              >
                cancel
              </a>
              <a className="fieldsight-btn" onClick={confirmHandler}>
                confirm
              </a>
            </div>
          </Modal>
        )}
      </Fragment>
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
}

export default SiteInformation;
