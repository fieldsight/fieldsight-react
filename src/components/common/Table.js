import React, { Component } from 'react'
import TableHeader from './TableHeader'
import TableRow from './TableRow'

export default class Table extends Component {
    render() {
        const { page } = this.props
        return (
            <table className="table  table-bordered  general_table">
                <thead>
                    <TableHeader page={page} />
                </thead>
                <tbody>
                    <TableRow page={page} />
                    <TableRow page={page} />
                    <TableRow page={page} />
                    <TableRow page={page} />
                    <TableRow page={page} />
                    <TableRow page={page} />
                    <TableRow page={page} />
                    <TableRow page={page} />
                </tbody>
            </table>
        )
    }
}
