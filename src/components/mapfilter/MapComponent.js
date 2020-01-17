import React, { PureComponent } from 'react';
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  withLeaflet,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PrintControlDefault from 'react-leaflet-easyprint';
import MeasureControlDefault from 'react-leaflet-measure';
import 'react-leaflet-markercluster/dist/styles.min.css';
import MarkerClusterGroup from 'react-leaflet-markercluster';

const PrintControl = withLeaflet(PrintControlDefault);
const MeasureControl = withLeaflet(MeasureControlDefault);
class MapComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lat: 27.7172,
      lng: 85.324,
    };
  }

  componentDidUpdate(prevProps) {
    const { geojson } = this.props;
    const { mapRef, groupRef } = this.props;
    const map = mapRef.current.leafletElement;
    const featuregroup = groupRef.current.leafletElement;
    if (prevProps.geojson !== geojson) {
      map.fitBounds(featuregroup.getBounds());
    }
  }

  render() {
    const {
      props: { height, zoom, geojson, mapRef, groupRef },
      state: { lat, lng },
    } = this;
    const position = [lat, lng];
    const measureOptions = {
      position: 'topright',
      primaryLengthUnit: 'meters',
      secondaryLengthUnit: 'kilometers',
      primaryAreaUnit: 'sqmeters',
      secondaryAreaUnit: 'acres',
      activeColor: '#db4a29',
      completedColor: '#9b2d14',
    };
    return (
      <Map
        ref={mapRef}
        center={position}
        zoom={8}
        maxZoom={18}
        attributionControl
        zoomControl
        doubleClickZoom
        scrollWheelZoom
        dragging
        animate
        style={{ height, zIndex: 2 }}
      >
        {/* <MeasureControl {...measureOptions} /> */}
        <PrintControl
          position="topleft"
          sizeModes={['Current', 'A4Portrait', 'A4Landscape']}
          hideControlContainer={false}
          title="Export as PNG"
          exportOnly
        />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* <FeatureGroup
          ref={groupRef}
          
          }} */}
        <MarkerClusterGroup ref={groupRef}>
          {geojson[0] &&
            geojson[0].features &&
            geojson[0].features.map(each => {
              const location = each.geometry.coordinates;
              const { id } = each;
              const projectName = each.properties.name;
              return (
                <Marker
                  key={id}
                  position={[location[1], location[0]]}
                >
                  <Popup>
                    <span>
                      <label>{projectName}</label>
                    </span>
                    <br />
                  </Popup>
                </Marker>
              );
            })}
        </MarkerClusterGroup>
        {/* </FeatureGroup> */}
        <MeasureControl {...measureOptions} />
      </Map>
    );
  }
}

export default MapComponent;
