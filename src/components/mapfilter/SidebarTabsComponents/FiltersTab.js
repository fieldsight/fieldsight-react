import React, { PureComponent } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';

class FiltersTab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      activeTab,
      projectsList,
      projectsRegionTypes,
      handleRegionChange,
      handleSiteChange,
      handleProgressChange,
      handleStatusChange,
      handleProjectChange,
      isProgressSelected,
      handleProgressParentCheckbox,
      isStatusSelected,
      handleStatusParentCheckbox,
      isSiteTypeSelected,
      handleSiteTypeParentCheckbox,
      isRegionSelected,
      handleRegionParentCheckbox,
      isProjectSelected,
      handleProjectParentCheckbox,
      applyFilter,
      onClickClearBtn,
      path,
    } = this.props;
    // const {
    //   match: { path },
    // } = this.props;
    return (
      <div
        className={`tab-pane fade ${
          activeTab === 'filters' ? 'show active' : ''
        }`}
        id="sidebar-filter"
        role="tabpanel"
        aria-labelledby="sidebar-filter_tab"
      >
        <Accordion id="accordion" className="map-accordion">
          <Card
            style={{
              display:
                path === '/team-mapfilter/:id' ? 'block' : 'none',
            }}
          >
            <Card.Header>
              <Accordion.Toggle
                as={Card.Link}
                className="card-link btn-link"
                // variant="link"
                eventKey="0"
              >
                <input
                  type="checkbox"
                  name="projectCheckbox"
                  checked={isProjectSelected}
                  // onClick={handleProjectParentCheckbox}
                  onChange={handleProjectParentCheckbox}
                />
                Projects
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Scrollbars style={{ height: '200px' }}>
                  <div className="card-body">
                    <div className="sidebar-list">
                      {projectsList &&
                        projectsList.map(each => {
                          const projectName = each.name;
                          return (
                            <div key={each.id} className="form-group">
                              <div className="checkbox">
                                <label>
                                  <input
                                    type="checkbox"
                                    name={projectName}
                                    className="project_checkbox"
                                    defaultChecked
                                    onChange={handleProjectChange}
                                  />
                                  <i className="helper" />
                                  {projectName}
                                </label>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </Scrollbars>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            {/* <div className="card"> */}
            <Card.Header>
              <Accordion.Toggle
                as={Card.Link}
                className="card-link btn-link"
                // variant="link"
                eventKey="1"
              >
                <input
                  type="checkbox"
                  name="progressCheckbox"
                  className="to_reset_checkbox"
                  checked={isProgressSelected}
                  // onClick={handleProgressParentCheckbox}
                  onChange={handleProgressParentCheckbox}
                />
                Progress
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <Scrollbars style={{ height: '200px' }}>
                  <div className="sidebar-list">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            type="checkbox"
                            name="0_0"
                            className="to_reset_checkbox progress_checkbox"
                            value="0_0"
                            onChange={handleProgressChange}
                          />
                          <i className="helper" />
                          0%
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            type="checkbox"
                            name="1_20"
                            className="to_reset_checkbox progress_checkbox"
                            value="1_20"
                            onChange={handleProgressChange}
                          />
                          <i className="helper" />
                          1-20%
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            type="checkbox"
                            name="21_40"
                            className="to_reset_checkbox progress_checkbox"
                            value="21_40"
                            onChange={handleProgressChange}
                          />
                          <i className="helper" />
                          21-40%
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            type="checkbox"
                            name="41_60"
                            className="to_reset_checkbox progress_checkbox"
                            value="41_60"
                            onChange={handleProgressChange}
                          />
                          <i className="helper" />
                          41%-60%
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            type="checkbox"
                            name="61_80"
                            className="to_reset_checkbox progress_checkbox"
                            value="61_80"
                            onChange={handleProgressChange}
                          />
                          <i className="helper" />
                          61%-80%
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            type="checkbox"
                            name="81_99"
                            className="to_reset_checkbox progress_checkbox"
                            value="81_99"
                            onChange={handleProgressChange}
                          />
                          <i className="helper" />
                          81%-99%
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input
                            type="checkbox"
                            name="100_100"
                            className="to_reset_checkbox progress_checkbox"
                            value="100_100"
                            onChange={handleProgressChange}
                          />
                          <i className="helper" />
                          100%
                        </label>
                      </div>
                    </div>
                  </div>
                </Scrollbars>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            {/* < className="card"> */}
            <Card.Header>
              <Accordion.Toggle
                as={Card.Link}
                className="card-link btn-link"
                // variant="link"
                eventKey="2"
              >
                <input
                  type="checkbox"
                  name="statusCheckbox"
                  className="to_reset_checkbox"
                  checked={isStatusSelected}
                  // onClick={handleStatusParentCheckbox}
                  onChange={handleStatusParentCheckbox}
                />
                Form Status
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <Scrollbars style={{ height: '200px' }}>
                  {/* <div className="form-group"> */}
                  {/* <div className="custom-checkbox display-inline"> */}
                  <div className="sidebar-list">
                    <div className="form-group">
                      <div className="checkbox approved">
                        <label>
                          <input
                            type="checkbox"
                            name="3"
                            value="3"
                            className="status_checkbox"
                            onChange={handleStatusChange}
                          />
                          <i className="helper" />
                          Approved
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="checkbox pending">
                        <label>
                          <input
                            type="checkbox"
                            name="0"
                            value="0"
                            className="status_checkbox"
                            onChange={handleStatusChange}
                          />
                          <i className="helper" />
                          Pending
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="checkbox flagged">
                        <label>
                          <input
                            type="checkbox"
                            name="2"
                            value="2"
                            className="status_checkbox"
                            onChange={handleStatusChange}
                          />
                          <i className="helper" />
                          Flagged
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="checkbox rejected">
                        <label>
                          <input
                            type="checkbox"
                            name="1"
                            value="1"
                            className="status_checkbox"
                            onChange={handleStatusChange}
                          />
                          <i className="helper" />
                          Rejected
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* </div> */}
                  {/* </div> */}
                </Scrollbars>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle
                as={Card.Link}
                className="card-link btn-link"
                // variant="link"
                eventKey="3"
              >
                <input
                  type="checkbox"
                  name="siteTypeCheckbox"
                  className="to_reset_checkbox"
                  checked={isSiteTypeSelected}
                  // onClick={handleSiteTypeParentCheckbox}
                  onChange={handleSiteTypeParentCheckbox}
                />
                Site Types
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="3">
              <Card.Body>
                <Scrollbars style={{ height: '200px' }}>
                  <div className="sidebar-list">
                    {projectsRegionTypes[0] &&
                      projectsRegionTypes[0].site_types &&
                      projectsRegionTypes[0].site_types.map(data => {
                        // console.log(data);
                        return (
                          <div key={data.id} className="form-group">
                            <div className="checkbox">
                              <label>
                                <input
                                  type="checkbox"
                                  name={data.name}
                                  className="to_reset_checkbox sitetype_checkbox"
                                  // checked={this.state.checkedItems.includes(
                                  //   data.name,
                                  // )}
                                  onChange={handleSiteChange}
                                  // onChange={this.filterChange}
                                />
                                <i className="helper" />
                                {data.name}
                              </label>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </Scrollbars>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle
                as={Card.Link}
                className="card-link btn-link"
                // variant="link"
                eventKey="4"
              >
                <input
                  type="checkbox"
                  name="regionCheckbox"
                  className="to_reset_checkbox"
                  checked={isRegionSelected}
                  // onClick={handleRegionParentCheckbox}
                  onChange={handleRegionParentCheckbox}
                />
                Regions
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="4">
              <Card.Body>
                <Scrollbars style={{ height: '200px' }}>
                  <div className="sidebar-list">
                    {projectsRegionTypes[0] &&
                      projectsRegionTypes[0].regions &&
                      projectsRegionTypes[0].regions.map(data => {
                        // console.log(data);
                        // debugger
                        return (
                          <div key={data.id} className="form-group">
                            <div className="checkbox">
                              <label>
                                <input
                                  type="checkbox"
                                  name={data.name}
                                  className="to_reset_checkbox region_checkbox"
                                  // checked={this.state.checkedItems.includes(
                                  //   data.name,
                                  // )}
                                  onChange={handleRegionChange}
                                  // onChange={this.filterChange}
                                />
                                <i className="helper" />
                                {data.name}
                              </label>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </Scrollbars>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <div className="buttons flex-between">
          <button
            type="button"
            onClick={onClickClearBtn}
            // role="button"
            className="fieldsight-btn border-btn custom_btn_text"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={applyFilter}
            // tabIndex={0}
            // role="button"
            className="fieldsight-btn bg-btn custom_btn_text"
          >
            apply
          </button>
        </div>
      </div>
    );
  }
}

export default FiltersTab;
