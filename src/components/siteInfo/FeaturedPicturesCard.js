import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

const FeaturedPicturesCard = ({ title, form, question }) => (
    <div className="col-lg-3 col-md-6">
        <div className="card">
            <div className="card-header sub-card-header">
                <h5>{title}</h5>
                <div className="add-btn">

                    <a href="#" className="td-edit-btn">
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>
                                    Edit
                            </Tooltip>
                            }
                        >
                            <i className="la la-edit"></i>
                        </OverlayTrigger>
                    </a>
                    <a href="#" className="td-delete-btn">
                        <OverlayTrigger

                            placement="top"
                            overlay={
                                <Tooltip>
                                    Delete
                            </Tooltip>
                            }
                        >
                            <i className="la la-trash-o"></i>
                        </OverlayTrigger>
                    </a>
                </div>
            </div>
            <div className="card-body">
                <div className="before-content">
                    <ul>
                        <li><label>Form :</label> <span>{form}</span></li>
                        <li><label>Question :</label> <span>{question}</span></li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
)

export default FeaturedPicturesCard
