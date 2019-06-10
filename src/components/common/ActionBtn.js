import React, { Fragment } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

const ActionBtn = () => (
    <Fragment> <a href="#" className="td-edit-btn">
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
        </a></Fragment>
)

export default ActionBtn