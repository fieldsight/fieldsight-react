import React, { Component, Fragment, createRef } from "react";
import {
  Map,
  TileLayer,
  LayersControl,
  Marker,
  Popup,
  FeatureGroup
} from "react-leaflet";

import { BlockContentLoader } from "./Loader";
import { markerIcon } from "../common/Marker";

const MyPopupMarker = props => (
  <Marker
    position={[props.geometry.coordinates[1], props.geometry.coordinates[0]]}
    icon={markerIcon}
  >
    <Popup>
      <a href={props.url} target="_blank">
        {props.properties.name}
      </a>
    </Popup>
  </Marker>
);

const MyMarkersList = data => {
  const items =
    !!data &&
    !!data.markers &&
    data.markers.map((props, key) => <MyPopupMarker key={key} {...props} />);

  return <Fragment>{items}</Fragment>;
};

class SiteMap extends Component {
  constructor(props) {
    super(props);
    this.mapRef = createRef();
    this.refMarkers = createRef();
  }

  getMarkerBounds = () => {
    const map =
      this.mapRef && this.mapRef.current && this.mapRef.current.leafletElement;
    const marker =
      this.refMarkers &&
      this.refMarkers.current &&
      this.refMarkers.current.leafletElement;
    console.log(map, "check", marker);

    // !!map && !!marker && map.fitBounds(marker.getBounds());
  };

  render() {
    const { map, showContentLoader } = this.props;

    return (
      <>
        {showContentLoader ? (
          <BlockContentLoader number={1} height="395px" />
        ) : !!map && !!map.features && map.features.length > 0 ? (
          <Map
            center={[
              map.features[0].geometry.coordinates[1],
              map.features[0].geometry.coordinates[0]
            ]}
            zoom={13}
            style={{ width: "100%", height: "396px" }}
            ref={this.mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LayersControl position="topright">
              <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="OpenStreetMap.Mapnik">
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>
            </LayersControl>
            <FeatureGroup
              color="purple"
              ref={this.refMarkers}
              load={this.getMarkerBounds()}
            >
              <MyMarkersList markers={map.features} />
            </FeatureGroup>
          </Map>
        ) : (
          <Map zoom={13} style={{ width: "100%", height: "396px" }}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LayersControl position="topright">
              <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="OpenStreetMap.Mapnik">
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>
            </LayersControl>
          </Map>
        )}
      </>
    );
  }
}

export default SiteMap;
