import React, { Component } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Iframe from 'react-iframe';
import PerfectScrollbar from 'react-perfect-scrollbar';





class PreviewModal extends Component {
    state = {

    }

    render() {
       
        return (

            <div className="thumb-list userlist">
                <PerfectScrollbar>
                    <Iframe url={this.props.previewUrl}
                        // width="450px"
                        height="450px"
                        id="myId"
                        className="myClassname"
                        display="initial"
                    //position="relative" 
                    />
                </PerfectScrollbar>
            </div>

        );


    }
}

export default PreviewModal;