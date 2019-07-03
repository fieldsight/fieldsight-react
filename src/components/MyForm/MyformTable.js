import React, { Component } from 'react';
import axios from 'axios'
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import FormShare from './formShare'
import {DotLoader} from "./Loader"




class MyformTable extends Component {

    _isMounted=false
    state = {
        project_list: [],
        list: [],
        shareOption: false,
        dLoader:true,
        tblDiv:false

    }



    componentDidMount() {
        const url = 'https://fieldsight.naxa.com.np/fv3/api/myforms/';
        this._isMounted=true
        axios.get(url)

            .then(
                res => {
                     
                    if(this._isMounted){
                    this.setState({
                        list: res.data
                    })

                }

                if(res.data.length>0){

                    this.setState({
                        dLoader:false,
                        tblDiv:true
                    })

                }

                }
            ).catch(err => console.log("err", err))
    }

   
    render() {
        return (
            <React.Fragment>

                <div className="myform-table">
                   {/*  <div className="add-btn"><a href="#/" onClick={this.props.myFormPopup}>Add new <span><i className="la la-plus"></i></span></a></div> */}
                    <div className="table-wrapper" style={{ position: 'relative', height: '750px' }}>
                        <PerfectScrollbar>
                        {this.state.tblDiv && <table id="myform_table" className="table-bordered table myform_table dataTable">
                                <thead>
                                    <tr>

                                        <th >Form Name</th>
                                        <th >Create Date</th>
                                        <th >Updated date</th>
                                        <th >Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                
                                    {this.state.list.map((item, i) => (
                                        <FormShare key={i + 1}
                                            item={item}
                                            OpenTabHandler={this.props.OpenTabHandler}
                                            commonPopupHandler={this.props.commonPopupHandler}

                                        />
                                    ))}
                                 
                                </tbody>
                               
                                    </table> }

                                    {this.state.dLoader && <DotLoader/>} 
                                    
                        </PerfectScrollbar>
                      
                    </div>
                    
                </div>
                                        
            </React.Fragment>

        );
    }
    componentWillUnmount(){
        this._isMounted=false
    }
}

export default MyformTable;