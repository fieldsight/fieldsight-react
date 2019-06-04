import React from 'react'
import Table from '../common/Table'
import FormModal from '../common/FormModal'
import InputElement from '../common/InputElement'
import SelectElement from '../common/SelectElement'

const SiteInformationTable = ({ showModalInfo, toggleModal }) => (
    <div className="card no-boxshadow">
        <div className="card-header main-card-header">
            <h5>Site information</h5>
            <div className="add-btn">
                <a onClick={() => toggleModal("Info")}>Add new <span><i className="la la-plus"></i></span></a>
            </div>
        </div>
        <div className="card-body">
            <Table page="siteInfo" />
        </div>
        {showModalInfo && <FormModal title="Add Information" toggleModal={() => toggleModal("Info")}>

            <InputElement tag="input" type="text" required={true} label="Attribute" formType="floatingForm" htmlFor="input" />

            <InputElement tag="input" type="text" required={true} label="Data Name" formType="floatingForm" htmlFor="input" />

            <SelectElement label="Type" options={["Daily activity diary", "Date"]} />

            <SelectElement label="Question" options={["Daily activity diary", "Number of family member"]} />

        </FormModal>
        }
    </div>
)

export default SiteInformationTable
