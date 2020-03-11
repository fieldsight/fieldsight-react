import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import SideNav from './SideNav';

class SiteSpecificForm extends Component {
  render() {
    const { breadcrumbs } = this.props;

    return (
      <>
        {Object.keys(breadcrumbs).length > 0 ? (
          <nav aria-label="breadcrumb" role="navigation">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href={breadcrumbs.site_url}>
                  {breadcrumbs.site_name}
                </a>
              </li>
              <li className="breadcrumb-item">
                {breadcrumbs.current_page}
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
const mapStateToProps = ({ siteViewData }) => {
  const { breadcrumbs } = siteViewData;

  return {
    breadcrumbs,
  };
};
export default compose(connect(mapStateToProps))(SiteSpecificForm);
