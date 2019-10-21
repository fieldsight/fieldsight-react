import React, { Component, Fragment } from "react";
import axios from "axios";
import SideNav from "./SideNav";

class ManageForms extends Component {
  state = {
    popupModal: false,
    selectedModals: null,
    heading: null,
    modalDatas: null,
    breadcrumb: {}
  };
  componentDidMount() {
    const {
      match: {
        url,
        params: { id }
      }
    } = this.props;
    const splitArr = url.split("/");
    const isProjectForm = splitArr.includes("project");
    const isSiteForm = splitArr.includes("site");
    if (isProjectForm) {
      axios
        .get(`fv3/api/manage-forms/breadcrums/?project_id=${id}`)
        .then(res => {
          this.setState({
            breadcrumb: res.data
          });
        })
        .catch(err => {});
    } else if (isSiteForm) {
      axios
        .get(`fv3/api/manage-forms/breadcrums/?site_id=${id}`)
        .then(res => {
          this.setState({
            breadcrumb: res.data
          });
        })
        .catch(err => {});
    }
  }

  closePopup = () => {
    this.setState({
      popupModal: false
    });
  };
  commonPopupHandler = () => {
    this.setState({
      popupModal: true
    });
  };
  render() {
    const { breadcrumb } = this.state;
    return (
      <Fragment>
        <nav aria-label="breadcrumb" role="navigation">
          {Object.keys(breadcrumb).length > 0 && (
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href={breadcrumb.organization_url}>
                  {breadcrumb.organization}
                </a>
              </li>
              <li className="breadcrumb-item">{breadcrumb.name}</li>
            </ol>
          )}
          {/* <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a>Forms</a>
            </li>
          </ol> */}
        </nav>
        <div className="row">
          <SideNav
            // OpenTabHandler={this.OpenTabHandler}
            commonPopupHandler={this.commonPopupHandler}
            closePopup={this.closePopup}
            popupModal={this.state.popupModal}
          />
        </div>
      </Fragment>
    );
  }
}

export default ManageForms;
