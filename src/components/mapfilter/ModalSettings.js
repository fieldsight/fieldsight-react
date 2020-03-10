/* eslint-disable max-len */
import React, { PureComponent } from 'react';

import 'react-select-2/dist/css/react-select-2.css';
import Filters from './modalOptions/Filters';
import Metrics from './modalOptions/Metrics';
import Layers from './modalOptions/Layers';

class ModalSettings extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeModalTab: 'filters',
    };
  }

  handleTabChange = tab => {
    // console.log('handleTabCHange Clicked');
    this.setState({ activeModalTab: tab });
  };

  render() {
    const { openModalSetting, modalSetting } = this.props;
    const { activeModalTab } = this.state;
    const options = [
      { value: 'one', label: 'Trying form another project' },
      { value: 'two', label: 'Enter birth date' },
    ];
    const formoptions = [
      { value: 'form1', label: 'Form 1' },
      { value: 'form2', label: 'Form 2' },
    ];
    const questionoptions = [
      { value: 'question1', label: 'Question 1' },
      { value: 'question2', label: 'Question 2' },
    ];
    return (
      <div
        className={`fieldsight-popup ${modalSetting ? 'open' : ''}`}
        id="site-info-popup"
      >
        <div className="popup-body">
          <div className="card">
            <div className="card-header main-card-header">
              <h5>Manage filters,Metrics & Layers</h5>
              <span
                className="popup-close"
                onClick={openModalSetting}
                onKeyPress={this.handleKeyPress}
                role="button"
                tabIndex={0}
              >
                <i className="la la-close" />
              </span>
            </div>
            <div className="card-body">
              <form className="floating-form">
                <ul
                  className="nav nav-tabs flex-between"
                  id="mapTab"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        activeModalTab === 'filters'
                          ? 'active show'
                          : ''
                      }`}
                      id="map-filter_tab"
                      data-toggle="tab"
                      role="tab"
                      tabIndex={0}
                      aria-controls="map-filter"
                      aria-selected="true"
                      onClick={() => {
                        this.handleTabChange('filters');
                      }}
                      onKeyPress={() => {
                        this.handleTabChange('filters');
                      }}
                    >
                      Filters
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        activeModalTab === 'metrics'
                          ? 'active show'
                          : ''
                      }`}
                      id="map-metric_tab"
                      data-toggle="tab"
                      role="tab"
                      tabIndex={0}
                      aria-controls="map-metric"
                      aria-selected="true"
                      onClick={() => {
                        this.handleTabChange('metrics');
                      }}
                      onKeyPress={() => {
                        this.handleTabChange('metrics');
                      }}
                    >
                      metrics
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        activeModalTab === 'layers'
                          ? 'active show'
                          : ''
                      }`}
                      id="map-layer_tab"
                      data-toggle="tab"
                      role="tab"
                      tabIndex={0}
                      aria-controls="map-layer"
                      aria-selected="true"
                      onClick={() => {
                        this.handleTabChange('layers');
                      }}
                      onKeyPress={() => {
                        this.handleTabChange('layers');
                      }}
                    >
                      Layers
                    </a>
                  </li>
                </ul>
                <div
                  className="tab-content mrt-15"
                  id="mapTabContent"
                >
                  <div
                    className={`tab-pane fade ${
                      activeModalTab === 'filters'
                        ? 'show active'
                        : ''
                    }`}
                    id="map-filter"
                    role="tabpanel"
                    aria-labelledby="map-filter_tab"
                  >
                    <Filters
                      siteoptions={options}
                      formoptions={formoptions}
                      questionoptions={questionoptions}
                    />
                  </div>
                  <div
                    className={`tab-pane fade ${
                      activeModalTab === 'metrics'
                        ? 'show active'
                        : ''
                    }`}
                    id="map-metric"
                    role="tabpanel"
                    aria-labelledby="map-metric_tab"
                  >
                    <Metrics
                      siteoptions={options}
                      formoptions={formoptions}
                      questionoptions={questionoptions}
                    />
                  </div>
                  <div
                    className={`tab-pane fade ${
                      activeModalTab === 'layers' ? 'show active' : ''
                    }`}
                    id="map-layer"
                    role="tabpanel"
                    aria-labelledby="map-layer_tab"
                  >
                    <Layers />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalSettings;
