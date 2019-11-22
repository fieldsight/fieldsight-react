import React from 'react';
import { FormattedMessage } from 'react-intl';
/* eslint-disable react/prop-types  */

const SubmissionError = ({ submissionErr }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      flexDirection: 'column',
    }}
  >
    <h1>{submissionErr.status}</h1>
    <p>{submissionErr.msg}</p>

    <a onClick={() => window.history.back()}>
      <b>
        <FormattedMessage id="app.back" defaultMessage="Back" />
      </b>
    </a>
  </div>
);

export default SubmissionError;
