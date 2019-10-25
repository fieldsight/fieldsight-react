import React,{Component} from "react";
import axios from "axios";
import {Table } from  "react-bootstrap";

export default class TeamUser extends Component{
    constructor(props){
        super(props);
        this.state={
            users:[],
            breadcrumb:[],
            masteruser:[]
           
        }
    }

    componentDidMount(){
        const {match:{params:{id}}}=this.props;
        axios
        .get(`fv3/api/users/?team=${id}`)
        .then(res => {    
            this.setState({
                users:res.data.users,
                breadcrumb:res.data.breadcrumbs,
                masteruser:res.data.users
                
            })
        }).catch(err => {
            return err
        });
         }

    handleChange = async e=>{
            const { target: {value }} = e
       if(value){
          const search = await this.state.users.filter(users=>{
               return (
                  users.full_name.toLowerCase().includes(value.toLowerCase()) ||
                  users.email.toLowerCase().includes(value.toLowerCase()) ||
                  users.username.toLowerCase().includes(value.toLowerCase())
                    )
           })
       this.setState({
                users:search
            })

     }else{
             this.setState({
                 users:this.state.masteruser
             })
         }
          }

    render(){
         const {users , breadcrumb  } = this.state;
      
         return(
            <>
            <nav aria-label="breadcrumb" role="navigation">
                       { <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href={breadcrumb.team_url}>{breadcrumb.team}</a></li>
                            <li className="breadcrumb-item">{breadcrumb.name}</li>
                        </ol>}
                    </nav>
                    <main id="main-content">
                        <div className="card">
                            <div className="card-header main-card-header sub-card-header">
                                <h5>Team Users</h5>
                                <div className="dash-btn" >
                                    <form className="floating-form" onSubmit={this.handleSubmit}>
                                        <div className="form-group mr-0">
                                            <input type="search" className="form-control"  onChange={(e)=>this.handleChange(e)}  required/>
                                            <label htmlFor="input">Search</label>
                                            <i className="la la-search"></i>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="card-body">
                                <Table responsive="xl" className="table dataTable table-bordered  dataTable ">
                                    <thead >
                                        <tr>
                                            <th >Name</th>
                                            <th >User Name</th>
                                            <th >Email</th>
                                            <th >Role</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                       { users.map((users,key)=>{
                                           return(
                                        <tr key={key}>
                                            <td>
                                                <a href={`/users/profile/${users.id}` } className="pending table-profile">
                                                    <figure>
                                                        <img src={users.profile_picture} alt="site-logo" />
                                                    </figure>
                                                    <h5>{users.full_name}</h5>
                                                </a>
                                            </td>
                                            <td>{users.username}</td>
                                            <td>{users.email}</td>
                                            { users.role.length > 0 ?
                                            ( users.role[0]?
                                            <td>{users.role[0]}</td> 
                                            :<td>{users.role[0]}/{users.role[1]}</td>) :<td>{}</td>
}
                                        </tr>
                                           )
                                       }) }
                                        </tbody>
                                </Table>
                            </div>

                        </div>
                       
                    </main>
            
          
            
            </>
        )
    }
}