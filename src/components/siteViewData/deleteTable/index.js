import React, {Component} from 'react';
import Table from 'react-bootstrap/Table'
class DeleteTable extends Component {

state={
    deleted_forms:[]
}
    static getDerivedStateFromProps(props, state) {
        return{
            deleted_forms:props.deleted_forms
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
                                <th >Last Response On</th>
                                <th >Created Date</th>
                                <th >Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        { this.state.deleted_forms.map((deleted,key)=>{
                            
                             
                             return(
                                <tr key={key}>
                                <td><a href={`#/`} >{deleted.name}</a></td>
                                <td>{deleted.id}</td>
                                <td>{deleted.last_response}</td>
                                <td>{deleted.created_date}</td>
                                <td>
                                    <a href={deleted.view_submission_url} className="view-tag tag"><i className="la la-eye"></i> 3 submission</a>
                                    <a href={deleted.download_url} className="edit-tag tag"><i className="la la-download"></i> Download</a>
                                    <a href={deleted.versions_url} className="pending-tag tag"><i className="la la-clone"></i> Version</a>
                                </td>
                            </tr>
                             )
                         })  
                           }
                           
                        </tbody>
                    </Table>
            </React.Fragment>
        )
    }
}
export default DeleteTable