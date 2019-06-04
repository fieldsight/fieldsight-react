import React, { Component } from 'react'

export default class MapLayer extends Component {
    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-header main-card-header sub-card-header">
                        <h5>Map layer</h5>
                        <div className="add-btn">
                            <a href="#" data-tab="site-popup">Add new <span><i className="la la-plus"></i></span></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
