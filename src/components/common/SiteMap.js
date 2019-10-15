import React, { Component, Fragment, createRef } from "react";
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

class SiteMap extends Component {
  constructor(props) {
    super(props);
    this.mapRef = createRef();
    this.refMarkers = createRef();
  }

  componentDidMount() {
    this.element = this.refs;
    console.log("elements", this.element);
  }

  getMarkerBounds = () => {
    const map = this.refs;
    // const boundMarker = this.refMarkers.current.leafletElement;
    // const bounds = map.fitBounds(boundMarker.getBounds());
    console.log("bound----", map);
  };

  myMarkersList = data => {
    console.log("in list");

    const items =
      !!data &&
      !!data.markers &&
      data.markers.map((props, key) => (
        // <MyPopupMarker key={key} {...props} ref={ref} />
        // this.myPopupMarker(props)
        <Marker
          position={[
            props.geometry.coordinates[1],
            props.geometry.coordinates[0]
          ]}
          ref={"markers"}
        >
          <Popup>
            <a href={props.url} target="_blank">
              {props.properties.name}
            </a>
          </Popup>
        </Marker>
      ));

    return <Fragment>{items}</Fragment>;
  };

  myPopupMarker = props => (
    <Marker
      position={[props.geometry.coordinates[1], props.geometry.coordinates[0]]}
      ref={"markers"}
    >
      <Popup>
        <a href={props.url} target="_blank">
          {props.properties.name}
        </a>
      </Popup>
    </Marker>
  );

  render() {
    const { map, showContentLoader } = this.props;
    // console.log("map data", map);

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
            ref={"map"}
            onClick={this.getMarkerBounds}
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
            {this.myMarkersList(map.features)}
            {/* <MyMarkersList markers={map.features} ref={this.refMarkers} /> */}
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
