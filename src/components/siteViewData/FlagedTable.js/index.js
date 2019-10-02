import React,{Component} from "react";
import StatusTable from "../../responded/StatusTable";
import axios from "axios"

export default class FlaggedTable extends Component{
    state={
        flagged_submissions:[]
    }
    componentDidMount(){
        if(this.props.id!=""){
            axios.get(`fv3/api/view-by-status/?project=${this.props.id}&submission_status=flagged 
            `)
            .then(res=>{   
            this.setState({
                flagged_submissions:res.data.flagged_submissions
               
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
                <h5>Flagged Table</h5>
                <div className="dash-btn">
                <button onClick={showViewData} className="fieldsight-btn">{data ? 'View By Status' : 'View by Form'}</button>
                </div>
            </div>
            <div className="card-body">
              <StatusTable
              submission={this.state.flagged_submissions} />

            </div> 
              
        </React.Fragment>
        )
    }
}