import React, { Component } from 'react';
import {Map, TileLayer, LayersControl, Marker, Popup, FeatureGroup, Circle} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const position = [27.7, 85.4];
const icon="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png";


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
                  {/* <LayersControl.Overlay name="Marker with popup"> */}
                    <Marker position={[27.7, 85.4]}>
                      <Popup>
                        <span>
                          A pretty CSS3 popup. <br /> Easily customizable.
                        </span>
                      </Popup>
                    </Marker>
                    <Marker position={[27.8, 85.4]}>
                      <Popup>
                        <span>
                          A pretty CSS3 popup. <br /> Easily customizable.
                        </span>
                      </Popup>
                    </Marker>
                
                </LayersControl>
            </Map>
    );
  }
}

export default CustomMap;