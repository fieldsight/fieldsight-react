import React, { Component } from 'react';
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

const PrintControl = withLeaflet(PrintControlDefault);
const MeasureControl = withLeaflet(MeasureControlDefault);
// import MeasureControl from "react-leaflet-measure";
// import MeasureControlDefault from "react-leaflet-measure";
// const MeasureControl = withLeaflet(MeasureControlDefault);
class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 27.7172,
      lng: 85.324,
    };
  }

  render() {
    const { lat, lng } = this.state;
    const position = [lat, lng];
    const { height, zoom } = this.props;
    // const measureOptions = {
    //   position: "topright",
    //   primaryLengthUnit: "meters",
    //   secondaryLengthUnit: "kilometers",
    //   primaryAreaUnit: "sqmeters",
    //   secondaryAreaUnit: "acres",
    //   activeColor: "#db4a29",
    //   completedColor: "#9b2d14"
    // };
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
        center={position}
        zoom={zoom}
        maxZoom={18}
        attributionControl={true}
        zoomControl={false}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        style={{ height: height, zIndex: 2 }}
      >
        {/* <MeasureControl {...measureOptions} /> */}

        {/* <PrintControl ref={(ref) => { this.printControl = ref; }} position="topleft" sizeModes={['Current', 'A4Portrait', 'A4Landscape']} hideControlContainer={false} /> */}
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
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup.
            <br />
            Easily customizable.
          </Popup>
        </Marker>
        <MeasureControl {...measureOptions} />
      </Map>
    );
  }
}

export default MapComponent;
