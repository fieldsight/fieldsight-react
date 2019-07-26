import React from "react";
import Gallery from "react-grid-gallery";

const getImages = images => {
  return images.map(image => ({
    src: image._attachments.download_url
      ? image._attachments.download_url
      : image._attachments,
    thumbnail: image._attachments.download_url
      ? image._attachments.download_url
      : image._attachments,
    thumbnailWidth: 300,
    thumbnailHeight: 174,
    isSelected: false
  }));
};

const PhotoGallery = ({ recentPictures }) => (
  <Gallery images={getImages(recentPictures)} />
);

export default PhotoGallery;
