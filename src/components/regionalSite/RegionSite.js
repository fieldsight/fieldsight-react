import React, { PureComponent } from 'react';
import RegionSiteList from './RegionSiteList';
/* eslint-disable react/destructuring-assignment */

export default class RegionSite extends PureComponent {
  render() {
    return <RegionSiteList regionId={this.props.match.params.id} />;
  }
}
