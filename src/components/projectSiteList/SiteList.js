import React, { PureComponent } from 'react';
import ProjectSiteList from './ProjectSiteList';
import { RegionProvider } from '../../context';

export default class SiteList extends PureComponent {
  render() {
    return (
      <RegionProvider>
        <ProjectSiteList />
      </RegionProvider>
    );
  }
}
