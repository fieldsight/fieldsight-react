import React,{Component} from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {Table } from  "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import axios from "axios";
import {
    getProjectList
     } from  "../../actions/projectListAction";


 class ProjectList extends  Component{
    state={
        projects:[],
        masterprojects:[],
        breadcrumbs:[],
        id:""
        }
    
    componentDidMount(){
        const {match:{params:{id}}}=this.props;
        this.props.getProjectList(id);
        this.setState({
            id:id
        })
    }
    componentWillReceiveProps(nextprops){
        this.setState({
           projects:nextprops.projectList.projects,
           masterprojects:nextprops.projectList.projects,
           breadcrumbs:nextprops.projectList.breadcrumbs
           
        })    
    }
      
    handleChange = async e=>{
        const { target: {value }} = e;
        const { projects , masterprojects}=this.state;
        if(value){
      const search = await projects.filter(project=>{
           return (
            project.name.toLowerCase().includes(value.toLowerCase())

                )
       })
    
       
   this.setState({
    projects:search
        })

 }else{
         this.setState({
            projects:masterprojects
         })
     }
      }

    render(){
        const {breadcrumbs,projects,id}=this.state;
      
      
        
        return(
            <>
             <nav aria-label="breadcrumb" role="navigation">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href={breadcrumbs.team_url}>{breadcrumbs.team}</a>
                        </li>
                        <li className="breadcrumb-item">{breadcrumbs.name}</li>
                    </ol>
                </nav>
                <main id="main-content">
                    <div className="card">
                        <div className="card-header main-card-header sub-card-header">
                            <h5>Project List</h5>
                            <div className="dash-btn">
                                <form className="floating-form">
                                    <div className="form-group mr-0">
                                        <input type="search" className="form-control"  onChange={(e)=>this.handleChange(e)} required=""/>
                                        <label htmlFor="input">Search</label>
                                        <i className="la la-search"></i>
                                    </div>
                                </form>
                                <a href={`/fieldsight/project/add/${id}`} className="fieldsight-btn"><i className="la la-plus"></i></a>
                            </div>
                        </div>
                        <div className="card-body">
                        <div style={{ position: "relative", height: "800px" }}>
            <PerfectScrollbar>
                            <Table id="manage_table" className="table dataTable table-bordered  manage_table">
                                <thead>
                                    <tr>
                                        <th>Project Name</th>
                                        <th>Address</th>
                                        <th>Regions</th>
                                        <th>Sites</th>
                                        <th>users</th>
                                        <th>Total Submissions</th>
                                        <th>Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                   { projects.map ((project,key)=>{
                                       return(
                                    <tr key={key}>
                                        <td>
                                        <a href={`/fieldsight/application/#/project-dashboard/${project.id}`} className="pending table-profile">
                                            <figure>
                                                <img src={project.logo} alt="site-logo" />
                                            </figure>
                                            <h5>{project.name}</h5>
                                        </a>
                                    </td>
                                    <td>{project.address}</td>
                                    <td>{project.total_regions}</td>
                                    <td>{project.total_sites}</td>
                                    <td>{project.total_users}</td>
                                    <td>{project.total_submissions}</td>
                                    <td >      
                                                
                                    <a
                                    href={`/fieldsight/application/#/project-dashboard/${project.id}`} 
                                    className="td-view-btn td-btn"  > <i className ="la la-eye"></i> </a>
                                    <a 
                                    href={`/fieldsight/application/?project=${project.id}#/project-settings`}
                                    className="td-edit-btn td-btn" > <i className ="la la-edit"></i></a>

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

const mapStateToProps = ({ projectList }) => {
    return {
        projectList
        }
};
export default compose(
    connect(
      mapStateToProps,
      {
        getProjectList 
      }
    )
  )(ProjectList);
  