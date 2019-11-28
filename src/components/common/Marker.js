import L from 'leaflet';

const iconUrl = require('../../static/images/marker.png');
const iconRetinaUrl = require('../../static/images/marker.png');

const markerIcon = new L.Icon({
  iconUrl,
  iconRetinaUrl,
  iconSize: [28, 28],
  iconAnchor: [13, 27],
  popupAnchor: [0, -24],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
});

export default markerIcon;
