import React, { Component } from 'react';
import Select from 'react-select';

class MetricsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColorOption: null,
      selectedSizeOption: null,
    };
  }

  colorSelectChange = selectedColorOption => {
    this.setState({ selectedColorOption });
  };

  sizeSelectChange = selectedSizeOption => {
    this.setState({ selectedSizeOption });
  };

  render() {
    const colorOption = [
      { value: 'projects', label: 'Projects' },
      { value: 'progress', label: 'Progress' },
      { value: 'formstatus', label: 'Form Status' },
    ];
    const sizeOption = [
      { value: 'projects', label: 'Projects' },
      { value: 'progress', label: 'Progress' },
      { value: 'formstatus', label: 'Form Status' },
    ];
    const {
      props: { activeTab },
      state: { selectedColorOption, selectedSizeOption },
    } = this;
    return (
      <div
        className={`tab-pane fade ${
          activeTab === 'metrics' ? 'show active' : ''
        }`}
        id="sidebar-metric"
        role="tabpanel"
        aria-labelledby="sidebar-metric_tab"
        tabIndex={-1}
      >
        <div className="form-group">
          {/* <label>Color</label> */}

          <label>Change Color By:</label>
          <Select
            name="siteinfo"
            className="wide"
            value={selectedColorOption}
            onChange={this.colorSelectChange}
            options={colorOption}
          />
        </div>
        <div className="form-group">
          {/* <label>Color</label> */}

          <label>Change Size By:</label>
          <Select
            name="siteinfo"
            className="wide"
            value={selectedSizeOption}
            onChange={this.sizeSelectChange}
            options={sizeOption}
          />
        </div>
      </div>
    );
  }
}

export default MetricsTab;
