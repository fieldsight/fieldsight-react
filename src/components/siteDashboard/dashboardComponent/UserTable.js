import React,{Component} from 'react';
import Table from 'react-bootstrap/Table'
class UserTable extends Component{
    render(){
        return(
            <React.Fragment>
                <Table responsive="xl" className="table  table-bordered  dataTable ">
                    <thead>
                        <tr>
                            <th >Name</th>
                            <th >User Name</th>
                            <th >Email</th>
                            <th >Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <a href={"#/"} className="pending table-profile">
                                    <figure>
                                        <img src="/img/pf.jpg" alt="site-logo" />
                                    </figure>
                                    <h5>Krishna B Mijar</h5>
                                </a>
                            </td>
                            <td>krishna.fieldsight.org</td>
                            <td>mijar@gmail.com</td>
                            <td>Project Manager</td>
                        </tr>
                        <tr>
                            <td>
                            <a href={"#/"} className="pending table-profile">
                                <figure>
                                    <img src="/img/pf.jpg" alt="site-logo" />
                                </figure>
                                <h5>Krishna B Mijar</h5>
                            </a>
                            </td>
                            <td>krishna.fieldsight.org</td>
                            <td>mijar@gmail.com</td>
                            <td>Site supervisor</td>
                        </tr>
                        <tr>
                            <td>
                                <a href={"#/"} className="pending table-profile">
                                    <figure>
                                        <img src="/img/pf.jpg" alt="site-logo" />
                                    </figure>
                                    <h5>Krishna B Mijar</h5>
                                </a>
                            </td>
                            <td>krishna.fieldsight.org</td>
                            <td>mijar@gmail.com</td>
                            <td>Region supervisor</td>
                        </tr>
                        <tr>
                            <td>
                                <a href={"#/"} className="pending table-profile">
                                    <figure>
                                        <img src="/img/pf.jpg" alt="site-logo" />
                                    </figure>
                                    <h5>Krishna B Mijar</h5>
                                </a>
                            </td>
                            <td>krishna.fieldsight.org</td>
                            <td>mijar@gmail.com</td>
                            <td>Site supervisor</td>
                        </tr>
                        <tr>
                        <td>
                            <a href={"#/"} className="pending table-profile">
                                <figure>
                                    <img src="/img/pf.jpg" alt="site-logo" />
                                </figure>
                                <h5>Krishna B Mijar</h5>
                            </a>
                            </td>
                            <td>krishna.fieldsight.org</td>
                            <td>mijar@gmail.com</td>
                            <td>Site supervisor</td>
                        </tr>
                        <tr>
                            <td>
                                <a href={"#/"} className="pending table-profile">
                                    <figure>
                                        <img src="/img/pf.jpg" alt="site-logo" />
                                    </figure>
                                    <h5>Krishna B Mijar</h5>
                                </a>
                            </td>
                            <td>krishna.fieldsight.org</td>
                            <td>mijar@gmail.com</td>
                            <td>Region supervisor</td>
                        </tr>
                        

                    </tbody>
                </Table>
            </React.Fragment>
        )
    }
}
export default UserTable;