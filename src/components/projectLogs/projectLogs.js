import React, { Component } from "react";
import Logs from "../common/Logs";

const user_id = window.user_id ? window.user_id : 137;

export default class ProjectLogs extends Component{
    constructor(props){
        super(props);
        this.state={
            siteId:"",
            siteLogs:{}
        }
    }
   
   
    componentDidMount(){
        const {match:{params:{id}}}=this.props;
        console.log(id);
        this.setState({
            siteId:id
        })
       
         }

    
    render(){
            // console.log(this.state.siteId,"dfg");
            
        return(
            <>
           <Logs
                siteId={this.state.siteId}
                type="site"
                user_id={user_id}
                siteLogs={this.state.siteLogs}
          />
         </>
        )
    }
}
