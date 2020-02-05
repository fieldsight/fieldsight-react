import React, { PureComponent } from 'react';
import Select from 'react-select';

class MetricsTab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      colorBySelection: '',
      sizeBySelection: '',
    };
  }

  // colorSelectChange = selectedColorOption => {
  //   this.setState({ selectedColorOption });
  // };

  // sizeSelectChange = selectedSizeOption => {
  //   this.setState({ selectedSizeOption });
  // };
  // handleMetricsChange = (e, usedState) => {
  //   if (usedState === 'Color') {
  //     this.setState({ colorBySelection: e.value });
  //   } else if (usedState === 'Size') {
  //     this.setState({ sizeBySelection: e.value });
  //   }
  // };

  render() {
    const colorOption = [
      { value: 'project', label: 'Projects' },
      { value: 'progress', label: 'Progress' },
      { value: 'status', label: 'Form Status' },
      { value: 'site_type', label: 'Site Type' },
      { value: 'region', label: 'Region' },
    ];
    const sizeOption = [
      { value: 'project', label: 'Projects' },
      { value: 'progress', label: 'Progress' },
      { value: 'status', label: 'Form Status' },
      { value: 'site_type', label: 'Site Type' },
      { value: 'region', label: 'Region' },
    ];
    const {
      props: {
        activeTab,
        handleMetricsChange,
        // colorBySelection,
        // sizeBySelection,
      },
      state: { colorBySelection, sizeBySelection },
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
        <br />
        <div className="form-group">
          {/* <label>Color</label> */}
          <label>Change Color By:</label>
          <Select
            name="siteinfo color"
            className="wide"
            defaultValue={{ value: 'project', label: 'Projects' }}
            value={
              colorBySelection === 'project'
                ? { value: 'project', label: 'Projects' }
                : colorBySelection[0]
            }
            onChange={e => {
              handleMetricsChange(e, 'Color');
            }}
            options={colorOption}
          />
        </div>
        {/* <div className="form-group">

          <label>Change Size By:</label>
          <Select
            name="siteinfo size"
            className="wide"
            // value={sizeBySelection}
            onChange={e => {
              handleMetricsChange(e, 'Size');
            }}
            options={sizeOption}
          />
        </div> */}
      </div>
    );
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     getPrimaryGeojson: () =>
//       dispatch({ type: 'GET_PRIMARY_MARKER_GEOJSON' }),
//   };
// };

export default MetricsTab;
