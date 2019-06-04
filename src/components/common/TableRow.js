import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

const TableRow = ({ page }) => {
    if (page === "siteType") {
        return (
            <tr>
                <td>gor</td>
                <td><a href="#" className="pending">Gorkha</a></td>
                <td>200</td>
                <td>
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
                </td>
            </tr>
        )
    } else if (page === "siteInfo") {
        return (
            <tr>
                <td>6</td>
                <td>name</td>
                <td>Home owner's name</td>
                <td>draw from form</td>
                <td>daily activity form</td>
                <td>number of family members</td>
                <td>
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

                </td>
            </tr>
        )
    }
}


export default TableRow
