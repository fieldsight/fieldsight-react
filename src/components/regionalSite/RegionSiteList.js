import React, { Component, Fragment } from "react";
import Zoom from "react-reveal/Zoom";
import PerfectScrollbar from "react-perfect-scrollbar";
import AddSite from "./AddSite";
import { RegionContext } from "../../context";
import isEmpty from "../../utils/isEmpty";
import RegionalSiteTable from "./RegionalSiteTable";
import axios from "axios";


const project_id = 137;
const base_url = "https://fieldsight.naxa.com.np";
const project_name = "test";

const popUpState = {
  addModal: false,
  uploadModal: false,
 
};

class RegionSiteList extends Component {
  static contextType = RegionContext;

  state = {
    addModal: false,
    uploadModal: false,
    subRegionList:[],
    dLoader:true
    
  };

  componentDidMount() {
    this._isMounted = true;
 
     let regionId=this.props.regionId
     let subRegion="fv3/api/sub-regions/?region="+regionId
    
    
     axios
      .get(`${subRegion}`)

      .then(res => {
        if (this._isMounted) {
         
          if (res.status === 200) {
          
            this.setState({
              subRegionList:res.data,
              dLoader: false
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

  showPopup = (e, type) => {
    this.setState(prevState => ({
      ...popUpState,
      [`${type}Modal`]: true
    }));
  };

  closePopup = () => {
    this.setState({
      addModal: false,
      uploadModal: false
    });
   
  };

  OpenTabHandler = (e, url) => {
   
    window.open(url, "_self");
  };

  render() {
    const {
      context: { terms }
    } = this;
   console.log(this.state.dLoader)
    return (
      <Fragment>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a
                href={
                  base_url + "/fieldsight/project-dashboard/" + project_id + "/"
                }
              >
                {project_name}
              </a>
            </li>
            {/* <li className="breadcrumb-item">
              <a href="/fieldsight/organization-dashboard/13/">Site List</a>
            </li> */}

            <li className="breadcrumb-item active" aria-current="page">
              {!isEmpty(terms) ? `${terms.site} List` : "Site List"}
            </li>
          </ol>
        </nav>
        <div className="sub-regions">
          <div className="card">
            <div className="card-header main-card-header">
              <h5>Sub Regions</h5>
            </div>
            <div className="card-body">
              <div className="row">

              

              {this.state.subRegionList.map((subRegion,i) => (

                <div className="col-xl-3 col-lg-6" key={i}>
                  <div className="sub-regions-item ">
                    <h5>{subRegion.name}</h5>
                    <h6>{subRegion.identifier}</h6>
                    <p>
                      <label>Total:</label>{subRegion.total_sites}
                    </p>
                  </div>
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
            regionId={this.props.regionId}
            // regonId={this.props.match.params.id}
          />

          {this.state.uploadModal && (
            <Zoom duration={500}>
              <div className="fieldsight-popup open">
                <div className="popup-body lg-body">
                  <div className="card">
                    <div className="card-header main-card-header">
                      <h5>Bulk Upload</h5>
                      <span className="popup-close" onClick={this.closePopup}>
                        <i className="la la-close" />
                      </span>
                    </div>
                    <div className="card-body">
                      <form
                        className="edit-form"
                        style={{ position: "relative", height: "250px" }}
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
                                    upload <i className="la la-cloud-upload" />
                                  </label>
                                  <input type="file" id="upload-btn" multiple />
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

          {this.state.addModal && <AddSite closePopup={this.closePopup} />}
        </div>
      </Fragment>
    );
  }
}
export default RegionSiteList;
