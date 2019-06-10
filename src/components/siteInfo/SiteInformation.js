import React, { Component } from "react";
import IdentityForm from "./IdentityForm";
import SiteInformationTable from "./SiteInformationTable";
import FeaturedPictures from "./FeaturedPictures";
import RightContentCard from "../common/RightContentCard";

class SiteInformation extends Component {
  state = {
    showModalPic: false,
    showModalInfo: false,
    forms: []
  };

  toggleModal = type => {
    this.setState(prevState => ({
      [`showModal${type}`]: !prevState[`showModal${type}`]
    }));
  };

  componentDidMount() {
    fetch("https://fieldsight.naxa.com.np/fieldsight/api/project/forms/137/", {
      method: "GET"
      // credentials: 'include'
    })
      .then(res => res.json())
      .then(result => {
        this.setState({
          forms: result
        });
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  render() {
    const {
      state: { showModalInfo, showModalPic, forms },
      toggleModal
    } = this;
    return (
      <RightContentCard title="Site Identification">
        <IdentityForm forms={forms} />
        <SiteInformationTable
          showModalInfo={showModalInfo}
          toggleModal={toggleModal}
          forms={forms}
        />
        <FeaturedPictures
          showModalPic={showModalPic}
          toggleModal={toggleModal}
        />
      </RightContentCard>
    );
  }
}

export default SiteInformation;
