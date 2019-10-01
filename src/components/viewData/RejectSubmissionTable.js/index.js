import React,{Component} from "react";
import StatusTable from "../../responded/StatusTable";
import axios from "axios"


export default class RejectedTable extends Component{

    state={
        rejected_submissions:[]
    }
    componentDidMount(){
        if(this.props.id!=""){
            axios.get(`fv3/api/view-by-status/?project=${this.props.id}&submission_status=rejected
            `)
            .then(res=>{  
                console.log(res,"delete");
                
            this.setState({
                rejected_submissions:res.data.rejected_submissions
               
            })
            }).catch(err=>{
                console.log(err ,"err");
                
            }) 
        }
       
      }

    render(){
        const {props:{data, showViewData}}= this 
        return(
            <React.Fragment>
            <div className="card-header main-card-header sub-card-header">
                <h5>Rejected Submission</h5>
                <div className="dash-btn">
                <button onClick={showViewData} className="fieldsight-btn">{data ? 'View By Status' : 'View by Form'}</button>
                </div>
            </div>
            <div className="card-body">
              <StatusTable
              submission={this.state.rejected_submissions} />

            </div> 
              
        </React.Fragment>
        )
    }
}