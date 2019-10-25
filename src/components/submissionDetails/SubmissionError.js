import React from "react";

const SubmissionError = ({ submissionErr }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      flexDirection: "column"
    }}
  >
    <h1>{submissionErr.status}</h1>
    <p>{submissionErr.msg}</p>

    <a onClick={() => window.history.back()}>
      <b>Back</b>
    </a>
  </div>
);

export default SubmissionError;
