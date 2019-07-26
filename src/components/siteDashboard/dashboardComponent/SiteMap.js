import React, { Component, Fragment } from "react";
//import { MDBDataTable } from 'mdbreact';
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

// const position = [27.7, 85.4];

class SiteMap extends Component {
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

              {/* <LayersControl.Overlay name="Feature group">
                <FeatureGroup color="purple">
                  <Popup>
                    <span>Popup in FeatureGroup</span>
                  </Popup>
                  <Circle
                    center={[coordinates[1], coordinates[0]]}
                    radius={200}
                  />
                </FeatureGroup>
              </LayersControl.Overlay> */}
            </LayersControl>

            <Marker position={[coordinates[1], coordinates[0]]}>
              <Popup>
                <span>Name: {name}</span>
                <br />
                {address && <span>Address: {address}</span>}
              </Popup>
            </Marker>
          </Map>
        )}
      </>
    );
  }
}

export default SiteMap;
