import React, { Component } from "react";
import RegionSiteList from "./RegionSiteList";
export default class RegionSite extends Component {
  render() {
    return (
    
        <RegionSiteList 
        regionId={this.props.match.params.id}
        />
     
    );
  }
}
