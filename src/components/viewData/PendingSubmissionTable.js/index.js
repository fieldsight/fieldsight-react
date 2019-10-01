import React,{Component} from "react";
import StatusTable from "../../responded/StatusTable"
import axios from "axios";
export default class PendingTable extends Component{
    state={
        pending_submissions:[]
    }
    componentDidMount(){
        if(this.props.id!=""){
            axios.get(`fv3/api/view-by-status/?project=${this.props.id}&submission_status=pending 
            `)
            .then(res=>{   
            this.setState({
                pending_submissions:res.data.pending_submissions
               
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
                <h5>Pending Table</h5>
                <div className="dash-btn">
                <button onClick={showViewData} className="fieldsight-btn">{data ? 'View By Status' : 'View by Form'}</button>
                </div>
            </div>
            <div className="card-body">
              <StatusTable
              submission={this.state.pending_submissions} />

            </div> 
              
        </React.Fragment>
        )
    }
}