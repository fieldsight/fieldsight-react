import React from "react";

const CountCard = ({
  countName,
  countNumber,
  icon,
  className,
  noSubmissionText
}) => {
  return (
    <div className="count-card">
      <div className="count-icon">
        {className ? (
          <div className={className}>
            <i className={`la ${icon}`}> </i>
          </div>
        ) : (
          <i className={`la ${icon}`}> </i>
        )}
      </div>
      <div className="count-content">
        <h4>{countNumber}</h4>
        <h6>{noSubmissionText ? countName : `${countName} submissions`}</h6>
      </div>
    </div>
  );
};

export default CountCard;
