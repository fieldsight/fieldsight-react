import React, { Component } from 'react';
import axios from "axios";
import 'react-perfect-scrollbar/dist/css/styles.css';





class ReplaceModal extends Component {
    state = {

    }

    onChangeHandler=event=>{

        // const files = Array.from(event.target.files)
        // const formData = new FormData()

        // files.forEach((file, i) => {
        //   formData.append(i, file)
        // })
        // console.log('aaaaa')
       
        const formData = new FormData()
        formData.append("assetUid", "a6j5SZbKGVay6dZCCwGy3k")
        formData.append("name", "aa6j5SZbKGVay6dZCCwGy3k.xls")
        formData.append("file",event.target.files[0]);
        formData.append("destination","https://kpi.naxa.com.np/assets/a6j5SZbKGVay6dZCCwGy3k/")
        

        axios
      .post("https://kpi.naxa.com.np/imports/", { 
        formData
        
        
         
    },{
       
        auth: {
            username:"fieldsight48",
            password:"@bcd1234"
      
        
    }
      })
      .then(res => {
       console.log(res)
        // if (res.status === 201) {
        //   this.setState({
        //     globalUrl: res.data.share_link,
        //     disable: false
        //   });
        // }
      })
      .catch(err => console.log("err", err));
        
    
    }

    render() {
    //    console.log("anacxa")
        return (
            <React.Fragment>

                <form>
                    <div className="form-group">
                        <label>
                            attach file
                        </label>
                        <div className="upload-form">
                            <div className="upload-wrap">
                                <div className="content">
                                    <h3>Drag & Drop an File</h3>
                                    <span>or</span>
                                </div>
                                <input type="file" onChange={this.onChangeHandler} className="userprofile_picture" id="filePhoto" />
                                <div className="fieldsight-btn">
                                    <label htmlFor="upload-btn">upload <i className="la la-cloud-upload"></i></label>
                                    {/* <input type="file" id="upload-btn"  /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </React.Fragment>
        );


    }
}

export default ReplaceModal;