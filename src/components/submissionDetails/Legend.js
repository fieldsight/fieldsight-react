import React, { Component } from "react";
import { withLeaflet, MapControl } from "react-leaflet";
import L from "leaflet";

class Legend extends MapControl {
  createLeafletElement(opts) {
    const MapInfo = L.Control.extend({
      onAdd: map => {
        this.panelDiv = L.DomUtil.create("div", "info");
        this.panelDiv.innerHTML =
          '<table style="background:white; padding: 2px;"><tr><td><img src="../../static/images/marker.png" style="width:20px; height:20px; display: inline"/></td><td style="padding:5px;"><div class = "locations" style = "display: inline; font-size:10px !important;">' +
          "Site Location" +
          "</div></td>" +
          "</tr>" +
          '<tr><td><span class="dot" style="height: 15px;width: 15px;background-color: #c1cae4;border-radius: 50%;display: inline-block; border: 3px solid #3686fb;"></span></td><td style="padding:5px;"><div class = "locations" style = "display: inline; font-size:10px !important;">' +
          "Submission Location" +
          "</div></td>" +
          "</tr>" +
          "</table>";
        return this.panelDiv;
      }
    });
    return new MapInfo({ position: "bottomleft" });
  }

  componentDidMount() {
    const { map } = this.props.leaflet;
    this.leafletElement.addTo(map);
  }
}

export default withLeaflet(Legend);
