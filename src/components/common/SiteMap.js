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

import { BlockContentLoader } from "./Loader";

// const position = [27.7, 85.4];
const MyMarkersList = data => {
  const items = data.markers.map((props, key) => (
    <MyPopupMarker key={key} {...props} />
  ));
  return <Fragment>{items}</Fragment>;
};

const MyPopupMarker = props => (
  <Marker
    position={[props.geometry.coordinates[1], props.geometry.coordinates[0]]}
  >
    <Popup>
      <a href={props.url} target="_blank">
        {props.properties.name}
      </a>
    </Popup>
  </Marker>
);

class SiteMap extends Component {
  render() {
    const { map, showContentLoader } = this.props;

    return (
      <>
        {showContentLoader ? (
          <BlockContentLoader number={1} height="395px" />
        ) : !!map.features && map.features.length > 0 ? (
          <Map
            center={[
              map.features[0].geometry.coordinates[1],
              map.features[0].geometry.coordinates[0]
            ]}
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
            </LayersControl>
            <MyMarkersList markers={map.features} />
            {/* {map.features.map((each, idx) => {
              const name = each.properties.name;
              const location = each.geometry.coordinates;
              const url = each.url;
              return (
                <Marker position={[location[1], location[0]]} key={`map${idx}`}>
                  <Popup>
                    <span>
                      <a href={url}>Name: {name}</a>
                    </span>
                    <br />
                  </Popup>
                </Marker>
              );
            })} */}
          </Map>
        ) : (
          <Map
            // center={[coordinates[1], coordinates[0]]}
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

            {/* <Marker position={[coordinates[1], coordinates[0]]}>
              <Popup>
                <span>Name: {name}</span>
                <br />
                {address && <span>Address: {address}</span>}
              </Popup>
            </Marker> */}
          </Map>
        )}
      </>
    );
  }
}

export default SiteMap;
