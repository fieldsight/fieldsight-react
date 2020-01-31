import React, { PureComponent } from 'react';
import SideNav from './sideNav';

export default class MyFormTable extends PureComponent {
  render() {
    return (
      <div className="row">
        <SideNav props={this.props} />
      </div>
    );
  }
}
