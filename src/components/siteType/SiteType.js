import React, { Component } from 'react'
import Table from '../common/Table'
import FormModal from '../common/FormModal'
import InputElement from '../common/InputElement'

class SiteType extends Component {

    state = {
        showModal: false
    }

    toggleModal = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal
        }))
    }

    render() {
        const { state: { showModal }, toggleModal } = this
        return (
            <div>
                <div className="card">
                    <div className="card-header main-card-header sub-card-header">
                        <h5>Site Type</h5>
                        <div className="add-btn">
                            <a onClick={toggleModal}>Add new <span><i className="la la-plus"></i></span></a>
                        </div>
                    </div>
                    <div className="card-body">
                        <Table page="siteType" />

                    </div>
                    {showModal && <FormModal title="Add site type" toggleModal={toggleModal}>

                        <InputElement tag="input" type="text" required={true} label="ID" formType="floatingForm" htmlFor="input" />

                        <InputElement tag="input" type="text" required={true} label="Type" formType="floatingForm" htmlFor="input" />

                        <InputElement tag="textarea" type="text" required={true} label="Description" formType="floatingForm" htmlFor="textarea" /> </FormModal>
                    }
                </div>
            </div >
        )
    }
}


export default SiteType


