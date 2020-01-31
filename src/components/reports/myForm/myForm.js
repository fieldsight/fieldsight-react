import React, { PureComponent } from 'react';

export default class MyForm extends PureComponent {
  render() {
    return (
      <div className="card no-boxshadow">
        <div className="card-header main-card-header sub-card-header">
          <h5>My Forms</h5>
          <div className="add-btn">
            <a href="/#" data-tab="site-popup">
              Add new
              <span>
                <i className="la la-plus" />
              </span>
            </a>
          </div>
        </div>
        <div className="card-body">
          <table
            id="my_form_table"
            className="table-bordered table  dataTable"
          >
            <thead>
              <tr>
                <th> S.N</th>
                <th>Form Name</th>
                <th>Create Date</th>
                <th>Updated date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>name</td>
                <td>
                  <i className="fa fa-clock-o" />
                  <span>2019-08-14</span>
                </td>
                <td>
                  <i className="fa fa-clock-o" />
                  <span>2019-08-14</span>
                </td>
                <td>
                  <a
                    href="/#"
                    className="td-view-btn td-btn"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Preview"
                    data-tab="preview-popup"
                  >
                    <i className="la la-eye" />
                  </a>
                  <a
                    href="/#"
                    className="td-edit-btn td-btn"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Edit"
                  >
                    <i className="la la-edit" />
                  </a>
                  <a
                    href="/#"
                    className="td-replace-btn td-btn"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Replace"
                    data-tab="replace-popup"
                  >
                    <i className="la la-refresh" />
                  </a>
                  <span className="share-icon">
                    <a
                      href="/#"
                      className="td-share-btn td-btn"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Share"
                    >
                      <i className="la la-share-alt" />
                    </a>
                    {/* <ul className="share-drop">
                      <li>
                        <a href="/#" data-tab="user-share">
                          User
                        </a>
                      </li>
                      <li>
                        <a href="/#" data-tab="team-share">
                          Team
                        </a>
                      </li>
                      <li>
                        <a href="/#" data-tab="project-share">
                          Project
                        </a>
                      </li>
                      <li>
                        <a href="/#" data-tab="global-share">
                          Global
                        </a>
                      </li>
                    </ul> */}
                  </span>
                  <a
                    href="/#"
                    className="td-delete-btn td-btn"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete"
                    data-tab="delete-popup"
                  >
                    <i className="la la-trash" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          {/* <div className="fieldsight-popup" id="user-share">
                    <div className="popup-body">
                        <div className="card">
                            <div className="card-header main-card-header">
                                <h5>Share my form</h5>
                                <span className="popup-close"><i className="la la-close"/></span>
                            </div>
                            <div className="card-body">
                                <div className="thumb-list userlist">
                                    <form>
                                        <ul>
                                            <li>
                                                <figure>
                                                    <img src="img/pf.jpg" alt="pf"/>
                                                </figure>
                                                <div className="content">
                                                    <h6>Santosh Khatri </h6>
                                                    <span>skhatri.np@gmail.com</span>
                                                </div>
                                                <div className="form-group checkbox-btn">
                                                    <div className="custom-checkbox">
                                                        <div className="checkbox ">
                                                            <label>
                                                                <input type="checkbox" name="radioYes" /><i className="helper"/>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <figure>
                                                    <img src="img/pf.jpg" alt="pf"/>
                                                </figure>
                                                <div className="content">
                                                    <h6>Santosh Khatri </h6>
                                                    <span>skhatri.np@gmail.com</span>
                                                </div>
                                                <div className="form-group checkbox-btn">
                                                    <div className="custom-checkbox">
                                                        <div className="checkbox ">
                                                            <label>
                                                                <input type="checkbox" name="radioYes" /><i className="helper"/>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <figure>
                                                    <img src="img/pf.jpg" alt="pf"/>
                                                </figure>
                                                <div className="content">
                                                    <h6>Santosh Khatri </h6>
                                                    <span>skhatri.np@gmail.com</span>
                                                </div>
                                                <div className="form-group checkbox-btn">
                                                    <div className="custom-checkbox">
                                                        <div className="checkbox ">
                                                            <label>
                                                                <input type="checkbox" name="radioYes" /><i className="helper"/>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <figure>
                                                    <img src="img/pf.jpg" alt="pf"/>
                                                </figure>
                                                <div className="content">
                                                    <h6>Santosh Khatri </h6>
                                                    <span>skhatri.np@gmail.com</span>
                                                </div>
                                                <div className="form-group checkbox-btn">
                                                    <div className="custom-checkbox">
                                                        <div className="checkbox ">
                                                            <label>
                                                                <input type="checkbox" name="radioYes" /><i className="helper"/>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="form-group mrt-30 pull-right">
                                            <button type="submit" className="fieldsight-btn">Share</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fieldsight-popup" id="project-share">
                    <div className="popup-body">
                        <div className="card">
                            <div className="card-header main-card-header">
                                <h5>Share my form</h5>
                                <span className="popup-close"><i className="la la-close"/></span>
                            </div>
                            <div className="card-body">
                                <div className="thumb-list userlist">
                                    <form>
                                        <ul>
                                            <li>
                                                <figure>
                                                    <img src="img/pf.jpg" alt="pf"/>
                                                </figure>
                                                <div className="content">
                                                    <h6>Santosh Khatri </h6>
                                                    <span>skhatri.np@gmail.com</span>
                                                </div>
                                                <div className="form-group checkbox-btn">
                                                    <div className="custom-checkbox">
                                                        <div className="checkbox ">
                                                            <label>
                                                                <input type="checkbox" name="radioYes" /><i className="helper"/>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <figure>
                                                    <img src="img/pf.jpg" alt="pf"/>
                                                </figure>
                                                <div className="content">
                                                    <h6>Santosh Khatri </h6>
                                                    <span>skhatri.np@gmail.com</span>
                                                </div>
                                                <div className="form-group checkbox-btn">
                                                    <div className="custom-checkbox">
                                                        <div className="checkbox ">
                                                            <label>
                                                                <input type="checkbox" name="radioYes" /><i className="helper"/>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <figure>
                                                    <img src="img/pf.jpg" alt="pf"/>
                                                </figure>
                                                <div className="content">
                                                    <h6>Santosh Khatri </h6>
                                                    <span>skhatri.np@gmail.com</span>
                                                </div>
                                                <div className="form-group checkbox-btn">
                                                    <div className="custom-checkbox">
                                                        <div className="checkbox ">
                                                            <label>
                                                                <input type="checkbox" name="radioYes" /><i className="helper"/>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <figure>
                                                    <img src="img/pf.jpg" alt="pf"/>
                                                </figure>
                                                <div className="content">
                                                    <h6>Santosh Khatri </h6>
                                                    <span>skhatri.np@gmail.com</span>
                                                </div>
                                                <div className="form-group checkbox-btn">
                                                    <div className="custom-checkbox">
                                                        <div className="checkbox ">
                                                            <label>
                                                                <input type="checkbox" name="radioYes" />
                                                                <i className="helper"/>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="form-group mrt-30 pull-right">
                                            <button type="submit" className="fieldsight-btn">Share</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fieldsight-popup" id="team-share">
                    <div className="popup-body">
                        <div className="card">
                            <div className="card-header main-card-header">
                                <h5>Share my form</h5>
                                <span className="popup-close"><i className="la la-close"/></span>
                            </div>
                            <div className="card-body">
                                <div className="thumb-list userlist">
                                    <form>
                                        <ul>
                                            <li>
                                                <figure>
                                                    <img src="img/pf.jpg" alt="pf"/>
                                                </figure>
                                                <div className="content">
                                                    <h6>Santosh Khatri </h6>
                                                    <span>skhatri.np@gmail.com</span>
                                                </div>
                                                <div className="form-group checkbox-btn">
                                                    <div className="custom-checkbox">
                                                        <div className="checkbox ">
                                                            <label>
                                                                <input type="checkbox" name="radioYes" /><i className="helper"/>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <figure>
                                                    <img src="img/pf.jpg" alt="pf"/>
                                                </figure>
                                                <div className="content">
                                                    <h6>Santosh Khatri </h6>
                                                    <span>skhatri.np@gmail.com</span>
                                                </div>
                                                <div className="form-group checkbox-btn">
                                                    <div className="custom-checkbox">
                                                        <div className="checkbox ">
                                                            <label>
                                                                <input type="checkbox" name="radioYes" /><i className="helper"/>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <figure>
                                                    <img src="img/pf.jpg" alt="pf"/>
                                                </figure>
                                                <div className="content">
                                                    <h6>Santosh Khatri </h6>
                                                    <span>skhatri.np@gmail.com</span>
                                                </div>
                                                <div className="form-group checkbox-btn">
                                                    <div className="custom-checkbox">
                                                        <div className="checkbox ">
                                                            <label>
                                                                <input type="checkbox" name="radioYes" /><i className="helper"/>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <figure>
                                                    <img src="img/pf.jpg" alt="pf"/>
                                                </figure>
                                                <div className="content">
                                                    <h6>Santosh Khatri </h6>
                                                    <span>skhatri.np@gmail.com</span>
                                                </div>
                                                <div className="form-group checkbox-btn">
                                                    <div className="custom-checkbox">
                                                        <div className="checkbox ">
                                                            <label>
                                                                <input type="checkbox" name="radioYes" /><i className="helper"/>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="form-group mrt-30 pull-right">
                                            <button type="submit" className="fieldsight-btn">Share</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fieldsight-popup" id="global-share">
                    <div className="popup-body">
                        <div className="card">
                            <div className="card-header main-card-header">
                                <h5>Share my form</h5>
                                <span className="popup-close"><i className="la la-close"/></span>
                            </div>
                            <div className="card-body">
                                <div className="thumb-list globallist">
                                    <form>
                                        <div className="input-group copyurl">
                                            <input type="text" className="form-control" placeholder="url" aria-label="url" aria-describedby="url"/>
                                            <div className="input-group-append">
                                                <span className="input-group-text" id="url">Copy</span>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fieldsight-popup" id="preview-popup">
                    <div className="popup-body lg-body">
                        <div className="card">
                            <div className="card-header main-card-header">
                                <h5>Share my form</h5>
                                <span className="popup-close"><i className="la la-close"/></span>
                            </div>
                            <div className="card-body">
                                <div className="thumb-list userlist">
                                    <iframe src="http://hotelmalaya.com/"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fieldsight-popup" id="replace-popup">
                    <div className="popup-body">
                        <div className="card">
                            <div className="card-header main-card-header">
                                <h5>Replace my form</h5>
                                <span className="popup-close"><i className="la la-close"/></span>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>
                                            attach file
                                        </label>
                                        <div className="upload-form">
                                            <div className="upload-wrap">
                                                <div className="content">
                                                    <h3>Drag & Drop an image</h3>
                                                    <span>or</span>
                                                </div>
                                                <input type="file" className="userprofile_picture" id="filePhoto" />
                                                <div className="fieldsight-btn">
                                                    <label for="upload-btn">upload <i className="la la-cloud-upload"/></label>
                                                    <input type="file" id="upload-btn" multiple />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form> 
                            </div>
                        </div>
                    </div>
                </div>  */}
        </div>
      </div>
    );
  }
}
