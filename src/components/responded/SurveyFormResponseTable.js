import React, {Component} from 'react';
import Table from 'react-bootstrap/Table'


export default class SurveyFormResponseTable extends Component {
   
    state={
        survey_forms:[]
    }

    static getDerivedStateFromProps(props, state) {
        console.log(props,"props");
        
        return{
            survey_forms:props.survey_forms
        }
      }
   
    render(){
        return(
            <React.Fragment>
                <Table responsive="xl" className="table  table-bordered  dataTable ">
                        <thead>
                            <tr>
                                <th >Name</th>
                                <th>Id</th>
                                <th>Title</th>
                                <th >Last Response On</th>
                                <th >Created Date</th>
                                <th >New Submission</th>
                                <th >Action</th>
                            </tr>
                        </thead>
                        <tbody>
                         { this.state.survey_forms.map((survey,key)=>{
                             return(
                                <tr key={key}>
                                <td><a href={`#/`} >{survey.name}</a></td>
                                <td>{survey.id}</td>
                                <td>{survey.title}</td>
                                <td>{survey.last_response}</td>
                                <td>{survey.created_date}</td>
                                <td>
                                    <a target="_blank" href="/forms/new/0/297449">
                                <i className="la la-plus" aria-hidden="true"></i>
                            </a></td>
                                <td>
                                    <a href={survey.view_submission_url} className="view-tag tag"><i className="la la-eye"></i>{survey.response_count}submission</a>
                                    <a href={survey.download_url} className="edit-tag tag"><i className="la la-download"></i> Download</a>
                                    <a href={survey.versions_url} className="pending-tag tag"><i className="la la-clone"></i> Version</a>
                                </td>
                            </tr>
                             )
                         }) }
                           
                           
                          
                        </tbody>
                    </Table>
            </React.Fragment>
        )
    }
}
