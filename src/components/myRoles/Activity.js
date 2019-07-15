import React , {Component} from 'react';
import { Dropdown } from 'react-bootstrap';
import CustomMap from './CustomMap';
import axios from "axios";
import PerfectScrollbar from "react-perfect-scrollbar";


const selectPeriod = [
    "Last 7 days","Last month", "Last Year"
]

const url ="fv3/api/latestsubmissions/"


class Activity extends Component {
    _isMounted = false;

    state={
        activity:[]
    }
    

    componentDidMount() {
        this._isMounted = true;
        axios
          .get(`${url}`)
    
          .then(res => {
              
            if (this._isMounted) {
              if (res.status === 200) {
                console.log(res.data)
                this.setState({
                    activity:res.data.latest_submissions
                });
              }
            }
          })
          .catch(err => {
            // this.setState({
            //   dLoader: false
            // });
          });
      }


  render() {
    return (
      <div className="">
        <div className="dash-btn append-btn">
          <Dropdown>
            <Dropdown.Toggle
              variant=""
              id="dropdown-Data"
              className="fieldsight-btn"
            >
              <i className="fa fa-paste" />
              <span>Select period</span>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-right">
              {selectPeriod.map((item, i) => (
                <Dropdown.Item href={`#/action-${i}`} key={i}>{item}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="row">
          <div className="col-xl-4 col-md-6">
            <div className="card activity-submission">
              <div className="card-header main-card-header sub-card-header">
                <h5>Latest Submission</h5>
              </div>
              <div className="card-body">
                <div className="thumb-list mr-0"  style={{ position: "relative", height: "655px" }}>
                <PerfectScrollbar>
                  <ul>
                 
                      {this.state.activity.map((item,i)=>(
                    <li key={i}>
                     
                      <div className="content">
                        <h6>{item.form}</h6>
                        <time>
                          <i className="la la-clock" /> {item.date}
                        </time>
                      </div>
                    </li>
                       ))}
              
                  </ul>
                  </PerfectScrollbar>
              
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
                <div id="map" style={{ height: "415px" }}>
                  <CustomMap />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
}

export default Activity