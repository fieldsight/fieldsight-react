import React , {Component} from 'react';
import Table from 'react-bootstrap/Table'

class YourTeamTable extends Component{

  render(){
    return (
        <Table responsive="xl" className="table  table-bordered  dataTable ">
            <thead>
                                            <tr>
                                                <th >S.N</th>
                                                <th >ID</th>
                                                <th >Regions</th>
                                                <th >Role</th>
                                                <th >Number of sites</th>
                                                <th >Action</th>
                                            </tr>
                                        </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>gor</td>
                    <td><a href={`#/`} className="pending">Gorkha</a></td>
                    <td><a href={`#/`}>supervisor/Reviewer</a></td>
                    <td>200</td>
                    <td>
                        <a href={`#/`} className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i className="la la-edit"> </i> </a>
                        <a href={`#/`} className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i className="la la-trash-o"> </i> </a>
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>gor</td>
                    <td><a href={`#/`} className="pending">Gorkha</a></td>
                    <td><a href={`#/`}>supervisor/Reviewer</a></td>
                    <td>200</td>
                    <td>
                        <a href={`#/`} className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i className="la la-edit"> </i> </a>
                        <a href={`#/`} className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i className="la la-trash-o"> </i> </a>
                    </td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>gor</td>
                    <td><a href={`#/`}className="pending">Gorkha</a></td>
                    <td><a href={`#/`}>supervisor/Reviewer</a></td>
                    <td>200</td>
                    <td>
                        <a href={`#/`} className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i className="la la-edit"> </i> </a>
                        <a href={`#/`} className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i className="la la-trash-o"> </i> </a>
                    </td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>gor</td>
                    <td><a href={`#/`} className="pending">Gorkha</a></td>
                    <td><a href={`#/`}>supervisor/Reviewer</a></td>
                    <td>200</td>
                    <td>
                        <a href={`#/`} className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i className="la la-edit"> </i> </a>
                        <a href={`#/`} className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i className="la la-trash-o"> </i> </a>
                    </td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>gor</td>
                    <td><a href={`#/`} className="pending">Gorkha</a></td>
                    <td><a href={`#/`}>supervisor/Reviewer</a></td>
                    <td>200</td>
                    <td>
                        <a href={`#/`} className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i className="la la-edit"> </i> </a>
                        <a href={`#/`} className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i className="la la-trash-o"> </i> </a>
                    </td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>gor</td>
                    <td><a href={`#/`} className="pending">Gorkha</a></td>
                    <td><a href={`#/`}>supervisor/Reviewer</a></td>
                    <td>200</td>
                    <td>
                        <a href={`#/`} className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i className="la la-edit"> </i> </a>
                        <a href={`#/`} className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i className="la la-trash-o"> </i> </a>
                    </td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>gor</td>
                    <td><a href={`#/`} className="pending">Gorkha</a></td>
                    <td><a href={`#/`}>supervisor/Reviewer</a></td>
                    <td>200</td>
                    <td>
                        <a href={`#/`} className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i className="la la-edit"> </i> </a>
                        <a href={`#/`} className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i className="la la-trash-o"> </i> </a>
                    </td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>gor</td>
                    <td><a href={`#/`} className="pending">Gorkha</a></td>
                    <td><a href={`#/`}>supervisor/Reviewer</a></td>
                    <td>200</td>
                    <td>
                        <a href={`#/`} className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i className="la la-edit"> </i> </a>
                        <a href={`#/`} className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i className="la la-trash-o"> </i> </a>
                    </td>
                </tr>

            </tbody>
      </Table>
    );
    
  }

 
}

export default YourTeamTable;