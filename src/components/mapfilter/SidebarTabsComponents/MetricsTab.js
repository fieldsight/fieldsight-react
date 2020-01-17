import React, { Component } from 'react';

class MetricsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { activeTab } = this.props;
    return (
      <div
        className="tab-pane fade"
        id="sidebar-metric"
        role="tabpanel"
        aria-labelledby="sidebar-metric_tab"
        tabIndex={-1}
      />
    );
  }
}

export default MetricsTab;
