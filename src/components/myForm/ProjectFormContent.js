import React, { Component } from 'react';
import ProjecTable from './ProjectTable';

class ProjectFormContent extends Component {
  render() {
    const { OpenTabHandler, commonPopupHandler } = this.props;
    return (
      <div className="col-xl-9 col-lg-8">
        <div className="right-content">
          <div className="tab-content">
            <div className="tab-pane fade show active">
              <div className="card no-boxshadow">
                <ProjecTable
                  OpenTabHandler={OpenTabHandler}
                  commonPopupHandler={commonPopupHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectFormContent;
