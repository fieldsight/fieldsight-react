import React, { Component } from "react";
import axios from "axios";
import Logs from "../common/Logs";
import { connect } from "react-redux";
import { getProjectLogs } from "../../actions/projectLogsActions";

const user_id = window.user_id ? window.user_id : 1;

class ProjectLogs extends Component{
    constructor(props){
        super(props);
        this.state={
            siteId:"",
            siteLogs:{},
            siteLogsLoader:true,
            

        }
    }


    componentDidMount(){
        const {match:{params:{id}}}=this.props;
        this.props.getProjectLogs(id);
        this.setState({
          siteId:id
        })
    }


  render() {
    const { siteLogs, siteLogsLoader} =this.props.projectLogs;

    return (
      <>
       <nav aria-label="breadcrumb" role="navigation">

                        <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                          <a href={`/fieldsight/application/#/project-dashboard/${this.state.siteId}`}>
                            Project
                          </a>
                        </li>
                        <li className="breadcrumb-item">
                          Logs
                        </li>
                      </ol>


            </nav>

     <div className="new-dashboard">
       <Logs
          siteId={this.state.siteId}
          type="site"
          user_id={user_id}
          siteLogs={siteLogs}
          showContentLoader={siteLogsLoader}
          fullPage={true}
          projectlogs={true}
      />
      </div>
      </>
    );
  }
}


  const mapStateToProps = ({ projectLogs }) => {
    return {
      projectLogs
        }
};

  export default connect(
    mapStateToProps,
    {
      getProjectLogs
    }
  )(ProjectLogs);
