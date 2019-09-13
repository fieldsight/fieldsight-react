import React from "react";
import Cropper from "react-cropper";

import pf from "../../../static/images/pf.jpg";
import { Button, Dropdown } from "react-bootstrap";
import CountCard from "../../common/CountCard";
import { AvatarContentLoader } from "../../common/Loader";
import { DotLoader } from "../../common/Loader";
import Modal from "../../common/Modal";
import SubmissionModal from "./SubmissionModel";

class DashboardHeader extends React.Component {
  state={
    openmodel:false
  }
  saveImage = () => {
    if (typeof this.cropper.getCroppedCanvas() === "undefined") {
      return;
    }
    const croppedImage = this.cropper.getCroppedCanvas().toDataURL();
    this.props.putCropImage(this.props.siteId, croppedImage);
    this.props.closeModal("Cropper");
  };
  rotate = () => {
    this.cropper.rotate(90);
  };

  rotateLeft = () => {
    this.cropper.rotate(-90);
  };
  render() {
    const {
      name,
      address,
      logo,
      public_desc,
      totalUsers,
      totalSites,
      id,
      showContentLoader,
      activeTab,
      closeModal,
      openModal,
      showCropper,
      termsAndLabels,
      showGallery,
      isProjectManager,
      totalSubmissions,
      surveyData
    } = this.props;
    
    const {openmodel}=this.state;
    const ManageDropdown = [
      { title: "users", link: `/fieldsight/manage/people/project/${id}/` },
      { title: "forms", link: `/forms/setup-forms/1/${id}` },
      {
        title: `${termsAndLabels && termsAndLabels.site}`,
        link: `/fieldsight/application/?project=${id}#/project-sitelist`
      },
      {
        title: `settings`,
        link: `/fieldsight/application/?project=${id}#/project-settings`
      }
    ];
    const DataDropdown = [
      {
        title: "Generate Report",
        link: `/fieldsight/project-dashboard/${id}/`
      },
      { title: "View Data", link: `/forms/project-responses/${id}/` }
    ];

    return (
      <div className="card mrb-30">
        <div className="card-header main-card-header dashboard-header">
          {showContentLoader ? (
            <AvatarContentLoader number={1} width="300px" size="80" />
          ) : (
            <div className="dash-pf">
              <figure
                style={{
                  backgroundImage: `url(${logo})`,
                  width: "80px"
                }}
              >
                <span />
                <figcaption>
                  <a
                    className="photo-preview"
                    onClick={() => openModal("Gallery")}
                  >
                    <i className="la la-eye" />
                  </a>
                </figcaption>
              </figure>
              <div className="dash-pf-content">
                {name && <h5>{name}</h5>}
                {/* {identifier && <span>{identifier}</span>} */}
                {address && <span>{address}</span>}
                {/* {region && <span>{region} </span>} */}
              </div>
            </div>
          )}
          <div className="dash-btn">
            <Dropdown>
              <Dropdown.Toggle
                variant=""
                id="dropdown-Data"
                className="fieldsight-btn"
              >
                <i className="la la-paste" />
                <span>Data</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-right">
                {DataDropdown.map((item, i) => (
                  <Dropdown.Item href={item.link} key={i} target="_blank">
                    {item.title}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            {isProjectManager && (
              <Dropdown>
                <Dropdown.Toggle
                  variant=""
                  id="dropdown-Manage"
                  className="fieldsight-btn"
                >
                  <i className="la la-cog" />
                  <span>Manage</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-right">
                  {ManageDropdown.map((item, i) => (
                    <Dropdown.Item href={item.link} key={i} target="_blank">
                      {item.title}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="card-body">
          <div className="header-count">
            <a href={`/forms/project-responses/${id}/`} target="_blank">
              <CountCard
                countName=""
                countNumber={totalSubmissions}
                icon="la-copy"
                // noSubmissionText={true}
              />
            </a>
            <a href={`/fieldsight/application/#/project-users/${id}/`} target="_blank">
              <CountCard
                countName="User"
                countNumber={totalUsers}
                icon="la-user"
                noSubmissionText={true}
              />
            </a>
            <a
              href={`/fieldsight/application/?project=${id}#/project-sitelist`}
              target="_blank"
            >
              <CountCard
                countName="site"
                countNumber={totalSites}
                icon="la-map-marker"
                noSubmissionText={true}
              />
            </a>
            {isProjectManager && (
              <div className="add-data">
                <a onClick={() => this.setState({openmodel:true})}>
                  {" "}
                  add data <i className="la la-plus" />
                </a>
              </div>
            )}
          </div>
          {openmodel &&
          
          <SubmissionModal
          surveyData={surveyData}
          toggleModal={() => this.setState({openmodel:false})}
          />
         }
          {showGallery && (
            <div
              className="gallery-zoom fieldsight-popup open"
              style={{ zIndex: 99999 }}
              onClick={() => closeModal("Gallery")}
            >
              <div className="gallery-body">
                <img
                  src={logo}
                  alt="logo"
                  style={{ minHeight: "400px", maxHeight: "400px" }}
                />
              </div>
              <span
                className="popup-close"
                onClick={() => closeModal("Gallery")}
              >
                <i className="la la-close" />
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default DashboardHeader;
