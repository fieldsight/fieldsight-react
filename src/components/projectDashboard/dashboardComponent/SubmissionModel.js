import React from "react";
import Modal from "../../common/Modal";

const SubmissionModal = ({
    surveyData,
    toggleModal
  }) => (
    <Modal title="Add Data" toggleModal={toggleModal}>
      <div className="floating-form">
        <div className="form-group">
          <ul className="nav nav-tabs ">
            <li className="nav-item">
              <a className="nav-link">
               Survey Form
              </a>
            </li>
           
          </ul>
        </div>
        <div style={{ position: "relative", height: "434px" }}>
         
        <table className="table table-bordered">
                <tbody>
                  {surveyData.map((subStages, ind) => (
                    <tr key={ind}>
                      <td style={{ width: "80%" }}>{subStages.form_name}</td>
                      <td style={{ width: "20%" }}>
                        <a
                          href={subStages.new_submission_url}
                          target={`_blank`}
                        >
                          <i className="la la-plus approved" />
                        </a>{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          
        </div>
      </div>
    </Modal>
  );
  
  export default SubmissionModal;
  