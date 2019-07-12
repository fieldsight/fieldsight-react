import React, { Component } from 'react';
//import { MDBDataTable } from 'mdbreact';
import {Map, TileLayer, LayersControl, Marker, Popup, FeatureGroup, Circle} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const position = [27.7, 85.4];


class CustomMap extends Component {
  render() {
    return (
            <Map center={position} zoom={7} style={{ width:'100%', height:'396px'}}>
              
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
                  <LayersControl.Overlay name="Marker with popup">
                    <Marker position={[27.7, 85.4]}>
                      <Popup>
                        <span>
                          A pretty CSS3 popup. <br /> Easily customizable.
                        </span>
                      </Popup>
                    </Marker>
                  </LayersControl.Overlay>
                  <LayersControl.Overlay name="Feature group">
                    <FeatureGroup color="purple">
                      <Popup>
                        <span>Popup in FeatureGroup</span>
                      </Popup>
                      <Circle center={[27.7, 85.4]} radius={200} />
                    </FeatureGroup>
                  </LayersControl.Overlay>
                </LayersControl>
            </Map>
    );
  }
}

export default CustomMap;