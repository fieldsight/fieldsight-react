import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

const ManageDropdown = [
  'Generate Report', 'View Data'
]
const HeaderDropdown = [
  'Edit site information', 'site document','user','form'
]

const CountIcon = (props) => {
    return (
      <i className={`la la-${props.icon}`}></i>
    );
  }
  
  const CountContent = (props) =>{
    return (
        <React.Fragment>
            <h4>{props.countNumber}</h4>
            <h6>{props.countName}</h6>
        </React.Fragment>
        
    );
  }
  
  const countcard = [{
    icon: 'copy',
    countNumber: '50',
    countName: 'Submission',
  },
  {
    icon: 'user',
    countNumber: '100',
    countName: 'Users',
  },
  {
    icon: 'map-marker',
    countNumber: '50',
    countName: 'Submission',
  }];

  const CountCard = (props) => {
    return (
      <div className="count-card">
            <div className="count-icon">
            <CountIcon
                icon={props.item.icon}
             />
            </div>
            <div className="count-content">
            <CountContent
                countNumber={props.item.countNumber}
                countName={props.item.countName}
            />
            </div>
      </div>
    );
  }

  

class DashboardHeader extends Component {

  render() {
    return (
        <div className="card mrb-30">
            <div className="card-header main-card-header dashboard-header">
                <div className="dash-pf">
                    <figure>
                        <img src="/img/pf.jpg" alt="pf" />
                        
                    </figure>
                    <div className="dash-pf-content">
                        <h5>Rapid Market Assessment (Philippine Shelter Cluster)</h5>
                        <span>Unit 304 SEDCCO 1 Building 120 Rada Street, Legaspi Village Makati, NCR, 1229, Philippines</span>
                    </div>
                </div>
                <div className="dash-btn">
                    <Dropdown>
                        <Dropdown.Toggle variant="" id="dropdown-Data" className="fieldsight-btn">
                        <i className="fa fa-paste"></i>
                        <span>Data</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="dropdown-menu-right">
                            {ManageDropdown.map((item, i) => <Dropdown.Item href={`#/action-${i}`}>{item}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle variant="" id="dropdown-Manage" className="fieldsight-btn">
                        <i className="fa fa-cog"></i>
                        <span>Manage</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu-right">
                            {HeaderDropdown.map((item, i) => <Dropdown.Item href={`#/action-${i}`}>{item}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div className="card-body">
                <div className="header-count">
                    {countcard.map((item, i) => <CountCard item={item}/>)}
                </div>
            </div>
        </div>
    );
  }
}


export default DashboardHeader;
