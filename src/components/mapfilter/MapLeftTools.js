import React, { PureComponent } from 'react';

class MapLeftTools extends PureComponent {
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
      exportLandscapeClick,
      exportPortraitClick,
    } = this.props;
    return (
      <>
        <div className="map-tool top">
          <a
            // href="#"
            onClick={zoomInClick}
            onKeyPress={zoomInClick}
            data-toggle="tooltip"
            title="Zoom In"
            data-placement="right"
            role="button"
            tabIndex={0}
          >
            <i className="la la-plus" />
          </a>
          <a
            onClick={zoomOutClick}
            onKeyPress={zoomOutClick}
            data-toggle="tooltip"
            title="Zoom Out"
            data-placement="right"
            role="button"
            tabIndex={0}
          >
            <i className="la la-minus" />
          </a>
          {/* <a
            onClick={refreshClick}
            onKeyPress={refreshClick}
            data-toggle="tooltip"
            title="Drag"
            data-placement="right"
            role="button"
            tabIndex={0}
          >
            <i className="la la-hand-paper-o" />
          </a> */}
          <a
            onClick={refreshClick}
            onKeyPress={refreshClick}
            data-toggle="tooltip"
            title="Refresh"
            data-placement="right"
            role="button"
            tabIndex={0}
          >
            <i className="la la-refresh" />
          </a>
        </div>
        <div className="map-tool bottom" style={{ top: '150.966px' }}>
          <a
            onClick={scaleClick}
            onKeyPress={scaleClick}
            data-toggle="tooltip"
            title="Measurement"
            data-placement="right"
            role="button"
            tabIndex={0}
          >
            <img
              alt="ruler"
              width="20px"
              src="/static/images/ruler.png"
            />
            {/* <i className="las la-ruler" /> */}
          </a>

          <a>
            <i className="la la-download" />
            <ul>
              <li
                onClick={exportLandscapeClick}
                onKeyPress={exportLandscapeClick}
                role="presentation"
                data-toggle="tooltip"
                title="ExportLandscape"
                data-placement="right"
              >
                Landscape
              </li>
              <li
                onClick={exportPortraitClick}
                onKeyPress={exportPortraitClick}
                role="presentation"
                data-toggle="tooltip"
                title="ExportPortrait"
                data-placement="right"
              >
                Potrait
              </li>
            </ul>
          </a>
          {/* <a
            data-toggle="tooltip"
            title="Share"
            data-placement="right"
            data-tab="share-popup"
          >
            <i className="la la-share-alt" />
          </a>

          <a>
            <i className="la la-save" />
            <ul>
              <li>save</li>
              <li data-tab="map-list">save list</li>
            </ul>
          </a> */}
        </div>
      </>
    );
  }
}

export default MapLeftTools;
