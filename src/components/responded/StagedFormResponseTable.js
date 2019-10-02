import React, {Component} from 'react';
import Table from 'react-bootstrap/Table'
export default class SurveyFormResponseTable extends Component {
    
    state={
        stage_forms:[]
    }
    static getDerivedStateFromProps(props, state) {
        return{
            stage_forms:props.stage_forms,
            deleted_forms:props.deleted_forms
        }
      }
    render(){
        return(
            <React.Fragment>
                <Table responsive="xl" className="table  table-bordered  dataTable ">
                        <thead>
                            <tr>
                                <th >Sub Stage Name</th>
                                <th >Last Response On</th>
                                <th >Order</th>
                                <th >Form Name</th>
                                <th >Action</th>
                            </tr>
                        </thead>
                        <tbody>
                           {this.state.stage_forms.map((stage,key)=>{
                               return(
                            <tr key={key}>
                                <td><a href={`#/`} >{stage.name}</a></td>
                                <td>June 4, 2019, 5:19 p.m.</td>
                                <td>June 4, 2019, 1:37 p.m.</td>
                                <td>
                                    <a target="_blank" href="/forms/new/0/297449">
                                <i class="la la-plus" aria-hidden="true"></i>
                            </a></td>
                                <td>
                                    <a href={`#/`} className="view-tag tag"><i className="la la-eye"></i> 3 submission</a>
                                    <a href={`#/`} className="edit-tag tag"><i className="la la-download"></i> Download</a>
                                    <a href={`#/`} className="pending-tag tag"><i className="la la-clone"></i> Version</a>
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
