import React, { Component, createRef } from 'react';
import {
  Map,
  TileLayer,
  LayersControl,
  GeoJSON,
} from 'react-leaflet';
import L, { latLngBounds } from 'leaflet';
import { BlockContentLoader } from '../../common/Loader';

const { BaseLayer } = LayersControl;

class SiteMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };

    this.mapRef = createRef();
    this.groupRef = createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ data: this.props });
    }
  }

  onEachFeaturePoint(feature, layer) {
    layer.bindPopup(`<span>Name: ${feature.properties.name}</span>
    <br />
    {address && <span>Address: ${feature.properties.address}</span>}`);
  }

  pointToLayer(feature, latlng) {
    const icon = new L.Icon({
      iconUrl: require('../../../static/images/marker.png'),
      iconRetinaUrl: require('../../../static/images/marker.png'),
      iconSize: [28, 28],
      iconAnchor: [13, 27],
      popupAnchor: [2, -24],
      shadowUrl: null,
      shadowSize: null,
      shadowAnchor: null,
    });
    return L.marker(latlng, { icon: icon });
  }

  getGeoJson = data => {
    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            name: data && data.name,
            address: data && data.address,
          },
          geometry: {
            type: 'Point',
            coordinates:
              data && data.location && data.location.coordinates,
          },
        },
      ],
    };
  };

  render() {
    const {
      location: { coordinates },
      showContentLoader,
    } = this.props;
    const geoFormat = this.getGeoJson(
      this.state.data && this.state.data,
    );

    let bounds =
      !!geoFormat.features[0].geometry.coordinates &&
      latLngBounds(
        [
          geoFormat.features[0].geometry.coordinates[1] + 0.002,
          geoFormat.features[0].geometry.coordinates[0] + 0.002,
        ],
        [
          geoFormat.features[0].geometry.coordinates[1] - 0.002,
          geoFormat.features[0].geometry.coordinates[0] - 0.002,
        ],
      );

    return (
      <>
        {showContentLoader ? (
          <BlockContentLoader number={1} height="395px" />
        ) : (
          !!geoFormat &&
          bounds &&
          bounds.isValid() && (
            <Map
              center={[coordinates[1], coordinates[0]]}
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
              zoom={13}
              style={{ width: '100%', height: '396px' }}
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
                data={geoFormat}
                onEachFeature={this.onEachFeaturePoint.bind(this)}
                pointToLayer={this.pointToLayer.bind(this)}
                ref={this.groupRef}
              />
            </Map>
          )
        )}
      </>
    );
  }
}

export default SiteMap;
