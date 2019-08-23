import React,{Component} from "react"
import axios from "axios";

export default class  SiteDocumentTable extends Component{ 
    render(){
        const {site_document} = this.props;
        return(
            <table id="no_paging_table" className="table  dataTable table-bordered  no_paging_table"  responsive="xl">
                     <thead>
                             <tr>
                                <th >Name</th>
                                <th >Type</th>
                                <th >Added Date</th>
                                <th >Action</th>
                            </tr>
                        </thead>
                        <tbody >
                        {site_document.map((site_file,key)=>{
                        return (
                                <tr key={key}>
                                        <td>
                                        <a href={site_file.file}>
                                                    <span className="td-doc-icon google">
                                                        <img
                                                            src={`/static/images/${site_file.type}.png`}
                                                            alt=""
                                                        />
                                                        </span>
                                                                    {site_file.name}
                                                     </a>
                                        </td>
                                                <td>{site_file.doc_type}</td>
                                                <td>{site_file.added_date}</td>
                                                
                                        <td>
                                                                
                                    <a className="td-delete-btn" 
                                    onClick={()=>{this.props.handleDelete(site_file.id);
                                                    this.props.openDelete}}
                                    > <i className="la la-trash-o"> </i> </a>
                                </td>
                                        
                                    </tr>
                        )})}
                        </tbody>

            </table>

 
        )
    }
}

