import React, { Component, Fragment } from 'react'
import Table from '../common/Table'
import FormModal from '../common/FormModal'
import InputElement from '../common/InputElement'
import RightContentCard from '../common/RightContentCard'



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
            <Fragment>
                <RightContentCard title="Site Type" addButton toggleModal={toggleModal}>
                    <Table page="siteType" />
                </RightContentCard>
                {showModal && <FormModal title="Add site type" toggleModal={toggleModal}>
                    <InputElement tag="input" type="text" required={true} label="ID" formType="floatingForm" htmlFor="input" />
                    <InputElement tag="input" type="text" required={true} label="Type" formType="floatingForm" htmlFor="input" />
                    <InputElement tag="textarea" type="text" required={true} label="Description" formType="floatingForm" htmlFor="textarea" /> </FormModal>
                }
            </Fragment >
        )
    }
}


export default SiteType


