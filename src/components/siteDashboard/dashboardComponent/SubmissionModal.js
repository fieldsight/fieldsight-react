import React, { Fragment } from "react";
import Modal from "../../common/Modal";
import PerfectScrollbar from "react-perfect-scrollbar";
import { DotLoader } from "../../common/Loader";

const SubmissionTab = ({ formData }) => {
  const formType = Object.keys(formData)[0];

  return (
    <PerfectScrollbar>
      {formData[formType] && formData[formType].length > 0 ? (
        formType === "stage_forms" ? (
          formData[formType].map((data, i) => (
            <Fragment key={i}>
              <p>
                <b> {data.name}</b>{" "}
              </p>
              <table className="table table-bordered">
                <tbody>
                  {data.sub_stages.map((subStages, ind) => (
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
            </Fragment>
          ))
        ) : (
          <table className="table table-bordered">
            <tbody>
              {formData[formType].map((data, i) => (
                <tr key={i}>
                  <td style={{ width: "80%" }}>{data.form_name}</td>
                  <td style={{ width: "20%" }}>
                    <a href={data.new_submission_url} target={`_blank`}>
                      <i className="la la-plus approved" />
                    </a>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      ) : (
        <p>No Data Available</p>
      )}
    </PerfectScrollbar>
  );
};

const SubmissionModal = ({
  showDotLoader,
  activeTab,
  enableSubsites,
  siteForms,
  closeModal,
  toggleTab
}) => (
  <Modal title="Add Data" toggleModal={closeModal}>
    <div className="floating-form">
      <div className="form-group">
        <ul className="nav nav-tabs ">
          <li className="nav-item">
            <a
              className={
                activeTab === "general" ? "nav-link active" : "nav-link"
              }
              onClick={() => toggleTab("general")}
            >
              General Form
            </a>
          </li>
          <li className="nav-item">
            <a
              className={
                activeTab === "scheduled" ? "nav-link active" : "nav-link"
              }
              onClick={() => toggleTab("scheduled")}
            >
              scheduled form
            </a>
          </li>
          {!enableSubsites && (
            <li className="nav-item">
              <a
                className={
                  activeTab === "stage" ? "nav-link active" : "nav-link"
                }
                onClick={() => toggleTab("stage")}
              >
                Staged Form
              </a>
            </li>
          )}
        </ul>
      </div>
      <div style={{ position: "relative", height: "434px" }}>
        {showDotLoader ? (
          <DotLoader height="90%" />
        ) : (
          <SubmissionTab formData={siteForms} />
        )}
      </div>
    </div>
  </Modal>
);

export default SubmissionModal;
