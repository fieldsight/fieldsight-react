import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
class ProgressTable extends Component {

    render() {
        return (
            <React.Fragment>
                <Table responsive="xl" classNameName="table  table-bordered  dataTable ">
                    <thead>
                        <tr>
                            <th >S.N</th>
                            <th >stages</th>
                            <th >Progress</th>
                            <th >Pending</th>
                            <th >Approved</th>
                            <th >Flagged</th>
                            <th >Rejected</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="heading-row">
                            <td>1</td>
                            <td >General inspection</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr className="sub-row">
                            <td>1.1</td>
                            <td>General informations</td>
                            <td>
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="200" style={{ width: '40%' }}>
                                        <span className="progress-count">40%</span>
                                    </div>
                                </div>
                            </td>
                            <td>200</td>
                            <td>50</td>
                            <td>100</td>
                            <td>30</td>
                        </tr>
                        <tr className="sub-row">
                            <td>1.2</td>
                            <td>General Information (ALL structural typ.)</td>
                            <td>
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="200" style={{ width: '0%' }}>
                                        <span className="progress-count">0%</span>
                                    </div>
                                </div>
                            </td>
                            <td>200</td>
                            <td>50</td>
                            <td>100</td>
                            <td>30</td>
                        </tr>
                        <tr className="heading-row">
                            <td>2</td>
                            <td >Second Tranche Inspection</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr className="sub-row">
                            <td>2.1</td>
                            <td>Vertical Members (ALL structural typ.)</td>
                            <td>
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="200" style={{ width: '30%' }}>
                                        <span className="progress-count">30%</span>
                                    </div>
                                </div>
                            </td>
                            <td>200</td>
                            <td>50</td>
                            <td>100</td>
                            <td>30</td>
                        </tr>
                        <tr className="sub-row">
                            <td>2.2</td>
                            <td>Vertical Members (ALL structural typ.)</td>
                            <td>
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="200" style={{ width: '80%' }}>
                                        <span className="progress-count">80%</span>
                                    </div>
                                </div>
                            </td>
                            <td>200</td>
                            <td>50</td>
                            <td>100</td>
                            <td>30</td>
                        </tr>
                        <tr className="heading-row">
                            <td>3</td>
                            <td >Third Tranche Inspection</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr className="sub-row">
                            <td>3.1</td>
                            <td>Roof (ALL structural typ.)</td>
                            <td>
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="200" style={{ width: '30%' }}>
                                        <span className="progress-count">30%</span>
                                    </div>
                                </div>
                            </td>
                            <td>200</td>
                            <td>50</td>
                            <td>100</td>
                            <td>30</td>
                        </tr>
                        <tr className="sub-row">
                            <td>3.2</td>
                            <td>Third Tranche Final Inspection</td>
                            <td>
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="200" style={{ width: '50%' }}>
                                        <span className="progress-count">50%</span>
                                    </div>
                                </div>
                            </td>
                            <td>200</td>
                            <td>50</td>
                            <td>100</td>
                            <td>30</td>
                        </tr>
                    </tbody>
                </Table>
            </React.Fragment>

        );

    }


}

export default ProgressTable;