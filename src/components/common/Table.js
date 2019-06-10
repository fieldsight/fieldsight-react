import React, { Component } from 'react'
import ActionBtn from './ActionBtn'
import { MDBDataTable } from 'mdbreact';
import data from '../../data/tableData'

export default class Table extends Component {
    render() {
        const { page } = this.props
        return (
            <MDBDataTable
                bordered
                small
                data={data[page]}
            />
        );

    }
}






