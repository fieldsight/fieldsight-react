import React from "react";

class About extends React.Component {
  render() {
    const { contacts, desc } = this.props;
    return (
      // <div className="card ">
      <div className="about">
        <div className="card-header main-card-header sub-card-header">
          <h5>About</h5>
        </div>
        <div
          className="thumb-list mr-0 "
          style={{ position: "relative", height: "357px" }}
        >
          <div className="card-body about-body">
            <div className="about-countent">
              <p>{desc}</p>
            </div>
            <div className="contact">
              <div className="card-header main-card-header sub-card-header">
                <h5>Contacts</h5>
              </div>
              <div className="card-body">
                <ul>
                  {contacts.phone && (
                    <li>
                      <i className="la la-phone" /> {contacts.phone}
                    </li>
                  )}
                  {contacts.email && (
                    <li>
                      <i className="la la-envelope" /> {contacts.email}
                    </li>
                  )}
                  {contacts.website && (
                    <li>
                      <i className="la la-external-link" /> {contacts.website}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      // </div>
    );
  }
}
export default About;
