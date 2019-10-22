import React, { Component, createRef } from "react";
import {
  Map,
  TileLayer,
  LayersControl,
  Marker,
  Popup,
  FeatureGroup,
  Circle
} from "react-leaflet";
// import "leaflet/dist/leaflet.css";

import { BlockContentLoader } from "../../common/Loader";
import { markerIcon } from "../../common/Marker";
// const position = [27.7, 85.4];

class SiteMap extends Component {
  constructor(props) {
    super(props);
    this.mapRef = createRef();
    this.featureRef = createRef();
  }

  getMarkerBounds = () => {
    const map =
      this.mapRef && this.mapRef.current && this.mapRef.current.leafletElement;
    const feature =
      this.featureRef &&
      this.featureRef.current &&
      this.featureRef.current.leafletElement;
    if (!!map && !!feature) {
      map.fitBounds(feature.getBounds());
    }
  };
  render() {
    const {
      location: { coordinates },
      name,
      address,
      showContentLoader
    } = this.props;

    return (
      <>
        {showContentLoader ? (
          <BlockContentLoader number={1} height="395px" />
        ) : (
          <Map
            center={[coordinates[1], coordinates[0]]}
            zoom={13}
            style={{ width: "100%", height: "396px" }}
            ref={this.mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LayersControl position="topright">
              <LayersControl.BaseLayer name="OpenStreetMap">
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="google Streets">
                <TileLayer
                  attribution='&copy; <a href="http://maps.google.com">Google Maps</a> contributors'
                  maxZoom="20"
                  subdomains={["mt0", "mt1", "mt2", "mt3"]}
                  url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="google Hybrid">
                <TileLayer
                  attribution='&copy; <a href="http://maps.google.com">Google Maps</a> contributors'
                  maxZoom="20"
                  subdomains={["mt0", "mt1", "mt2", "mt3"]}
                  url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="google Satellite">
                <TileLayer
                  attribution='&copy; <a href="http://maps.google.com">Google Maps</a> contributors'
                  maxZoom="20"
                  subdomains={["mt0", "mt1", "mt2", "mt3"]}
                  url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="google Terrain">
                <TileLayer
                  attribution='&copy; <a href="http://maps.google.com">Google Maps</a> contributors'
                  maxZoom="20"
                  subdomains={["mt0", "mt1", "mt2", "mt3"]}
                  url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
                />
              </LayersControl.BaseLayer>
            </LayersControl>
            <FeatureGroup
              color="purple"
              ref={this.featureRef}
              // load={this.getMarkerBounds()}
            >
              <Marker
                position={[coordinates[1], coordinates[0]]}
                icon={markerIcon}
              >
                <Popup>
                  <span>Name: {name}</span>
                  <br />
                  {address && <span>Address: {address}</span>}
                </Popup>
              </Marker>
            </FeatureGroup>
          </Map>
        )}
      </>
    );
  }
}

export default SiteMap;
