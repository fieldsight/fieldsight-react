import React, { Component } from "react";
import Gallery from "react-grid-gallery";
import { GridContentLoader } from "../../common/Loader";

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
    selectedImage: {}
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

  render() {
    const {
      props: { recentPictures, showContentLoader },
      state: { selectedImage },
      gotoPrevious,
      gotoNext,
      showModal,
      closeModal
    } = this;
    return (
      <>
        {showContentLoader ? (
          <GridContentLoader number={window.innerWidth < 992 ? 2 : 6} />
        ) : (
          <>
            <div className="gallery">
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
                      <figcaption>
                        <a
                          onClick={() => showModal(image, i)}
                          className="photo-preview"
                        >
                          <i className="la la-eye" />
                        </a>
                      </figcaption>
                    </div>
                  </div>
                ))}
              </div>
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
      </>
    );
  }
}

export default PhotoGallery;
