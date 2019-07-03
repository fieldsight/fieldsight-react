import React, { Component } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Zoom from 'react-reveal/Zoom';



class CommonPopup extends Component {
    render() {
        return (

            <Zoom duration={500} >

                <div className="fieldsight-popup open">
                    <div className="popup-body">
                        <div className="card">
                            <div className="card-header main-card-header">
                                <h5>{this.props.heading}</h5>
                                <span className="popup-close" onClick={this.props.closePopup}><i className="la la-close"></i></span>
                            </div>
                            <div className="card-body">

                                {this.props.children}

                            </div>
                        </div>
                    </div>
                </div>
            </Zoom>
        )


    }

}

export default CommonPopup;