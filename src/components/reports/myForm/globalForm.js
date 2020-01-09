import React, { PureComponent } from 'react';

export default class GlobalFormTable extends PureComponent {
  render() {
    return (
      <div className="card">
        <div className="card-header main-card-header sub-card-header">
          <h5>Global form</h5>
          <div className="add-btn">
            <a href="#" data-tab="region-popup">
              Add new
              <span>
                <i className="la la-plus" />
              </span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
