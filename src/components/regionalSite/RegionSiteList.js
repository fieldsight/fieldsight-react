import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import AddSite from './AddSite';
import RegionalSiteTable from './RegionalSiteTable';
import axios from 'axios';
import isEmpty from '../../utils/isEmpty';

const popUpState = {
  addModal: false,
  uploadModal: false,
};

class RegionSiteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addModal: false,
      uploadModal: false,
      subRegionList: [],
      dLoader: true,
      projectId: null,
      terms: {},
      breadcrumbs: {},
    };
  }

  componentDidMount() {
    this._isMounted = true;

    let regionId = this.props.regionId;
    let subRegion = 'fv3/api/sub-regions/?region=' + regionId;

    axios
      .get(`${subRegion}`)

      .then(res => {
        if (res.status === 200) {
          // console.log(res.data.terms_and_labels.site)
          this.setState({
            subRegionList: res.data.data,
            dLoader: false,
            projectId: res.data.project,
            terms: res.data.terms_and_labels,
            breadcrumbs: res.data.breadcrumbs,
          });
        }
      })
      .catch(err => {
        this.setState({
          // dLoader: false
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.regionId != this.props.regionId) {
      let regionId = this.props.regionId;
      let subRegion = 'fv3/api/sub-regions/?region=' + regionId;

      axios
        .get(`${subRegion}`)

        .then(res => {
          if (this._isMounted) {
            if (res.status === 200) {
              this.setState({
                subRegionList: res.data.data,
                dLoader: false,
                projectId: res.data.project,
                terms: res.data.terms_and_labels,
                breadcrumbs: res.data.breadcrumbs,
              });
            }
          }
        })
        .catch(err => {
          this.setState({
            // dLoader: false
          });
        });
    }
  }

  showPopup = (e, type) => {
    this.setState(prevState => ({
      ...popUpState,
      [`${type}Modal`]: true,
    }));
  };

  closePopup = () => {
    this.setState({
      addModal: false,
      uploadModal: false,
    });
  };

  OpenTabHandler = (e, url) => {
    window.open(url, '_self');
  };

  render() {
    const {
      state: { breadcrumbs, terms, projectId, uploadModal, addModal },
      props: { regionId },
    } = this;

    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          {Object.keys(breadcrumbs).length > 0 && (
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href={breadcrumbs.project_url}>
                  {breadcrumbs.project_name}
                </a>
              </li>

              <li
                className="breadcrumb-item active"
                aria-current="page"
              >
                {breadcrumbs.region}
              </li>
            </ol>
          )}
        </nav>
        <div className="sub-regions">
          <div className="card">
            <div className="card-header main-card-header">
              <h5>
                {!isEmpty(terms)
                  ? `Sub ${terms.region} `
                  : 'Sub Regions'}
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                {subRegionList.map((subRegion, i) => (
                  <div className="col-xl-3 col-lg-6" key={i}>
                    <Link to={'/regional-site/' + subRegion.id}>
                      <div className="sub-regions-item ">
                        <h5>{subRegion.name}</h5>
                        <h6>{subRegion.identifier}</h6>
                        <p>
                          <label>Total:</label>
                          {subRegion.total_sites}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <RegionalSiteTable
            showPopup={this.showPopup}
            OpenTabHandler={this.OpenTabHandler}
            regionId={regionId}
            projectId={projectId}
            terms={terms}
          />

          {uploadModal && (
            <Zoom duration={500}>
              <div className="fieldsight-popup open">
                <div className="popup-body lg-body">
                  <div className="card">
                    <div className="card-header main-card-header">
                      <h5>Bulk Upload</h5>
                      <span
                        className="popup-close"
                        onClick={this.closePopup}
                      >
                        <i className="la la-close" />
                      </span>
                    </div>
                    <div className="card-body">
                      <form
                        className="edit-form"
                        style={{
                          position: 'relative',
                          height: '250px',
                        }}
                      >
                        <PerfectScrollbar>
                          <div className="form-group">
                            <label>Upload file</label>
                            <div className="upload-form">
                              <div className="upload-wrap">
                                <div className="content">
                                  <h3>Drag & Drop an image</h3>
                                  <span>or</span>
                                </div>
                                <input
                                  type="file"
                                  className="userprofile_picture"
                                  id="filePhoto"
                                />
                                <div className="fieldsight-btn">
                                  <label htmlFor="upload-btn">
                                    upload{' '}
                                    <i className="la la-cloud-upload" />
                                  </label>
                                  <input
                                    type="file"
                                    id="upload-btn"
                                    multiple
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </PerfectScrollbar>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </Zoom>
          )}

          {addModal && <AddSite closePopup={this.closePopup} />}
        </div>
      </>
    );
  }
}
export default RegionSiteList;
