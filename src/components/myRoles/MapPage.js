import React, { PureComponent } from 'react';
import {
  Map,
  TileLayer,
  LayersControl,
  Marker,
  Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key  */

const position = [27.7, 85.4];

class MapPage extends PureComponent {
  render() {
    return (
      <div>
        <Map
          center={position}
          zoom={7}
          style={{ width: '100%', height: '600px' }}
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
            {this.props.mapData.map((item, i) => {
              return (
                item.geometry.coordinates.filter(Boolean).length >
                  0 && (
                  <Marker
                    position={item.geometry.coordinates}
                    key={i}
                  >
                    <Popup>
                      <a
                        href={item.properties.detail_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="content">
                          <h5>{item.properties.form}</h5>
                        </div>
                      </a>
                    </Popup>
                  </Marker>
                )
              );
            })}
          </LayersControl>
        </Map>
      </div>
    );
  }
}

export default MapPage;
