import React,{Component} from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {Table } from  "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
    getTeam
     } from  "../../actions/teamAction";


 class Teams extends  Component{
    state={
       results:[],
       masterresult:[],
       count:""

        }
    
    componentDidMount(){
      this.props.getTeam();
       
    }
    componentWillReceiveProps(nextprops){
        this.setState({
            results:nextprops.teams.teams,
            masterresult:nextprops.teams.teams,
            count:nextprops.teams.count
        })
        
         
    }
      
    handleChange = async e=>{
        const { target: {value }} = e;
        const { results , masterresult}=this.state;
        if(value){
           
        const search = await results.filter(result=>{
           return (
            result.name.toLowerCase().includes(value.toLowerCase()) ||
            (result.address!== null?result.address.toLowerCase().includes(value.toLowerCase()):"") 
           )
       })
     this.setState({
        results:search
            })

        }else{
                this.setState({
                    results:masterresult
                })
            }
            }

    render(){
        const {results}=this.state;
       

        return(
            <>
                <main id="main-content">
                    <div className="card">
                        <div className="card-header main-card-header sub-card-header">
                            <h5>Team List</h5>
                            <div className="dash-btn">
                                <form className="floating-form">
                                    <div className="form-group mr-0">
                                        <input type="search" className="form-control"  onChange={(e)=>this.handleChange(e)} required/>
                                        <label htmlFor="input" >Search</label>
                                        <i className="la la-search"></i>
                                    </div>
                                </form>
                                <a href={`/fieldsight/organization/add/`} className="fieldsight-btn"><i className="la la-plus"></i></a>
                            </div>
                        </div>
                        <div className="card-body">
                        <div style={{ position: "relative", height: "800px" }}>
            <PerfectScrollbar>
                            <Table id="manage_table" className="table  dataTable table-bordered  manage_table">
                                <thead>
                                    <tr>
                                        <th>Teams</th>
                                        <th>Address</th>
                                        <th>Projects</th>
                                        <th>Sites</th>
                                        <th> Users</th>
                                        <th>Team Owner</th>
                                        <th>Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                   { results.length>0 && results.map ((project,key)=>{
                                      
                                       return(
                                    <tr key={key}>
                                        <td>
                                                <a  href={`/fieldsight/application/#/team-dashboard/${project.id}`}
                                                        className="pending table-profile">
                                                    <figure>
                                                        <img src={project.logo} alt="site-logo" />
                                                    </figure>
                                                    <h5>{project.name}</h5>
                                                </a>
                                            </td>
                                    
                                    <td>{project.address}</td>
                                    <td>{project.projects}</td>
                                    <td>{project.sites}</td>
                                    <td>{project.users}</td>
                                    <td>
                                        <a href={`/users/profile/${project.team_owner_id}`} className="pending table-profile">

                                            {project.team_owner}
                                        </a>
                                    </td>
                                    <td>      
                                        <a 
                                        href={`/fieldsight/application/#/team-dashboard/${project.id}`} 
                                        className="td-view-btn td-btn"> <i className ="la la-eye"></i> </a>
                                        <a 
                                        href={`/fieldsight/organization/${project.id}`}
                                        className="td-edit-btn td-btn"> <i className ="la la-edit"></i></a>
                                   </td>
                                </tr>
                                       )
                                   })
                                }
                                   

                                </tbody>
                            </Table>
                           </PerfectScrollbar>
                           </div>
                        </div>
                    </div>
                   
                </main>
                
            </>
        )
    }
}

const mapStateToProps = ({ teams }) => {
    return {
        teams
        }
};
export default compose(
    connect(
      mapStateToProps,
      {
        getTeam 
      }
    )
  )(Teams);
  