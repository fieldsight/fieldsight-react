import React, { PureComponent } from 'react';
import { Dropdown } from 'react-bootstrap';
import SiteMap from '../../../common/SiteMap';

export default class Activities extends PureComponent {
  render() {
    const { activitiesButton } = this.props;
    const sumissionDetails = [
      {
        id: '1',
        title: 'This is a test form for testing form.',
        date: 'March 24, 2019, 2:01 p.m.',
        image: 'img/pf.jpg',
      },
      {
        id: '2',
        title: 'This is a test form for testing form.',
        date: 'March 24, 2019, 2:01 p.m.',
        image: 'img/pf.jpg',
      },
      {
        id: '3',
        title: 'This is a test form for testing form.',
        date: 'March 24, 2019, 2:01 p.m.',
        image: 'img/pf.jpg',
      },

      {
        id: '4',
        title: 'This is a test form for testing form.',
        date: 'March 24, 2019, 2:01 p.m.',
        image: 'img/pf.jpg',
      },
      {
        id: '5',
        title: 'This is a test form for testing form.',
        date: 'March 24, 2019, 2:01 p.m.',
        image: 'img/pf.jpg',
      },
      {
        id: '6',
        title: 'This is a test form for testing form.',
        date: 'March 24, 2019, 2:01 p.m.',
        image: 'img/pf.jpg',
      },
    ];
    const DataCrude = [
      {
        id: '1',
        title: 'Last 7 days',
        link: '#',
      },
      {
        id: '2',
        title: 'Last 1 month',
        link: '#',
      },
      {
        id: '3',
        title: 'Last Year',
        link: '#',
      },
    ];
    return (
      <div
        className={
          activitiesButton
            ? 'tab-pane fade show active'
            : 'tab-pane fade'
        }
        // className="tab-pane fade show active"
        id="activities"
        role="tabpanel"
        aria-labelledby="activities_tab"
      >
        <div className="dash-btn append-btn">
          <div className="dropdown">
            <Dropdown>
              <Dropdown.Toggle
                variant=""
                id="dropdown-Data"
                className="fieldsight-btn dropdown-toggle"
              >
                <span>Last 7 days</span>
                <i className="la la-angle-down" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                {DataCrude.map(item => (
                  <Dropdown.Item
                    href={item.link}
                    key={item.id}
                    target="_blank"
                  >
                    {item.title}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-4 col-md-6">
            <div className="card activity-submission">
              <div className="card-header main-card-header sub-card-header">
                <h5>Latest Submission</h5>
              </div>
              <div className="card-body">
                <div className="thumb-list mr-0">
                  <ul>
                    {sumissionDetails.map(subdetails => (
                      <li key={subdetails.id}>
                        <figure>
                          <img src={subdetails.image} alt="pf" />
                        </figure>
                        <div className="content">
                          <h6>{subdetails.title}</h6>
                          <time>
                            <i className="la la-clock" />
                            {subdetails.date}
                          </time>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-md-6">
            <div className="card">
              <div className="card-header main-card-header sub-card-header">
                <h5>Map</h5>
              </div>
              <div className="card-body">
                <div id="map" style={{ height: '415px' }}>
                  <SiteMap />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
