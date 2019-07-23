import React from "react";
import { Fade } from "react-reveal";
import ReactLoader from "react-loader-spinner";

export const AvatarContentLoader = ({ number, width, size }) => (
  <>
    {Array(number)
      .fill("")
      .map((item, i) => (
        <div className="contentLoading" style={{ width: width }} key={i}>
          <div className="loading-list">
            <div className={`loading-image circle circle-${size}`}>​</div>
            <div className="text">
              <div className="loading-content" />
              <div className="loading-content" />
            </div>
          </div>
        </div>
      ))}
  </>
);
export const ListContentLoader = ({ number }) => (
  <div className="contentLoading">
    <div className="loading-list">
      <div className="text">
        {Array(number)
          .fill("")
          .map((item, i) => (
            <div className="loading-content" key={i} />
          ))}
        <div className="loading-content" />
      </div>
    </div>
  </div>
);

export const DotLoader = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <ReactLoader type="ThreeDots" color="#00628E" height="50" width="50" />
  </div>
);

export default props => (
  <Fade>
    <div className="fieldsight-popup open">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          zIndex: 99999
        }}
      >
        <ReactLoader
          type="Ball-Triangle"
          color="#00628E"
          height="50"
          width="50"
        />

        <h6 style={{ color: "#00628E", marginTop: "20px" }}>
          Loading... Please wait!
          {/* Loading... Please wait! {props.loaded && `${props.loaded} %`} */}
        </h6>
      </div>
    </div>
  </Fade>
);
