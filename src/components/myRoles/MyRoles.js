import React , {Component} from 'react';
import { Dropdown } from 'react-bootstrap';
import CustomMap from './CustomMap';
import ProfileSidebar from './ProfileSidebar';
import YourTeamTable from './YourTeamTable';

const selectPeriod = [
    "Last 7 days","Last month", "Last Year"
]
const initialState = {
    roleTab:false, activityTab:false
}

class MyRoles extends Component{
    state ={
        roleTab:true, 
        activityTab:false,
        height:''
    }
    
    openTab = (e,type) => {
        this.setState((prevState) => ({
            ...initialState,
            [`${type}Tab`]: true
        }) );
    }
    roleOpen = () => {
        this.setState({
            roleTab:true, activityTab:false
        })
    }
    // activityOpen = () => {
    //     this.setState({
    //         roleTab:false, activityTab:true
    //     })
    // }
    render(){
        console.log(this.state.height)
        return(
            
            <React.Fragment>
                
                    
                    <div className="row">
                        <div className="col-xl-3 col-lg-4">
                            <div className="left-sidebar new-sidebar profile-sidebar sticky-top">
                                <div className="card" style={{minHeight: this.state.height}}>
                                    <div className="card-header main-card-header">
                                        <h5>Profile</h5>
                                        <div className="dash-btn">
                                            <a href={`#/`} className="fieldsight-btn left-icon"> <i className="la la-cog"></i>Update Profile</a>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <ProfileSidebar />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-8">
                            <div className="right-content">
                                <div className="card" style={{minHeight: this.state.height}}>
                                    <div className="card-header main-card-header tab-header">
                                        <ul className="nav nav-tabs " id="myTab" role="tablist">
                                            <li className="nav-item">
                                                <a className={this.state.roleTab ? "nav-link active" : "nav-link"}  onClick={(e) => this.openTab(e,'role')}>Roles</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className={this.state.activityTab ? "nav-link active" : "nav-link"}  onClick={(e) => this.openTab(e, 'activity')}>Activities</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="card-body pdt-0">
                                        
                                        <div className="tab-content mrt-30" >
                                            <div className="">
                                                {this.state.roleTab && <YourTeamTable />}
                                                
                                            </div>
                                            {this.state.activityTab && 
                                                <div className="" >
                                                    <div className="dash-btn append-btn">
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant="" id="dropdown-Data" className="fieldsight-btn">
                                                            <i className="fa fa-paste"></i>
                                                            <span>Select period</span>
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu className="dropdown-menu-right">
                                                                {selectPeriod.map((item, i) => <Dropdown.Item href={`#/action-${i}`}>{item}</Dropdown.Item>)}
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
                                                                    <div className="thumb-list mr-0">
                                                                        <ul>
                                                                            <li>
                                                                                <figure>
                                                                                    <img src="/img/pf.jpg" alt="pf" />
                                                                                </figure>
                                                                                <div className="content">
                                                                                    <h6>This is a test form for testing form.</h6>
                                                                                    <time><i className="la la-clock"></i> March 24, 2019, 2:01 p.m.</time>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <figure>
                                                                                    <img src="/img/pf.jpg" alt="pf" />
                                                                                </figure>
                                                                                <div className="content">
                                                                                    <h6>This is a test form for testing form.</h6>
                                                                                    <time><i className="la la-clock"></i> March 24, 2019, 2:01 p.m.</time>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <figure>
                                                                                    <img src="/img/pf.jpg" alt="pf" />
                                                                                </figure>
                                                                                <div className="content">
                                                                                    <h6>Santosh Khatri </h6>
                                                                                    <time><i className="la la-clock"></i> March 24, 2019, 2:01 p.m.</time>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <figure>
                                                                                    <img src="/img/pf.jpg" alt="pf" />
                                                                                </figure>
                                                                                <div className="content">
                                                                                    <h6>This is a test form for testing form.</h6>
                                                                                    <time><i className="la la-clock"></i> March 24, 2019, 2:01 p.m.</time>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <figure>
                                                                                    <img src="/img/pf.jpg" alt="pf" />
                                                                                </figure>
                                                                                <div className="content">
                                                                                    <h6>This is a test form for testing form.</h6>
                                                                                    <time><i className="la la-clock"></i> March 24, 2019, 2:01 p.m.</time>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <figure>
                                                                                    <img src="/img/pf.jpg" alt="pf" />
                                                                                </figure>
                                                                                <div className="content">
                                                                                    <h6>This is a test form for testing form.</h6>
                                                                                    <time><i className="la la-clock"></i> March 24, 2019, 2:01 p.m.</time>
                                                                                </div>
                                                                            </li>
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
                                                                    <div id="map" style={{height:'415px'}}>
                                                                        <CustomMap />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                                
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
               
            </React.Fragment>
        )
    }
}
export default MyRoles
