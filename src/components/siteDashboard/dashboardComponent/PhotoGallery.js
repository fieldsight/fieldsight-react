import React, { Component } from "react";
import Gallery from "react-grid-gallery";
import { GridContentLoader } from "../../common/Loader";
import { Dropdown } from "react-bootstrap";
import Modal from "../../common/Modal";
import axios from "axios";

const GalleryModal = ({
  selectedImage,
  imagesNumber,
  gotoPrevious,
  gotoNext,
  closeModal
}) => (
  <div
    className="gallery-zoom fieldsight-popup open"
    style={{ zIndex: 99999 }}
    onClick={closeModal}
  >
    <div className="gallery-body">
      <img
        src={
          selectedImage._attachments.download_url
            ? selectedImage._attachments.download_url
            : selectedImage._attachments
        }
        alt="infographic"
        style={{ maxHeight: "400px" }}
      />
      <div className="gallery-footer">
        <p>
          <span>
            {selectedImage.index + 1} of {imagesNumber}{" "}
          </span>
        </p>
      </div>
    </div>
    <span className="popup-close" onClick={closeModal}>
      <i className="la la-close" />
    </span>
    <div className="gallery-nav">
      <i
        className="la la-long-arrow-left"
        onClick={e => {
          e.stopPropagation();
          gotoPrevious(selectedImage.index);
        }}
      />
      <i
        className="la la-long-arrow-right"
        onClick={e => {
          e.stopPropagation();
          gotoNext(selectedImage.index);
        }}
      />
    </div>
  </div>
);

class PhotoGallery extends Component {
  state = {
    selectedImage: {},
    data:"",
    response:false

  };

  showModal = (img, i) => {
    const imgWithIndex = { ...img, index: i };
    this.setState({
      selectedImage: imgWithIndex
    });
  };

  closeModal = () => {
    this.setState({
      selectedImage: {}
    });
  };

  gotoPrevious = i => {
    if (i === 0) {
      const selectedImage = {
        ...this.props.recentPictures[this.props.recentPictures.length - 1],
        index: this.props.recentPictures.length - 1
      };

      return this.setState({
        selectedImage: selectedImage
      });
    }

    const selectedImage = {
      ...this.props.recentPictures[i - 1],
      index: i - 1
    };
    this.setState({
      selectedImage: selectedImage
    });
  };

  gotoNext = i => {
    if (i === this.props.recentPictures.length - 1) {
      const selectedImage = {
        ...this.props.recentPictures[0],
        index: 0
      };
      return this.setState({
        selectedImage: selectedImage
      });
    }

    const selectedImage = {
      ...this.props.recentPictures[i + 1],
      index: i + 1
    };

    this.setState({
      selectedImage: selectedImage
    });
  };

  imageQuality = (imageid,siteId) =>{
    axios
    .get(`/fv3/api/zip-site-images/${siteId}/${imageid}/`)
     .then( res => { 
      if (res.status===200){
         this.setState({
           data:res.data.message,
           response:true

         })

       }
       
    })
    .catch(err => {
      // dispatch({
      //   type: SITE_DASHBOARD_ERR
      // });
    });
    
  }

  render() {
    const {
      props: { recentPictures, showContentLoader, siteId },
      state: { selectedImage },
      gotoPrevious,
      gotoNext,
      showModal,
      closeModal
    } = this;
    
    
    return (
      <div className="col-lg-6">
        <div className="card recent-photo">
          <div className="card-header main-card-header sub-card-header">
            <h5>Recent Pictures</h5>
            {recentPictures.length > 0 ? (
              <div className="dash-btn">
              <a
                href={`/fieldsight/site/all-pictures/${siteId}/`}
                className="fieldsight-btn"
                target="_blank"
              >
                view all
              </a>
              <Dropdown>
              <Dropdown.Toggle
                variant=""
                id="dropdown-Data"
                className="fieldsight-btn"
              >
                <i className="la la-download"/>
                <span> Download</span>
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu-right">
              <Dropdown.Item  target="_blank" onClick={()=>this.imageQuality(0,siteId)}>
                         Low
                    </Dropdown.Item>
                    <Dropdown.Item  target="_blank"  onClick={()=>this.imageQuality(1,siteId)}>
                          Medium
                    </Dropdown.Item>
                    <Dropdown.Item  target="_blank"  onClick={()=>this.imageQuality(2,siteId)}>
                       High
                    </Dropdown.Item>
               
              
              </Dropdown.Menu>
            </Dropdown>
              </div>
            ) : null}
          </div>
          <div className="card-body">
            {showContentLoader ? (
              <GridContentLoader
                number={window.innerWidth < 992 ? 2 : 6}
                height="180px"
              />
            ) : (
              <>
                <div className="gallery">
                  {recentPictures.length > 0 ? (
                    <div className="row">
                      {recentPictures.map((image, i) => (
                        <div className="col-lg-4 col-md-6" key={i}>
                          <div
                            className="photo-item"
                            style={{
                              backgroundImage: `url(
                              ${
                                image._attachments.download_url
                                  ? image._attachments.download_url
                                  : image._attachments
                              }
                            )`
                            }}
                          >
                            <figcaption onClick={() => showModal(image, i)}>
                              <a className="photo-preview">
                                <i className="la la-eye" />
                              </a>
                            </figcaption>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p> No Data Available </p>
                  )}
                </div>
                {Object.keys(selectedImage).length > 0 && (
                  <GalleryModal
                    selectedImage={selectedImage}
                    imagesNumber={recentPictures.length}
                    gotoNext={gotoNext}
                    gotoPrevious={gotoPrevious}
                    closeModal={closeModal}
                  />
                )}
              </>
            )}
          </div>
        </div>
        {this.state.response &&
               (<Modal title="Message" toggleModal={()=>this.setState({response:false})}>
                       <div className="response">
                           <p>{this.state.data}</p>
                      </div>
                  </Modal>
                  )}

      </div>
    );
  }
}

export default PhotoGallery;
