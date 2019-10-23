import React, { Component, Fragment, createRef } from "react";
//import { MDBDataTable } from 'mdbreact';
import {
  Map,
  TileLayer,
  LayersControl,
  Marker,
  Popup,
  GeoJSON
} from "react-leaflet";
import L, { latLngBounds } from "leaflet";
// import "leaflet/dist/leaflet.css";

import { BlockContentLoader } from "./Loader";
import { markerIcon } from "./Marker";

const { BaseLayer } = LayersControl;
// const position = [27.7, 85.4];

// const MyMarkersList = data => {
//   const items = data.markers.map((props, key) => (
//     <MyPopupMarker key={key} {...props} />
//   ));
//   return <Fragment>{items}</Fragment>;
// };

// const MyPopupMarker = props => (
//   <Marker
//     position={[props.geometry.coordinates[1], props.geometry.coordinates[0]]}
//     icon={markerIcon}
//   >
//     <Popup>
//       <a href={props.url} target="_blank">
//         {props.properties.name}
//       </a>
//     </Popup>
//   </Marker>
// );

class SiteMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapData: props.map ? props.map : {},
      bound: latLngBounds(
        [29.38217507514529, 87.5390625],
        [27.293689224852407, 81.474609375]
      )
    };
    this.mapRef = createRef();
    this.groupRef = createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.map !== this.props.map) {
      this.setState({
        mapData: this.props.map
      });
    }
  }
  onEachFeaturePoint(feature, layer) {
    layer.bindPopup(`<a href=${feature.url} target="_blank">
    ${feature.properties.name}
  </a>`);
  }

  pointToLayer(feature, latlng) {
    const icon = new L.Icon({
      iconUrl: require("../../static/images/marker.png"),
      iconRetinaUrl: require("../../static/images/marker.png"),
      iconSize: [28, 28],
      iconAnchor: [13, 27],
      popupAnchor: [2, -24],
      shadowUrl: null,
      shadowSize: null,
      shadowAnchor: null
      //iconSize: new L.Point(60, 75)
      //className: "leaflet-div-icon"
    });
    return L.marker(latlng, { icon: icon });
  }

  render() {
    const {
      props: { showContentLoader },
      state: { mapData }
    } = this;

    let bounds = latLngBounds();
    mapData &&
      mapData.features &&
      mapData.features.forEach(data => {
        bounds.extend([
          data.geometry.coordinates[1],
          data.geometry.coordinates[0]
        ]);
      });

    return (
      <>
        {showContentLoader ? (
          <BlockContentLoader number={1} height="395px" />
        ) : !!mapData.features && mapData.features.length > 0 ? (
          <Map
            center={[
              mapData.features[0].geometry.coordinates[1],
              mapData.features[0].geometry.coordinates[0]
            ]}
            zoom={15}
            maxZoom={20}
            attributionControl={true}
            zoomControl={true}
            doubleClickZoom={true}
            scrollWheelZoom={true}
            dragging={true}
            animate={true}
            easeLinearity={0.35}
            bounds={bounds}
            ref={this.mapRef}
            style={{ width: "100%", height: "396px" }}
            ref={this.mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LayersControl position="topright">
              <BaseLayer checked name="OpenStreetMap">
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </BaseLayer>
              <BaseLayer name="Google Streets">
                <TileLayer
                  attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                  url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                  maxZoom={20}
                  subdomains={["mt0", "mt1", "mt2", "mt3"]}
                />
              </BaseLayer>
              <BaseLayer name="Google Hybrid">
                <TileLayer
                  attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                  url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                  maxZoom={20}
                  subdomains={["mt0", "mt1", "mt2", "mt3"]}
                />
              </BaseLayer>
              <BaseLayer name="Google Satellite">
                <TileLayer
                  attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                  url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                  maxZoom={20}
                  subdomains={["mt0", "mt1", "mt2", "mt3"]}
                />
              </BaseLayer>
              <BaseLayer name="Google Terrain">
                <TileLayer
                  attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                  url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
                  maxZoom={20}
                  subdomains={["mt0", "mt1", "mt2", "mt3"]}
                />
              </BaseLayer>
            </LayersControl>
            <GeoJSON
              data={mapData}
              onEachFeature={this.onEachFeaturePoint.bind(this)}
              pointToLayer={this.pointToLayer.bind(this)}
              ref={this.groupRef}
            />

            {/* <MyMarkersList markers={map.features} /> */}
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
          <Map zoom={13} style={{ width: "100%", height: "396px" }}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LayersControl position="topright">
              <BaseLayer checked name="OpenStreetMap">
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </BaseLayer>
              <BaseLayer name="Google Streets">
                <TileLayer
                  attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                  url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                  maxZoom={20}
                  subdomains={["mt0", "mt1", "mt2", "mt3"]}
                />
              </BaseLayer>
              <BaseLayer name="Google Hybrid">
                <TileLayer
                  attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                  url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                  maxZoom={20}
                  subdomains={["mt0", "mt1", "mt2", "mt3"]}
                />
              </BaseLayer>
              <BaseLayer name="Google Satellite">
                <TileLayer
                  attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                  url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                  maxZoom={20}
                  subdomains={["mt0", "mt1", "mt2", "mt3"]}
                />
              </BaseLayer>
              <BaseLayer name="Google Terrain">
                <TileLayer
                  attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                  url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
                  maxZoom={20}
                  subdomains={["mt0", "mt1", "mt2", "mt3"]}
                />
              </BaseLayer>
            </LayersControl>
          </Map>
        )}
      </>
    );
  }
}

export default SiteMap;
