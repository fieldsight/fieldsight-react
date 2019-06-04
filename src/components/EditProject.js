import React, { Component } from 'react'

class EditProject extends Component {
    render() {
        return (
            <div >
                <div className="card">
                    <div className="card-header main-card-header">
                        <h5>Edit Project</h5>
                    </div>
                    <div className="card-body">
                        <form className="edit-form">
                            <div className="row">
                                <div className="col-xl-4 col-md-6">
                                    <div className="form-group">
                                        <label>Name <sup>*</sup></label>
                                        <input type="text" className="form-control" value="Nuwakot Retrofitting" />
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-6">
                                    <div className="form-group">
                                        <label>Sector <sup>*</sup></label>
                                        <select className="wide">
                                            <option>Agriculture, fishing and forestry</option>
                                            <option>Date</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-6">
                                    <div className="form-group">
                                        <label> sub Sector <sup>*</sup></label>
                                        <select className="wide">
                                            <option>Irrigation and drainage</option>
                                            <option>Date</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-6">
                                    <div className="form-group">
                                        <label>Phone <sup>*</sup></label>
                                        <input type="text" className="form-control" value="98560...." />
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-6">
                                    <div className="form-group">
                                        <label>Email <sup>*</sup></label>
                                        <input type="text" className="form-control" value="info@naxa.com.np" />
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-6">
                                    <div className="form-group">
                                        <label>Address <sup>*</sup></label>
                                        <input type="text" className="form-control" value="Kathmandu , nepal" />
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-6">
                                    <div className="form-group">
                                        <label>website <sup>*</sup></label>
                                        <input type="text" className="form-control" value="buildchange.org" />
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-6">
                                    <div className="form-group">
                                        <label>Donor <sup>*</sup></label>
                                        <input type="text" className="form-control" value="Fieldsight" />
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-6">

                                </div>
                                <div className="col-xl-4 col-md-6">
                                    <div className="form-group">
                                        <label>Discription <sup>*</sup></label>
                                        <textarea className="form-control" value="text"></textarea>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-6">
                                    <div className="form-group">
                                        <label>Map <sup>*</sup></label>
                                        <div className="map-form">
                                            <div id="map"></div>
                                            <div className="latitude-form">
                                                <div className="lat-group">
                                                    <label>Latitude</label>
                                                    <input type="text" className="form-control" value="27,0127" />
                                                </div>
                                                <div className="lat-group">
                                                    <label>longitude</label>
                                                    <input type="text" className="form-control" value="27,0127" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-6">
                                    <div className="form-group">
                                        <label>
                                            attach file
                                                                    </label>
                                        <div className="upload-form">
                                            <div className="upload-wrap">
                                                <div className="content">

                                                    <div className="upload-icon">

                                                    </div>
                                                    <h3>Drag & Drop an image</h3>
                                                    <span>or</span>
                                                </div>
                                                <img src="" className="upload-img" />
                                                <input type="file" name="userprofile_picture" id="filePhoto" />
                                                <div className="fieldsight-btn">
                                                    <label for="upload-btn">upload <i className="la la-cloud-upload"></i></label>
                                                    <input type="file" id="upload-btn" multiple />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <button type="submit" className="fieldsight-btn pull-right">Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditProject
