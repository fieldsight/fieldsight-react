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

// const position = [27.7, 85.4];

class SiteMap extends Component {
  render() {
    const {
      location: { coordinates },
      name,
      address
    } = this.props;

    return (
      <>
        {coordinates && (
          <Map
            center={[coordinates[1], coordinates[0]]}
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

              <LayersControl.Overlay name="Feature group">
                <FeatureGroup color="purple">
                  <Popup>
                    <span>Popup in FeatureGroup</span>
                  </Popup>
                  <Circle
                    center={[coordinates[1], coordinates[0]]}
                    radius={200}
                  />
                </FeatureGroup>
              </LayersControl.Overlay>
            </LayersControl>
            {/* <LayersControl.Overlay name="Marker with popup"> */}
            <Marker position={[coordinates[1], coordinates[0]]}>
              <Popup>
                <span>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </span>
              </Popup>
            </Marker>
            {/* </LayersControl.Overlay> */}
          </Map>
        )}
      </>
      // <Fragment>
      //   {coordinates && (
      //     <Map
      //       style={{ height: "396px" }}
      //       center={[coordinates[1], coordinates[0]]}
      //       zoom={13}
      //     >
      //       <TileLayer
      //         attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      //       />
      //       <Marker position={[coordinates[1], coordinates[0]]}>
      //         <Popup>
      //           <b>Name: </b>
      //           {name}
      //           <br />
      //           <b>Address: </b>
      //           {address}
      //         </Popup>
      //       </Marker>
      //     </Map>
      //   )}
      // </Fragment>
    );
  }
}

export default SiteMap;
