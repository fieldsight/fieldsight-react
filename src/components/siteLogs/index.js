import React, { Component } from "react";
import axios from "axios";
import Logs from "../common/Logs";
import { connect } from "react-redux";
import { getSiteLogs } from "../../actions/siteDashboardActions";

const user_id = window.user_id ? window.user_id : 1;

 class SiteLogs extends Component{
    constructor(props){
        super(props);
        this.state={
            siteId:"",
            siteLogs:{},
            siteLogsLoader:true,
            type:"Project"

        }
    }


    componentDidMount(){
        const {match:{params:{id}}}=this.props;
        this.props.getSiteLogs(id);
        this.setState({
          siteId:id
        })
    }


  render() {
   const { siteLogs, siteLogsLoader} =this.props;

    return (
      <>
       <nav aria-label="breadcrumb" role="navigation">

                        <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                          <a href={`/fieldsight/application/#/site-dashboard/${this.state.siteId}`}>
                            Site
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
      />
      </div>
      </>
    );
  }
}


  const mapStateToProps = ({  siteDashboard }) => {
     
      const {siteLogs} = siteDashboard
      

    return {
      siteLogs
        }
};

  export default connect(
    mapStateToProps,
    {
      getSiteLogs
    }
  )(SiteLogs);
 