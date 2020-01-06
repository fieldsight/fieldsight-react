import React, { PureComponent } from 'react';
import SideNav from './sideNav';

export default class MyFormTable extends PureComponent {
  render() {
    console.log(this.props, this.props.match);
    return (
      <div className="row">
        <SideNav props={this.props} />
      </div>
    );
  }
}
