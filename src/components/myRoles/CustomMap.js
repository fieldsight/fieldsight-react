import React, { Component } from "react";
import {
  Map,
  TileLayer,
  LayersControl,
  Marker,
  Popup,
  FeatureGroup,
  Circle
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const position = [27.7, 85.4];

let baseURL = window.base_url
  ? window.base_url
  : "https://fieldsight.naxa.com.np/fieldsight/application";

class CustomMap extends Component {
  render() {
    return (
      <Map
        center={position}
        zoom={7}
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
          {/* <LayersControl.Overlay name="Marker with popup"> */}
          {this.props.activity.map((item, i) => {
            return item.geometry.coordinates.filter(Boolean).length > 0 ? (
              <Marker position={item.geometry.coordinates} key={i}>
                <Popup>
                  <a
                    href={baseURL + item.properties.detail_url}
                    target="_blank"
                  >
                      <div className="content">
                        <h5>{item.properties.form}</h5>
                       
                      </div>
                  </a>
                </Popup>
              </Marker>
            ) : null;
          })}
        </LayersControl>
      </Map>
    );
  }
}

export default CustomMap;
