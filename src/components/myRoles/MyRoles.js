import React , {Component} from 'react';
import axios from "axios";
import Activity from './Activity';
import ProfileSidebar from './ProfileSidebar';
import YourTeamTable from './YourTeamTable';


const initialState = {
    roleTab:false, activityTab:false
}

const url ="fv3/api/myroles/"
class MyRoles extends Component{
    _isMounted = false;

    state ={
        roleTab:true, 
        activityTab:false,
        height:'',
        profile:[],
        invitation:[],
        roles:[]
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
                  profile: res.data.profile,
                  invitation:res.data.invitations,
                  roles:res.data.roles,
                  dLoader: false
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
                                        <ProfileSidebar 
                                         
                                         profile={this.state.profile}
                                         invitation={this.state.invitation}

                                        />
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
                                                {this.state.roleTab && <YourTeamTable 
                                                
                                                roles={this.state.roles}
                                                
                                                />}
                                                
                                            </div>
                                            {this.state.activityTab && 
                                               <Activity />
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
    componentWillUnmount() {
        this._isMounted = false;
      }
}
export default MyRoles
