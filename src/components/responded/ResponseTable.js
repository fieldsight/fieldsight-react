import React, {Component} from 'react';
import Table from 'react-bootstrap/Table'
class ResponseTable extends Component {

    state={
        generals_forms:[],
     
    }

    static getDerivedStateFromProps(props, state) {
        console.log(props,"props");
        
        return{
            generals_forms:props.generals_forms,
           
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
                           
                         {  this.state.generals_forms.map((generals,key)=>{
                            
                             
                             return(
                                <tr key={key}>
                                <td><a href={`#/`} >{generals.name}</a></td>
                                <td>{generals.id}</td>
                                <td>{generals.last_response}</td>
                                <td>{generals.created_date}</td>
                                <td>
                                    <a href={generals.view_submission_url} className="view-tag tag"><i className="la la-eye"></i>{generals.response_count} submission</a>
                                    <a href={generals.download_url} className="edit-tag tag"><i className="la la-download"></i> Download</a>
                                    <a href={generals.versions_url} className="pending-tag tag"><i className="la la-clone"></i> Version</a>
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
export default ResponseTable