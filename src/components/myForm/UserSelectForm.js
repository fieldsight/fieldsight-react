import React, { Component } from "react";

class UserSelectForm extends Component {
  render() {
    return (
      <React.Fragment>
        <form>
          <ul>
            <li>
              <figure>
                <img src="/img/pf.jpg" alt="pf" />
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
                      <i class="helper" />
                    </label>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <figure>
                <img src="/img/pf.jpg" alt="pf" />
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
                      <i class="helper" />
                    </label>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div className="form-group mrt-30">
            <button type="submit" className="fieldsight-btn">
              Share
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default UserSelectForm;
