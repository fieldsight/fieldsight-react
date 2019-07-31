import React, { Component } from "react";
import { RegionProvider } from "../../context";
import RegionSiteList from "./RegionSiteList";
export default class RegionSite extends Component {
  render() {
    return (
      <RegionProvider>
        <RegionSiteList 
        regionId={this.props.match.params.id}
        />
      </RegionProvider>
    );
  }
}
