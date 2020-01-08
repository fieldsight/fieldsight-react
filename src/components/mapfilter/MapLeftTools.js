import React, { Component, Fragment } from "react";

class MapLeftTools extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      zoomInClick,
      zoomOutClick,
      refreshClick,
      scaleClick,
      exportClick
    } = this.props;
    return (
      <Fragment>
        <div className="map-tool top">
          <a
            // href="#"
            onClick={zoomInClick}
            data-toggle="tooltip"
            title="Zoom In"
            data-placement="right"
          >
            <i className="la la-plus"></i>
          </a>
          <a
            onClick={zoomOutClick}
            data-toggle="tooltip"
            title="Zoom Out"
            data-placement="right"
          >
            <i className="la la-minus"></i>
          </a>
          <a
            onClick={refreshClick}
            href="#"
            data-toggle="tooltip"
            title="Drag"
            data-placement="right"
          >
            <i className="la la-hand-paper-o"></i>
          </a>
          <a
            onClick={refreshClick}
            data-toggle="tooltip"
            title="Refresh"
            data-placement="right"
          >
            <i className="la la-refresh"></i>
          </a>
        </div>
        <div className="map-tool bottom" style={{ top: "150.966px" }}>
          <a
            onClick={scaleClick}
            data-toggle="tooltip"
            title="Measurement"
            data-placement="right"
          >
            <i className="la la-server"></i>
          </a>
          <a
            onClick={exportClick}
            data-toggle="tooltip"
            title="Export"
            data-placement="right"
          >
            <i className="la la-download"></i>
          </a>
          <a
            href="#"
            data-toggle="tooltip"
            title="Share"
            data-placement="right"
            data-tab="share-popup"
          >
            <i className="la la-share-alt"></i>
          </a>
          <a href="#">
            <i className="la la-save"></i>
            <ul>
              <li>save</li>
              <li data-tab="map-list">save list</li>
            </ul>
          </a>
        </div>
      </Fragment>
    );
  }
}

export default MapLeftTools;
