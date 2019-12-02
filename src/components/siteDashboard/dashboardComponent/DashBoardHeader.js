import React, { Component } from "react";
import { OverlayTrigger, Tooltip, Dropdown } from "react-bootstrap";
import Cropper from "react-cropper";
import PerfectScrollbar from "react-perfect-scrollbar";
import Table from "react-bootstrap/Table";
import CountCard from "../../common/CountCard";
import { AvatarContentLoader } from "../../common/Loader";
import SubmissionModal from "./SubmissionModal";
import Modal from "../../common/Modal";
import Td from "../../common/TableData";
import { DotLoader } from "../../common/Loader";

// const projectId = window.project_id ? window.project_id : 137;

class DashboardHeader extends Component {
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
      props: {
        name,
        address,
        identifier,
        enableSubsites,
        logo,
        region,
        totalUsers,
        totalSubmission,
        siteForms,
        siteId,
        showModal,
        showDotLoader,
        activeTab,
        closeModal,
        openModal,
        toggleTab,
        showCropper,
        subSites,
        showSubsites,
        totalSubsites,
        showGallery,
        showContentLoader,
        subSitesLoader,
        termsAndLabels,
        hasWritePermission,
        projectId
      },
      rotate,
      rotateLeft
    } = this;
    const ManageDropdown = [
      { title: "Generate Report", link: `/fieldsight/site-dashboard/${siteId}/` },
      { title: "View Data", link: `/forms/responses/${siteId}/` }
    ];

    const HeaderDropdown = [
      {
        title: `Edit ${termsAndLabels && termsAndLabels.site}`,
        link: `/fieldsight/site/${siteId}/`
      },
      {
        title: `${termsAndLabels && termsAndLabels.site} documents`,
        link: `/fieldsight/site/blue-prints/${siteId}/`
      },
      { title: "users", link: `/fieldsight/manage/people/site/${siteId}/` },
      { title: "forms", link: `/forms/setup-forms/0/${siteId}` }
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
                  // height: "80px",
                  width: "80px"
                  // borderRadius: "100%",
                  // backgroundRepeat: "no-repeat",
                  // backgroundSize: "cover"
                }}
              >
                {/* <img src={logo} alt={logo} /> */}
                <span />
                <figcaption>
                  <a
                    className="photo-preview"
                    onClick={() => openModal("Gallery")}
                  >
                    <i className="la la-eye" />
                  </a>
                  {hasWritePermission && (
                    <a
                      className="photo-edit"
                      onClick={() => openModal("Cropper")}
                    >
                      <i className="la la-camera" />
                    </a>
                  )}
                </figcaption>
              </figure>
              <div className="dash-pf-content">
                {name && <h5>{name}</h5>}
                {identifier && <span>{identifier}</span>}
                {address && <span>{address}</span>}
                {region && <span>{region} </span>}
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
                <i className="fa fa-paste" />
                <span>Data</span>
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu-right">
                {ManageDropdown.map((item, i) => (
                  <Dropdown.Item href={item.link} key={i} target="_blank">
                   
                    {item.title}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            {hasWritePermission && (
              <Dropdown>
                <Dropdown.Toggle
                  variant=""
                  id="dropdown-Manage"
                  className="fieldsight-btn"
                >
                  <i className="fa fa-cog" />
                  <span>Manage</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-right">
                  {HeaderDropdown.map((item, i) => (
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
            <a
              href={`/forms/responses/${siteId}/`}
              target="_blank"
            >
              <CountCard
                countName=""
                countNumber={totalSubmission}
                icon="la-clone"
              />
            </a>
            <a href={`/fieldsight/application/#/site-users/${siteId}/`} target="_blank">
              <CountCard
                countName="User"
                countNumber={totalUsers}
                icon="la-user"
                noSubmissionText={true}
              />
            </a>
            {enableSubsites && (
              <a onClick={() => openModal("Subsites")}>
                <CountCard
                  countName="Subsite"
                  countNumber={totalSubsites}
                  icon="la-map-marker"
                  noSubmissionText={true}
                />
              </a>
            )}

            {hasWritePermission && (
              <div className="add-data">
                <a onClick={() => openModal("Header")}>
                  {" "}
                  add data <i className="la la-plus" />
                </a>
              </div>
            )}
          </div>

          {showModal && (
            <SubmissionModal
              showDotLoader={showDotLoader}
              siteForms={siteForms}
              activeTab={activeTab}
              closeModal={() => closeModal("Header")}
              toggleTab={toggleTab}
              enableSubsites={enableSubsites}
            />
          )}

          {showCropper && (
            <Modal title="Preview" toggleModal={() => closeModal("Cropper")}>
              <div className="cropper-btn">
                <button onClick={rotate} className="fieldsight-btn">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Rotate Left</Tooltip>}
                  >
                    <i className="la la-rotate-left" />
                  </OverlayTrigger>
                </button>
                <button onClick={rotateLeft} className="fieldsight-btn">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Rotate Right</Tooltip>}
                  >
                    <i className="la la-rotate-right" />
                  </OverlayTrigger>
                </button>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="card-body" style={{ padding: 0 }}>
                    <figure>
                      <Cropper
                        style={{ height: 400, width: 300 }}
                        aspectRatio={1 / 1}
                        preview=".img-preview"
                        guides={false}
                        src={logo}
                        ref={cropper => {
                          this.cropper = cropper;
                        }}
                      />
                    </figure>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card-body" style={{ padding: 0 }}>
                    <figure>
                      <div
                        className="img-preview"
                        style={{
                          width: "100%",
                          height: 400,
                          overflow: "hidden"
                        }}
                      />
                    </figure>
                  </div>
                </div>
                <div className="col-md-12 text-right">
                  <button
                    className="fieldsight-btn"
                    style={{ marginTop: "15px" }}
                    onClick={this.saveImage}
                  >
                    Save Image
                  </button>
                </div>
              </div>
            </Modal>
          )}
          {showSubsites && (
            <Modal
              title="Subsites"
              toggleModal={() => closeModal("Subsites")}
              showButton={enableSubsites && hasWritePermission}
              url={`/fieldsight/site/add/subsite/${projectId}/${siteId}`}
            >
              {subSitesLoader ? (
                <DotLoader />
              ) : (
                <PerfectScrollbar>
                  <Table
                    responsive="xl"
                    className="table  table-bordered  dataTable "
                  >
                    <thead>
                      <tr>
                        <th>Identifier</th>
                        <th>Name</th>

                        <th>Progress</th>
                        <th>Submissions</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subSites.map((subSite, i) => (
                        <tr key={i}>
                          <Td to={`/site-dashboard/${subSite.id}`}>
                            {subSite.identifier}
                          </Td>
                          <Td to={`/site-dashboard/${subSite.id}`}>
                            {subSite.name}
                          </Td>

                          <Td to={`/site-dashboard/${subSite.id}`}>
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                aria-valuenow="40"
                                aria-valuemin="0"
                                aria-valuemax="200"
                                style={{ width: subSite.progress + "%" }}
                              >
                                <span className="progress-count">
                                  {subSite.progress + "%"}
                                </span>
                              </div>
                            </div>
                          </Td>
                          <Td to={`/site-dashboard/${subSite.id}`}>
                            {subSite.submission}
                          </Td>
                          <Td to={`/site-dashboard/${subSite.id}`}>
                            {subSite.type}
                          </Td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </PerfectScrollbar>
              )}
            </Modal>
          )}
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
