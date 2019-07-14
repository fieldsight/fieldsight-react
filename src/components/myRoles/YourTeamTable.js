import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'

class YourTeamTable extends Component {

    render() {
        console.log(this.props.roles)
        return (
            <Table responsive="xl" className="table  table-bordered  dataTable ">
                <thead>
                    <tr>
                        <th >post</th>
                        <th >name</th>
                        <th >address</th>
                        
                    </tr>
                </thead>
                <tbody>
                {this.props.roles.map((item, i) => (
                    <tr key={i}>
                        <td>{item.post}</td>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
                        
                    </tr>
                    ))}
                  

                </tbody>
            </Table>
        );

    }


}

export default YourTeamTable;