import React, { Component } from 'react';
import PerfectScrollbar from "react-perfect-scrollbar";
import Table from 'react-bootstrap/Table'

class YourTeamTable extends Component {

    render() {
        
        return (
            <div
            className="table-wrapper"
            style={{ position: "relative", height: "650px" }}
          >
            <PerfectScrollbar>
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
        </PerfectScrollbar>
        </div>
        );

    }


}

export default YourTeamTable;