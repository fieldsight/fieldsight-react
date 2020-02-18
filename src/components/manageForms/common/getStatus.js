import React from 'react';

const GetStatus = value => {
  if (value === 0) return <span>pending</span>;
  if (value === 1) return <span>Rejected</span>;
  if (value === 2) return <span>Flagged</span>;
  if (value === 3) return <span>Approved</span>;
  return null;
};

export const getClass = status => {
  if (status === 0) return 'pending';
  if (status === 1) return 'rejected';
  if (status === 2) return 'flagged';
  if (status === 3) return 'approved';
  return null;
};

export const getArrValue = (arr, value) => {
  if (arr.includes(value)) return true;
  return false;
};

export const getDay = day => {
  if (day === 'mon') return 1;
  if (day === 'tue') return 2;
  if (day === 'wed') return 3;
  if (day === 'thu') return 4;
  if (day === 'fri') return 5;
  if (day === 'sat') return 6;
  if (day === 'sun') return 7;
  return null;
};
export default GetStatus;
