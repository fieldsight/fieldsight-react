import React, { Component } from 'react'
import Table from '../common/Table';
import IdentityForm from './IdentityForm'
import SiteInformationTable from './SiteInformationTable'
import FeaturedPictures from './FeaturedPictures'

class SiteInformation extends Component {

    state = {
        showModalPic: false,
        showModalInfo: false
    }

    toggleModal = (type) => {
        this.setState((prevState) => ({
            [`showModal${type}`]: !prevState[`showModal${type}`]
        }))
    }

    render() {
        const { state: { showModalInfo, showModalPic }, toggleModal } = this
        return (
            <div>
                <div className="card">
                    <div className="card-header main-card-header sub-card-header">
                        <h5>Site Identification</h5>
                    </div>
                    <IdentityForm />
                    <SiteInformationTable showModalInfo={showModalInfo} toggleModal={toggleModal} />
                    <FeaturedPictures showModalPic={showModalPic} toggleModal={toggleModal} />
                </div>
            </div>
        )
    }
}

export default SiteInformation