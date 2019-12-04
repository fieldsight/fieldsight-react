import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import SideNav from "./SiteSpecificForm/SideNav";
import SubmissionSideNav from "./SubmissionForm/SideNav";

class ProjectViewData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadCrumb: "",
      view_btn: false
    };
  }

  handleBreadCrumb = breadCrumb => {
    if (!!breadCrumb) {
      this.setState({
        breadCrumb
      });
    }
  };

  showViewData = () => {
    this.setState(
      state => ({
        view_btn: !state.view_btn
      }),
      () => {
        console.log("log change", this.state.view_btn);
      }
    );
  };

  render() {
    const { view_btn } = this.state;
    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              {/* <a
                href={
                  breadcrumbs.project_url || this.state.breadCrumb.project_url
                }
              >
                {breadcrumbs.project_name || this.state.breadCrumb.project_name}
              </a> */}
            </li>
            <li className="breadcrumb-item">
              {/* {breadcrumbs.current_page || this.state.breadCrumb.current_page} */}
            </li>
          </ol>
        </nav>
        <div className="row">
          {view_btn ? (
            <SideNav
              handleBreadCrumb={this.handleBreadCrumb}
              showViewData={this.showViewData}
              view_btn={view_btn}
            />
          ) : (
            <SubmissionSideNav
              handleBreadCrumb={this.handleBreadCrumb}
              showViewData={this.showViewData}
              view_btn={view_btn}
            />
          )}
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ projectViewData }) => {
  const { breadcrumbs } = projectViewData;

  return {
    breadcrumbs
  };
};
export default compose(connect(mapStateToProps))(ProjectViewData);
