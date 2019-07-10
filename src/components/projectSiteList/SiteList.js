import React, { Component } from "react";
import ProjectSiteList from "./ProjectSiteList";
import { RegionProvider } from "../../context";
export default class SiteList extends Component {
  render() {
    return (
      <RegionProvider>
        <ProjectSiteList />
      </RegionProvider>
    );
  }
}
