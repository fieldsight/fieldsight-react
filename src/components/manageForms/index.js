import React, { Component } from 'react';
import axios from 'axios';
import SideNav from './SideNav';
/* eslint-disable   react/destructuring-assignment */

class ManageForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupModal: false,
      breadcrumb: {},
    };
  }

  componentDidMount() {
    const {
      match: {
        url,
        params: { id },
      },
    } = this.props;
    const splitArr = url.split('/');
    const isProjectForm = splitArr.includes('project');
    const isSiteForm = splitArr.includes('site');
    if (isProjectForm) {
      axios
        .get(`fv3/api/manage-forms/breadcrums/?project_id=${id}`)
        .then(res => {
          this.setState({
            breadcrumb: res.data,
          });
        })
        .catch(() => {});
    } else if (isSiteForm) {
      axios
        .get(`fv3/api/manage-forms/breadcrums/?site_id=${id}`)
        .then(res => {
          this.setState({
            breadcrumb: res.data,
          });
        })
        .catch(() => {});
    }
  }

  closePopup = () => {
    this.setState({
      popupModal: false,
    });
  };

  commonPopupHandler = () => {
    this.setState({
      popupModal: true,
    });
  };

  render() {
    const { breadcrumb } = this.state;
    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          {Object.keys(breadcrumb).length > 0 && (
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href={breadcrumb.name_url}>{breadcrumb.name}</a>
              </li>
              <li className="breadcrumb-item">
                {breadcrumb.current_page}
              </li>
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
      </>
    );
  }
}

export default ManageForms;
