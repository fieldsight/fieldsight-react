import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import Zoom from 'react-reveal/Zoom';

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

  

class SiteDashHeader extends Component {

    state = {
            showPopup: false, tabOne:true, tabTwo:false, tabThree:false
    };
      
     
    openTabOne = () => {
        this.setState({
            tabOne:true, tabTwo:false, tabThree:false,
        })
    }
    
    openTabTwo = () =>{
        this.setState({
            tabOne:false, tabTwo:true, tabThree:false,
        });
    }
    openTabThree = () => {
        this.setState({
            tabOne:false, tabTwo:false, tabThree:true,
        });
    }
      
        
    togglePopup = () => {  
        this.setState({  
            showPopup: !this.state.showPopup  
        });
    }
     

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
                    <div className="add-data">
                        <a href={`#/`} onClick={this.togglePopup}> add data <i className="la la-plus"></i></a>
                    </div>
                </div>
                
                {this.state.showPopup && <Zoom duration ={500} >
                    <div className="fieldsight-popup open" id="add-data">
                    <div className="popup-body">
                        <div className="card">
                            <div className="card-header main-card-header">
                                <h5>Add Data</h5>
                                <span className="popup-close"  onClick={this.togglePopup}><i className="la la-close"></i></span>
                            </div>
                            <div className="card-body">
                                <form className="floating-form">
                                    <div className="form-group">
                                    <ul className="nav nav-tabs ">
                                        <li className="nav-item">
                                            <a className={this.state.tabOne ? "nav-link active" : "nav-link"} href={`#/`} onClick={this.openTabOne} >General Form</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={this.state.tabTwo ? "nav-link active" : "nav-link"} href={`#/`} onClick={this.openTabTwo}>scheduled form</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={this.state.tabThree ? "nav-link active" : "nav-link"} href={`#/`} onClick={this.openTabThree}>Staged Form</a>
                                        </li>
                                    </ul>
                                    </div>
                                    {this.state.tabTwo && <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Form Name</th>
                                                    <th>New</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>General Informations</td>
                                                    <td><a href={`#/`} target={`_blank`}><i class="la la-plus approved"></i></a> </td>
                                                </tr>
                                                <tr>
                                                    <td>General Information (ALL structural typ.)</td>
                                                    <td><a href={`#/`} target={`_blank`}><i class="la la-plus approved"></i></a> </td>
                                                </tr>
                                                <tr>
                                                    <td>Foundation (ALL structural typ.)</td>
                                                    <td><a href={`#/`} target={`_blank`}><i class="la la-plus approved"></i></a> </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    }
                                    {this.state.tabOne && <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Form Name</th>
                                                    <th>New</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Vertical Members (ALL structural typ.)</td>
                                                    <td><a href={`#/`} target={`_blank`}><i class="la la-plus approved"></i></a> </td>
                                                </tr>
                                                <tr>
                                                    <td>Plinth Beam (ALL structural typ.)</td>
                                                    <td><a href={`#/`} target={`_blank`}><i class="la la-plus approved"></i></a> </td>
                                                </tr>
                                                <tr>
                                                    <td>TSC Visitors - STFC</td>
                                                    <td><a href={`#/`} target={`_blank`}><i class="la la-plus approved"></i></a> </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    }
                                    {this.state.tabThree && <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Form Name</th>
                                                    <th>New</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Retrofitting Go/No-Go with Measurement</td>
                                                    <td><a href={`#/`} target={`_blank`}><i class="la la-plus approved"></i></a> </td>
                                                </tr>
                                                <tr>
                                                    <td>Retrofitting Go/No-Go Survey</td>
                                                    <td><a href={`#/`}target={`_blank`}><i class="la la-plus approved"></i></a> </td>
                                                </tr>
                                                <tr>
                                                    <td>TSC Visitors - STFC</td>
                                                    <td><a href={`#/`} target={`_blank`}><i class="la la-plus approved"></i></a> </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    }
                                    
                                    <div className="form-group pull-right no-margin">
                                        <button type="submit" class="fieldsight-btn">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                </Zoom>
                }
                
            </div>
        </div>
    );
  }
}


export default SiteDashHeader;
