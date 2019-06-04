import React from 'react';

const TableHeader = ({ page }) => {
    if (page === "siteType") {
        return (
            <tr>
                <th >ID</th>
                <th >Type</th>
                <th >Description</th>
                <th >Action</th>
            </tr>
        )
    } else if (page === "siteInfo") {
        return (
            <tr>
                <th > S.N</th>
                <th >Attribute</th>
                <th >data name</th>
                <th >Type</th>
                <th >Form</th>
                <th >Question</th>
                <th >Action</th>
            </tr>
        )
    }

}

export default TableHeader