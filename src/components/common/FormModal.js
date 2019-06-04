import React from 'react'
import Zoom from 'react-reveal/Zoom';

const FormModal = ({ title, toggleModal, children }) => (
    <Zoom>
        <div className="fieldsight-popup open" >
            <div className="popup-body">
                <div className="card">
                    <div className="card-header main-card-header">
                        <h5>{title}</h5>
                        <span className="popup-close" onClick={toggleModal}><i className="la la-close"></i></span>
                    </div>
                    <div className="card-body">
                        <form className="floating-form">

                            {children}

                            <div className="form-group pull-right no-margin">
                                <button type="submit" className="fieldsight-btn">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Zoom>
)


export default FormModal