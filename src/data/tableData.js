import React from 'react'
import ActionBtn from '../components/common/ActionBtn'

const ProgressStatus = (props) => (
    <div class="progress">
        <div class="progress-bar" style={{ width: props.width }}>
            <span class="progress-count" >{props.width}</span>
        </div>
    </div>
)
const data = {
    siteType: {
        columns: [
            {
                label: 'Id',
                field: 'id',
                sort: 'asc'
            },
            {
                label: 'Type',
                field: 'type',
                sort: 'asc'
            },
            {
                label: 'Description',
                field: 'description',
                sort: 'asc'
            },
            {
                label: 'Action',
                field: 'action',
                sort: 'asc'
            }
        ],
        rows: [
            {
                "id": "gor",
                "type": "Gorkha",
                "description": "200",
                "action": <ActionBtn />
            },
            {
                "id": "gor",
                "type": "Gorkha",
                "description": "200",
                "action": <ActionBtn />
            },
            {
                "id": "gor",
                "type": "Gorkha",
                "description": "200",
                "action": <ActionBtn />
            },
            {
                "id": "gor",
                "type": "Gorkha",
                "description": "200",
                "action": <ActionBtn />
            },
            {
                "id": "gor",
                "type": "Gorkha",
                "description": "200",
                "action": <ActionBtn />
            },

            {
                "id": "gor",
                "type": "Gorkha",
                "description": "200",
                "action": <ActionBtn />
            },
            {
                "id": "gor",
                "type": "Gorkha",
                "description": "200",
                "action": <ActionBtn />
            },
            {
                "id": "gor",
                "type": "Gorkha",
                "description": "200",
                "action": <ActionBtn />
            },
            {
                "id": "gor",
                "type": "Gorkha",
                "description": "200",
                "action": <ActionBtn />
            },
            {
                "id": "gor",
                "type": "Gorkha",
                "description": "200",
                "action": <ActionBtn />
            },
            {
                "id": "gor",
                "type": "Gorkha",
                "description": "200",
                "action": <ActionBtn />
            },
            {
                "id": "gor",
                "type": "Gorkha",
                "description": "200",
                "action": <ActionBtn />
            },
        ]
    },
    siteInfo: {
        columns: [
            {
                label: 'S.N',
                field: 'sn',
                sort: 'asc'
            },
            {
                label: 'Attribute',
                field: 'attribute',
                sort: 'asc'
            },
            {
                label: 'Data Name',
                field: 'dataName',
                sort: 'asc'
            },
            {
                label: 'Type',
                field: 'type',
                sort: 'asc'
            },
            ,
            {
                label: 'Form',
                field: 'form',
                sort: 'asc'
            },
            ,
            {
                label: 'Question',
                field: 'question',
                sort: 'asc'
            },
            {
                label: 'Action',
                field: 'action',
                sort: 'asc'
            }
        ],
        rows: [
            {
                "sn": 1,
                "attribute": "name",
                "dataName": "Home owner's name",
                "type": "text",
                "form": "daily activity form",
                "question": "number of family members",
                "action": <ActionBtn />
            },
            {
                "sn": 2,
                "attribute": "name",
                "dataName": "Home owner's name",
                "type": "text",
                "form": "daily activity form",
                "question": "number of family members",
                "action": <ActionBtn />
            },
            {
                "sn": 3,
                "attribute": "name",
                "dataName": "Home owner's name",
                "type": "date",
                "form": "daily activity form",
                "question": "number of family members",
                "action": <ActionBtn />
            },
            {
                "sn": 4,
                "attribute": "name",
                "dataName": "Home owner's name",
                "type": "text",
                "form": "daily activity form",
                "question": "number of family members",
                "action": <ActionBtn />
            },
            {
                "sn": 5,
                "attribute": "name",
                "dataName": "Home owner's name",
                "type": "number",
                "form": "daily activity form",
                "question": "number of family members",
                "action": <ActionBtn />
            },
            {
                "sn": 6,
                "attribute": "name",
                "dataName": "Home owner's name",
                "type": "text",
                "form": "daily activity form",
                "question": "number of family members",
                "action": <ActionBtn />
            },

            {
                "sn": 7,
                "attribute": "name",
                "dataName": "Home owner's name",
                "type": "text",
                "form": "daily activity form",
                "question": "number of family members",
                "action": <ActionBtn />
            },
            {
                "sn": 8,
                "attribute": "name",
                "dataName": "Home owner's name",
                "type": "text",
                "form": "daily activity form",
                "question": "number of family members",
                "action": <ActionBtn />
            },
            {
                "sn": 9,
                "attribute": "name",
                "dataName": "Home owner's name",
                "type": "text",
                "form": "daily activity form",
                "question": "number of family members",
                "action": <ActionBtn />
            },
            {
                "sn": 10,
                "attribute": "name",
                "dataName": "Home owner's name",
                "type": "text",
                "form": "daily activity form",
                "question": "number of family members",
                "action": <ActionBtn />
            }
        ]
    },
    siteManage: {
        columns: [
            {
                label: 'S.N',
                field: 'sn',
                sort: 'asc'
            },
            {
                label: 'Id',
                field: 'id',
                sort: 'asc'
            },
            {
                label: 'Sites',
                field: 'sites',
                sort: 'asc'
            },
            {
                label: 'Address',
                field: 'address',
                sort: 'asc'
            },
            {
                label: 'Regions',
                field: 'regions',
                sort: 'asc'
            },
            ,
            {
                label: 'Role',
                field: 'role',
                sort: 'asc'
            },
            ,
            {
                label: 'Progress',
                field: 'progress',
                sort: 'asc'
            },
            {
                label: 'Submissions',
                field: 'submissions',
                sort: 'asc'
            },
            {
                label: 'Status',
                field: 'status',
                sort: 'asc'
            },
            {
                label: 'Action',
                field: 'action',
                sort: 'asc'
            }
        ],
        rows: [
            {
                "sn": 1,
                "id": "28-11",
                "sites": "Nepal Water Management",
                "address": "Kathmandu, Nepal",
                "regions": "Bagmati",
                "role": "reviewer",
                "progress": <ProgressStatus width="90%" />,
                "submissions": "200",
                "status": <span className="rejected">Reject</span>,
                "action": <ActionBtn />
            },
            {
                "sn": 2,
                "id": "22-11",
                "sites": "Nepal Water Management",
                "address": "Kathmandu, Nepal",
                "regions": "Bagmati",
                "role": "reviewer",
                "progress": <ProgressStatus width="25%" />,
                "submissions": "200",
                "status": <span className="flagged">Flagged</span>,
                "action": <ActionBtn />
            },
            {
                "sn": 3,
                "id": "23-11",
                "sites": "Nepal Water Management",
                "address": "Kathmandu, Nepal",
                "regions": "Bagmati",
                "role": "reviewer",
                "progress": <ProgressStatus width="10%" />,
                "submissions": "200",
                "status": <span className="pending">Pending</span>,
                "action": <ActionBtn />
            },
            {
                "sn": 4,
                "id": "28-11",
                "sites": "Nepal Water Management",
                "address": "Kathmandu, Nepal",
                "regions": "Bagmati",
                "role": "reviewer",
                "progress": <ProgressStatus width="50%" />,
                "submissions": "200",
                "status": <span className="approved">Approved</span>,
                "action": <ActionBtn />
            },
            {
                "sn": 5,
                "id": "28-11",
                "sites": "Nepal Water Management",
                "address": "Kathmandu, Nepal",
                "regions": "Bagmati",
                "role": "reviewer",
                "progress": <ProgressStatus width="20%" />,
                "submissions": "200",
                "status": <span className="pending">Pending</span>,
                "action": <ActionBtn />
            },
            {
                "sn": 6,
                "id": "28-11",
                "sites": "Nepal Water Management",
                "address": "Kathmandu, Nepal",
                "regions": "Bagmati",
                "role": "reviewer",
                "progress": <ProgressStatus width="50%" />,
                "submissions": "200",
                "status": <span className="pending">Pending</span>,
                "action": <ActionBtn />
            },

        ]
    }
};


export default data