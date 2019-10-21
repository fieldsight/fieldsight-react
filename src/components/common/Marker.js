import L from "leaflet";

export const markerIcon = new L.Icon({
  iconUrl: require("../../static/images/marker.png"),
  iconRetinaUrl: require("../../static/images/marker.png"),
  iconSize: [32, 36],
  iconAnchor: [13, 27],
  popupAnchor: [0, -24],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null
  //iconSize: new L.Point(60, 75)
  //className: "leaflet-div-icon"
});
