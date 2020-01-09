import React, { Component } from 'react';

import SideNav from './SideNav';

export default class SubmissionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadCrumb: '',
    };
  }

  handleBreadCrumb = breadCrumb => {
    if (breadCrumb) {
      this.setState({
        breadCrumb,
      });
    }
  };

  render() {
    const { breadCrumb } = this.state;

    return (
      <>
        {Object.keys(breadCrumb).length > 0 ? (
          <nav aria-label="breadcrumb" role="navigation">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href={breadCrumb.site_url}>
                  {breadCrumb.site_name}
                </a>
              </li>
              <li className="breadcrumb-item">
                {breadCrumb.current_page}
              </li>
            </ol>
          </nav>
        ) : (
          ''
        )}
        <div className="row">
          <SideNav handleBreadCrumb={this.handleBreadCrumb} />
        </div>
      </>
    );
  }
}
