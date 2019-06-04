import React from 'react'

const SiteInformationCard = ({ title, children }) => (
    <div className="card">
        <div className="card-header sub-card-header">
            <h5>{title}</h5>
        </div>
        <div className="card-body">
            {children}
        </div>
    </div>
)

export default SiteInformationCard
