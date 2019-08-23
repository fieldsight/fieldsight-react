import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div className="col-lg-8">
        <div className="card ">
          <div className="about">
            <div className="card-header main-card-header sub-card-header">
              <h5>About</h5>
            </div>
            <div className="card-body about-body">
              <div className="about-countent">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  lacinia malesuada odio sed porta. Nam sed dapibus ligula. Sed
                  ultrices rhoncus laoreet. Quisque sed tortor nec nunc pel
                  lentesque consequat eget ac lectus. Morbi sit amet lorem vitae
                  arcu faucibus varius. Sed in ligula sem. Sed feugiat mi eu
                  ligula euismod, vitae fringilla mauris ullamcorper. Vestibulum
                  ante ipsum primis in faucibus orci luctus et ultrices posuere
                  cubilia Curae; Morbi at pellentesque est.
                </p>
              </div>
              <div className="contact">
                <div className="card-header main-card-header sub-card-header">
                  <h5>Contact</h5>
                </div>
                <div className="card-body">
                  <ul>
                    <li>
                      <i className="la la-phone" /> 9856055360
                    </li>
                    <li>
                      <i className="la la-envelope" /> info@naxa.com.np
                    </li>
                    <li>
                      <i className="la la-map-marker" /> Kathmandu , Nepal
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
