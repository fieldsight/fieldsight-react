import React from 'react';

export default function ProgressLegend(props) {
  const {
    props: { background, element },
  } = props;
  return (
    <>
      <div>
        <div
          className="circle"
          style={{
            border: '1px solid black',
            backgroundColor: background,
          }}
        />
        <span>{element}</span>
      </div>
      <br />
    </>
  );
}
