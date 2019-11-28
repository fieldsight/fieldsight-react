import React, { Component, createRef } from 'react';
import {
  Map,
  TileLayer,
  LayersControl,
  GeoJSON,
} from 'react-leaflet';
import L, { latLngBounds } from 'leaflet';

import { BlockContentLoader } from './Loader';

/* eslint-disable  */

const { BaseLayer } = LayersControl;

class SiteMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapData: props.map ? props.map : {},
      bound: latLngBounds(
        [29.38217507514529, 87.5390625],
        [27.293689224852407, 81.474609375],
      ),
    };
    this.mapRef = createRef();
    this.groupRef = createRef();
  }

  componentDidUpdate(prevProps) {
    const { map } = this.props;
    if (prevProps.map !== map) {
      this.setState({
        mapData: map,
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
      iconUrl: require('../../static/images/marker.png'),
      iconRetinaUrl: require('../../static/images/marker.png'),
      iconSize: [28, 28],
      iconAnchor: [13, 27],
      popupAnchor: [2, -24],
      shadowUrl: null,
      shadowSize: null,
      shadowAnchor: null,
      //iconSize: new L.Point(60, 75)
      //className: "leaflet-div-icon"
    });
    return L.marker(latlng, { icon: icon });
  }

  getSmallBound = latlng => {
    if (Object.entries(latlng).length > 0) {
      const { lat, lng } = latlng;
      const bounds = latLngBounds(
        [lat + 0.002, lng + 0.002],
        [lat - 0.002, lng - 0.002],
      );
      return bounds;
    }
  };
  getLargeBound = latlng => {
    let bounds = latLngBounds();
    latlng.forEach(data => {
      bounds.extend([
        data.geometry.coordinates[1],
        data.geometry.coordinates[0],
      ]);
    });
    return bounds;
  };
  returnGeoArr = (loc1, loc2) => {
    if (
      loc1.geometry.coordinates[0] == loc2.geometry.coordinates[0] &&
      loc1.geometry.coordinates[1] == loc2.geometry.coordinates[1]
    ) {
      return null;
    } else {
      return loc2;
    }
  };
  render() {
    const {
      props: { showContentLoader },
      state: { mapData },
    } = this;

    let bounds = latLngBounds();

    if (mapData && mapData.features && mapData.features.length > 0) {
      if (mapData.features.length == 1) {
        const latlng = {
          lat: mapData.features[0].geometry.coordinates[1],
          lng: mapData.features[0].geometry.coordinates[0],
        };
        bounds = this.getSmallBound(latlng);
      } else if (mapData.features.length > 1) {
        let newArr = [];

        mapData.features.forEach((data, index) => {
          newArr.length == 0 && newArr.push(data);
          if (
            !!mapData.features[index] &&
            !!mapData.features[index + 1]
          ) {
            const objGeo = this.returnGeoArr(
              mapData.features[index],
              mapData.features[index + 1],
            );

            if (!!objGeo) {
              newArr.push(objGeo);
            }
          }
        });

        if (newArr.length == 1) {
          const latlng = {
            lat: newArr[0].geometry.coordinates[1],
            lng: newArr[0].geometry.coordinates[0],
          };
          bounds = this.getSmallBound(latlng);
        } else {
          newArr.map(data => {
            bounds.extend([
              data.geometry.coordinates[1],
              data.geometry.coordinates[0],
            ]);
          });
        }
      }
    }

    return (
      <>
        {showContentLoader ? (
          <BlockContentLoader number={1} height="395px" />
        ) : !!mapData.features && mapData.features.length > 0 ? (
          <Map
            center={[
              mapData.features[0].geometry.coordinates[1],
              mapData.features[0].geometry.coordinates[0],
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
            style={{ width: '100%', height: '396px' }}
            ref={this.mapRef}
          >
            {/* <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> */}
            <LayersControl position="topright">
              <BaseLayer checked name="OpenStreetMap">
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  maxZoom={20}
                />
              </BaseLayer>
              <BaseLayer name="Google Streets">
                <TileLayer
                  attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                  url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                  maxZoom={20}
                  subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                />
              </BaseLayer>
              <BaseLayer name="Google Hybrid">
                <TileLayer
                  attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                  url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                  maxZoom={20}
                  subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                />
              </BaseLayer>
              <BaseLayer name="Google Satellite">
                <TileLayer
                  attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                  url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                  maxZoom={20}
                  subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                />
              </BaseLayer>
              <BaseLayer name="Google Terrain">
                <TileLayer
                  attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                  url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
                  maxZoom={20}
                  subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                />
              </BaseLayer>
            </LayersControl>
            <GeoJSON
              data={mapData}
              onEachFeature={this.onEachFeaturePoint.bind(this)}
              pointToLayer={this.pointToLayer.bind(this)}
              ref={this.groupRef}
            />
          </Map>
        ) : (
          <Map zoom={13} style={{ width: '100%', height: '396px' }}>
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
                  subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                />
              </BaseLayer>
              <BaseLayer name="Google Hybrid">
                <TileLayer
                  attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                  url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                  maxZoom={20}
                  subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                />
              </BaseLayer>
              <BaseLayer name="Google Satellite">
                <TileLayer
                  attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                  url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                  maxZoom={20}
                  subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                />
              </BaseLayer>
              <BaseLayer name="Google Terrain">
                <TileLayer
                  attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                  url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
                  maxZoom={20}
                  subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
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
