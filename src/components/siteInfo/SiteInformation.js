import React, { Component } from "react";
import axios from "axios";
import IdentityForm from "./IdentityForm";
import SiteInformationTable from "./SiteInformationTable";
import FeaturedPictures from "./FeaturedPictures";
import RightContentCard from "../common/RightContentCard";

const urls = [
  "https://fieldsight.naxa.com.np/fieldsight/api/organization/13/my_projects/137/",
  "https://fieldsight.naxa.com.np/fieldsight/api/project/forms/137/"
];

class SiteInformation extends Component {
  state = {
    showModalPic: false,
    showModalInfo: false,
    forms: [],
    projects: [],
    site_basic_info: {},
    json_questions: []
  };

  toggleModal = (type, cb) => {
    this.setState(
      prevState => ({
        [`showModal${type}`]: !prevState[`showModal${type}`]
      }),
      () => (cb ? cb() : null)
    );
  };

  onSubmitHandler = () => {};

  sitePicHandler = () => {
    console.log("sitePicHandler called");
  };

  siteInfoHandler = () => {
    console.log("siteInfoHandler called");
  };

  siteIdentityHandler = siteIdentity => {
    this.setState(
      {
        site_basic_info: {
          ...this.state.site_basic_info,
          ...siteIdentity
        }
      },
      () => console.log("site Info state", this.state)
    );
  };

  componentDidMount() {
    Promise.all(urls.map(url => axios.get(url)))
      .then(results => {
        this.setState({
          projects: results[0].data,
          forms: results[1].data
        });
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  render() {
    const {
      state: { showModalInfo, showModalPic, forms, projects },
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
        <IdentityForm forms={forms} siteIdentityHandler={siteIdentityHandler} />
        <SiteInformationTable
          showModalInfo={showModalInfo}
          toggleModal={toggleModal}
          forms={forms}
          projects={projects}
          siteInfoHandler={siteInfoHandler}
        />
        <FeaturedPictures
          showModalPic={showModalPic}
          toggleModal={toggleModal}
          forms={forms}
          sitePicHandler={sitePicHandler}
        />
      </RightContentCard>
    );
  }
}

export default SiteInformation;
